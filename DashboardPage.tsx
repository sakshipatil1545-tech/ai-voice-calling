import { Phone, PhoneCall, Users, DollarSign } from "lucide-react";
import { StatCard } from "../components/StatCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const callData = [
  { name: "Mon", calls: 120, connected: 95 },
  { name: "Tue", calls: 180, connected: 140 },
  { name: "Wed", calls: 150, connected: 110 },
  { name: "Thu", calls: 210, connected: 175 },
  { name: "Fri", calls: 190, connected: 155 },
  { name: "Sat", calls: 80, connected: 60 },
  { name: "Sun", calls: 60, connected: 45 },
];

const leadData = [
  { name: "Hot", value: 45 },
  { name: "Warm", value: 120 },
  { name: "Cold", value: 85 },
  { name: "Dead", value: 30 },
];

const recentCalls = [
  { name: "Sarah Johnson", status: "Interested", duration: "4:32", score: 92 },
  { name: "Mike Chen", status: "Callback", duration: "2:15", score: 78 },
  { name: "Emma Wilson", status: "Not Interested", duration: "1:45", score: 23 },
  { name: "James Brown", status: "Interested", duration: "5:10", score: 88 },
  { name: "Lisa Park", status: "Voicemail", duration: "0:30", score: 0 },
];

const statusColor: Record<string, string> = {
  Interested: "bg-success/10 text-success",
  Callback: "bg-warning/10 text-warning",
  "Not Interested": "bg-destructive/10 text-destructive",
  Voicemail: "bg-muted text-muted-foreground",
};

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground text-sm mt-1">Overview of your AI calling performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Calls" value="2,847" change="+12.5%" trend="up" icon={Phone} gradient="gradient-primary" />
        <StatCard title="Connected" value="2,156" change="+8.2%" trend="up" icon={PhoneCall} gradient="gradient-success" />
        <StatCard title="Interested Leads" value="487" change="+23.1%" trend="up" icon={Users} gradient="gradient-purple" />
        <StatCard title="Revenue" value="$34,200" change="-2.4%" trend="down" icon={DollarSign} gradient="gradient-warm" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="stat-card lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">Call Volume Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={callData}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip />
              <Area type="monotone" dataKey="calls" stroke="hsl(217, 91%, 60%)" fillOpacity={1} fill="url(#colorCalls)" strokeWidth={2} />
              <Area type="monotone" dataKey="connected" stroke="hsl(142, 71%, 45%)" fillOpacity={0.1} fill="hsl(142, 71%, 45%)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Lead Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={leadData} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" width={40} />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(217, 91%, 60%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Calls Table */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-foreground mb-4">Recent Calls</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Name</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Duration</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{call.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[call.status] || ""}`}>
                      {call.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{call.duration}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-secondary rounded-full h-1.5">
                        <div className="h-1.5 rounded-full gradient-primary" style={{ width: `${call.score}%` }} />
                      </div>
                      <span className="text-muted-foreground text-xs">{call.score}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
