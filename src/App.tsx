import { useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AuthPage from './containers/AuthPage';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { auth } from './utils/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setUserData } from './redux/users/slice';
import { userSelector } from './redux/users/selector';
import firebase from 'firebase/compat/app';
import ProtectedRoutes from './routes/ProtectiveRoutes';
const helmetContext = {};

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(userSelector);
  console.log(auth?.currentUser?.uid, 'check');
  // this useEffect is used to set the user info
  useEffect(() => {
    async function getUserData(uid: any) {
      try {
        const docRef = firebase.firestore().collection('users').doc(uid);
        const snapshot = await docRef.get();
        if (snapshot.exists) {
          const user = snapshot.data();
          const data = {
            name: user?.userInfo?.name,
            email: currentUser?.email,
            country: user?.userInfo?.country,
            age: user?.userInfo?.age,
          };
          dispatch(setUserData(data));
        } else {
          console.log('No user document found with the provided ID');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    getUserData(currentUser?.uid);
  }, []);

  // this useEffect is used to set the currentUser
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      dispatch(setCurrentUser(user));
    });

    // Unsubscribe to the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<AuthPage />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
