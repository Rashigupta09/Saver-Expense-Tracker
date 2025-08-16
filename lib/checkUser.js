import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();
  
  if(!user) {
    return null;
  }
  try{
    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id, },
    });
    
    // If user already exists, return them
    if (loggedInUser) {
      return loggedInUser;
    }

    // If user doesn't exist, create new user
    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    return newUser;

  }catch (error) {
    console.log(error.message);
  }

};
