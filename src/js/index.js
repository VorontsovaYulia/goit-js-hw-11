import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix, { Notify } from 'notiflix';

const formSearch = document.querySelector('.flex-form');
const listGallery = document.querySelector('.gallery');
const API_KEY = "38157746-35969d34d7ab2e6c4c682cf10";
const BASE_URL = 'https://pixabay.com/api/';

let page = 1;
let input;
let countHits = 0;
let totHits;
let per_page = 40;
let totalPage = 0;

formSearch.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  listGallery.innerHTML = "";
  totHits;
  countHits = 0;
  page = 1;

    input = evt.currentTarget.elements.query.value;
    inputSearch(input, page,per_page);
}

async function inputSearch(input, page, per_page) {
  
  window.addEventListener('scroll', onScroll)
  totalPage = Math.ceil(totHits / per_page)

  if (totalPage === page) {
    Notify.info(`We're sorry, but you've reached the end of search results.`);
    window.removeEventListener('scroll', onScroll)
    return;
  }
    const response = await axios.get(`${BASE_URL}`, {
        params: {
          key: API_KEY,
          q: `${input}`,
          image_type: "photo",
          orientation: "horizontal",
          safesearch: true,
          page: `${page}`,
          per_page: `${per_page}`
        }
    })
      
  .then(function (response) {
      
    const { hits, totalHits } = response.data;
    countHits += hits.length;
    totHits = totalHits;
    
    if (hits.length === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;

    } else if (page === 1) {
      totHits = totalHits;
      Notify.success(`Hooray! We found ${totalHits} images.`)
    } 

    createMarkup(hits);
        
  })
    .catch(function (error) {
      console.log(error);
    })
}      

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
   
  listGallery.insertAdjacentHTML("beforeend", card)
    
  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: "alt",
  });
  lightbox.refresh();
}

function onScroll() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement
  
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    page += 1;  
    inputSearch(input, page, per_page)
   }
  }