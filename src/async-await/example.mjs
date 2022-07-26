import * as fs from "node:fs/promises";

// ------- ASYNCHRONOUS FUNCTION THAT LOOKS SYNCHRONOUS

// async function outputFiles() {
//     try {
//         const file1Data = await fs.readFile("file-1.txt", {
//             encoding: "utf-8",
//         });
//         console.log("file1Data:", file1Data);

//         const file2Data = await fs.readFile("file-2.txt", {
//             encoding: "utf-8",
//         });
//         console.log("file2Data:", file2Data);

//         const file3Data = await fs.readFile("file-3.txt", {
//             encoding: "utf-8",
//         });
//         console.log("file3Data:", file3Data);
//     } catch (error) {
//         console.error(error);
//     }
// }

// outputFiles();

// ------- ASYNCHRONOUS FUNCTION THAT RUNS IN PARALLEL

// async function outputFilesTogether() {
//     try {
//         const data = await Promise.all([
//             fs.readFile("file-1.txt", { encoding: "utf-8" }),
//             fs.readFile("file-2.txt", { encoding: "utf-8" }),
//             fs.readFile("file-3.txt", { encoding: "utf-8" }),
//         ]);

//         console.log(data);
//     } catch (error) {
//         console.error(error);
//     }
// }

// outputFilesTogether();

// ------- TOP-LEVEL AWAIT

try {
    const data = await Promise.all([
        fs.readFile("file-1.txt", { encoding: "utf-8" }),
        fs.readFile("file-2.txt", { encoding: "utf-8" }),
        fs.readFile("file-3.txt", { encoding: "utf-8" }),
    ]);

    console.log(data);
} catch (error) {
    console.error(error);
}
