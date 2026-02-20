// Heel wat functies in javascript nemen een andere functie als parameter.
// De functie die aan zo'n parameter gekoppeld is wordt een callback functie genoemd.
function executeNTimes(n, callback) {
    for (let i = 0; i < n; i++) {
        // Roep de functie parameter op door ronde haken toe te voegen.
        callback();
    }
}

function printHello() {
    console.log("Hello");
}

// Functies kunnen doorgegeven worden via parameters.
// Als de ronder haken niet toegevoegd worden, wordt de functie niet uitgevoerd en wordt het een variabele.
executeNTimes(5, printHello);

// De tweede parameter is een anonieme functie die enkel bestaat binnen de scope van de executeNTimes functie, en dan
// enkel voor deze function call.
executeNTimes(5, function() {
    console.log("Anonieme functie");
})

