import supertest from "supertest";

import { prismaMock } from "./lib/prisma/client.mock";

import app from "./app";

const request = supertest(app);

// GET /planets - Tests for retrieving all planets
describe("GET /planets", () => {
    test("Valid request", async () => {
        const planets = [
            {
                id: 2,
                name: "Venus",
                description: null,
                diameter: 2232,
                moons: 2,
                createdAt: "2022-08-03T08:59:56.849Z",
                updatedAt: "2022-08-03T08:59:45.438Z",
            },
            {
                id: 1,
                name: "Mercury",
                description: null,
                diameter: 1234,
                moons: 3,
                createdAt: "2022-08-03T08:59:29.566Z",
                updatedAt: "2022-08-03T08:59:56.850Z",
            },
            {
                id: 3,
                name: "Mars",
                description: null,
                diameter: 232,
                moons: 2,
                createdAt: "2022-08-03T18:57:53.810Z",
                updatedAt: "2022-08-03T18:57:42.947Z",
            },
        ];

        // @ts-ignore
        prismaMock.planet.findMany.mockResolvedValue(planets);

        const response = await request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planets);
    });
});

// GET /planets/:id - Tests for retrieving a specific planet
describe("GET /planet/:id", () => {
    test("Valid request", async () => {
        const planet = [
            {
                id: 1,
                name: "Mercury",
                description: null,
                diameter: 1234,
                moons: 3,
                createdAt: "2022-08-03T08:59:29.566Z",
                updatedAt: "2022-08-03T08:59:56.850Z",
            },
        ];

        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(planet);

        const response = await request
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet);
    });

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null);

        const response = await request
            .get("/planets/23")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot GET /planets/23");
    });

    test("Invalid planet ID", async () => {
        const response = await request
            .get("/planets/asd")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot GET /planets/asd");
    });
});

// POST /planets - Tests for creating a new planet
describe("POST /planets", () => {
    test("Valid request", async () => {
        const planet = {
            id: 4,
            name: "Uranus",
            description: null,
            diameter: 55,
            moons: 1,
            createdAt: "2022-08-04T17:46:28.659Z",
            updatedAt: "2022-08-04T17:46:28.668Z",
        };

        // @ts-ignore
        prismaMock.planet.create.mockResolvedValue(planet);

        const response = await request
            .post("/planets")
            .send({
                name: "Uranus",
                diameter: 55,
                moons: 1,
            })
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet = {
            diameter: 55,
            moons: 1,
        };

        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});

// PUT /planets/:id - Tests for replacing an existing planet
describe("PUT /planets/:id", () => {
    test("Valid request", async () => {
        const planet = {
            id: 5,
            name: "Uranus",
            description: "Lovely planet",
            diameter: 55,
            moons: 1,
            createdAt: "2022-08-04T17:46:28.659Z",
            updatedAt: "2022-08-04T17:46:28.668Z",
        };

        // @ts-ignore
        prismaMock.planet.update.mockResolvedValue(planet);

        const response = await request
            .put("/planets/5")
            .send({
                name: "Uranus",
                description: "Lovely planet",
                diameter: 55,
                moons: 1,
            })
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet = {
            diameter: 55,
            moons: 1,
        };

        const response = await request
            .put("/planets/23")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error("Error"));

        const response = await request
            .put("/planets/23")
            .send({
                name: "Uranus",
                description: "Lovely planet",
                diameter: 55,
                moons: 1,
            })
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot PUT /planets/23");
    });

    test("Invalid planet ID", async () => {
        const response = await request
            .put("/planets/asd")
            .send({
                name: "Uranus",
                description: "Lovely planet",
                diameter: 55,
                moons: 1,
            })
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot PUT /planets/asd");
    });
});

// DELETE /planets/:id - Tests for deleting a planet
describe("DELETE /planet/:id", () => {
    test("Valid request", async () => {
        const response = await request.delete("/planets/1").expect(204);

        expect(response.text).toEqual("");
    });

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.delete.mockRejectedValue(new Error("Error"));

        const response = await request
            .delete("/planets/23")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot DELETE /planets/23");
    });

    test("Invalid planet ID", async () => {
        const response = await request
            .delete("/planets/asd")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot DELETE /planets/asd");
    });
});
