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

//there is only a single doc in Users so a map is not returned
export const FB_getUserPreferenceData = async () => {
  const doc = await db
    .collection('Users')
    .doc('WNJWWElZUACGPoSc8w6l')
    .get()
    
  return doc.data();
};

export const FB_updateContactColors = (contactColors) => {
  db.collection('Users')
  .doc('WNJWWElZUACGPoSc8w6l')
  .update({
    contact_colors: contactColors
  });
}

export const FB_updateLang = (langCode) => {
  db.collection('Users')
  .doc('WNJWWElZUACGPoSc8w6l')
  .update({
    lang: langCode
  });
}
