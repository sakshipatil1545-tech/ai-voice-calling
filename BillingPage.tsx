import { CreditCard, Check, Zap } from "lucide-react";

const plans = [
  { name: "Starter", price: "$49", calls: "1,000", features: ["Basic AI Agent", "Email Support", "5 Automation Rules"], current: false },
  { name: "Pro", price: "$149", calls: "5,000", features: ["Advanced AI Agent", "Priority Support", "Unlimited Rules", "Custom Voice"], current: true },
  { name: "Enterprise", price: "$499", calls: "25,000", features: ["All Pro features", "Dedicated Manager", "API Access", "SLA Guarantee", "Custom Integration"], current: false },
];

const invoices = [
  { date: "Jan 2024", amount: "$149.00", status: "Paid" },
  { date: "Dec 2023", amount: "$149.00", status: "Paid" },
  { date: "Nov 2023", amount: "$49.00", status: "Paid" },
];

export const BillingPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Billing & Usage</h2>
        <p className="text-muted-foreground text-sm mt-1">Manage your subscription and usage</p>
      </div>

      {/* Usage */}
      <div className="stat-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Current Usage</h3>
          <span className="text-xs text-muted-foreground">Resets in 12 days</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            ["Calls Made", "2,847", "5,000"],
            ["Minutes Used", "4,521", "10,000"],
            ["AI Credits", "780", "1,500"],
          ].map(([label, used, total]) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium text-foreground">{used} / {total}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="h-2 rounded-full gradient-primary" style={{ width: `${(parseInt(String(used).replace(/,/g, "")) / parseInt(String(total).replace(/,/g, ""))) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div key={plan.name} className={`stat-card relative ${plan.current ? "ring-2 ring-primary" : ""}`}>
            {plan.current && (
              <span className="absolute -top-3 left-4 px-3 py-0.5 gradient-primary text-primary-foreground text-xs font-semibold rounded-full">Current</span>
            )}
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">{plan.name}</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
            <p className="text-xs text-muted-foreground mt-1">{plan.calls} calls/month</p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-success flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button className={`w-full mt-4 py-2 rounded-lg text-sm font-semibold transition-opacity ${
              plan.current ? "bg-secondary text-muted-foreground cursor-default" : "gradient-primary text-primary-foreground hover:opacity-90"
            }`}>
              {plan.current ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>

      {/* Invoices */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-foreground mb-4">Invoice History</h3>
        <div className="space-y-2">
          {invoices.map((inv, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{inv.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">{inv.amount}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">{inv.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
