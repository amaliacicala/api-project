import * as fs from "node:fs/promises";

fs.readFile("file-1.txt", { encoding: "utf-8" })
    .then((file1Data) => console.log("file1Data:", file1Data))
    .then(() => fs.readFile("file-2.txt", { encoding: "utf-8" }))
    .then((file2Data) => console.log("file2Data:", file2Data))
    .catch((error) => console.error(error));
