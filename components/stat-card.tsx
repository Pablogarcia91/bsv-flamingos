import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export function StatCard({ label, value, className }: StatCardProps) {
  return (
    <div className={cn(
      "relative text-center p-6 rounded-lg bg-vice-dark border border-vice-pink/30 overflow-hidden",
      className
    )}>
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-vice-pink via-vice-blue to-vice-pink" />

      <div className="font-bebas text-xs tracking-widest text-vice-blue uppercase mb-2">
        {label}
      </div>
      <div className="font-bebas text-6xl tracking-wider text-vice-pink">
        {value}
      </div>
    </div>
  );
}
