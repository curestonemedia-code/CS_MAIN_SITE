"use client";
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface Review {
  id: number | string;
  name: string;
  initials: string;
  image?: string;
  date: string;
  rating: number;
  content: string;
  color: string;
}

const STATIC_FALLBACKS: Review[] = [
  {
    id: 'f1',
    name: "RishiKesh Chauhan",
    initials: "R",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjXzME5APneygtntQoE4dmR9qWxP2tpFKs1fjLWgFYyeAEOmLNFn=w144-h144-p-rp-mo-ba3-br100",
    date: "2 days ago",
    rating: 5,
    content: "I want to share my experience at Cure Stone Hospital, Gurgaon. The complete kidney stone treatment including RIRS and DJ stent removal was handled very professionally. The doctors and staff provided excellent care, explained the procedures clearly, and ensured my comfort throughout. The clinic’s focus on patient safety, minimally invasive treatment, and smooth recovery was very reassuring. I’m grateful to the team at Cure Stone for their support and care during my treatment.",
    color: "bg-indigo-500"
  },
  {
    id: 'f2',
    name: "Prabhat Bhalla",
    initials: "P",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjXBtR69WWxgoor2X7dWgzxWczaNVEEBULuTHQB-cDM6TA1HUikc=w144-h144-p-rp-mo-br100",
    date: "1 week ago",
    rating: 5,
    content: "An excellent doctor—very friendly, patient, and professional. He explained everything clearly and made me feel completely comfortable. Best urologist one can ever come across. Truly perfect in his work. Highly recommended urologist !!",
    color: "bg-slate-600"
  },
  {
    id: 'f3',
    name: "Zakirhussain",
    initials: "P",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjWsxlfLWhloWXpGaGT1ShU0HLQx1kLIr-zncybqQ3U7yPpG5jSp=w144-h144-p-rp-mo-br100",
    date: "1 week ago",
    rating: 5,
    content: "Dr. Deepanshu Gupta Sir is truly one of the finest kidney stone specialists in India. I traveled all the way from Mumbai specifically to undergo surgery under his care, and I can confidently say that it was the best decision I made",
    color: "bg-slate-600"
  },
  {
    id: 'f4',
    name: "Shobhit Jaryal",
    initials: "P",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVm5ukTku-oIZDIdJDEDJNnT0JhbnG7csKMNQP276F1NIz-SGRe0g=w144-h144-p-rp-mo-ba2-br100",
    date: "3 week ago",
    rating: 5,
    content: "Had a superb and great experience. My kidney stone surgery went great. Dr Deepanshu and Staff were supportive and professional and kept me updated throughout the surgery and night stay.Overall would 100% recommend.",
    color: "bg-slate-600"
  },
  {
    id: 'f5',
    name: "vijay",
    initials: "P",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVfiGeqt8J7vEskngsOrcRukiQGULP_pgq4czyeaqBCMifLiII=w144-h144-p-rp-mo-br100",
    date: "1 week ago",
    rating: 5,
    content: "To this amazing team of doctors thank you for your compassion and expertise. You not only provided a cure but also gave us hope. We will be forever grateful for everything you have done. Special Thanks Dr Deepanshu Gupta Sir and Cure Stone Team😊👍 Go Great Guns Cure Stone Team🤍",
    color: "bg-slate-600"
  },
  {
    id: 'f6',
    name: "Sunny",
    initials: "P",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjXmHknejWQ7R-KNgCRIBN_1K7S2h_wrZ8wU5XDn5CqaDloKHyo0=w144-h144-p-rp-mo-br100",
    date: "1 week ago",
    rating: 5,
    content: "Dr. Deepanshu Gupta Ji and Dr. Shambhav Chandra are the best surgeon in India for Gall & Kidney Stone. They are expert to complete a Painless surgery. Kidney surgery without stitches and gall surgery with minimum stitches. Their coordinator Bhavesh Sir is also a friendly person. I wish for their best in life😍🌺",
    color: "bg-slate-600"
  }
];

