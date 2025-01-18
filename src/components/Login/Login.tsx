"use client";

import { useSigninMutation } from "@/store/features/generalApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [password, setPassword] = useState("");
  const [signin, { isLoading }] = useSigninMutation();

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await signin({
        username: username,
        password: password,
      }).unwrap();

      Cookies.set("token", response.token);
      Cookies.set("id", response.id);
      router.push("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrMsg(err?.data?.message);
    }
  };

  return (
    <div className="flex justify-center flex-col h-[100vh] items-center">
      <h1 className="py-[4rem] font-semibold text-xl">
        Login to the Duke Quiz App 😎
      </h1>
      {errMsg.trim() !== "" && <p className="py-3 text-red-500">{errMsg}</p>}
      <form
        className="max-w-[30rem] shadow-md  p-5 grid gap-3  rounded-lg w-[90%]"
        onSubmit={handleSignIn}
      >
        <div className="grid gap-2 w-full ">
          <label htmlFor="" className="font-medium">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="grid gap-2 w-full ">
          <label htmlFor="" className="font-medium">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={inputClass}
          />
        </div>
        <button
          disabled={isLoading}
          className="w-full disabled:opacity-55  py-2 bg-blue-600 text-center rounded-md  text-white font-medium"
        >
          {isLoading ? "Loading" : "Login"}
        </button>
      </form>
      <p className="mt-3">
        Don&apos;t have an account?{" "}
        <span
          onClick={() => {
            router.push("signup");
          }}
          className="text-blue-500 cursor-pointer "
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;

const inputClass =
  "w-full outline-none border text-sm p-3 border-gray-300 rounded-md ";
