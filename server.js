require("dotenv").config({ path: "./config.env" });

const mongoose = require("mongoose");
const app = require("./src/app");

const DB = process.env.MONGO_URI.replace("<PASSWORD>", process.env.DB_PASSWORD);
const PORT = process.env.PORT || 8080;

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection successfull");
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
