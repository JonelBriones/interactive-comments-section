import React from "react";
import { User } from "./Comment";

const AddComment = ({ username, image }: User) => {
  return (
    <div className="flex flex-col gap-4 mt-4 bg-neutral-white p-4 rounded-lg ">
      <textarea
        className="pl-4 pt-2 border-2 border-neutral-lightGray rounded-lg w-full"
        name="comment"
        id="comment"
        cols={30}
        rows={3}
        placeholder="Add a comment..."
      />
      <div className="flex justify-between place-items-center">
        <img
          src={image.png}
          alt="profile.icon"
          className="size-5 rounded-full "
        />
        <button className="bg-primary-moderateBlue  text-neutral-white py-2 px-6 rounded-lg">
          SEND
        </button>
      </div>
    </div>
  );
};

export default AddComment;
