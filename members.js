async function loadMembers() {
// Use your Render backend link here
const res = await fetch("[https://two3-553c.onrender.com/members](https://two3-553c.onrender.com/members)");
const members = await res.json();
console.log(members);

}

loadMembers();

const search = document.getElementById("search");
const roleFilter = document.getElementById("role-filter");
const skillFilter = document.getElementById("skill-filter");
let cards = document.querySelectorAll(".card");
const dropdown = document.getElementById("filter-dropdown");
const filterBtn = document.getElementById("filter-btn");
const noResults = document.getElementById("no-results");
const themeBtn = document.getElementById("theme-toggle");

filterBtn.addEventListener("click", () => {
dropdown.classList.toggle("hidden");
});

function applyFilters() {
const searchValue = search.value.toLowerCase();
const selectedRole = roleFilter.value.toLowerCase();
const selectedSkill = skillFilter.value.toLowerCase();

let visibleCount = 0;

cards.forEach(card => {
const name = card.dataset.name.toLowerCase();
const role = card.dataset.role.toLowerCase();
const skills = card.dataset.skills.toLowerCase();

```
const matchesSearch =
  name.includes(searchValue) || skills.includes(searchValue);

const matchesRole =
  selectedRole === "" || role === selectedRole;

const matchesSkill =
  selectedSkill === "" || skills.includes(selectedSkill);

if (matchesSearch && matchesRole && matchesSkill) {
  card.style.display = "block";
  visibleCount++;
} else {
  card.style.display = "none";
}
```

});

noResults.style.display = visibleCount === 0 ? "block" : "none";
}

search.addEventListener("keyup", applyFilters);
roleFilter.addEventListener("change", applyFilters);
skillFilter.addEventListener("change", applyFilters);

themeBtn.addEventListener("click", () => {
document.body.classList.toggle("light");

if (document.body.classList.contains("light")) {
themeBtn.innerText = "Dark Mode";
localStorage.setItem("membersTheme", "light");
} else {
themeBtn.innerText = "Light Mode";
localStorage.setItem("membersTheme", "dark");
}
});

window.onload = () => {
const savedTheme = localStorage.getItem("membersTheme");

if (savedTheme === "light") {
document.body.classList.add("light");
themeBtn.innerText = "Dark Mode";
} else {
themeBtn.innerText = "Light Mode";
}
};
