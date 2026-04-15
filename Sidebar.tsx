import {
  LayoutDashboard, Building2, Bot, Users, Phone, FileText,
  GitBranch, BarChart3, CreditCard, Shield, Zap, Megaphone
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "company", label: "Company Setup", icon: Building2 },
  { id: "agent", label: "AI Agent Config", icon: Bot },
  { id: "leads", label: "Leads", icon: Users },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
  { id: "live-calls", label: "Live Calls", icon: Phone },
  { id: "transcription", label: "Transcription", icon: FileText },
  { id: "automation", label: "Automation", icon: GitBranch },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "admin", label: "Admin & Safety", icon: Shield },
];

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ currentPage, onNavigate, isOpen, onToggle }: SidebarProps) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onToggle}
        />
      )}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 fixed z-40 h-full md:relative md:translate-x-0`}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-sidebar-accent-foreground">VoiceAI</h1>
            <p className="text-xs text-sidebar-foreground">Agentic Calling</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                if (window.innerWidth < 768) onToggle();
              }}
              className={`nav-item w-full ${currentPage === item.id ? "active" : ""}`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="stat-card !p-3 !bg-sidebar-accent !border-sidebar-border">
            <p className="text-xs font-medium text-sidebar-accent-foreground">Pro Plan</p>
            <p className="text-xs text-sidebar-foreground mt-1">2,847 / 5,000 calls</p>
            <div className="w-full bg-sidebar-border rounded-full h-1.5 mt-2">
              <div className="gradient-primary h-1.5 rounded-full" style={{ width: "57%" }} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
