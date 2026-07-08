#!/usr/bin/env python3
"""
Blog Scraper for thecurestone.com
Fetches all blogs, downloads images, and generates Next.js static pages.
"""

import urllib.request
import urllib.parse
import ssl
import os
import re
import json
import time
from html.parser import HTMLParser

# ── Config ──────────────────────────────────────────────────────────────────
BLOG_LIST_URL  = "https://thecurestone.com/blogs/"
PROJECT_ROOT   = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR     = os.path.join(PROJECT_ROOT, "public", "blogs")
PAGES_DIR      = os.path.join(PROJECT_ROOT, "src", "app", "blog")

os.makedirs(PUBLIC_DIR, exist_ok=True)
os.makedirs(PAGES_DIR,  exist_ok=True)

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode    = ssl.CERT_NONE

HEADERS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}

# ── Helpers ──────────────────────────────────────────────────────────────────
def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, context=CTX, timeout=15) as r:
        return r.read().decode("utf-8", errors="replace")

def download_image(url: str, dest_path: str) -> bool:
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, context=CTX, timeout=15) as r:
            with open(dest_path, "wb") as f:
                f.write(r.read())
        return True
    except Exception as e:
        print(f"  ⚠ Could not download image {url}: {e}")
        return False

def slugify(text: str) -> str:
    """Convert a title to a URL-safe slug."""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text[:80].strip('-')

# ── Step 1: Extract blog URLs from listing page ───────────────────────────────
class BlogListParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.blog_urls = []
        
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            attrs_dict = dict(attrs)
            href = attrs_dict.get('href', '')
            # Blog posts on this WP site follow pattern /category/slug/
            if href.startswith('https://thecurestone.com/') and href.count('/') >= 5:
                # Exclude nav/social links
                excluded = ['blogs', 'contact', 'about', 'faqs', 'patients-results', 'kidney-stone-treatment',
                            'rirs', 'mini-perc', 'urinary-tract', 'pelvi', 'neurogenic', 'prostate',
                            'urethral', 'urological-cancer', 'kidney-stone/', 'wp-login', 'cdn-cgi',
                            'facebook', 'youtube', 'linkedin', 'instagram', 'maps.app', 'peepstruck']
                if not any(ex in href for ex in excluded) and href not in self.blog_urls:
                    self.blog_urls.append(href)

print("📡 Fetching blog list...")
list_html = fetch(BLOG_LIST_URL)
list_parser = BlogListParser()
list_parser.feed(list_html)
blog_urls = list(dict.fromkeys(list_parser.blog_urls))  # remove dupes, preserve order
print(f"   Found {len(blog_urls)} blog URLs\n")

# ── Step 2: Parse individual blog pages ──────────────────────────────────────
class BlogPageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.meta_description = ""
        self.featured_image = ""
        self.content_paragraphs = []
        self.headings = []
        
        self._in_title = False
        self._in_article = False
        self._in_p = False
        self._in_h2 = False
        self._in_h3 = False
        self._skip_depth = 0
        self._current_tag = ""
        self._buf = ""
        self._depth = 0
        self._article_depth = -1
        self._classes_stack = []
        
    def handle_starttag(self, tag, attrs):
        self._depth += 1
        attrs_dict = dict(attrs)
        cls = attrs_dict.get('class', '')
        
        if tag == 'title':
            self._in_title = True
            
        if tag == 'meta':
            if attrs_dict.get('name') == 'description':
                self.meta_description = attrs_dict.get('content', '')
            if attrs_dict.get('property') == 'og:image' and not self.featured_image:
                self.featured_image = attrs_dict.get('content', '')
                
        if tag == 'img':
            src = attrs_dict.get('src', '')
            # First large content image
            if not self.featured_image and 'wp-content/uploads' in src and 'logo' not in src.lower():
                self.featured_image = src
                
        # Detect article body
        if tag == 'article' or (tag == 'div' and any(c in cls for c in ['entry-content', 'post-content', 'elementor-widget-text-editor'])):
            self._in_article = True
            self._article_depth = self._depth
            
        if self._in_article:
            if tag == 'p':
                self._in_p = True
                self._buf = ""
            if tag == 'h2':
                self._in_h2 = True
                self._buf = ""
            if tag == 'h3':
                self._in_h3 = True
                self._buf = ""
                
    def handle_data(self, data):
        data = data.strip()
        if not data:
            return
            
        if self._in_title:
            self.title += data
            
        if self._in_article:
            if self._in_p or self._in_h2 or self._in_h3:
                self._buf += data + " "
                
    def handle_endtag(self, tag):
        if tag == 'title':
            self._in_title = False
            # Clean WP title (strip site name)
            self.title = self.title.replace(' - The Cure Stone', '').replace(' | The Cure Stone', '').strip()
            
        if self._in_article:
            if tag == 'p' and self._in_p:
                self._in_p = False
                text = self._buf.strip()
                if len(text) > 40:  # Only meaningful paragraphs
                    self.content_paragraphs.append(text)
                self._buf = ""
            if tag == 'h2' and self._in_h2:
                self._in_h2 = False
                text = self._buf.strip()
                if text:
                    self.headings.append(text)
                self._buf = ""
            if tag == 'h3' and self._in_h3:
                self._in_h3 = False
                text = self._buf.strip()
                if text:
                    self.headings.append(text)
                self._buf = ""
                
        self._depth -= 1
        if self._depth < self._article_depth:
            self._in_article = False

