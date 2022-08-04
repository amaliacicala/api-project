import supertest from "supertest";

import { prismaMock } from "./lib/prisma/client.mock";

import app from "./app";

const request = supertest(app);

test("POST /planets", async () => {
    const planet = {
        name: "Uranus",
        diameter: 55,
        moons: 1,
    };

    const response = await request
        .post("/planets")
        .send(planet)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(planet);
});

test("GET /planets", async () => {
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
