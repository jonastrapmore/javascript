let students = [];
const result = document.getElementById("result");
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
  renderStudents();
});

searchInput.addEventListener("dblclick", () => {
  searchInput.value = "";
  renderStudents();
});

fetchStudents().then(() => {
  renderStudents();
});

async function fetchStudents() {
  const result = await fetch("https://tm-statweb.be/students.php", {
    method: "POST",
  });
  students = await result.json();
  //   console.log(students);
}

function createStudentItem(student) {
  const item = document.createElement("div");
  item.classList.add("col");

  const divCard = document.createElement("div");
  divCard.classList.add("card", "mb-3");
  item.appendChild(divCard);

  const img = document.createElement("img");
  img.src = student.avatar;
  img.classList.add("card-img-top");
  divCard.appendChild(img);

  const divBody = document.createElement("div");
  divBody.classList.add("card-body");
  divCard.appendChild(divBody);

  const h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.textContent = student.name;
  divBody.appendChild(h5);

  const p = document.createElement("p");
  p.classList.add("card-text");
  p.textContent = `Level: ${student.level}`;
  divBody.appendChild(p);

  const removeButton = document.createElement("button");
  removeButton.classList.add("btn", "btn-danger", "btn-sm");
  removeButton.textContent = "Remove";
  divBody.appendChild(removeButton);

  removeButton.addEventListener("click", () => {
    item.remove();
  });

  return item;
}

function renderStudents() {
  const searchValue = searchInput.value.toLowerCase();
  const filteredStudents = students.filter(
    (stud) =>
      stud.name.toLowerCase().includes(searchValue) ||
      stud.level.toLowerCase().includes(searchValue),
  );

  result.innerHTML = "";

  filteredStudents.forEach((student) => {
    const item = createStudentItem(student);
    result.appendChild(item);
  });
}
