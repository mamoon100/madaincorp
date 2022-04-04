let allData = [];
let filteredData = [];
let categorySet = new Set();
const categoryContainer = document.getElementById("category-container");
const listContainer = document.getElementById("list-container");
let selectedCategory = null;

const getData = async () => {
  const response = await fetch(
    'http://filltext.com/?rows=10&fname={firstName}&lname={lastName}&pretty=true&category=["category1","category2","category3"]'
  );
  allData = await response.json();
  displayData(allData);
  addCategory();
};

const displayData = (data) => {
  listContainer.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const { fname, lname, category } = data[i];
    categorySet.add(category);
    const div = document.createElement("div");
    div.classList.add("list-item");
    div.innerHTML = `<div class="image">${fname[0]} ${lname[0]}</div>
    <div class="name">${fname} ${lname}</div>
     <div class="category">${category}</div>`;
    listContainer.appendChild(div);
  }
};

const addCategory = () => {
  let arr = Array.from(categorySet);
  arr.sort();

  const div = document.createElement("div");
  div.classList.add("category");
  div.innerText = "all";
  div.addEventListener("click", () => {
    filterData(div, "all");
  });
  selectCategory(div);
  categoryContainer.appendChild(div);
  arr.forEach((category) => {
    const div = document.createElement("div");
    div.classList.add("category");
    div.innerText = category;
    div.addEventListener("click", () => {
      filterData(div, category);
    });
    categoryContainer.appendChild(div);
  });
};

const filterData = (div, category) => {
  selectCategory(div);
  if (category === "all") {
    filteredData = allData;
  } else {
    filteredData = allData.filter((data) => data.category === category);
  }
  displayData(filteredData);
};

const selectCategory = (div) => {
  if (selectedCategory) {
    selectedCategory.style.backgroundColor = "white";
    selectedCategory.style.color = "black";
  }
  div.style.backgroundColor = "lightblue";
  div.style.color = "white";
  selectedCategory = div;
};

// starting point
getData();
