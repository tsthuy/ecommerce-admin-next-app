import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "commerce",
    });

    isConnected = true;
    console.log("=> new database connection");
  } catch (error) {
    console.error("Error connecting to database: ", error);
    return;
  }
};
