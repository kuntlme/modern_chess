import { getFriendsData } from "@/feature/dashboard/friends/action/user-data";

import FriendsClient from "../../../feature/dashboard/friends/components/friends-client";

export default async function FriendsPage() {
  const data = await getFriendsData();

  return <FriendsClient {...data} />;
}
