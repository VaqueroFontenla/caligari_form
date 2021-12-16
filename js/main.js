const form = document.form;

form.addEventListener("submit", (e) => {
  const name = form.name.value;
  const city = form.city.value;
  console.log({ name, city });
  e.preventDefault();
});
