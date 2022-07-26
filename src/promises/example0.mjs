// const someAsyncTask = new Promise(function (resolve, reject) {
//     setTimeout(() => resolve("This is some data"), 2000);
// });

// console.log(someAsyncTask);

// someAsyncTask.then(
//     function (value) {
//         console.log("value:", value);
//         console.log("someAsyncTask:", someAsyncTask);
//     },
//     function (reason) {
//         console.log("reason:", reason);
//         console.log("someAsyncTask:", someAsyncTask);
//     }
// );

const someAsyncTask = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error("Something went wrong")), 2000);
});

console.log(someAsyncTask);

someAsyncTask.then(
    function (value) {
        console.log("value:", value);
        console.log("someAsyncTask:", someAsyncTask);
    },
    function (reason) {
        console.log("reason:", reason);
        console.log("someAsyncTask:", someAsyncTask);
    }
);
