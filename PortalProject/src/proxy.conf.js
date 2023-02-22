const PROXY_CONFIG = [
  {
    context: [
      "/api",
      "/auth",
      "/ws"
    ],
    target: "https://localhost:7200",
    secure: true,
    changeOrigin: true,
    logLevel: "debug",
    rejectUnauthorized: false
  }
];

module.exports = PROXY_CONFIG;
