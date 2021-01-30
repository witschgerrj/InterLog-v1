import * as firebase from 'firebase';
import 'firebase/firestore';
import firebase_config from './firebase_config';

const Firebase = firebase.initializeApp(firebase_config);
const db = firebase.firestore();
//firebase.analytics();

export const firestoreTimestamp = () => {
  return firebase.firestore.Timestamp.now().seconds;
};

export const getContacts = async () => {
  const snapshot = await db
    .collection('Users')
    .doc('WNJWWElZUACGPoSc8w6l')
    .collection('Contacts')
    .get();

  return snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
};

export const updateContact = (id, contact) => {
  db.collection('Users')
    .doc('WNJWWElZUACGPoSc8w6l')
    .collection('Contacts')
    .doc(id)
    .update({
      ...contact,
      last_updated: firestoreTimestamp(),
    });
};

export const createContact = (id, contact) => {
  db.collection('Users')
    .doc('WNJWWElZUACGPoSc8w6l')
    .collection('Contacts')
    .doc(id)
    .set({
      ...contact,
      last_updated: firestoreTimestamp(),
    });
};

export const mock_group_colors = [
  '#363636',
  '#FCFC57',
  '#FF5F5F',
  '#FF6CF4',
  '#DBDBDB',
  '#5CD9FF',
  '#5FFF71',
  '#9262FF',
];
