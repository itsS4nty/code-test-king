"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringObject = {
    a: "343",
    c: "444",
    d: "344",
};
const unpredictable = {
    a: 22,
    c: {
        xcd: {
            ddffd: {
                xyz: [
                    {
                        a: "343",
                        c: "444",
                        d: "344",
                    },
                    {
                        x: "7889",
                        c: "blabla",
                        d: "344",
                    },
                ],
            },
        },
    },
};
// Function to find the first 'xyz' array containing the checkObject within the unpredictable object
const resolveXYZArray = (checkObject, unpredictable) => {
    // Check if the checkObject and unpredictable object are not null or undefined
    if (!checkObject || !unpredictable)
        return null;
    // Call findAllKeys to get all occurrences of the 'xyz' key within the unpredictable object
    let keys_values = findAllKeys(unpredictable);
    // Find the first 'xyz' array that contains the checkObject by comparing their JSON string representations
    return keys_values.find(x => JSON.stringify(checkObject) === JSON.stringify(x));
    // If you want to return all 'xyz' arrays containing the checkObject, use the filter method instead:
    // return keys.filter(x => JSON.stringify(checkObject) === JSON.stringify(x));
};
// Function to find all occurrences of the targetKey in the unpredictable object.
// By default, the targetKey is 'xyz', but it can be changed to search for other keys.
const findAllKeys = (obj, targetKey = 'xyz') => {
    // Initialize an array to store the results
    let results = [];
    // Iterate over the keys in the object
    for (const key in obj) {
        // If the current key matches the targetKey and its value is an array, add it to the results
        if (key === targetKey && Array.isArray(obj[key]))
            results.push(obj[key]);
        // If the current value is an object (and not an array), recursively search for the targetKey in the nested object
        else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
            const nestedResults = findAllKeys(obj[key], targetKey);
            // Concatenate the nested results with the main results array
            results = results.concat(nestedResults);
        }
        // If the current value is an array, iterate over its elements
        else if (Array.isArray(obj[key])) {
            const objKeyArray = obj[key];
            for (const item of objKeyArray) {
                // If the current element is an object, recursively search for the targetKey in the nested object
                if (typeof item === "object") {
                    const nestedResults = findAllKeys(item, targetKey);
                    // Concatenate the nested results with the main results array
                    results = results.concat(nestedResults);
                }
            }
        }
    }
    // Flatten the results array and return it
    return results.flat();
};
// Call the resolveXYZArray function with the stringObject and unpredictable object
let result = resolveXYZArray(stringObject, unpredictable);
console.log(result);
