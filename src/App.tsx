import { useState } from "react";
import comments from "./data.json";
import "./App.css";
console.log(comments);
import { GrFormSubtract } from "react-icons/gr";
import { BiSolidShare } from "react-icons/bi";

import { IoIosAdd } from "react-icons/io";

function App() {
  const [commentList, setCommentList] = useState(comments.comments);
  return (
    <div className="h-screen bg-neutral-veryLightGray p-4  ">
      <div
        className="flex
      flex-col gap-4"
      >
        {commentList.map((comment: any) => (
          <div className="bg-neutral-white p-4 rounded-lg flex flex-col gap-2 ">
            <div key={comment.id} className="flex flex-col gap-4 ">
              <div className="flex place-items-center justify-self-start gap-2">
                <div className="rounded-full size-4 bg-neutral-black" />
                <div>username</div>
                <div>1 month ago</div>
              </div>
              <p className="text-left">{comment.content}</p>
              <div className="flex justify-between">
                <div className="flex place-items-center gap-2 bg-neutral-veryLightGray w-fit p-2 rounded-lg">
                  <IoIosAdd className="text-neutral-grayishBlue" />
                  <span className="font-bold text-primary-moderateBlue">
                    {comment.score}
                  </span>
                  <GrFormSubtract className="text-neutral-grayishBlue" />
                </div>
                <div className="flex place-items-center gap-2">
                  <BiSolidShare />
                  <span className="text-primary-moderateBlue font-bold">
                    Reply
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="text-center">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="#">Your Name Here</a>.
        </div>
      </div>
    </div>
  );
}

export default App;
