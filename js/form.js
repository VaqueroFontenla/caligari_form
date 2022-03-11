const URL = "http://localhost:3000/api/v1/inns";
const form = document.form;
const inn = form.name;
const city = form.city;
const description = form.description;
const rating = form.rating;
const startsWrapper = document.querySelector(".feedback");
const featuresWrapper = document.querySelector(".tags__wrapper");
const alert = document.getElementById("alert-confirm");
const alertClose = document.getElementById("alert-close");

const toggleConfirmAlert = () => alert.classList.toggle("alert-confirm");

const resetInput = (input) => {
  if (input.value) {
    const small = input.parentElement.querySelector("small");
    if (small) {
      small.innerText = "";
      input.parentElement.className = "form-control";
    }
  }
};

const resetRating = () => {
  if (rating.value) {
    const small = startsWrapper.nextElementSibling;
    if (small) {
      startsWrapper.className = "feedback";
      small.innerText = "";
    }
  }
};

const resetFeatures = () => {
  const features = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ];
  if (features.length) {
    const small = featuresWrapper.nextElementSibling;
    if (small) {
      featuresWrapper.className = "tags__wrapper";
      small.innerText = "";
    }
  }
};

const resetForm = () => {
  const successElements = document.querySelectorAll(".success");
  const alerts = document.querySelectorAll("small");
  [...successElements].forEach((element) =>
    element.classList.remove("success")
  );
  [...alerts].forEach((alert) => (alert.innerText = ""));
  form.reset();
};

const setErrorInput = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
};

const setSuccessInput = (input) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control success";
  if (small) {
    small.innerText = "";
  }
};

const setErrorElement = (element, className, message) => {
  element.className = className;
  const small = element.nextElementSibling;
  small.innerText = message;
};

const setSuccessElement = (element, className) => {
  element.className = className;
  const small = element.nextElementSibling;
  if (small) {
    small.innerText = "";
  }
};

const validateInputs = (features) => {
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

const submitForm = async (features) => {
  const data = {
    name: inn.value,
    city: city.value,
    features,
    description: description.value,
    rating: +rating.value,
  };
  console.log(data);
  try {
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

inn.addEventListener("change", () => resetInput(inn));
city.addEventListener("change", () => resetInput(city));
startsWrapper.addEventListener("click", () => resetRating());
featuresWrapper.addEventListener("click", () => resetFeatures());
alertClose.addEventListener("click", () => toggleConfirmAlert());
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const features = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((feature) => feature.id);
  validateInputs(features);
  const errors = document.querySelectorAll(".error");
  if (![...errors].length) {
    submitForm(features);
    toggleConfirmAlert();
    resetForm();
  }
});
