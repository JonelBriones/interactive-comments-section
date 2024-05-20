import React, { useEffect, useRef, useState } from "react";
import { User } from "./Comment";

const AddComment = (props: any) => {
  const {
    currentUser,
    input,
    setInput,
    onSubmit,
    onSubmitEdit,
    type,
    user,
    showReply,
    replyShow,
    id,
    comment,
  } = props;

  const { image } = currentUser;

  const inputRef = useRef(null) as any;
  useEffect(() => {
    if (
      (inputRef.current && type == "child") ||
      (inputRef.current && type == "edit")
    ) {
      inputRef.current.focus();
    }
  }, [showReply]);

  return (
    <div
      className={`${
        showReply ? "" : "hidden"
      } flex flex-col gap-4 mt-4 bg-neutral-white p-4 rounded-lg`}
    >
      <form
        onSubmit={(e) => {
          if (type == "edit") {
            onSubmitEdit(e, user?.username, comment?.parentID, id);
          } else {
            onSubmit(e, user?.username, comment?.parentID, id);
          }
        }}
        className="relative"
      >
        <textarea
          ref={inputRef}
          className={`pl-4 pt-2 border-2 border-neutral-lightGray rounded-lg w-full`}
          name="input"
          cols={30}
          rows={3}
          value={input}
          placeholder={
            user?.username ? `@${user.username}` : `Add Comment ${input}`
          }
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex justify-between place-items-center">
          <img
            src={image.png}
            alt="profile.icon"
            className="size-5 rounded-full "
          />
          <button
            className="bg-primary-moderateBlue  text-neutral-white py-2 px-6 rounded-lg"
            type="submit"
            onClick={() => {
              if (id) {
                replyShow(id);
              }
            }}
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
