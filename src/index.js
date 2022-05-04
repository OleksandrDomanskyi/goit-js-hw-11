import './sass/main.scss';
import apiServisePixabay from './js/apiServicePixabay';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import gallerycard from './templates/gallerycard';
import { scroll } from './js/scroll';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

loadMoreButton.classList.add('is-hidden');

const apiServicePixabay = new apiServisePixabay();

searchFormEl.addEventListener('submit', onSearchFormEl);
loadMoreButton.addEventListener('click', onloadMoreButton);

function onSearchFormEl(event) { 

    event.preventDefault();

    clearImages();
    loadMoreButton.classList.add('is-hidden');
    apiServicePixabay.query = event.currentTarget.searchQuery.value;

    if (event.currentTarget.searchQuery.value === '') {
        return Notiflix.Notify.failure('The search string cannot be empty.');
    }

    apiServicePixabay
        .fetchImages()
        .then(data => {

            appendImageMarcup(data);

            if (data.hits.length === 0) {
                return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            }

            loadMoreButton.classList.remove('is-hidden');

            scroll(galleryEl);

            return data.totalHits;
        })

        .then(onTotalPagesCount)    
        .catch(console.error());
        

    apiServicePixabay.resetPage();

};

function clearImages() {
    galleryEl.innerHTML = "";
}

function appendImageMarcup({ hits }) { 

    console.log(hits);

    galleryEl.insertAdjacentHTML("beforeend", gallerycard(hits));

    const gallery = new SimpleLightbox('.gallery a',
        {
        captionDelay: 250,    
        });

    gallery.refresh();
    
}

let totalPages = 1;

function onTotalPagesCount(totalHits, apiServicePixabay) {

    totalPages = Number(totalHits / apiServicePixabay);
    if(totalHits)
    { Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`) }

}

async function onloadMoreButton() { 

    try {

        const data = await apiServicePixabay.fetchImages();

        appendImageMarcup(data);
        onTotalPagesCount(data.totalHits);

    }

    catch (error) {
        
        loadMoreButton.classList.add('is-hidden');
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }

};
