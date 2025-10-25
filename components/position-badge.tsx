import { cn } from "@/lib/utils";

interface PositionBadgeProps {
  position: "Base" | "Alero" | "Pívot";
}

export function PositionBadge({ position }: PositionBadgeProps) {
  const variantClasses = {
    Base: "border-vice-blue text-vice-blue bg-vice-blue/10",
    Alero: "border-vice-purple text-vice-purple bg-vice-purple/10",
    Pívot: "border-vice-yellow text-vice-yellow bg-vice-yellow/10"
  };

  return (
    <span
      className={cn(
        "inline-block px-3 py-1 font-bebas text-xs tracking-wider uppercase border rounded",
        variantClasses[position]
      )}
    >
      {position}
    </span>
  );
}
