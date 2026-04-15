import { useState } from "react";
import { Building2, Globe, Upload, Save } from "lucide-react";

export const CompanySetupPage = () => {
  const [companyName, setCompanyName] = useState("Acme Corp");

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Company & Product Setup</h2>
        <p className="text-muted-foreground text-sm mt-1">Configure your company profile and product details</p>
      </div>

      <div className="stat-card space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-border">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
            <Building2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{companyName}</h3>
            <p className="text-sm text-muted-foreground">Last updated 2 days ago</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Company Name</label>
            <input value={companyName} onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Industry</label>
            <select className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option>SaaS / Technology</option>
              <option>Real Estate</option>
              <option>Healthcare</option>
              <option>Finance</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Website</label>
            <div className="relative">
              <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="https://yourcompany.com"
                className="w-full pl-10 pr-4 py-2.5 bg-secondary rounded-lg text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
            <input placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Product Description</label>
          <textarea rows={4} placeholder="Describe your product/service for the AI agent..."
            className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Knowledge Base</label>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Drop files here or <span className="text-primary">browse</span></p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, TXT up to 10MB</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-6 py-2.5 gradient-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
