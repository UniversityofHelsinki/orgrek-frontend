const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://organisaatiorekisteri-dev-backend:8080',
            changeOrigin: true,
        })
    );
};
