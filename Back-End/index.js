const app = require("./app");

require("dotenv").config();

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server is running at port: ${process.env.PORT}`);
});
