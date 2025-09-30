
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "studio-2825472322-56ef3",
  "appId": "1:855558154389:web:39d71e08d8fff8a4e2939c",
  "apiKey": "AIzaSyCtsk8cYuS5KjsWQnLQ-1HAQ2xveEkFAUw",
  "authDomain": "studio-2825472322-56ef3.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "855558154389"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
