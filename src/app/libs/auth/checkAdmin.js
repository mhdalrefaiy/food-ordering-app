import { UserInfo } from "@/app/models/UserInfo";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function checkAdmin(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return false;

  const userInfo = await UserInfo.findOne({ email: session.user.email });
  return userInfo?.admin ?? false;
}