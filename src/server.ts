import mongoose from "mongoose";
import app from "./app";
import Config from "./app/Config";
async function main() {
  try {
    mongoose.set("debug", true); // ✅ Enables query logging
    await mongoose.connect(Config.dburi as string);
    console.log("✅ MongoDB Connected Successfully");

    app.listen(Config.port, () => {
      console.log(`🚀 Server is online on port ${Config.port}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
}

main();
