import { useState } from "react";
import { Search, Filter, Upload, MoreHorizontal, X } from "lucide-react";

const leads = [
  { id: 1, name: "Sarah Johnson", phone: "+1 555-0101", status: "Hot", score: 92, email: "sarah@email.com", lastCall: "2 hrs ago" },
  { id: 2, name: "Mike Chen", phone: "+1 555-0102", status: "Warm", score: 78, email: "mike@email.com", lastCall: "5 hrs ago" },
  { id: 3, name: "Emma Wilson", phone: "+1 555-0103", status: "Cold", score: 23, email: "emma@email.com", lastCall: "1 day ago" },
  { id: 4, name: "James Brown", phone: "+1 555-0104", status: "Hot", score: 88, email: "james@email.com", lastCall: "3 hrs ago" },
  { id: 5, name: "Lisa Park", phone: "+1 555-0105", status: "Warm", score: 65, email: "lisa@email.com", lastCall: "6 hrs ago" },
  { id: 6, name: "David Kim", phone: "+1 555-0106", status: "Cold", score: 12, email: "david@email.com", lastCall: "2 days ago" },
  { id: 7, name: "Anna Rodriguez", phone: "+1 555-0107", status: "Hot", score: 95, email: "anna@email.com", lastCall: "1 hr ago" },
  { id: 8, name: "Tom Harris", phone: "+1 555-0108", status: "Dead", score: 5, email: "tom@email.com", lastCall: "1 week ago" },
];

const statusColors: Record<string, string> = {
  Hot: "bg-success/10 text-success",
  Warm: "bg-warning/10 text-warning",
  Cold: "bg-info/10 text-info",
  Dead: "bg-muted text-muted-foreground",
};

export const LeadsPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showUpload, setShowUpload] = useState(false);

  const filtered = leads.filter((l) =>
    (filter === "All" || l.status === filter) &&
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Leads Management</h2>
          <p className="text-muted-foreground text-sm mt-1">{leads.length} total leads</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="flex items-center gap-2 px-4 py-2.5 gradient-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <Upload className="w-4 h-4" /> Import Leads
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2.5 bg-card rounded-lg text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div className="flex items-center gap-1">
          <Filter className="w-4 h-4 text-muted-foreground mr-1" />
          {["All", "Hot", "Warm", "Cold", "Dead"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="stat-card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Name</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Phone</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Score</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Last Call</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-foreground">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{lead.phone}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>{lead.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-secondary rounded-full h-1.5">
                        <div className="h-1.5 rounded-full gradient-primary" style={{ width: `${lead.score}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{lead.score}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-xs">{lead.lastCall}</td>
                  <td className="py-3 px-4">
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowUpload(false)}>
          <div className="bg-card rounded-2xl p-6 w-full max-w-md border border-border" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Import Leads</h3>
              <button onClick={() => setShowUpload(false)} className="p-1 rounded-lg hover:bg-secondary"><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer mb-4">
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-foreground font-medium">Drop your CSV file here</p>
              <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
            </div>
            <button className="w-full py-2.5 gradient-primary text-primary-foreground rounded-lg text-sm font-semibold">Upload & Import</button>
          </div>
        </div>
      )}
    </div>
  );
};
