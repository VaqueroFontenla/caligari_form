const BASE_URL = "https://caligari-api.herokuapp.com/api/v1/";
const form = document.form;
const featuresWrapper = document.querySelector(".tags__wrapper");
const startsWrapper = document.querySelector(".rating");

const createStarRating = () => {
  const startsRating = [...Array(5).keys()];
  const stars = startsRating
    .map(
      (start) => `
    <input type="radio" id=${`start-${start}`} name="rating" value=${start} />
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

form.addEventListener("submit", (e) => {
  const name = form.name.value;
  const city = form.city.value;
  const description = form.description.value;
  const rating = form.rating.value;
  const features = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((feature) => feature.id);
  console.log({ name, city, features, description, rating });
  e.preventDefault();
});

createStarRating();
getFeatures();
