import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const API_KEY = "38157746-35969d34d7ab2e6c4c682cf10";

const formSearch = document.querySelector('.flex-form');
const listGallery = document.querySelector('.gallery');
// const inputEl = document.querySelector("input")
const BASE_URL = 'https://pixabay.com/api/';



formSearch.addEventListener('submit', onSubmit);



function onSubmit(evt) {
  evt.preventDefault();
  console.dir(evt.currentTarget.elements.query.value)
    const input = evt.currentTarget.elements.query.value;
  

    inputSearch(input);
}

async function inputSearch(input) {
    const response = await axios.get(`${BASE_URL}`, {
        params: {
            key: API_KEY,
            q: `${input}`,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true
        }
    })
    
  .then(function (response) {
      
      const { hits,  totalHits} = response.data;
      
      createMarkup(hits);    
  })
  .catch(function (error) {

    console.log(error);
  })
}

async function createMarkup(data) {
    const card = data.map(obj => {
        return `  
    <a class = "gallery__link" href="${obj.largeImageURL}"><img class = "gallery__image" src="${obj.webformatURL}" alt="${obj.tags}" title=""/>
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
   
    listGallery.insertAdjacentHTML("beforeend", card)
    
    const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: "alt",
});
}

