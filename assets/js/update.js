// Отримуємо елементи
const form = document.querySelector(".form");
const emailInput = document.querySelector(".form-input");
const modal = document.querySelector("#modal");
const closeBtn = document.querySelector(".modal-btn");
// Коли сторінка повністю завантажилася
// --- Підставляємо збережений email при завантаженні ---
document.addEventListener("DOMContentLoaded", () => {
  const savedEmail = localStorage.getItem("savedEmail");
  if (savedEmail) {
    // Затримка на кілька мілісекунд, щоб інпут точно існував у DOM
    setTimeout(() => {
      emailInput.value = savedEmail;
      console.log("✅ Email inserted after load:", emailInput.value);
    }, 100);
  }
});
// --- Функції ---
function openModal() {
  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
}
// --- Валідація емайлу ---

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// --- Додаємо контейнер для повідомлення про помилку ---

const errorMsg = document.createElement("span");
errorMsg.classList.add("error-message");
errorMsg.textContent = "Valid email required";
emailInput.parentElement.appendChild(errorMsg);

// --- Сабміт форми ---
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (validateEmail(email)) {
    // Якщо валідний email
    emailInput.classList.remove("error");
    errorMsg.classList.remove("visible");
    // Зберігаємо email у localStorage
    localStorage.setItem("savedEmail", email);

    // Показуємо модальне вікно

    document.querySelector(".text-span").textContent = email;
    openModal();
  } else {
    // Якщо невалідний
    emailInput.classList.add("error");
    errorMsg.classList.add("visible");
  }
});

// --- Закриття модалки ---
closeBtn.addEventListener("click", closeModal);
//закриття при кліку поза вікном
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
