"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Required External Modules
 */
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes = __importStar(require("./routes"));
const express_openid_connect_1 = require("express-openid-connect");
// import * as authUtil from "./middleware/authUtil";
dotenv.config(); // to load any environment variable from .env
/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10); // create an instance of express application if Node.hs loaded environment variable PORT
const app = (0, express_1.default)();
/**
 *  App Configuration - mount the middleware functions from the packages we are importing
 */
app.use((0, helmet_1.default)()); // set HTTP response headers
app.use((0, cors_1.default)()); // enable CORS request
app.use(express_1.default.json()); // parse incoming JSON payload to populate request object with a new body
// Configure Express to use EJS
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
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
app.use((0, express_openid_connect_1.auth)(config));
// Middleware to make the `user` object available for all views
app.use((req, res, next) => {
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
//# sourceMappingURL=index.js.map