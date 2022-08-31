/**
 * Required External Modules
 */
 import * as dotenv from "dotenv";
 import express from "express";
 import path from "path";
 import cors from "cors";
 import helmet from "helmet";
 import * as routes from "./routes";
 import { auth } from 'express-openid-connect';

 // import * as authUtil from "./middleware/authUtil";

 dotenv.config(); // to load any environment variable from .env

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10); // create an instance of express application if Node.hs loaded environment variable PORT

const app = express();

/**
 *  App Configuration - mount the middleware functions from the packages we are importing
 */

app.use(helmet()); // set HTTP response headers
app.use(cors()); // enable CORS request
app.use(express.json()); // parse incoming JSON payload to populate request object with a new body

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

/**
 * Defines a route handle for default home page
 */

const config = {
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SESSION_SECRET,
};

// authUtil.register( app  );
// routes.register( app );

app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use((req: any, res, next) => {
    res.locals.user = req.oidc.user;
    next();
  });

routes.register(app);
/**
 * Server Activation -  creates express server
 */

app.listen(PORT, () => {
    /**
     * TSLint considers using console.log to be an issue for production code.
     *  The best solution is to replace uses of console.log with a logging framework such as winston.
     *  For now, we added "no-console": false under rules in tslint.json or
     * you can add following tslint diable comment above the following console.log
     */
    console.log(`Listening on port ${PORT}`);
});