# ── Step 3: Generate Next.js page TSX ────────────────────────────────────────
def escape_tsx(text: str) -> str:
    """Escape text for safe embedding in TSX JSX."""
    return (text
            .replace('&', '&amp;')
            .replace('{', '&#123;')
            .replace('}', '&#125;')
            .replace('<', '&lt;')
            .replace('>', '&gt;')
            .replace('"', '&quot;')
            .replace("'", '&#39;'))

def generate_page(blog_data: dict) -> str:
    title     = escape_tsx(blog_data['title'])
    desc      = escape_tsx(blog_data['meta_description'] or blog_data['title'])
    img_path  = blog_data['local_image_path']  # e.g. /blogs/slug.jpg
    paragraphs = blog_data['paragraphs']
    headings   = blog_data['headings']
    source_url = blog_data['url']

    # Build content paragraphs JSX
    content_jsx = ""
    para_limited = paragraphs[:12]  # Limit to 12 paragraphs per page
    for i, para in enumerate(para_limited):
        if i < len(headings) and i > 0 and i % 3 == 0:
            h = escape_tsx(headings[min(i // 3 - 1, len(headings) - 1)])
            content_jsx += f'\n              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">{h}</h2>'
        safe_para = escape_tsx(para)
        content_jsx += f'\n              <p className="text-slate-600 leading-relaxed mb-6">{safe_para}</p>'

    img_jsx = ""
    if img_path:
        img_jsx = f'''
          {{/* Featured Image */}}
          <div className="max-w-4xl mx-auto px-8 mb-12">
            <img
              src="{img_path}"
              alt="{title}"
              className="w-full rounded-3xl object-cover max-h-[480px]"
            />
          </div>'''

    return f'''import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type {{ Metadata }} from "next";

export const metadata: Metadata = {{
  title: "{title} | Cure Stone",
  description: "{desc}",
}};

export default function BlogPage() {{
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900">
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{{{
        __html: `
        .material-symbols-outlined {{ font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }}
        .editorial-gradient {{ background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%); }}
      `}}}} />

      <Navbar />

      <main className="flex-grow pt-20">

        {{/* Hero */}}
        <section className="relative overflow-hidden py-20 lg:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-sm">article</span> Cure Stone Blog
            </div>
            <h1 className="font-sans text-4xl lg:text-6xl font-extrabold text-blue-900 leading-tight tracking-tighter mb-6">
              {title}
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              {desc}
            </p>
            <a
              href="{source_url}"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-700 text-sm font-medium hover:underline"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              Read original article
            </a>
          </div>
        </section>

        {img_jsx}

        {{/* Article Content */}}
        <article className="max-w-4xl mx-auto px-8 pb-24">
          <div className="prose prose-slate max-w-none">
            {content_jsx}
          </div>

          {{/* CTA */}}
          <div className="editorial-gradient rounded-3xl p-12 text-center mt-16 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-sans text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tighter">
                Ready to Be Stone-Free?
              </h2>
              <p className="text-blue-100 text-lg max-w-xl mx-auto mb-8 opacity-90">
                Consult with our expert urologists. Advanced laser procedures with 24-hour recovery.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="bg-amber-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300">
                  Book Free Consultation
                </button>
                <a className="text-white flex items-center gap-2 font-bold text-lg" href="tel:+918800263884">
                  <span className="material-symbols-outlined">call</span> +91 88002 63884
                </a>
              </div>
            </div>
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/5 rounded-full blur-3xl"></div>
          </div>
        </article>

      </main>

      <Footer />
    </div>
  );
}}
'''

# ── Step 4: Main loop ──────────────────────────────────────────────────────────
success_count = 0
fail_count    = 0

for blog_url in blog_urls:
    try:
        # Derive slug from URL
        url_slug = blog_url.rstrip('/').split('/')[-1]
        # Decode percent-encoded slugs (Hindi titles have %e0%a... encoding)
        url_slug = urllib.parse.unquote(url_slug)
        # Replace non-ASCII or odd chars with empty
        url_slug = re.sub(r'[^\w-]', '', url_slug)[:70]
        if not url_slug:
            continue

        page_dir = os.path.join(PAGES_DIR, url_slug)
        page_file = os.path.join(page_dir, "page.tsx")

        # Skip if already created
        if os.path.exists(page_file):
            print(f"  ⏭ Skipping (already exists): {url_slug}")
            continue

        print(f"🔍 Scraping: {blog_url}")
        html = fetch(blog_url)
        time.sleep(0.4)  # polite throttle

        parser = BlogPageParser()
        parser.feed(html)

        title = parser.title or url_slug.replace('-', ' ').title()
        desc  = parser.meta_description or title
        featured_img_url = parser.featured_image

        # Download image
        local_img_path = ""
        if featured_img_url:
            ext = os.path.splitext(featured_img_url.split('?')[0])[-1] or '.jpg'
            img_filename  = f"{url_slug}{ext}"
            img_dest      = os.path.join(PUBLIC_DIR, img_filename)
            if download_image(featured_img_url, img_dest):
                local_img_path = f"/blogs/{img_filename}"
                print(f"  📸 Image saved: {img_filename}")

        blog_data = {
            "url":              blog_url,
            "title":            title,
            "meta_description": desc,
            "local_image_path": local_img_path,
            "paragraphs":       parser.content_paragraphs,
            "headings":         parser.headings,
        }

        # Generate page
        os.makedirs(page_dir, exist_ok=True)
        tsx = generate_page(blog_data)
        with open(page_file, "w", encoding="utf-8") as f:
            f.write(tsx)

        print(f"  ✅ Created: src/app/blog/{url_slug}/page.tsx")
        success_count += 1

    except Exception as e:
        print(f"  ❌ Error for {blog_url}: {e}")
        fail_count += 1
        continue

print(f"\n🎉 Done! {success_count} pages created, {fail_count} failed.")
