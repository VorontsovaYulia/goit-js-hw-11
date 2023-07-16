export { createMarkup, listGallery }
import { lightbox } from ".";

const listGallery = document.querySelector('.gallery');

function createMarkup(data) {
    const card = data.map(obj => {
        return `  
  <a class = "gallery__link" href="${obj.largeImageURL}">
  <img class = "gallery__image" src="${obj.webformatURL}" alt="${obj.tags}" title=""/>
  <div class="photo-card gallery__item">
    <div class="info">
     <p class="info-item">
      <b>Likes: ${obj.likes}</b>
     </p>
     <p class="info-item">
      <b>Views: ${obj.views}</b>
     </p>
     <p class="info-item">
      <b>Comments: ${obj.comments}</b>
     </p>
     <p class="info-item">
      <b>Downloads: ${obj.downloads}</b>
     </p>
   </div>
 </div>
 </a>`
    }).join("")

    listGallery.insertAdjacentHTML("beforeend", card);

    lightbox.refresh();
}