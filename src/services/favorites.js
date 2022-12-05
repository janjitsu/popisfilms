import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const getFavorites = (user) =>
  new Promise( async (resolve) => {
    const db = firebase.firestore();
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          let favorites = doc.data()['favorites']
          resolve(favorites);
          console.log("< GET FAVORITES > ", favorites);
        }
      })
      .catch((e) => {
        console.warn("< GET FAVORITES : ERROR > ", e);
      });
  });

const addFavorites = (user, favorites) =>
  new Promise( async (resolve) => {
    const db = firebase.firestore();
    db.collection("users")
      .doc(user.uid)
      .set({
        favorites: favorites
      })
      .then((response) => {
        console.log("< ADD FAVORITES : DONE > ", favorites);
        resolve(favorites);
      })
      .catch((e) => console.warn("< ADD FAVORITES : ERROR > ", e));
  });

export {getFavorites, addFavorites};
