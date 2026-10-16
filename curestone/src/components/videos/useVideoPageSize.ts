"use client";

import { useSyncExternalStore } from "react";
import { MOBILE_PAGE_SIZE, PAGE_SIZE } from "./videoListHelpers";

const mobileMediaQuery = "(max-width: 639px)";
function subscribeToMobileQuery(callback: () => void) {
  const mq = window.matchMedia(mobileMediaQuery);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getIsMobileSnapshot() {
  return window.matchMedia(mobileMediaQuery).matches;
}
function getIsMobileServerSnapshot() {
  return false;
}

// Mobile is a single-column grid, so the desktop page sizes mean a huge
// amount of scroll before "Load More" ever appears there.
export function useVideoPageSize() {
  const isMobile = useSyncExternalStore(subscribeToMobileQuery, getIsMobileSnapshot, getIsMobileServerSnapshot);
  return isMobile ? MOBILE_PAGE_SIZE : PAGE_SIZE;
}
