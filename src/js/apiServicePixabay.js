import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '27168820-f15fc1954e471e2ff7d31a8fb';

export default class apiServisePixabay {

    constructor() {

        this.options = {
            params: {
                key: API_KEY,
                q: '',
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: 1,
                per_page: 40,
            },
        };
    };

    async fetchImages() {

        const response = await axios.get(axios.defaults.baseURL, this.options);

        this.incrementPage();

        return response.data;
    };

    incrementPage() {
        this.options.params.page += 1;
    };

    resetPage() {
        this.options.params.page = 1;
    };  

    get query() {
        return this.options.params.q;
    };

    set query(newQuery) {
        this.options.params.q = newQuery;
    };

};