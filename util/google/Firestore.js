import * as firebase from 'firebase';
import 'firebase/firestore';
import firebase_config from './firebase_config';

const Firebase = firebase.initializeApp(firebase_config);
const db = firebase.firestore();
//firebase.analytics();

export const FB_timestamp = () => {
  return firebase.firestore.Timestamp.now().seconds;
};

export const FB_getContactArchive = async () => {
  const snapshot = await db
    .collection('Users')
    .doc('WNJWWElZUACGPoSc8w6l')
    .collection('ContactArchive')
    .get();

  return snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
};

export const FB_archiveContact = (id, contact) => {
  db.collection('Users')
    .doc('WNJWWElZUACGPoSc8w6l')
    .collection('ContactArchive')
    .doc(id)
    .set({
      ...contact,
      last_updated: FB_timestamp(),
    });
};

export const FB_deleteContactFromArchive = (id) => {
  db.collection('Users')
    .doc('WNJWWElZUACGPoSc8w6l')
    .collection('ContactArchive')
    .doc(id)
    .delete();
};

export const FB_getContacts = async () => {
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

export const FB_updateContact = (id, contact) => {
  db.collection('Users')
    .doc('WNJWWElZUACGPoSc8w6l')
    .collection('Contacts')
    .doc(id)
    .update({
      ...contact,
      last_updated: FB_timestamp(),
    });
};

export const FB_createContact = (id, contact) => {
  db.collection('Users')
    .doc('WNJWWElZUACGPoSc8w6l')
    .collection('Contacts')
    .doc(id)
    .set({
      ...contact,
      last_updated: FB_timestamp(),
    });
};

export const FB_deleteContact = (id) => {
  db.collection('Users')
    .doc('WNJWWElZUACGPoSc8w6l')
    .collection('Contacts')
    .doc(id)
    .delete();
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
