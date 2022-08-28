import express from "express";
import "express-async-errors";

import { validationErrorMiddleware } from "./lib/middleware/validation";
import { initCorsMiddleware } from "./lib/middleware/cors";
import { initSessionMiddleware } from "./lib/middleware/session";
import { passport } from "./lib/middleware/passport";
import {
    notFoundMiddleware,
    initErrorMiddleware,
} from "./lib/middleware/error";

import planetsRoutes from "./routes/planets";
// import authRoutes from "./routes/auth";

const app = express();

app.use(initSessionMiddleware(app.get("env")));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/planets", planetsRoutes);
// app.use("/auth", authRoutes);

app.get("/auth/login", (request, response, next) => {
    if (
        typeof request.query.redirectTo !== "string" ||
        !request.query.redirectTo
    ) {
        response.status(400);
        return next("Missing redirectTo query string parameter");
    }

    request.session.redirectTo = request.query.redirectTo;

    response.redirect("/auth/github/login");
});

app.get(
    "/auth/github/login",
    passport.authenticate("github", {
        scope: ["user:email"],
    })
);

app.get(
    "/auth/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/auth/github/login",
        keepSessionInfo: true,
    }),
    (request, response) => {
        if (typeof request.session.redirectTo !== "string") {
            return response.status(500).end();
        }

        response.redirect(request.session.redirectTo);
    }
);

app.get("/auth/logout", (request, response, next) => {
    if (
        typeof request.query.redirectTo !== "string" ||
        !request.query.redirectTo
    ) {
        response.status(400);
        return next("Missing redirectTo query string parameter");
    }

    const redirectUrl = request.query.redirectTo;

    request.logout((error) => {
        if (error) {
            return next(error);
        }

        response.redirect(redirectUrl);
    });
});

app.use(notFoundMiddleware);

app.use(validationErrorMiddleware);
app.use(initErrorMiddleware(app.get("env")));

export default app;
