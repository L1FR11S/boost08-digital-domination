import { ImgHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  lazy?: boolean;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2";
}

const OptimizedImage = ({
  src,
  alt,
  lazy = true,
  aspectRatio,
  className,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectRatioClass = aspectRatio
    ? {
        "16/9": "aspect-video",
        "4/3": "aspect-[4/3]",
        "1/1": "aspect-square",
        "3/2": "aspect-[3/2]",
      }[aspectRatio]
    : "";

  if (hasError) {
    return (
      <div
        className={cn(
          "bg-muted flex items-center justify-center text-muted-foreground",
          aspectRatioClass,
          className
        )}
      >
        <span className="text-sm">Bild kunde inte laddas</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", aspectRatioClass)}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
