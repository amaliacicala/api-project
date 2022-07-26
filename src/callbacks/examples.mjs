import * as fs from "node:fs";

fs.readFile("file-1.txt", { encoding: "utf-8" }, function (error, file1Data) {
    if (error) {
        console.error(error);
        return;
    }

    console.log(file1Data);

    fs.readFile(
        "file-2.txt",
        { encoding: "utf-8" },
        function (error, file2Data) {
            if (error) {
                console.error(error);
                return;
            }

            console.log(file2Data);

            fs.readFile(
                "file-3.txt",
                { encoding: "utf-8" },
                function (error, file3Data) {
                    if (error) {
                        console.error(error);
                        return;
                    }

                    console.log(file3Data);
                }
            );
        }
    );
});
