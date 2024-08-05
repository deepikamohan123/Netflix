import axios from 'axios'
import {baseUrl} from './Constants/Constants'

const instance = axios.create({
   baseUrl:baseUrl
  });

  export default instance