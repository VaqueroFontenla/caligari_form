const form = document.form;
const inn = form.name;
const city = form.city;
const description = form.description;
const rating = form.rating;
const features = [
  ...document.querySelectorAll('input[type="checkbox"]:checked'),
].map((feature) => feature.id);
const startsWrapper = document.querySelector(".feedback");
const featuresWrapper = document.querySelector(".tags__wrapper");

const setErrorInput = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
};

const setSuccessInput = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const setErrorElement = (element, className, message) => {
  element.className = className;
  const small = element.nextElementSibling;
  small.innerText = message;
};

const setSuccessElement = (element, className) => {
  return (element.className = className);
};

const validateInputs = () => {
  const nameValue = inn.value.trim();
  const cityValue = city.value.trim();
  const ratingValue = rating.value;

  nameValue === ""
    ? setErrorInput(inn, "Campo obligatorio")
    : setSuccessInput(inn);

  cityValue === ""
    ? setErrorInput(city, "Campo obligatorio")
    : setSuccessInput(city);

  setSuccessInput(description);

  !ratingValue
    ? setErrorElement(
        startsWrapper,
        "feedback error",
        "¡Mójate y valora tu bar Caligari!"
      )
    : setSuccessElement(startsWrapper, "feedback success");

  features.length > 0
    ? setSuccessElement(featuresWrapper, "tags__wrapper success")
    : setErrorElement(
        featuresWrapper,
        "tags__wrapper error",
        "Necesitamos al menos una etiqueta"
      );
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();

  console.log({
    name: inn.value,
    city: city.value,
    features,
    description: description.value,
    rating: +rating.value,
  });
});
