import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKgQoSwSn0zi4Eks60pS6rLHG8GT5SCV4",
    authDomain: "netflix-79c72.firebaseapp.com",
    projectId: "netflix-79c72",
    storageBucket: "netflix-79c72.appspot.com",
    messagingSenderId: "1072324982739",
    appId: "1:1072324982739:web:28deeb1cd0b578f1b96126",
    measurementId: "G-43EPX23EJR"
  };

 const Firebase= initializeApp(firebaseConfig)
 export const db = getFirestore(Firebase)

 export {Firebase}