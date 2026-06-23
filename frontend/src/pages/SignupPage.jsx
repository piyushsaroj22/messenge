import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [signUp, isSigningUp] = useAuthStore();

  const handleSubmit = (e) => {};

  return <div>SignupPage</div>;
};

export default SignupPage;
