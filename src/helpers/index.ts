import { message } from 'antd';
import { auth, signInWithGooglePopup } from '../utils/firebase/firebase';
import { setIsSignInModalOpen } from '../redux/appManager/slice';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase/firebase';
import { Dispatch } from 'redux';
import { NavigateFunction } from 'react-router';

interface SignInWithGoogleProps {
  dispatch: Dispatch;
  navigate: NavigateFunction;
}

export const signInWithGoogle = async ({
  dispatch,
  navigate,
}: SignInWithGoogleProps) => {
  try {
    const result = await signInWithGooglePopup();
    const user = result?.user;

    if (!user) {
      throw new Error('No user returned from sign-in.');
    }

    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    // Only set the document if it doesn't already exist
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email: user.email,
        username: user.displayName,
        createdAt: new Date(),
      });
    } else {
      await setDoc(
        userRef,
        {
          email: user.email,
          username: user.displayName,
        },
        { merge: true }
      );
    }

    message.success('Welcome');
    dispatch(setIsSignInModalOpen(false));
    navigate('/play');
    localStorage.setItem('USER_ID', JSON.stringify(auth?.currentUser?.uid));
  } catch (error) {
    message.error('Failed to sign in with Google.');
  }
};

export const fetchCountries = async () => {
  const apiUrl = process.env.REACT_APP_COUNTRY_API_ENDPOINT;
  const token = process.env.REACT_APP_COUNTRY_API_TOKEN_KEY;
  try {
    const response = await fetch(`${apiUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching countries: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
