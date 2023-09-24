import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import AuthPage from "./containers/AuthPage";
import { HelmetProvider } from "react-helmet-async";

const helmetContext = {};

function App() {
  return (
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
