"use strict";
let firstName = "Dylan";
let lastName = "Lopez";
//firstName = 33;
let v = 33;
v = "string";
Math.round(v);
let w = 1;
console.log(w)
w = "string"; // no error
w = {
    runANonExistentMethod: () => {
        console.log("I think therefore I am");
    }
};
//const names: readonly string[] = ["Dylan"];
//names.push("Jack"); // Error: Property 'push' does not exist on type 'readonly string[]'.
// try removing the readonly modifier and see if it works?
