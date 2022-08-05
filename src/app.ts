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

// GET /planets/:id - Retrieve a specific planet
app.get("/planets/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);

    const planet = await prisma.planet.findUnique({
        where: { id: planetId },
    });

    if (!planet) {
        response.status(404);
        return next(`Cannot GET /planets/${planetId}`);
    }

    response.json(planet);
});

// POST /planets - Create a new planet
app.post(
    "/planets",
    validate({ body: planetSchema }),
    async (request, response) => {
        const planetData: PlanetData = request.body;

        const planet = await prisma.planet.create({
            data: planetData,
        });

        response.status(201).json(planet);
    }
);

// PUT /planets/:id - Replace an existing planet
app.put(
    "/planets/:id(\\d+)",
    validate({ body: planetSchema }),
    async (request, response, next) => {
        const planetId = Number(request.params.id);
        const planetData: PlanetData = request.body;

        try {
            const planet = await prisma.planet.update({
                where: { id: planetId },
                data: planetData,
            });

            response.status(200).json(planet);
        } catch (error) {
            response.status(404);
            next(`Cannot PUT /planets/${planetId}`);
        }
    }
);

// DELETE /planets/:id - Delete a planet
app.delete("/planets/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);

    try {
        await prisma.planet.delete({
            where: { id: planetId },
        });

        response.status(204).end();
    } catch (error) {
        response.status(404);
        next(`Cannot DELETE /planets/${planetId}`);
    }
});

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
