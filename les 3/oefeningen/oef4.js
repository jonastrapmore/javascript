const object1 = {
  a: 1,
  b: 2,
  c: 3,
};

const object2 = {
  b: 4,
  c: 5,
  d: 6,
};

function mergeObjects(object1, object2) {
    const keys1 = new Set(Object.keys(object1));
    const keys2 = new Set(Object.keys(object2));
    const intersection = new Set([...keys1].filter(key => keys2.has(key)));
    const result = {};
    for (const key of keys1.difference(intersection)) {
        result[key] = object1[key];
    }
    for (const key of keys2.difference(intersection)) {
        result[key] = object2[key];
    }
    for (const key of intersection) {
        const choice = prompt(`Key ${key} exists for both objects.\nCurrent values:\n1: ${object1[key]}\n2: ${object2[key]}\nWich object shall I use to set the value of the result [1/2]?`, '1');
        result[key] = choice === '1' ? object1[key] : object2[key];
    }
    return result;
}
const merged = mergeObjects(object1, object2);
console.log(merged);