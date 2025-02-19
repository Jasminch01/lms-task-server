import mongoose from "mongoose";
import app from "./app";
import Config from "./app/Config";
async function main() {
  try {
    mongoose.connect(Config.dburi as string);
    app.listen(Config.port, () => {
      console.log(`server is online on port ${Config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();