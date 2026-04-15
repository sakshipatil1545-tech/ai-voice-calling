import { useState, useEffect } from "react";
import { Phone, PhoneOff, Mic, MicOff } from "lucide-react";

const transcriptLines = [
  { speaker: "AI", text: "Hi! This is Sarah from Acme Corp. Am I speaking with John?" },
  { speaker: "Lead", text: "Yes, this is John. What's this about?" },
  { speaker: "AI", text: "Great! I'm calling about our AI-powered sales solution. We help companies increase their conversion rate by 40%." },
  { speaker: "Lead", text: "That sounds interesting. How does it work exactly?" },
  { speaker: "AI", text: "We use advanced voice AI to qualify and nurture your leads 24/7. Would you be open to a 15-minute demo this week?" },
  { speaker: "Lead", text: "Sure, I could do Thursday afternoon." },
  { speaker: "AI", text: "Perfect! I'll schedule that for Thursday at 2 PM. You'll receive a calendar invite shortly." },
];

const queuedCalls = [
  { name: "Rachel Green", phone: "+1 555-0201", status: "Ringing" },
  { name: "Joey Tribbiani", phone: "+1 555-0202", status: "Queued" },
  { name: "Ross Geller", phone: "+1 555-0203", status: "Queued" },
];

export const LiveCallingPage = () => {
  const [isLive, setIsLive] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev < transcriptLines.length - 1 ? prev + 1 : prev));
    }, 3000);
    const timer = setInterval(() => setDuration((d) => d + 1), 1000);
    return () => { clearInterval(interval); clearInterval(timer); };
  }, [isLive]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const startCall = () => { setIsLive(true); setCurrentLine(0); setDuration(0); };
  const endCall = () => { setIsLive(false); };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Live Call Monitor</h2>
        <p className="text-muted-foreground text-sm mt-1">Real-time view of active AI calls</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Call */}
        <div className="lg:col-span-2 stat-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Active Call</h3>
            {isLive && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs text-success font-medium">LIVE</span>
                <span className="text-xs text-muted-foreground ml-2">{formatTime(duration)}</span>
              </div>
            )}
          </div>

          {isLive ? (
            <>
              {/* Waveform */}
              <div className="flex items-center justify-center gap-1 py-4">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="waveform-bar" style={{ animationDelay: `${i * 0.08}s` }} />
                ))}
              </div>

              {/* Call Info */}
              <div className="flex items-center justify-center gap-6 py-2">
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">John Smith</p>
                  <p className="text-xs text-muted-foreground">+1 555-0199</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => setMuted(!muted)}
                  className={`p-3 rounded-full transition-all ${muted ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                  {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button onClick={endCall} className="p-4 rounded-full bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity">
                  <PhoneOff className="w-5 h-5" />
                </button>
              </div>

              {/* Transcript */}
              <div className="mt-4 border-t border-border pt-4">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Live Transcript</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {transcriptLines.slice(0, currentLine + 1).map((line, i) => (
                    <div key={i} className={`flex gap-3 ${line.speaker === "AI" ? "" : "flex-row-reverse"}`}>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        line.speaker === "AI" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"
                      }`}>{line.speaker}</span>
                      <p className={`text-sm text-foreground ${
                        line.speaker === "AI" ? "bg-secondary" : "bg-primary/5"
                      } px-3 py-2 rounded-xl max-w-[80%]`}>{line.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Phone className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
              <p className="text-muted-foreground text-sm">No active call</p>
              <button onClick={startCall}
                className="mt-4 px-6 py-2.5 gradient-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                Start Demo Call
              </button>
            </div>
          )}
        </div>

        {/* Call Queue */}
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Call Queue</h3>
          <div className="space-y-3">
            {queuedCalls.map((call, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{call.name}</p>
                  <p className="text-xs text-muted-foreground">{call.phone}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  call.status === "Ringing" ? "bg-warning/10 text-warning animate-pulse" : "bg-muted text-muted-foreground"
                }`}>{call.status}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Stats</h4>
            <div className="space-y-2">
              {[
                ["Calls Today", "47"],
                ["Avg Duration", "3:24"],
                ["Success Rate", "68%"],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
