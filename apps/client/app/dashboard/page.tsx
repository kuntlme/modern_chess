import DashboardClient, {
  DashboardData,
} from "@/feature/dashboard/components/dashboard-client";
import { getDashboardData } from "@/feature/dashboard/home/action";

export default async function Page() {
  const dashboardData = (await getDashboardData()) as DashboardData;

  return <DashboardClient dashboardData={dashboardData} />;
}
