const URL = "https://caligari-api.herokuapp.com/api/v1/features";
const featuresWrapper = document.querySelector(".tags__wrapper");

export const getFeatures = async () => {
  const response = await fetch(URL);
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

getFeatures();
