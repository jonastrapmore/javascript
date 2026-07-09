let students = [];
const list = document.getElementById("student-list");
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
  const result = await fetch("https://tm-statweb.be/students.php");
  students = await result.json();
  //   console.log(students);
}

function createStudentItem(student) {
  const item = document.createElement("li");
  item.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center",
  );

  const name = document.createElement("span");
  name.textContent = student.name + " / " + student.level;
  item.appendChild(name);

  const removeButton = document.createElement("button");
  removeButton.classList.add("btn", "btn-danger", "btn-sm");
  removeButton.textContent = "Remove";
  item.appendChild(removeButton);

  removeButton.addEventListener("click", () => {
    list.removeChild(item);
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

  list.innerHTML = "";

  filteredStudents.forEach((student) => {
    const item = createStudentItem(student);
    list.appendChild(item);
  });
}
