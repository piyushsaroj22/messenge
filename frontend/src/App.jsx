import BackgroundColorContainer from "./components/BackgroundColorContainer";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import { useEffect } from "react";

const App = () => {
  const { checkAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  return (
    <div>
      <BackgroundColorContainer>
        <Routes>
          <Route
            path="/"
            element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />
        </Routes>

        <Toaster />
      </BackgroundColorContainer>
    </div>
  );
};

export default App;
