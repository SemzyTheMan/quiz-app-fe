"use client";

import {
  useAnswerQuestionMutation,
  useGetQuestionsQuery,
  useSubmitAttemptMutation,
} from "@/store/features/generalApi";
import Cookies from "js-cookie";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Loader from "../Loader/Loader";
import { useState } from "react";

const Questions = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const page = searchParams.get("page") || 1;

  const [userAnswers, setUserAnswers] = useState<
    {
      questionId: string | number;
      answer: string;
    }[]
  >([]);

  const { data, isLoading, isFetching } = useGetQuestionsQuery({ page });
  const [submitAnswers, { isLoading: isAnswerLoading }] =
    useAnswerQuestionMutation();
  const [submitAttempt, { isLoading: isSubmitLoading }] =
    useSubmitAttemptMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSetParams = (page: any) => {
    params.set("page", page);
    router.push(`${pathname}?${params.toString()}`);
  };

  const userID = Cookies.get("id");

  const handleQuestionSubmit = async () => {
    try {
      if (page != data?.totalPages) {
        await submitAnswers({ userId: userID, answers: userAnswers }).unwrap();
        handleSetParams(+page + 1);
        setUserAnswers([]);
      } else {
        await submitAnswers({ userId: userID, answers: userAnswers }).unwrap();
        await submitAttempt(userID).unwrap();
        router.push("/score");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectAnswer = (e: any) => {
    const existingAnswerIndex = userAnswers.findIndex(
      (answer) => answer.questionId === e.target.name
    );

    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[existingAnswerIndex].answer = e.target.value;
      setUserAnswers(updatedAnswers);
    } else {
      setUserAnswers([
        ...userAnswers,
        { questionId: e.target.name, answer: e.target.value },
      ]);
    }
  };
  console.log(userAnswers);
  return (
    <div className="p-2 relative">
      {isLoading || isFetching ? (
        <div className="grid w-full px-4 absolute top-[50vh] left-[50vw] transform translate-x-[-50%] translate-y-[-50%] place-items-center gap-3">
          <Loader
            color="blue"
            text=" Do not run away while the question loads, You need patience to enter
            the kingdom 😎"
          />
        </div>
      ) : (
        <>
          {" "}
          <h1 className="my-2 text-blue-500 font-medium">
            Answer the questions and be granted access to the Dukedom in
            Suffolk🎉
          </h1>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {data?.content?.map((question: any) => (
            <div className="py-2" key={question.id}>
              <p className="mb-2 font-medium">
                {question?.id}. {question?.theQuestion}
              </p>
              <input
                className="py-1"
                type="radio"
                id="optionA"
                onChange={onSelectAnswer}
                name={question?.id}
                value={question?.optionA}
              />
              <label className="py-3 pl-2" htmlFor="optionA">
                {question?.optionA}
              </label>
              <br />
              <input
                type="radio"
                className="py-1"
                id="optionB"
                onChange={onSelectAnswer}
                name={question?.id}
                value={question?.optionB}
              />
              <label className="py-3 pl-2" htmlFor="optionB">
                {question?.optionB}
              </label>
              <br />
              <input
                type="radio"
                className="py-1"
                id="optionA"
                onChange={onSelectAnswer}
                name={question?.id}
                value={question?.optionC}
              />
              <label className="py-3 pl-2" htmlFor="optionC">
                {question?.optionC}
              </label>
              <br />
              <input
                type="radio"
                className="py-1"
                id="optionD"
                onChange={onSelectAnswer}
                name={question?.id}
                value={question?.optionD}
              />
              <label className="py-3 pl-2" htmlFor="optionD">
                {question?.optionD}
              </label>
              <br />
            </div>
          ))}
          <div className="my-2 flex justify-center gap-2">
            <button
              onClick={() => handleSetParams(+page - 1)}
              disabled={page == 1}
              className="font-medium disabled:text-gray-200  px-3 py-1 text-blue-500"
            >
              Prev
            </button>
            {Array.from({ length: data?.totalPages }, (_, i) => i + 1).map(
              (pageTemp) => (
                <button
                  key={pageTemp}
                  className={`px-2 py-1 mx-1 ${
                    pageTemp == page ? "bg-blue-500 text-white" : "border "
                  } rounded-lg`}
                  onClick={() => {
                    handleSetParams(pageTemp);
                  }}
                >
                  {pageTemp}
                </button>
              )
            )}
            <button
              onClick={handleQuestionSubmit}
              disabled={isAnswerLoading || isSubmitLoading}
              className="font-medium disabled:text-gray-200  px-3 py-1 text-blue-500"
            >
              {data?.totalPages == page ? "Submit" : "Next"}
            </button>
          </div>
        
        </>
      )}
    </div>
  );
};

export default Questions;
