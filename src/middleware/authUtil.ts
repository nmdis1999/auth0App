import { auth, requiresAuth  } from 'express-openid-connect';
import session from "express-session";

export const register = (app: any) => {
       const oidcMiddleware =  auth({
            authRequired: false,
            auth0Logout: true,
            issuerBaseURL: process.env.ISSUER_BASE_URL,
            baseURL: process.env.BASE_URL,
            clientID: process.env.CLIENT_ID,
            secret: process.env.SESSION_SECRET,
        });


    // Configure Express to use authentication sessions
    app.use( session( {
        resave: true,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET
    } ) );

    app.locals.oidc = oidcMiddleware;
}


