"use client";

import * as React from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  alt?: string;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.25;
const PAN_STEP = 50;

export function ImageLightbox({
  open,
  onOpenChange,
  src,
  alt,
}: ImageLightboxProps) {
  const [zoom, setZoom] = React.useState(1);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  // Reset zoom and position when lightbox opens/closes
  React.useEffect(() => {
    if (open) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [open]);

  // Handle mouse wheel zoom
  const handleWheel = React.useCallback((e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setZoom((prevZoom) => {
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prevZoom + delta));
      return newZoom;
    });
  }, []);

  // Handle pinch zoom on touch devices
  const touchDistanceRef = React.useRef<number | null>(null);
  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      touchDistanceRef.current = distance;
    }
  }, []);

  const handleTouchMove = React.useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchDistanceRef.current !== null) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      const scale = distance / touchDistanceRef.current;
      setZoom((prevZoom) => {
        const newZoom = prevZoom * scale;
        return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
      });
      touchDistanceRef.current = distance;
    }
  }, []);

  const handleTouchEnd = React.useCallback(() => {
    touchDistanceRef.current = null;
  }, []);

  // Handle image dragging when zoomed
  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [zoom, position]);

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, zoom, dragStart]);

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  // Zoom functions
  const handleZoomIn = React.useCallback(() => {
    setZoom((prevZoom) => Math.min(MAX_ZOOM, prevZoom + ZOOM_STEP));
  }, []);

  const handleZoomOut = React.useCallback(() => {
    setZoom((prevZoom) => Math.max(MIN_ZOOM, prevZoom - ZOOM_STEP));
  }, []);

  const handleReset = React.useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Handle keyboard shortcuts for zoom and panning
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input field
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      // E key for zoom in
      if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        handleZoomIn();
      }
      // Q key for zoom out
      else if (e.key === "q" || e.key === "Q") {
        e.preventDefault();
        handleZoomOut();
      }
      // R key for reset (only when zoomed in)
      else if ((e.key === "r" || e.key === "R") && zoom > 1) {
        e.preventDefault();
        handleReset();
      }
      // WASD keys for panning when zoomed in
      else if (zoom > 1) {
        if (e.key === "w" || e.key === "W") {
          e.preventDefault();
          setPosition((prev) => ({ ...prev, y: prev.y + PAN_STEP }));
        } else if (e.key === "s" || e.key === "S") {
          e.preventDefault();
          setPosition((prev) => ({ ...prev, y: prev.y - PAN_STEP }));
        } else if (e.key === "a" || e.key === "A") {
          e.preventDefault();
          setPosition((prev) => ({ ...prev, x: prev.x + PAN_STEP }));
        } else if (e.key === "d" || e.key === "D") {
          e.preventDefault();
          setPosition((prev) => ({ ...prev, x: prev.x - PAN_STEP }));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, zoom, handleZoomIn, handleZoomOut, handleReset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-transparent border-0 shadow-none [&>button]:hidden overflow-hidden"
        onPointerDownOutside={(e) => {
          e.preventDefault();
          onOpenChange(false);
        }}
        onEscapeKeyDown={() => onOpenChange(false)}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* Zoom controls */}
        <TooltipProvider>
          {/* Close button - top right */}
          <div className="fixed top-4 right-4 z-50 flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "rounded-full bg-black/70 text-white p-2",
                    "hover:bg-black/90 transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/70"
                  )}
                  aria-label="Close lightbox"
                >
                  <X className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Close (ESC)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          {/* Zoom controls - top left */}
          <div className="fixed top-4 left-4 z-50 flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= MIN_ZOOM}
                  className={cn(
                    "rounded-full bg-black/70 text-white p-2",
                    "hover:bg-black/90 transition-colors",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/70"
                  )}
                  aria-label="Zoom out"
                >
                  <ZoomOut className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Zoom out (Q)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= MAX_ZOOM}
                  className={cn(
                    "rounded-full bg-black/70 text-white p-2",
                    "hover:bg-black/90 transition-colors",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/70"
                  )}
                  aria-label="Zoom in"
                >
                  <ZoomIn className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Zoom in (E)</p>
              </TooltipContent>
            </Tooltip>
            {zoom > 1 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleReset}
                    className={cn(
                      "rounded-full bg-black/70 text-white p-2",
                      "hover:bg-black/90 transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/70"
                    )}
                    aria-label="Reset zoom"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Reset zoom (R)</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </TooltipProvider>

        {/* Scrollable image container */}
        <div
          ref={containerRef}
          className="w-full h-full overflow-auto flex items-center justify-center"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              transition: isDragging ? "none" : "transform 0.1s ease-out",
            }}
          >
            <img
              ref={imageRef}
              src={src}
              alt={alt || "Lightbox image"}
              className="max-w-full max-h-[95vh] w-auto h-auto object-contain rounded-lg select-none"
              draggable={false}
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.1s ease-out",
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

