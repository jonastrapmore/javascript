// Klassieke functie
function foo() {
  return 'Hello Foo'
}

// Arrow functie op één lijn.
// Geen return nodig, een one-line array functie geeft het resultaat automatisch terug.
const bar = () => 'Hello Bar'

// Arrow functie met meerdere statements.
const baz = () => {
  const message = 'Hello Baz'
  // Een multi-line arrow functie heeft een return statement nodig (als je iets wilt teruggeven).
  return message
}

// Arrow functie (met één parameter).
// Je moet geen haken plaatsen rond de parameter als er maar één parameter is.
const qux = message => {
  console.log(`My message is: ${message}`)
};

const message1 = bar();
// De tekst komt in het argument (parameter) "message" van de qux functie.
qux(message1);

// Arrow functie met twee parameters.
// Je moet verplicht haken plaatsen rond de parameters als er meer dan één parameter is.
const quux = (message, times) => {
  for (let i = 0; i < times; i++) {
    console.log(`My message is: ${message}`)
  }
};

const message2 = baz()
quux(message2, 3);