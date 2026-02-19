import DashboardClient from "@/feature/dashboard/components/dashboard-client";
import { getDashboardData } from "@/feature/dashboard/home/action";

export default async function Page() {
  const dashboardData = await getDashboardData();

  return <DashboardClient dashboardData={dashboardData} />;
}
