const App = require("./app");
const { PORT } = require("./utils/config");
const ConnectDb = require("./utils/ConnectDB");
ConnectDb()
  .then(() => {
    App.listen(PORT, () => {
      console.log("App Is Running");
    });
  })
  .catch(() => {
    process.exit(1);
  });
