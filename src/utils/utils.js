import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';

export const useFirestore = documentName => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection(auth.currentUser.uid)
      .doc(documentName)
      .onSnapshot(snapshot => {
        setData(snapshot.data().data);
      });

    return unsubscribe;
  }, [documentName]);

  return data;
};
