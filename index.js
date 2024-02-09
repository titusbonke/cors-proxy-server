const express = require('express');
const httpProxy = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Target URL (replace with the actual URL you want to proxy)
const targetUrl = "https://apx.msg4.cloud.robeeta.com/WebQuery";

// Configure CORS middleware (adjust allowed origins as needed)
const corsOptions = {
  origin: ['http://localhost:8080'],
  credentials: true,
};
app.use(cors(corsOptions));

// Create the proxy middleware
const proxy = httpProxy.createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  pathRewrite: {
    [`^${targetUrl}`]: '',
  },
});

// Mount the proxy middleware on a specific path (optional)
app.use('/api', proxy);

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
