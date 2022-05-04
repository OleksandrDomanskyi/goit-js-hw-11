export function scroll (galleryEl) {
    const cardHeight = galleryEl.firstElementChild.getBoundingClientRect().height
    window.scrollBy({
        left: 0, 
        top: cardHeight * 4, 
        behavior: 'smooth'
    })
}