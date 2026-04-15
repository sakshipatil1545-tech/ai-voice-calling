import { useState } from "react";
import { Shield, AlertTriangle, Users, Key, Clock } from "lucide-react";

const auditLog = [
  { action: "Campaign started", user: "John Doe", time: "2 min ago", type: "info" },
  { action: "Agent config updated", user: "Jane Smith", time: "1 hr ago", type: "info" },
  { action: "Rate limit hit", user: "System", time: "3 hrs ago", type: "warning" },
  { action: "New user added", user: "John Doe", time: "5 hrs ago", type: "info" },
  { action: "DNC list updated", user: "Jane Smith", time: "1 day ago", type: "info" },
];

export const AdminPage = () => {
  const [maxCallsPerHour, setMaxCallsPerHour] = useState(100);
  const [dncEnabled, setDncEnabled] = useState(true);
  const [recordingEnabled, setRecordingEnabled] = useState(true);
  const [consentRequired, setConsentRequired] = useState(true);

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button onClick={onToggle}
      className={`w-10 h-6 rounded-full transition-colors relative ${enabled ? "bg-primary" : "bg-muted"}`}>
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-primary-foreground transition-transform ${enabled ? "left-5" : "left-1"}`} />
    </button>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Admin & Safety Controls</h2>
        <p className="text-muted-foreground text-sm mt-1">Manage security, compliance, and system settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Safety Controls */}
        <div className="stat-card space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-destructive" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Safety Controls</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Do Not Call (DNC) List", desc: "Block numbers on the DNC registry", enabled: dncEnabled, toggle: () => setDncEnabled(!dncEnabled) },
              { label: "Call Recording", desc: "Record all AI conversations", enabled: recordingEnabled, toggle: () => setRecordingEnabled(!recordingEnabled) },
              { label: "Consent Required", desc: "Require verbal consent before proceeding", enabled: consentRequired, toggle: () => setConsentRequired(!consentRequired) },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Toggle enabled={item.enabled} onToggle={item.toggle} />
              </div>
            ))}
          </div>
        </div>

        {/* Rate Limits */}
        <div className="stat-card space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Rate Limits</h3>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Max calls per hour: {maxCallsPerHour}</label>
            <input type="range" min={10} max={500} value={maxCallsPerHour} onChange={(e) => setMaxCallsPerHour(Number(e.target.value))}
              className="w-full accent-primary" />
            <div className="flex justify-between text-xs text-muted-foreground"><span>10</span><span>500</span></div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Calling Hours</label>
            <div className="flex items-center gap-2">
              <input type="time" defaultValue="09:00" className="px-3 py-2 bg-secondary rounded-lg text-sm text-foreground border border-border" />
              <span className="text-muted-foreground">to</span>
              <input type="time" defaultValue="18:00" className="px-3 py-2 bg-secondary rounded-lg text-sm text-foreground border border-border" />
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="stat-card">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Team Members</h3>
        </div>
        <div className="space-y-2">
          {[
            { name: "John Doe", email: "john@acme.com", role: "Admin" },
            { name: "Jane Smith", email: "jane@acme.com", role: "Manager" },
            { name: "Bob Wilson", email: "bob@acme.com", role: "Agent" },
          ].map((member) => (
            <div key={member.email} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground font-medium">{member.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Log */}
      <div className="stat-card">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Audit Log</h3>
        </div>
        <div className="space-y-2">
          {auditLog.map((log, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-3">
                {log.type === "warning" ? (
                  <AlertTriangle className="w-4 h-4 text-warning" />
                ) : (
                  <Key className="w-4 h-4 text-muted-foreground" />
                )}
                <div>
                  <p className="text-sm text-foreground">{log.action}</p>
                  <p className="text-xs text-muted-foreground">by {log.user}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
