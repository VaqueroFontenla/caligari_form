import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js'
import { firebaseConfig } from '../config.js'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 
export const apiClient = {
  get: async (firebaseCollection) => {
    const collectionReference = collection(db, firebaseCollection)
    const collectionSnapshot = await getDocs(collectionReference)
    const collectionData = collectionSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }))
    return collectionData
  }
}
