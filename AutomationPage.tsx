import { useState } from "react";
import { GitBranch, Plus, Trash2 } from "lucide-react";

interface Rule {
  id: number;
  condition: string;
  action: string;
  enabled: boolean;
}

const initialRules: Rule[] = [
  { id: 1, condition: "Lead score > 80", action: "Send follow-up email", enabled: true },
  { id: 2, condition: "Call duration < 30s", action: "Mark as no-answer", enabled: true },
  { id: 3, condition: "Sentiment is Negative", action: "Remove from queue", enabled: false },
  { id: 4, condition: "Lead says 'interested'", action: "Schedule demo call", enabled: true },
];

const conditions = [
  "Lead score > 80", "Lead score < 30", "Call duration < 30s", "Call duration > 5min",
  "Sentiment is Positive", "Sentiment is Negative", "Lead says 'interested'", "Lead says 'not interested'",
  "No answer after 3 attempts", "Voicemail detected"
];

const actions = [
  "Send follow-up email", "Schedule demo call", "Mark as no-answer", "Remove from queue",
  "Assign to sales rep", "Send SMS reminder", "Add to nurture campaign", "Create support ticket"
];

export const AutomationPage = () => {
  const [rules, setRules] = useState<Rule[]>(initialRules);

  const addRule = () => {
    setRules([...rules, { id: Date.now(), condition: conditions[0], action: actions[0], enabled: true }]);
  };

  const removeRule = (id: number) => setRules(rules.filter((r) => r.id !== id));

  const toggleRule = (id: number) =>
    setRules(rules.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));

  const updateRule = (id: number, field: "condition" | "action", value: string) =>
    setRules(rules.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Automation Rules</h2>
          <p className="text-muted-foreground text-sm mt-1">Build IF–THEN workflows for your calling pipeline</p>
        </div>
        <button onClick={addRule} className="flex items-center gap-2 px-4 py-2.5 gradient-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Rule
        </button>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className={`stat-card transition-opacity ${!rule.enabled ? "opacity-50" : ""}`}>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center flex-shrink-0">
                <GitBranch className="w-5 h-5 text-primary-foreground" />
              </div>

              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-primary uppercase">IF</span>
                  <select value={rule.condition} onChange={(e) => updateRule(rule.id, "condition", e.target.value)}
                    className="flex-1 min-w-[180px] px-3 py-2 bg-secondary rounded-lg text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30">
                    {conditions.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <span className="text-xs font-bold text-success uppercase">THEN</span>
                  <select value={rule.action} onChange={(e) => updateRule(rule.id, "action", e.target.value)}
                    className="flex-1 min-w-[180px] px-3 py-2 bg-secondary rounded-lg text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30">
                    {actions.map((a) => <option key={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Toggle */}
                <button onClick={() => toggleRule(rule.id)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${rule.enabled ? "bg-primary" : "bg-muted"}`}>
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-primary-foreground transition-transform ${rule.enabled ? "left-5" : "left-1"}`} />
                </button>
                <button onClick={() => removeRule(rule.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
