
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  onSnapshot,
  increment,
  serverTimestamp,
  addDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface User {
  uid: string;
  name: string;
  email: string;
  balance: number;
  faircode: boolean;
  faircodeValue?: string;
  createdAt: any;
  phoneNumber?: string;
  bvn?: string;
  address?: string;
}

export interface Transaction {
  id?: string;
  userId: string;
  type: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  createdAt: any;
  metadata?: any;
}

export interface Withdrawal {
  id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
}

export interface Deposit {
  id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  amount: number;
  type: 'FairCode' | 'Withdrawal Fee' | 'Bonus' | 'Deposit';
  status: 'pending' | 'confirmed' | 'rejected';
  createdAt: any;
}

export interface LoanApplication {
  id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  amount: number;
  purpose: string;
  duration: number;
  employmentStatus: string;
  monthlyIncome: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
  additionalInfo?: any;
}

// User operations
export const createUser = async (userData: Omit<User, 'uid'> & { uid: string }) => {
  await setDoc(doc(db, 'users', userData.uid), {
    ...userData,
    createdAt: serverTimestamp()
  });
};

export const getUser = async (uid: string) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { uid: docSnap.id, ...docSnap.data() } as User : null;
};

export const updateUser = async (uid: string, data: Partial<User>) => {
  await updateDoc(doc(db, 'users', uid), data);
};

export const updateUserBalance = async (uid: string, amount: number) => {
  await updateDoc(doc(db, 'users', uid), {
    balance: increment(amount)
  });
};

export const getAllUsers = (callback: (users: User[]) => void) => {
  const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const users = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as User));
    callback(users);
  });
};

// Transaction operations
export const createTransaction = async (transaction: Omit<Transaction, 'id'>) => {
  const docRef = await addDoc(collection(db, 'transactions'), {
    ...transaction,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const getUserTransactions = (userId: string, callback: (transactions: Transaction[]) => void) => {
  const q = query(
    collection(db, 'transactions'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
    callback(transactions);
  });
};

// Withdrawal operations
export const createWithdrawal = async (withdrawal: Omit<Withdrawal, 'id'>) => {
  const docRef = await addDoc(collection(db, 'withdrawals'), {
    ...withdrawal,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const getPendingWithdrawals = (callback: (withdrawals: Withdrawal[]) => void) => {
  const q = query(
    collection(db, 'withdrawals'),
    where('status', '==', 'pending'),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const withdrawals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Withdrawal));
    callback(withdrawals);
  });
};

export const updateWithdrawalStatus = async (id: string, status: 'approved' | 'rejected') => {
  await updateDoc(doc(db, 'withdrawals', id), { status });
};

// Deposit operations
export const createDeposit = async (deposit: Omit<Deposit, 'id'>) => {
  const docRef = await addDoc(collection(db, 'deposits'), {
    ...deposit,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const getPendingDeposits = (callback: (deposits: Deposit[]) => void) => {
  const q = query(
    collection(db, 'deposits'),
    where('status', '==', 'pending'),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const deposits = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Deposit));
    callback(deposits);
  });
};

export const updateDepositStatus = async (id: string, status: 'confirmed' | 'rejected') => {
  await updateDoc(doc(db, 'deposits', id), { status });
};

// Loan operations
export const createLoanApplication = async (loan: Omit<LoanApplication, 'id'>) => {
  const docRef = await addDoc(collection(db, 'loans'), {
    ...loan,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const getPendingLoans = (callback: (loans: LoanApplication[]) => void) => {
  const q = query(
    collection(db, 'loans'),
    where('status', '==', 'pending'),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const loans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LoanApplication));
    callback(loans);
  });
};

export const updateLoanStatus = async (id: string, status: 'approved' | 'rejected') => {
  await updateDoc(doc(db, 'loans', id), { status });
};

// Stats operations
export const getStats = async () => {
  const usersSnap = await getDocs(collection(db, 'users'));
  const withdrawalsSnap = await getDocs(query(collection(db, 'withdrawals'), where('status', '==', 'pending')));
  const depositsSnap = await getDocs(query(collection(db, 'deposits'), where('status', '==', 'pending')));
  const transactionsSnap = await getDocs(collection(db, 'transactions'));
  
  const completedTransactions = await getDocs(
    query(collection(db, 'transactions'), where('status', '==', 'completed'))
  );
  
  let totalRevenue = 0;
  completedTransactions.docs.forEach(doc => {
    const data = doc.data();
    if (data.type === 'withdrawal_fee' || data.type === 'faircode_purchase') {
      totalRevenue += data.amount;
    }
  });

  return {
    totalUsers: usersSnap.size,
    pendingWithdrawals: withdrawalsSnap.size,
    pendingDeposits: depositsSnap.size,
    totalTransactions: transactionsSnap.size,
    totalRevenue
  };
};
