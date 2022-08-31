"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const express_openid_connect_1 = require("express-openid-connect");
const express_session_1 = __importDefault(require("express-session"));
const register = (app) => {
    const oidcMiddleware = (0, express_openid_connect_1.auth)({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SESSION_SECRET,
    });
    // Configure Express to use authentication sessions
    app.use((0, express_session_1.default)({
        resave: true,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET
    }));
    app.locals.oidc = oidcMiddleware;
};
exports.register = register;
//# sourceMappingURL=authUtil.js.map