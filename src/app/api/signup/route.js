import { User } from "@/app/models/user";
import mongoose from "mongoose";

export async function POST(req) {
  const body = await req.json();
  console.log("MONGO_URL:", process.env.MONGO_URL);

  mongoose.connect(process.env.MONGO_URL);
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    new Error("password must be at least 5 characters");
  }
  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
