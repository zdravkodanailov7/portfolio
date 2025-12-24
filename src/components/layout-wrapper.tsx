"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChristmasPage = pathname?.startsWith("/christmas-mission");

  return (
    <div
      className={cn(
        !isChristmasPage &&
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6"
      )}
    >
      {children}
    </div>
  );
}

