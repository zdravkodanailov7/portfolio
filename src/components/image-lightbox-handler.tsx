"use client";

import * as React from "react";
import { ImageLightbox } from "@/components/image-lightbox";

export function ImageLightboxHandler() {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxSrc, setLightboxSrc] = React.useState("");
  const [lightboxAlt, setLightboxAlt] = React.useState("");

  React.useEffect(() => {
    // Wait for article to be available (since content is rendered via dangerouslySetInnerHTML)
    const findArticle = () => {
      return document.querySelector("article.prose");
    };

    let article = findArticle();
    
    // If article not found immediately, wait a bit for it to render
    if (!article) {
      const timeoutId = setTimeout(() => {
        article = findArticle();
        if (article) {
          attachListener(article);
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }

    const attachListener = (articleElement: Element) => {
      // Add cursor pointer style to all images in the article
      const images = articleElement.querySelectorAll("img");
      images.forEach((img) => {
        (img as HTMLElement).style.cursor = "pointer";
      });

      const handleImageClick = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const target = mouseEvent.target as HTMLElement;
        
        // Check if the clicked element is an image or inside an image
        const img = target.closest("img");
        if (!img) return;

        // Prevent default if image is wrapped in a link
        const link = img.closest("a");
        if (link) {
          mouseEvent.preventDefault();
          mouseEvent.stopPropagation();
        }

        // Get image source and alt text
        const src = (img as HTMLImageElement).src || img.getAttribute("src") || "";
        const alt = (img as HTMLImageElement).alt || img.getAttribute("alt") || "";

        if (src) {
          setLightboxSrc(src);
          setLightboxAlt(alt);
          setLightboxOpen(true);
        }
      };

      // Attach click listener to article
      articleElement.addEventListener("click", handleImageClick);

      // Cleanup
      return () => {
        articleElement.removeEventListener("click", handleImageClick);
      };
    };

    const cleanup = attachListener(article);
    return cleanup;
  }, []);

  return (
    <ImageLightbox
      open={lightboxOpen}
      onOpenChange={setLightboxOpen}
      src={lightboxSrc}
      alt={lightboxAlt}
    />
  );
}

