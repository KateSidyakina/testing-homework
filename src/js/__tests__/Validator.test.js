import { Validator } from "../Validator";

describe("Validator", () => {
  let validator;

  beforeEach(() => {
    document.body.innerHTML =
      "<form class='form'><div class='cards-wrapper'><img class='cards-wrapper__img active' data-payment-system='visa' src='./img/visa.svg' alt='' width='50'/><img class='cards-wrapper__img' data-payment-system='mastercard' src='./img/mastercard.svg' alt='' width='50'/><img class='cards-wrapper__img' data-payment-system='mir' src='./img/mir.svg' alt='' width='50'/></div><div class='form__container'><input class='input' type='text' required placeholder='Enter card number'/><button class='button'>Click to Validate</button><p></p></div></form>";

    validator = new Validator(".form");
  });

  test("should throw an error if element is not defined", () => {
    expect(() => new Validator()).toThrow("element is not defined");
  });

  test("should validate a valid card number", () => {
    const result = validator.validate("4485644603933178", "visa");
    expect(result).toBe("valid");
  });

  test("should validate an invalid card number", () => {
    const result = validator.validate("1234", "visa");
    expect(result).toBe("invalid");
  });

  test("should handle form submission and update message", () => {
    const form = document.querySelector(".form");
    const input = form.querySelector(".input");
    const message = form.querySelector("p");

    input.value = "4111111111111111";
    form.dispatchEvent(new Event("submit"));

    expect(message.textContent).toBe("Card is valid");
    expect(message.classList.contains("valid")).toBe(true);
  });

  test("should handle form submission with invalid card number and update message", () => {
    const form = document.querySelector(".form");
    const input = form.querySelector(".input");
    const message = form.querySelector("p");

    input.value = "1234";
    form.dispatchEvent(new Event("submit"));

    expect(message.textContent).toBe("Card is invalid");
    expect(message.classList.contains("invalid")).toBe(true);
  });
});
