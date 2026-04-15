import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Megaphone, Calendar, Users, BarChart3, Play, Pause, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: string;
  name: string;
  description: string;
  status: "draft" | "active" | "paused" | "completed";
  type: string;
  targetLeads: number;
  startDate: string;
  endDate: string;
  callsCompleted: number;
  successRate: number;
}

const initialCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Q2 Product Launch",
    description: "Outbound campaign for new product announcement",
    status: "active",
    type: "Outbound",
    targetLeads: 500,
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    callsCompleted: 234,
    successRate: 42,
  },
  {
    id: "2",
    name: "Customer Re-engagement",
    description: "Win-back campaign for churned customers",
    status: "paused",
    type: "Re-engagement",
    targetLeads: 300,
    startDate: "2026-03-15",
    endDate: "2026-05-15",
    callsCompleted: 89,
    successRate: 28,
  },
  {
    id: "3",
    name: "Demo Scheduling",
    description: "Book demos with qualified leads from website",
    status: "draft",
    type: "Inbound",
    targetLeads: 150,
    startDate: "2026-05-01",
    endDate: "2026-05-31",
    callsCompleted: 0,
    successRate: 0,
  },
];

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  active: "bg-emerald-500/15 text-emerald-600 border-emerald-500/20",
  paused: "bg-amber-500/15 text-amber-600 border-amber-500/20",
  completed: "bg-primary/15 text-primary border-primary/20",
};

export const CampaignPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "Outbound",
    targetLeads: "",
    startDate: "",
    endDate: "",
    autoStart: false,
  });
  const { toast } = useToast();

  const handleCreate = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      status: formData.autoStart ? "active" : "draft",
      type: formData.type,
      targetLeads: parseInt(formData.targetLeads) || 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
      callsCompleted: 0,
      successRate: 0,
    };

    setCampaigns([newCampaign, ...campaigns]);
    setFormData({ name: "", description: "", type: "Outbound", targetLeads: "", startDate: "", endDate: "", autoStart: false });
    setDialogOpen(false);
    toast({ title: "Campaign created", description: `"${newCampaign.name}" has been created successfully.` });
  };

  const toggleStatus = (id: string) => {
    setCampaigns(campaigns.map(c => {
      if (c.id !== id) return c;
      return { ...c, status: c.status === "active" ? "paused" : "active" };
    }));
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    toast({ title: "Campaign deleted" });
  };

  const stats = {
    total: campaigns.length,
    active: campaigns.filter(c => c.status === "active").length,
    totalCalls: campaigns.reduce((a, c) => a + c.callsCompleted, 0),
    avgSuccess: campaigns.length ? Math.round(campaigns.reduce((a, c) => a + c.successRate, 0) / campaigns.length) : 0,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
          <p className="text-sm text-muted-foreground mt-1">Create and manage your calling campaigns</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name *</Label>
                <Input id="name" placeholder="e.g. Q2 Product Launch" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" placeholder="Brief description of the campaign..." rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Campaign Type</Label>
                  <Select value={formData.type} onValueChange={v => setFormData({ ...formData, type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Outbound">Outbound</SelectItem>
                      <SelectItem value="Inbound">Inbound</SelectItem>
                      <SelectItem value="Re-engagement">Re-engagement</SelectItem>
                      <SelectItem value="Survey">Survey</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leads">Target Leads</Label>
                  <Input id="leads" type="number" placeholder="e.g. 500" value={formData.targetLeads} onChange={e => setFormData({ ...formData, targetLeads: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start">Start Date *</Label>
                  <Input id="start" type="date" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">End Date *</Label>
                  <Input id="end" type="date" value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Auto-start campaign</p>
                  <p className="text-xs text-muted-foreground">Start calling immediately after creation</p>
                </div>
                <Switch checked={formData.autoStart} onCheckedChange={v => setFormData({ ...formData, autoStart: v })} />
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button className="flex-1" onClick={handleCreate}>Create Campaign</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Campaigns", value: stats.total, icon: Megaphone },
          { label: "Active", value: stats.active, icon: Play },
          { label: "Total Calls", value: stats.totalCalls.toLocaleString(), icon: Users },
          { label: "Avg Success", value: `${stats.avgSuccess}%`, icon: BarChart3 },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaign List */}
      <div className="space-y-3">
        {campaigns.map(campaign => (
          <Card key={campaign.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                    <Badge variant="outline" className={statusColors[campaign.status]}>{campaign.status}</Badge>
                    <Badge variant="secondary">{campaign.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{campaign.description}</p>
                  <div className="flex items-center gap-6 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{campaign.startDate} → {campaign.endDate}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{campaign.targetLeads} leads</span>
                    <span>{campaign.callsCompleted} calls completed</span>
                    <span>{campaign.successRate}% success</span>
                  </div>
                  {campaign.targetLeads > 0 && (
                    <div className="mt-3 w-64">
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${Math.min((campaign.callsCompleted / campaign.targetLeads) * 100, 100)}%` }} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 ml-4">
                  {(campaign.status === "active" || campaign.status === "paused") && (
                    <Button variant="ghost" size="icon" onClick={() => toggleStatus(campaign.id)}>
                      {campaign.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  )}
                  {campaign.status === "draft" && (
                    <Button variant="ghost" size="icon" onClick={() => toggleStatus(campaign.id)}>
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteCampaign(campaign.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
