/**
 * Mention auth0 blog asks you to import jwt from express-jwt
 * however, in newer version it  throws not-callable error
 * follow below code for proper result
 */
 import * as dotenv from "dotenv";

import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwksRsa from "jwks-rsa";

dotenv.config();

export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }) as GetVerificationKey,

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});