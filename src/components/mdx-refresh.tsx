"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MdxRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    const storageKey = `mdx-refreshed-${pathname}`;
    
    // Check if we've already refreshed this page in this session
    if (typeof window !== "undefined" && !sessionStorage.getItem(storageKey)) {
      const timeoutId = setTimeout(() => {
        // Mark this page as refreshed before reloading
        sessionStorage.setItem(storageKey, "true");
        window.location.reload();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [pathname]);

  return null;
}

export function ClearMdxRefreshFlags() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Clear all MDX refresh flags when on listing pages
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("mdx-refreshed-")) {
          sessionStorage.removeItem(key);
        }
      });
    }
  }, []);

  return null;
}

