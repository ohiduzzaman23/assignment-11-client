import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("user");
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // console.log('CurrentUser-->', currentUser?.email)
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  useEffect(() => {
    const saveUser = async () => {
      if (!loading && user?.email) {
        try {
          const token = await user.getIdToken();

          // Save user
          await axios.post(
            `${import.meta.env.VITE_API_URL}/users`,
            { name: user.displayName, email: user.email },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          // Fetch role
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/role`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setRole(res.data.role || "user");
        } catch (err) {
          console.error("User save or role fetch failed", err);
        }
      }
    };
    saveUser();
  }, [user, loading]);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    role,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
