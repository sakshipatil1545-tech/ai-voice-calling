import { useState } from "react";
import { LoginPage } from "./LoginPage";
import { DashboardLayout } from "../components/DashboardLayout";
import { DashboardPage } from "./DashboardPage";
import { CompanySetupPage } from "./CompanySetupPage";
import { AgentConfigPage } from "./AgentConfigPage";
import { LeadsPage } from "./LeadsPage";
import { LiveCallingPage } from "./LiveCallingPage";
import { TranscriptionPage } from "./TranscriptionPage";
import { AutomationPage } from "./AutomationPage";
import { ReportsPage } from "./ReportsPage";
import { BillingPage } from "./BillingPage";
import { AdminPage } from "./AdminPage";
import { CampaignPage } from "./CampaignPage";

const pages: Record<string, React.FC> = {
  dashboard: DashboardPage,
  company: CompanySetupPage,
  agent: AgentConfigPage,
  leads: LeadsPage,
  campaigns: CampaignPage,
  "live-calls": LiveCallingPage,
  transcription: TranscriptionPage,
  automation: AutomationPage,
  reports: ReportsPage,
  billing: BillingPage,
  admin: AdminPage,
};

const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  const PageComponent = pages[currentPage] || DashboardPage;

  return (
    <DashboardLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      <PageComponent />
    </DashboardLayout>
  );
};

export default Index;
