const van = 1;
const tot = 10;
let txt = '';
let i = van;


// Zelfde resultaat via de verschillende soorten herhalingen


// for lus
for (let i = van; i <= tot; i++) {
  txt += (txt === '') ? i : ', ' + i; // Shorthand if (ternary) structuur
  // 1, 2, 3, 4
}
console.log(`Resultaat van de for lus: ${txt}`);

// while lus
txt = '';
i = van;

while (i <= tot) {
  txt += (txt === '') ? i : ', ' + i;
  i++;
}
console.log(`Resultaat van de while lus: ${txt}`);

// do - while lus
txt = '';
i = van;

do {
  txt += (txt === '') ? i : ', ' + i;
  i++;
} while (i <= tot);
console.log(`Resultaat van de do - while lus: ${txt}`);