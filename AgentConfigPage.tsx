import { useState } from "react";
import { Bot, Volume2, Sliders, Save } from "lucide-react";

export const AgentConfigPage = () => {
  const [voiceType, setVoiceType] = useState("female");
  const [speed, setSpeed] = useState(50);
  const [tone, setTone] = useState("professional");
  const [greeting, setGreeting] = useState("Hi! This is Sarah from Acme Corp. I'm reaching out to discuss how we can help grow your business.");

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-foreground">AI Agent Configuration</h2>
        <p className="text-muted-foreground text-sm mt-1">Customize your AI voice agent's behavior and personality</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat-card space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Agent Persona</h3>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Agent Name</label>
            <input defaultValue="Sarah" className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Tone</label>
            <div className="flex gap-2">
              {["professional", "friendly", "casual"].map((t) => (
                <button key={t} onClick={() => setTone(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    tone === t ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Objective</label>
            <select className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option>Lead Qualification</option>
              <option>Appointment Booking</option>
              <option>Survey</option>
              <option>Follow-up</option>
            </select>
          </div>
        </div>

        <div className="stat-card space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-success flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Voice Settings</h3>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Voice Type</label>
            <div className="flex gap-2">
              {["female", "male"].map((v) => (
                <button key={v} onClick={() => setVoiceType(v)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all flex-1 ${
                    voiceType === v ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Speed: {speed}%</label>
            <input type="range" min={0} max={100} value={speed} onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-primary" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Slow</span><span>Fast</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Language</label>
            <select className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>
      </div>

      <div className="stat-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center">
            <Sliders className="w-5 h-5 text-primary-foreground" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Script & Prompts</h3>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Greeting Message</label>
          <textarea rows={3} value={greeting} onChange={(e) => setGreeting(e.target.value)}
            className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Objection Handling Prompt</label>
          <textarea rows={3} defaultValue="If the lead says they're not interested, acknowledge their concern and pivot to a key benefit..."
            className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
        </div>
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-6 py-2.5 gradient-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
