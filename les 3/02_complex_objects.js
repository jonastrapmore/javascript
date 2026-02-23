const alan = {
  name: {
    first: 'Alan',
    last: 'Turing',
  },
  life: {
    birth: 1912,
    death: 1954,
  },
  age() {
    return this.life.death - this.life.birth;
  },
  accomplishments: [
    'Turing Machine',
    'Enigma Codebreaker',
  ],
}

// Met puntnotatie kan je diepere properties uitlezen.
console.log(
  `${alan.name.first} ${alan.name.last} was born in ${alan.life.birth} and died in ${alan.life.death} at age ${alan.age()}.`
);

// Ook de array notatie kan gebruikt worden om diepere properties uit te lezen.
console.log(
  `${alan['name']['first']} ${alan['name']['last']} was born in ${alan['life']['birth']} and died in ${alan['life']['death']} at age ${alan['age']()}.`
);

// Of je kan beide notaties combineren.
console.log(
  `${alan.name['first']} ${alan['name'].last} was born in ${alan.life['birth']} and died in ${alan.life['death']} at age ${alan.age()}.`
);

