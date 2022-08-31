"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const express_openid_connect_1 = require("express-openid-connect");
// import  { checkJwt } from "../middleware/auth.middleware";
// import * as authUtil from "../middleware/authUtil"
const register = (app) => {
    /// const oidc = app.locals.oidcMiddleware;
    // app.use(checkJwt);
    app.get('/', (req, res, next) => {
        res.render('index', {
            title: 'Auth0 Webapp sample Nodejs',
            isAuthenticated: req.oidc.isAuthenticated()
        });
    });
    app.get("/callback", (0, express_openid_connect_1.requiresAuth)(), (req, res) => {
        res.redirect("/guitars");
    });
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
    app.get("/guitars", (0, express_openid_connect_1.requiresAuth)(), (req, res, next) => {
        res.render("guitars");
    });
};
exports.register = register;
//# sourceMappingURL=index.js.map