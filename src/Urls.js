import {API_KEY,baseUrl} from './Constants/Constants'
export const originals =`${baseUrl}/discover/tv?api_key=${API_KEY}&with_networks=213`
export const actions =`${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=28`
export const trending =`${baseUrl}/trending/all/week?api_key=${API_KEY}&language=en-US`
export const comedy =`${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=35`
export const horror =`${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=27`
export const romance =`${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=10749`
export const documentaries =`${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=99`