import { apiClient } from './firebase.js'
const featuresWrapper = document.querySelector(".tags__wrapper");

export const getFeatures = async () => {
  const features = await apiClient.get('features')
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
