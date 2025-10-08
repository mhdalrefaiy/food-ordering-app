import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserInfo } from "@/app/models/UserInfo";
import { getServerSession } from "next-auth";

export async function checkAdmin(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return false;

  const userInfo = await UserInfo.findOne({ email: session.user.email });
  return userInfo?.admin ?? false;
}