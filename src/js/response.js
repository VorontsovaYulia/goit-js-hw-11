import axios from "axios";
import Notiflix, { Notify } from 'notiflix';
import { onScroll } from ".";
import { createMarkup } from "./markup";
export { responseFun, totalHits, totalPage }


const API_KEY = "38157746-35969d34d7ab2e6c4c682cf10";
const BASE_URL = 'https://pixabay.com/api/';

async function responseFun(inputQuery, page, per_page) {
    
    return await axios.get(`${BASE_URL}`, {
        params: {
            key: API_KEY,
            q: `${inputQuery}`,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page: `${page}`,
            per_page: `${per_page}`
        }
    
    })

    .then(response => {
        const data = response.data.hits;
        totalHits = response.data.totalHits;
        totalPage = Math.ceil(totalHits / per_page);
        
        window.addEventListener('scroll', onScroll);

            if (!data.length) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                listGallery.innerHTML = "";
                return;
            }
            if (page === 1) {
                Notify.success(`Hooray! We found ${totalHits} images.`)
            }
        
            createMarkup(data);
        })
    .catch(err => console.log(err))

}