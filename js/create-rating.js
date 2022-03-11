const startsWrapper = document.querySelector(".rating");

export const createStarRating = () => {
  const startsRating = [...Array(5).keys()];
  const stars = startsRating
    .map(
      (start) => `
    <input type="radio" id=${`start-${start}`} name="rating" value=${start}>
    <label for=${`start-${start}`}></label>
  `
    )
    .join("");
  startsWrapper.innerHTML = stars;
};

createStarRating();
