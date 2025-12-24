"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar on Christmas mission pages
  if (pathname?.startsWith("/christmas-mission")) {
    return null;
  }
  
  return <Navbar />;
}

