import app from "./app.js";

const basePort = Number(process.env.PORT) || 5001;
const maxPort = basePort + 10;

function startServer(port) {
  const server = app.listen(port);

  server.on("listening", () => {
    console.log(`Server listening at port ${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      if (port < maxPort) {
        const nextPort = port + 1;
        console.warn(`Port ${port} is in use. Trying port ${nextPort}...`);
        startServer(nextPort);
      } else {
        console.error(`Ports ${basePort}-${maxPort} are all in use. Set PORT to a free port and try again.`);
        process.exit(1);
      }
    } else {
      console.error("Server error:", error);
      process.exit(1);
    }
  });
}

startServer(basePort);
