const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log("Server listening on PORT:", process.env.PORT);
});
