import"./alert.css"
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

const alert = (message, type, delay = 4000) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alertd alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  document.getElementById("alert-container").append(wrapper);

  const btnClose = wrapper.querySelector(".btn-close");
  btnClose.addEventListener("click", () => {
    wrapper.remove();
  });

  setTimeout(() => {
    wrapper.style.display = "none";
  }, delay);
};

export default alert;