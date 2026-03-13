import { getUserProfile } from "@/feature/dashboard/profile/action/get-profile";
import { GamesPagination } from "@/feature/dashboard/profile/components/games-pagination";
import { GamesTable } from "@/feature/dashboard/profile/components/games-table";
import { ProfileHeader } from "@/feature/dashboard/profile/components/profile-header";
import { ProfileStats } from "@/feature/dashboard/profile/components/profile-stats";
import { UserProfile } from "@/feature/dashboard/profile/types";

type Params = Promise<{ userId: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function UserProfilePage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { userId } = await params;
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const userData: UserProfile | null = await getUserProfile(userId, page);

  if (!userData) {
    return <h1>Data not found</h1>;
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-10">
      <ProfileHeader user={userData.user} />

      <ProfileStats stats={userData.stats} />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Games</h2>
        <GamesTable games={userData.games} userId={userId} />
        <GamesPagination
          page={page}
          totalPages={userData.totalPages}
          userId={userId}
        />
      </div>
    </div>
  );
}
