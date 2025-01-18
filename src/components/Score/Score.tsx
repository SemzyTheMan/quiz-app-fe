"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useGetScoreQuery } from "@/store/features/generalApi";

const Score = () => {
  const router = useRouter();
  const { data } = useGetScoreQuery(Cookies.get("id"));
  return (
    <div className="flex flex-col items-center gap-3 py-[6rem]">
      <p className="font-medium">Your score🎉</p>
      <h1 className="text-3xl text-blue-600 font-bold ">{data?.score || 0}</h1>
      <p>Thank you so much for taking the Quiz</p>
      <button
        onClick={() => router.push("questions")}
        className="text-yellow-500 font-semibold"
      >
        Take Another Quiz
      </button>

      <button
        onClick={() => {
          Cookies.remove("token");
          Cookies.remove("id");
          router.push("login");
        }}
        className="text-blue-500 font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

export default Score;
