import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';

// ===== Transaction API Calls =====

const getTransactionsRef = () => collection(db, 'transactions');

export const getTransactions = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  try {
    const q = query(
      getTransactionsRef(),
      where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    const transactions = [];
    querySnapshot.forEach((docSnap) => {
      transactions.push({ _id: docSnap.id, ...docSnap.data() });
    });

    // Sort on client side by date (newest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    return { data: transactions };
  } catch (error) {
    console.error('Firestore getTransactions error:', error);
    // Return empty array instead of crashing — lets dashboard load
    return { data: [] };
  }
};

export const addTransaction = async (transactionData) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const newDoc = {
    ...transactionData,
    userId: user.uid,
    createdAt: new Date().toISOString()
  };

  const docRef = await addDoc(getTransactionsRef(), newDoc);
  
  return { data: { _id: docRef.id, ...newDoc } };
};

export const deleteTransaction = async (id) => {
  const docRef = doc(db, 'transactions', id);
  await deleteDoc(docRef);
  return { success: true };
};
