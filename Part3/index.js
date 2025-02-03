const App = require("./app");
const ConnectDb = require("./db/Connectdb");
const { PORT } = require("./utils/config");
ConnectDb().then(() => {
  App.listen(PORT, () => {
    console.log("App IS RUNNING");
  });
});
