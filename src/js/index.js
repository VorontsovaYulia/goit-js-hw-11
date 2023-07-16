
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix, { Notify } from 'notiflix';

import { responseFun, totalHits, totalPage } from "./response";
import { createMarkup, listGallery } from "./markup";
import { infinityScroll } from "./infinityScroll";

export {lightbox, onScroll}

const formSearch = document.querySelector('.flex-form');

let page = 1;
const per_page = 40;
let totalPage = 0;
let totalHits = 0;
let inputQuery = "";

const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: "alt",
  });
  
formSearch.addEventListener("submit", onSubmit)

function onSubmit(evt) {
  page = 1;
  listGallery.innerHTML = "";
  evt.preventDefault();

  inputQuery = evt.currentTarget.elements.query.value;

  if (inputQuery === "") {
    Notify.failure("Please, input your query");
    listGallery.innerHTML = "";
    return;
  }
  responseFun(inputQuery, page, per_page)

}

function onScroll() {
  if (page === totalPage) {
     
      window.removeEventListener('scroll', onScroll);
      return Notify.info("We're sorry, but you've reached the end of search results.")
      
  }
  
  if (totalHits > per_page) {
    if (infinityScroll()) {
      page += 1;
     
      responseFun(inputQuery, page, per_page)
    }
   
  }
}
