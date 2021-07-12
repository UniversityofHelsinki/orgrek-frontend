const ORGREK_BACKEND_SERVICE = process.env.REACT_APP_ORGREK_BACKEND_SERVICE;

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: ORGREK_BACKEND_SERVICE,
            changeOrigin: true,
        })
    );
};
