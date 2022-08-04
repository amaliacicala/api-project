import express from "express";
import "express-async-errors";

import prisma from "./lib/prisma/client";

import {
    validate,
    validationErrorMiddleware,
    planetSchema,
    PlanetData,
} from "./lib/validation";

const app = express();

app.use(express.json());

// GET /planets - Retrieve all planets
app.get("/planets", async (request, response) => {
    const planets = await prisma.planet.findMany();

    response.json(planets);
});

// POST /planets - Create a new planet
app.post(
    "/planets",
    validate({ body: planetSchema }),
    async (request, response) => {
        const planet: PlanetData = request.body;

        response.status(201).json(planet);
    }
);

app.use(validationErrorMiddleware);

export default app;

// // GET /planets - Retrieve all planets
// app.get("/planets", (request, response) => {});

// // GET /planets/:id - Retrieve a specific planet
// app.get("/planets/:id", (request, response) => {});

// // POST /planets - Create a new planet
// app.post("/planets", (request, response) => {});

// // PUT /planets/:id - Replace an existing planet
// app.put("/planets/:id", (request, response) => {});

// // DELETE /planets/:id - Delete a planet
// app.delete("/planets/:id", (request, response) => {});

// // POST /planets/:id/photo - Add a photo for the planet
// app.post("/planets/:id/photo", (request, response) => {});
