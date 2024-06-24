const { bootstrab } = require("./index");
require("dotenv").config();

const port = process.env.PORT || 8000;

//init server func
async function start_server() {
  const server = await bootstrab();

  server.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
}

start_server();
