import React, { createContext, useContext, useEffect, useState } from 'react';
import app from '../../Firebase/firebase.config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Create axios instance for API calls
const axiosPublic = axios.create({
    baseURL: 'https://jtech-rho.vercel.app' // Using the same base URL as the hook
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(false);

    // Function to fetch user role
    const fetchUserRole = async (userEmail) => {
        if (!userEmail) {
            setUserRole(null);
            return;
        }

        setRoleLoading(true);
        try {
            const response = await axiosPublic.get(`/users/email/${userEmail}`);
            const userData = response.data;
            setUserRole(userData.role || 'user');
        } catch (error) {
            console.error('Error fetching user role:', error);
            setUserRole('user'); // Default to user role on error
        } finally {
            setRoleLoading(false);
        }
    };

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    }

    const logOut = () => {
        setLoading(true);
        setUserRole(null); // Clear role on logout
        return signOut(auth);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const resetPassword = (email) => {
        // Configure action code settings for password reset
        const actionCodeSettings = {
            // URL you want to redirect back to after password reset
            url: window.location.origin + '/login',
            handleCodeInApp: false
        };

        return sendPasswordResetEmail(auth, email, actionCodeSettings);
    }

    const authData = {
        user,
        setUser,
        createUser,
        signIn,
        googleLogin,
        updateUserProfile,
        logOut,
        resetPassword,
        loading,
        userRole,
        roleLoading,
        fetchUserRole
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            // Fetch user role when user changes
            if (currentUser?.email) {
                fetchUserRole(currentUser.email);
            } else {
                setUserRole(null);
            }
        });
        return () => {
            unSubscribe();
        }
    }, [])



    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};