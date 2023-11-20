import app from "./app";
import config from "./app/config";

import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.db_url as string);

    app.listen(config.db_url, () => {
      console.log(`Example app listening on port ${config.db_url}`);
    });
  } catch (error) {
    console.log(error);
  }
}
