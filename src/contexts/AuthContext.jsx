import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/Firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function signup(email, password, role) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Store user role in Firestore
      console.log('AuthContext - Setting user role to:', role);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        role,
        createdAt: new Date().toISOString()
      });
      setUserRole(role);
      return { userCredential, role };
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        console.log('AuthContext - Setting user role to:', role);
        setUserRole(role);
        return { userCredential, role };
      }
      console.log('AuthContext - No user document found');
      return { userCredential, role: null };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  function logout() {
    setUserRole(null);
    return signOut(auth);
  }

  async function deleteAccount() {
    try {
      if (!currentUser) {
        throw new Error('No user is currently signed in');
      }

      // Delete user document from Firestore
      await deleteDoc(doc(db, 'users', currentUser.uid));
      
      // Delete the user account from Firebase Auth
      await deleteUser(currentUser);
      
      // Clear local state
      setCurrentUser(null);
      setUserRole(null);
      
      return true;
    } catch (error) {
      console.error("Delete account error:", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } else {
        setUserRole(null);
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    logout,
    deleteAccount,
    error,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 