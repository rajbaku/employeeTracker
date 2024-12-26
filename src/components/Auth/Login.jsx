import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [`${name}Error`]: "",
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.email) {
      errors.emailError = "Email is required.";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      errors.emailError = "Please enter a valid email.";
      valid = false;
    }

    if (!formData.password) {
      errors.passwordError = "Password is required.";
      valid = false;
    }

    setFormData((prev) => ({ ...prev, ...errors }));
    return valid;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    handleLogin(formData.email, formData.password);
    setFormData({ email: "", password: "", emailError: "", passwordError: "" });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="border-2 rounded-xl border-emerald-600 p-20">
        <form onSubmit={submitHandler} className="flex flex-col items-center">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`outline-none bg-transparent border-2 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400 ${
              formData.emailError ? "border-red-500" : "border-emerald-600"
            }`}
            type="email"
            placeholder="Enter your email"
          />
          {formData.emailError && (
            <p className="text-red-500 text-sm mt-2">{formData.emailError}</p>
          )}

          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`outline-none bg-transparent border-2 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400 ${
              formData.passwordError ? "border-red-500" : "border-emerald-600"
            }`}
            type="password"
            placeholder="Enter password"
          />
          {formData.passwordError && (
            <p className="text-red-500 text-sm mt-2">{formData.passwordError}</p>
          )}

          <button
            type="submit"
            className="mt-7 text-white bg-emerald-600 hover:bg-emerald-700 font-semibold text-lg py-2 px-8 w-full rounded-full"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
