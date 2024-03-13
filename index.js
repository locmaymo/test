const path = require("path");
const express = require("express");
const PORT = 3000;

const {createProxyMiddleware} = require("http-proxy-middleware");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/v1/",
  createProxyMiddleware({
    target: "https://api.openai.com",
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      console.log(req.originalUrl);
      proxyReq.setHeader("Authorization", `Bearer sess-Wo7h7Wd1R6WMaIGqFUDv7bV0UxpHZYOjxUd3xsZB`);
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      proxyRes.headers["Access-Control-Allow-Headers"] =
        "Content-Type,Content-Length, Authorization, Accept,X-Requested-With";
    },
  })
);
app
  .listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.log(err);
  });