import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export function StatCard({ label, value, className }: StatCardProps) {
  return (
    <Card className={cn(
      "text-center p-6 transition-all hover:transform hover:-translate-y-1 hover:border-vice-blue relative overflow-hidden",
      className
    )}>
      <div className="font-bebas text-sm tracking-wider text-vice-blue uppercase mb-2">
        {label}
      </div>
      <div className="font-bebas text-5xl tracking-wider text-white">
        {value}
      </div>
    </Card>
  );
}
