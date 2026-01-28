"use strict";

const destination = document.getElementById("destination");
const persons = document.getElementById("persons");
const returnTicket = document.getElementById("returnTicket");
const budgetInput = document.getElementById("budget");
const finalPrice = document.getElementById("finalPriceDisplay");
const calculateBtn = document.getElementById("calculateBtn");
const textArea = document.getElementById("textArea");
const bookingForm = document.getElementById("bookingForm");

const classRadios = document.querySelectorAll('input[name="classCategory"]');

/* ===== Prices begining ===== */

const DESTINATION_PRICES = {
  praha: 500,
  frankfurt: 3000,
  newYork: 15000,
  sydney: 30000,
};

const CLASS_MULTIPLIERS = {
  economy: 1,
  business: 1.25,
  royal: 1.5,
};

/* ===== Prices End ===== */

function getSelectedClass() {
  return document.querySelector('input[name="classCategory"]:checked').id;
}

function calculatePrice() {
  const selectedDestination = destination.value;

  if (!DESTINATION_PRICES[selectedDestination]) return 0;

  const basePrice = DESTINATION_PRICES[selectedDestination];
  const count = Number(persons.value);

  let price = basePrice * count;

  if (returnTicket.checked) {
    price *= 2;
  }

  const selectedClass = getSelectedClass();
  price *= CLASS_MULTIPLIERS[selectedClass];

  return Math.round(price);
}

function renderPrice(price) {
  finalPrice.classList.remove("text-success", "text-danger");

  if (price === 0) {
    finalPrice.textContent = "Select destination";
    return;
  }

  finalPrice.textContent = `Total: ${price} CZK`;
  finalPrice.classList.add("text-success");
}

function checkBudget(price) {
  const budget = Number(budgetInput.value);

  if (!budgetInput.value || budget <= 0) {
    return;
  }
  if (price <= budget) {
    finalPrice.textContent += ` (Within your budget)`;
    finalPrice.classList.replace("text-danger", "text-success");
  } else {
    finalPrice.textContent = `Total ${price.toLocaleString()} CZK. You are exceeding your budget ${budget.toLocaleString()} CZK.`;
    finalPrice.classList.replace("text-success", "text-danger");
  }
}

function update() {
  const price = calculatePrice();
  renderPrice(price);
  checkBudget(price);
}
const inputs = [
  destination,
  persons,
  returnTicket,
  budgetInput,
  ...classRadios,
];

bookingForm.addEventListener("submit", (e) => e.preventDefault());

calculateBtn.addEventListener("click", update);

finalPrice.textContent = "";

const forbiddenChars = /[?{}<>#§$%^&*]/g;
textArea.addEventListener("input", function () {
  const start = this.selectionStart;
  const end = this.selectionEnd;

  if (forbiddenChars.test(this.value)) {
    this.value = this.value.replace(forbiddenChars, "");
    this.setSelectionRange(start - 1, end - 1);
  }
});
