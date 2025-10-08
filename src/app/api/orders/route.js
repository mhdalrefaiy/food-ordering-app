import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { Order } from "@/app/models/Orders";
import { checkAdmin } from "@/app/libs/auth/checkAdmin";
import { authOptions } from "@/app/libs/auth/authOptions";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await checkAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  
  if (_id) {
    return Response.json( await Order.findById(_id) );
  }


  if (admin) {
    return Response.json( await Order.find() );
  }

  if (userEmail) {
    return Response.json( await Order.find({userEmail}) );
  }

}