import axios from 'axios'


let api = axios.create({
    baseURL:"https://api.themoviedb.org/3" 
})


const search = {
    movie: query => api.get(`/search/movie?api_key=2005b3a7fc676c3bd69383469a281eff&query=${encodeURIComponent(query)}`)
}

export default search