const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORD}@${process.env.DBURL}/${process.env.DBNAME}?retryWrites=true&w=majority`;

(async () => {
  try {
    const res = await mongoose.connect(uri);
    console.log("database is connected");
  } catch (err) {
    console.log(err);
  }
})();