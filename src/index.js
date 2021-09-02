const app = require("./app.js");
require("dotenv").config();

app.set("port", process.env.PORT || 3000);

require("./database.js");

app.listen(app.get("port"), () => {
  console.log("Server Listening on port", app.get("port"));
});
