import Questions from "@/components/Questions/Questions";
import { Suspense } from "react";

const page = () => (
  <Suspense>
    <Questions />
  </Suspense>
);
export default page;
