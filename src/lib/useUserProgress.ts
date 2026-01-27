import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";

export function useUserProgress(username: string | null) {
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    const fetchProgress = async () => {
      const docRef = doc(db, "progresos", username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOpenedBoxes(docSnap.data().abiertas || []);
      } else {
        await setDoc(docRef, { usuario: username, abiertas: [] });
        setOpenedBoxes([]);
      }
      setLoading(false);
    };
    fetchProgress();
  }, [username]);

  const openBox = async (day: number) => {
    if (!username) return;
    const docRef = doc(db, "progresos", username);
    await updateDoc(docRef, { abiertas: arrayUnion(day) });
    setOpenedBoxes(prev => prev.includes(day) ? prev : [...prev, day]);
  };

  return { openedBoxes, openBox, loading };
}
