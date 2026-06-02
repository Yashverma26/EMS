import mongoose from "mongoose";

export const dbConnection = async () => {
  const dbName = process.env.MONGO_DB_NAME || undefined;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName,
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });
    console.log("Connected to database!");
  } catch (err) {
    console.error("Some error occured while connecting to database:", err);
    console.error(
      "If you are using MongoDB Atlas, make sure the current IP address is added to Atlas Network Access (IP whitelist) and the connection string is correct."
    );
    process.exit(1);
  }
};
