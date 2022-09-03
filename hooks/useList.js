import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.config';

export const useList = (uid) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!uid) return;

    const colRef = collection(db, 'customers', uid, 'myList');

    return onSnapshot(colRef, (snapshot) => {
      setList(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, [uid]);

  return list;
};
