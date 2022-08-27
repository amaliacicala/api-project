import config from "../../config";
import session from "express-session";

export function initSessionMiddleware(appEnvironment: string) {
    const isProduction = appEnvironment === "production";

    return session({
        secret: config.SESSION_SECRET, // what will be used to encrypt our session cookies
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: isProduction,
        },
        proxy: isProduction,
    });
}
