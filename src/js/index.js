import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix, { Notify } from 'notiflix';

const API_KEY = "38157746-35969d34d7ab2e6c4c682cf10";
const BASE_URL = 'https://pixabay.com/api/';


const formSearch = document.querySelector('.flex-form');
const listGallery = document.querySelector('.gallery');


let page = 1;
let currentPage;
let input;
let countHits = 0;
let totHits;
let per_page = 40;

let totalPage = 0;

formSearch.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  listGallery.innerHTML = "";
  totHits = undefined;
  countHits = 0;
  page = 1;
  currentPage;
  totalPage = 0;
  countHits = 0;
  input = "";
  
  input = evt.currentTarget.elements.query.value;
  if (input === "") {
    Notify.info("Please, enter a request")
    return;
  }
  
  inputSearch(input, page, per_page, totHits,totalPage);
   
}

async function inputSearch(input, page, per_page) {
  
  window.addEventListener('scroll', onScroll);

  if (totHits < per_page) {
    window.removeEventListener('scroll', onScroll);
    Notify.info(`We're sorry, but you've reached the end of search results.`);
    return;

  }
  if (totalPage === page) {
    Notify.info(`We're sorry, but you've reached the end of search results.`);
    window.removeEventListener('scroll', onScroll);
  
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
    totalPage = Math.ceil(totalHits / per_page);
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
   
  listGallery.insertAdjacentHTML("beforeend", card);
    
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
    currentPage += 1;
    page += 1;

    inputSearch(input, page, per_page);
    
   }
 }
