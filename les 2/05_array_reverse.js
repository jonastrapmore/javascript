// Array.prototype.reverse - draait de volgorde van elementen in de array om.
const getallen = [10, 20, 30, 40, 50];
console.log('Origineel: ', getallen);

const omgekeerd = getallen.reverse();
console.log('Reverse: ', omgekeerd);
getallen.reverse(); // De originele array wordt "in place" aangepast!
