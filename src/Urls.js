import {API_KEY,baseUrl} from './Constants/Constants'
export const originals =`${baseUrl}/discover/tv?api_key=${API_KEY}&with_networks=213`
export const actions =`${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=28`
export const trending =`${baseUrl}/trending/all/week?api_key=${API_KEY}&language=en-US`