const API_URL = "https://caligari-api.herokuapp.com/api/v1";
const form = document.form;
const featuresWrapper = document.querySelector(".tags__wrapper");

const getFeatures = () => {
  fetch(`${API_URL}/features`)
    .then((response) => response.json())
    .then((features) => {
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
    });
};

form.addEventListener("submit", (e) => {
  const name = form.name.value;
  const city = form.city.value;
  const features = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((feature) => feature.id);
  console.log({ name, city, features });
  e.preventDefault();
});

getFeatures();
