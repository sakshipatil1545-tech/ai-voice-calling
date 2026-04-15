import { FileText, Star } from "lucide-react";

const transcriptions = [
  { id: 1, lead: "Sarah Johnson", date: "2024-01-15", duration: "4:32", score: 92, sentiment: "Positive", summary: "Lead showed strong interest in the product. Agreed to schedule a demo for next week." },
  { id: 2, lead: "Mike Chen", date: "2024-01-15", duration: "2:15", score: 78, sentiment: "Neutral", summary: "Requested more information via email. Has a current solution but open to comparison." },
  { id: 3, lead: "Emma Wilson", date: "2024-01-14", duration: "1:45", score: 23, sentiment: "Negative", summary: "Not interested at this time. Recently signed with a competitor." },
  { id: 4, lead: "James Brown", date: "2024-01-14", duration: "5:10", score: 88, sentiment: "Positive", summary: "Very engaged conversation. Wants to involve decision makers. Set follow-up for Friday." },
  { id: 5, lead: "Anna Rodriguez", date: "2024-01-13", duration: "6:20", score: 95, sentiment: "Positive", summary: "Ready to purchase. Asked about pricing tiers and enterprise features." },
];

const sentimentColor: Record<string, string> = {
  Positive: "text-success",
  Neutral: "text-warning",
  Negative: "text-destructive",
};

export const TranscriptionPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Transcription & Lead Scoring</h2>
        <p className="text-muted-foreground text-sm mt-1">AI-analyzed call transcripts with automatic scoring</p>
      </div>

      <div className="space-y-4">
        {transcriptions.map((t) => (
          <div key={t.id} className="stat-card">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{t.lead}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.date} · {t.duration}</p>
                  <p className="text-sm text-muted-foreground mt-2">{t.summary}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Sentiment</p>
                  <p className={`text-sm font-semibold ${sentimentColor[t.sentiment]}`}>{t.sentiment}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Score</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-warning" />
                    <span className="text-sm font-bold text-foreground">{t.score}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
