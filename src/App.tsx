import { useSelector } from "react-redux";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import AuthPage from "./containers/AuthPage";
import HomePage from "./containers/HomePage";
import GamePage from "./containers/GamePage";
import { usersSelector } from "./containers/AuthPage/selectors";
import { HelmetProvider } from "react-helmet-async";
const helmetContext = {};

function App() {
  const { userData } = useSelector(usersSelector);

  return (
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<AuthPage />} />
          <Route
            path="home"
            element={<HomePage />}
            // element={userData ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="play"
            element={<GamePage />}
            // element={userData ? <GamePage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
