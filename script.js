const createUserBtn = document.querySelector("#createUserBtn");
const modal = document.querySelector("#modal");
const form = document.querySelector("#userForm");
const closeBtn = document.querySelector("#closeBtn");
const modalTitle = document.querySelector("#modalTitle");
const submitBtn = document.querySelector("#submitBtn");
const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const imageInput = document.querySelector("#imageInput");
const userContainer = document.querySelector("#userContainer");
const userCount = document.querySelector("#userCount");

let usersArr = JSON.parse(localStorage.getItem("usersArr")) || [];
let isUpdated = false;
let updateOfUser = null;

// A plain gray square, used when the user has no image
const defaultImg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23334155'/%3E%3C/svg%3E";

const closeModal = () => {
  modal.classList.remove("open");
  form.reset();
  isUpdated = false;
  updateOfUser = null;
};

const deleteUser = (index) => {
  usersArr.splice(index, 1);
  localStorage.setItem("usersArr", JSON.stringify(usersArr));
  renderUi();
};

const updateUser = (index) => {
  modal.classList.add("open");
  modalTitle.textContent = "Update Profile";
  submitBtn.textContent = "Update";
  isUpdated = true;
  updateOfUser = index;

  let user = usersArr[index];
  nameInput.value = user.name;
  emailInput.value = user.email;
  imageInput.value = user.imageUrl;
};

const renderUi = () => {
  userContainer.innerHTML = "";
  userCount.textContent = usersArr.length + " users";

  usersArr.forEach((value, index) => {
    userContainer.innerHTML += `
      <div class="user-card">
        <img src="${value.imageUrl || defaultImg}" alt="UserProfile">
        <p class="user-name">${value.name}</p>
        <p class="user-email">${value.email}</p>
        <div class="card-btns">
          <button class="btn btn-update" onclick="updateUser(${index})">Update</button>
          <button class="btn btn-delete" onclick="deleteUser(${index})">Delete</button>
        </div>
      </div>`;
  });
};

createUserBtn.addEventListener("click", () => {
  modal.classList.add("open");
  modalTitle.textContent = "Create Profile";
  submitBtn.textContent = "Create";
});

closeBtn.addEventListener("click", closeModal);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let name = nameInput.value;
  let email = emailInput.value;
  let imageUrl = imageInput.value;
  let userObj = { name, email, imageUrl };

  if (isUpdated) {
    usersArr[updateOfUser] = userObj;
  } else {
    usersArr.push(userObj);
  }

  localStorage.setItem("usersArr", JSON.stringify(usersArr));
  renderUi();
  closeModal();
});

renderUi();