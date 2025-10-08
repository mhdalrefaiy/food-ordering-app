import {User} from "@/app/models/User";
import mongoose from "mongoose";
import { checkAdmin } from "@/app/libs/auth/checkAdmin";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  if (await checkAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}