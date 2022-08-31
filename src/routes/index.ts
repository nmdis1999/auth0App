import express, { Request, Response } from "express";
import { requiresAuth } from "express-openid-connect";
// import  { checkJwt } from "../middleware/auth.middleware";
// import * as authUtil from "../middleware/authUtil"
export const register = (app: express.Application) => {

    /// const oidc = app.locals.oidcMiddleware;


    // app.use(checkJwt);
    app.get('/', (req: any, res: any, next) => {
        res.render('index', {
          title: 'Auth0 Webapp sample Nodejs',
          isAuthenticated: req.oidc.isAuthenticated()
        });
      });

    app.get("/callback", requiresAuth(), (req: express.Request, res: express.Response) => {
        res.redirect("/guitars");
    });

    app.get( "/logout", ( req: any, res ) => {
        req.logout();
        res.redirect( "/" );
    });

    app.get("/guitars", requiresAuth(), (req:any, res: any, next) => {
        res.render("guitars");
    });
};