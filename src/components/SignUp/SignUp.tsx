"use client";

import { useCreateUserMutation } from "@/store/features/generalApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMssg, setErrorMssg] = useState("");

  const [signUp, { isLoading }] = useCreateUserMutation();

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(false);
    setShowSuccess(false);

    try {
      if (password !== confirmPassword) {
        setError(true);
        setErrorMssg("Passwords do not match");
        return;
      }

      await signUp({
        username: username,
        password: password,
      }).unwrap();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.originalStatus == 200) {
        setShowSuccess(true);

        return;
      }
      setError(true);
      setErrorMssg(err?.data?.message);
    }
  };

  return (
    <div className="flex justify-center flex-col h-[100vh] items-center">
      <h1 className="py-[4rem] font-semibold text-xl">
        Sign up to the Duke Quiz App 😎
      </h1>

      {error && <p className="py-3 text-red-500">{errorMssg}</p>}
      {showSuccess && (
        <div>
          <p className="py-3 text-green-500">User registered Successfully!</p>
          <p
            onClick={() => router.push("login")}
            className="text-blue-500 underline text-center cursor-pointer font-medium"
          >
            Proceed to login
          </p>
        </div>
      )}

      <form
        onSubmit={handleSignUp}
        className="max-w-[30rem] shadow-md  p-5 grid gap-3  rounded-lg w-[90%]"
      >
        <div className="grid gap-2 w-full ">
          <label htmlFor="" className="font-medium">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            className={inputClass}
          />
        </div>
        <div className="grid gap-2 w-full ">
          <label htmlFor="" className="font-medium">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className={inputClass}
          />
        </div>
        <div className="grid gap-2 w-full ">
          <label htmlFor="" className="font-medium">
            Confirm Password
          </label>
          <input
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            type="password"
            className={inputClass}
          />
        </div>
        <button
          disabled={
            isLoading ||
            username.trim() == "" ||
            password.trim() == "" ||
            confirmPassword.trim() == ""
          }
          type="submit"
          className="w-full disabled:opacity-30  py-2 bg-blue-600 text-center rounded-md  text-white font-medium"
        >
          {isLoading ? "Loading" : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;

const inputClass =
  "w-full outline-none border text-sm p-3 border-gray-300 rounded-md ";
