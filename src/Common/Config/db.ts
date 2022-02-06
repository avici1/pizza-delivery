import mongoose from "mongoose";
import env from "./env";

const dbInit = (): void => {
  mongoose
    .connect(env.DB_URI || "", {
      autoCreate: true,
      autoIndex: true,
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
};

export default dbInit;
