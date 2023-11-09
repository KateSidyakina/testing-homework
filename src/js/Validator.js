const paymentSystemRules = {
  visa: "4",
  mastercard: "5",
  mir: "2",
};

const messages = {
  valid: "Card is valid",
  invalid: "Card is invalid",
};

export class Validator {
  constructor(element) {
    if (!element) {
      throw new Error("element is not defined");
    }
    this.element = element;
    this.isValid = "invalid";
    this.paymentSystem = "visa";
    this.registerEvent();
  }

  validate(cardNumber, paymentSystem) {
    cardNumber = cardNumber.replace(/\s/g, "");

    if (!/^\d+$/.test(cardNumber)) {
      return "invalid";
    }

    let sum = 0;
    let isSecondDigit = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (isSecondDigit) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isSecondDigit = !isSecondDigit;
    }

    if (sum % 10 !== 0) {
      return "invalid";
    }

    if (cardNumber.startsWith(paymentSystemRules[paymentSystem])) {
      return "valid";
    } else {
      return "invalid";
    }
  }

  registerEvent() {
    const form = document.querySelector(this.element);
    const input = form.querySelector(".input");
    const message = form.querySelector("p");

    const cardsWrapper = document.querySelector(".cards-wrapper");
    const images = Array.from(document.querySelectorAll(".cards-wrapper__img"));
    cardsWrapper.addEventListener("click", (event) => {
      const clickedImage = event.target.closest(".cards-wrapper__img");

      if (clickedImage && images.includes(clickedImage)) {
        images.forEach((image) => image.classList.remove("active"));
        clickedImage.classList.add("active");
        this.paymentSystem = clickedImage.dataset.paymentSystem;
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (
        message.classList.contains("valid") ||
        message.classList.contains("invalid")
      ) {
        message.removeAttribute("class");
      }

      this.isValid = this.validate(input.value, this.paymentSystem);

      message.textContent = messages[this.isValid];
      message.classList.add(this.isValid);
    });

    input.addEventListener("input", () => {
      message.textContent = "";
    });
  }
}
