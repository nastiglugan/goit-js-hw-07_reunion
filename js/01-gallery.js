import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

const markup = galleryItems
  .map(
    ({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  )
  .join("");

gallery.insertAdjacentHTML("beforeend", markup);

gallery.addEventListener("click", onClick);

let instance;

function onClick(event) {
  event.preventDefault();
  let { target } = event;

  if (target.nodeName !== "IMG") {
    return;
  }

  instance = basicLightbox.create(
    `<img src="${target.dataset.source}" alt="${target.description}" width="800" height="600">`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", onModalClose);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", onModalClose);
      },
    }
  );

  instance.show();
}

function onModalClose(event) {
  if (event.code === "Escape") {
    instance.close();
  }
}
