const express = require("express");
const promClient = require("prom-client");

const app = express();
const register = promClient.register;

// ---------- Metrics ----------
const httpRequestCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

const cpuGauge = new promClient.Gauge({
  name: "simulated_cpu_percent",
  help: "Fake CPU load in percent",
});

// Middleware to count requests
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});


// Fake CPU load generator
setInterval(() => {
  const load = Math.random() * 100;
  cpuGauge.set(load);
}, 5000);

// ---------- Routes ----------
app.get("/hello", (req, res) => {
  res.send("Hello metrics 👋");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.get("/error", (req, res) => {
  res.status(500).send("Error simulated");
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Demo app listening on ${port}`);
});
