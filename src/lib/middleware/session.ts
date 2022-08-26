import config from "../../config";
import session from "express-session";

export function initSessionMiddleware() {
    return session({
        secret: config.SESSION_SECRET, // what will be used to encrypt our session cookies
        resave: false,
        saveUninitialized: false,
    });
}
