import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getLogoPath, getLogoSize, type LogoVariant, type LogoSize } from "@/utils/branding";

interface EstiLogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  showText?: boolean;
  animated?: boolean;
  alt?: string;
  background?: "none" | "light" | "dark" | "auto";
  priority?: boolean;
}

/**
 * Esti Logo Component
 * 
 * Displays the Esti logo with support for different variants and sizes.
 * Enhanced with better sizing, contrast options, and responsive behavior.
 * 
 * @param variant - Logo variant: "full" (caliper + text), "icon" (caliper only), "light", or "dark"
 * @param size - Logo size: "sm", "md", "lg", "xl", or "xxl"
 * @param className - Additional CSS classes
 * @param showText - Whether to show text alongside icon (for icon variant)
 * @param animated - Whether to enable hover animations
 * @param alt - Alt text for accessibility
 * @param background - Background treatment for contrast: "none", "light", "dark", or "auto"
 * @param priority - Whether this is an above-the-fold logo (for loading priority)
 */
export function EstiLogo({
  variant = "full",
  size = "md",
  className,
  showText = false,
  animated = true,
  alt = "Esti - Manufacturing Quote Assistant",
  background = "auto",
  priority = false,
}: EstiLogoProps) {
  const logoPath = getLogoPath(variant);
  const dimensions = getLogoSize(size);
  
  const isIconVariant = variant === "icon";
  const shouldShowText = showText && isIconVariant;

  // Background treatment for contrast
  const backgroundClasses = {
    none: "",
    light: "bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm",
    dark: "bg-slate-900/90 backdrop-blur-sm rounded-lg p-2 shadow-sm",
    auto: "bg-background/80 backdrop-blur-sm rounded-lg p-2 shadow-sm",
  };

  const bgClass = backgroundClasses[background];

  const logoElement = (
    <img
      src={logoPath}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      loading={priority ? "eager" : "lazy"}
      className={cn(
        "object-contain",
        "max-w-full",
        "h-auto",
        className
      )}
      style={{
        width: "auto",
        height: "auto",
        maxWidth: `${dimensions.width}px`,
        maxHeight: `${dimensions.height}px`,
      }}
    />
  );

  const containerClass = cn(
    "inline-flex items-center gap-2",
    bgClass,
    className
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={containerClass}
      >
        {logoElement}
        {shouldShowText && (
          <span className="text-xl font-bold text-foreground">Esti</span>
        )}
      </motion.div>
    );
  }

  return (
    <div className={containerClass}>
      {logoElement}
      {shouldShowText && (
        <span className="text-xl font-bold text-foreground">Esti</span>
      )}
    </div>
  );
}

