import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  gradient: string;
}

export const StatCard = ({ title, value, change, trend, icon: Icon, gradient }: StatCardProps) => {
  return (
    <div className="stat-card flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        <div className="flex items-center gap-1 mt-2">
          {trend === "up" ? (
            <TrendingUp className="w-3 h-3 text-success" />
          ) : (
            <TrendingDown className="w-3 h-3 text-destructive" />
          )}
          <span className={`text-xs font-medium ${trend === "up" ? "text-success" : "text-destructive"}`}>
            {change}
          </span>
          <span className="text-xs text-muted-foreground">vs last week</span>
        </div>
      </div>
      <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
    </div>
  );
};