export default function GoogleReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ rating: 4.9, total: "REAL" });
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // PLACE ID for Cure Stone Hospital (Sector 51, Gurgaon)
  // User should update this if necessary
  const PLACE_ID = "ChIJ-w-L-A-LDTkRs-0-0-0-0-0";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/place-details?placeId=${PLACE_ID}`);
        const data = await response.json();

        if (data.result) {
          const googleReviews = data.result.reviews || [];
          const formatted = googleReviews.map((rev: any, index: number) => ({
            id: rev.time + index,
            name: rev.author_name,
            initials: rev.author_name.charAt(0),
            image: rev.profile_photo_url,
            date: rev.relative_time_description,
            rating: rev.rating,
            content: rev.text,
            color: "bg-blue-600"
          }));

          setReviews(formatted.length > 0 ? formatted : STATIC_FALLBACKS);
          setStats({
            rating: data.result.rating || 4.9,
            total: data.result.user_ratings_total || 586
          });
        } else {
          setReviews(STATIC_FALLBACKS);
        }
      } catch (error) {
        console.error("Failed to sync live reviews:", error);
        setReviews(STATIC_FALLBACKS);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [PLACE_ID]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (loading || reviews.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [loading, reviews.length, isPaused]);

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">

          {/* Left: Trust Score Panel */}
          <div className="w-full lg:w-1/3 xl:w-1/4 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
            <div className="mb-4">
              <svg className="h-8 w-auto mx-auto" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-1">{stats.rating.toFixed(1)}</h2>
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-6 h-6 ${i < Math.floor(stats.rating) ? 'text-yellow-400' : 'text-slate-200'} fill-current`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-slate-500 font-medium">{stats.rating >= 4.5 ? 'EXCELLENT' : 'VERY GOOD'}</p>
            <p className="text-sm text-slate-400 mt-1 uppercase tracking-tighter">Based on {stats.total} reviews</p>
            <a
              href={`https://www.google.com/search?sxsrf=APpeQnvDnxoitucSbzmuSUz3XQvReaAJyg:1783155763047&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_wyyl4i8QScu9L0wP2dPRTi4tIzG5M_iBT18eTLFCoOr6loMudrQWsGN797js2JRJOO_stXuifi1YwUD-MSd7oXwRFwY&q=Cure+Stone+Reviews`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              See More Reviews
            </a>
          </div>

          {/* Right: Reviews Carousel */}
          <div
            className="w-full lg:w-2/3 xl:w-3/4 relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
          >
            {loading ? (
              <div className="flex gap-6 overflow-hidden py-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="min-w-[300px] md:min-w-[380px] h-[250px] bg-slate-200/50 animate-pulse rounded-[2rem]" />
                ))}
              </div>
            ) : (
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth py-4"
              >
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="min-w-[300px] md:min-w-[380px] bg-white p-8 rounded-[2rem] border border-slate-200 snap-start hover:border-blue-200 transition-colors shadow-sm flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`relative w-12 h-12 rounded-full overflow-hidden ${review.color} flex items-center justify-center text-white font-bold text-lg ring-4 ring-slate-50`}>
                          {review.image ? (
                            <Image src={review.image} alt={review.name} fill sizes="48px" className="object-cover" />
                          ) : (
                            review.initials
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                            {review.name}
                            <span className="inline-flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full">
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          </h4>
                          <p className="text-xs text-slate-400 font-medium">{review.date}</p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 opacity-20" viewBox="0 0 48 48">
                        <path fill="currentColor" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                      </svg>
                    </div>

                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-slate-200'} fill-current`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-slate-600 leading-relaxed italic mb-4 flex-grow line-clamp-3">
                      "{review.content}"
                    </p>

                    <button className="text-blue-600 text-xs font-bold uppercase tracking-wider hover:underline text-left">
                      Read Full Review
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Nav Arrows */}
            <button
              onClick={() => scroll('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}