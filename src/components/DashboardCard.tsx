
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  className?: string;
}

const DashboardCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendLabel,
  className,
}: DashboardCardProps) => {
  const isPositiveTrend = trend && trend > 0;

  return (
    <Card className={cn("overflow-hidden transition-all duration-300", className)}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-semibold tracking-tight">{value}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
            {trend !== undefined && (
              <div className="flex items-center mt-3">
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded",
                    isPositiveTrend ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  )}
                >
                  {isPositiveTrend ? "+" : ""}
                  {trend}%
                </span>
                {trendLabel && (
                  <span className="text-xs text-muted-foreground ml-2">
                    {trendLabel}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="rounded-full p-2 bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
