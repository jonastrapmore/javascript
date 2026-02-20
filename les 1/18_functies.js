// Functie zonder argument
function toonBoodschap() {
  console.log("Hallo iedereen!");
}

// Werken met een optionele parameter, elke optionele parameter moet een defaultwaarde hebben en achteraan staan.z
function toonBoodschapVan(van, boodschap = "geen tweede parameter gegeven") {
  console.log(van + ": " + boodschap);
}

// Met 2 verplichte argumenten.
// Als een parameter niet meegegeven wordt, krijgt deze de waarde undefined.
function toonBoodschapVanWat(van, boodschap) {
  console.log(van + ": " + boodschap);
}

// Gewone functieaanroep zonder parameter
toonBoodschap();

//met slechts één parameter
toonBoodschapVan("Luc"); // boodschap parameter niet meegegeven
// of toch met twee parameters
toonBoodschapVan("Luc", "Toch een tweede ingegeven."); // wel een tweede parameter gegeven

// met twee parameters
toonBoodschapVanWat("Luc", "Hallo!"); // Beide parameters zijn verplicht
toonBoodschapVanWat("Luc Te weinig"); // boodschap: undefined
toonBoodschapVanWat(); // Geen parameters meegegeven, beide parameters zijn undefined