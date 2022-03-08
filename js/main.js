const BASE_URL = "https://caligari-api.herokuapp.com/api/v1/";
const form = document.form;
const featuresWrapper = document.querySelector(".tags__wrapper");
const startsWrapper = document.querySelector(".rating");

const createStarRating = () => {
  const startsRating = [...Array(5).keys()];
  const stars = startsRating
    .map(
      (start) => `
    <input type="radio" id=${`start-${start}`} name="rating" value=${start}/>
    <label for=${`start-${start}`}></label>
  `
    )
    .join("");
  startsWrapper.innerHTML = stars;
};

const getFeatures = async () => {
  const response = await fetch(`${BASE_URL}features`);
  const features = await response.json();
  const tpl = features
    .map(
      (feature) => `
        <li>
          <input id=${feature.id} name=${feature.id} type="checkbox"/>
          <label class="tag" for=${feature.id}>${feature.name}</label>
        </li>
        `
    )
    .join("");
  featuresWrapper.innerHTML = tpl;
};

const resetValues = () => {};
const checkInputField = (field) => {
  const formField = document.getElementById(field);
  const alert = document.getElementById(`alert-${field}`);
  if (!formField.value) {
    formField.classList.add("error");
    alert.innerHTML = "Campo requerido";
    return false;
  }
  return true;
};
const checkInputGroupField = (field, value) => {
  const alert = document.getElementById(`alert-${field}`);
  if (!value.length) {
    alert.innerHTML = "Campo requerido";
    return false;
  }
  return true;
};

const validateForm = (name, city, rating, features) => {
  if (
    checkInputField(name.name) &&
    checkInputField(city.name) &&
    checkInputGroupField("rating", rating.value) &&
    checkInputGroupField("features", features)
  ) {
    return true;
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { name, city, rating, description } = form;
  const features = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((feature) => feature.id);
  if (validateForm(name, city, rating, features)) {
    console.log({
      name: name.value,
      city: city.value,
      features,
      description: description.value,
      rating: rating.value,
    });
  }
  e.preventDefault();
});

createStarRating();
getFeatures();
