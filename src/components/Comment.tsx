import React, { useEffect, useRef, useState } from "react";
import comments from ".././data.json";
import AddComment from "./AddComment";
export type CommentReply = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replyingTo?: string;
  replies?: [];
  currentUser: User;
  commentList?: any;
  replyActive?: boolean;
  setCommentList: (value: any) => void;
};

export type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

const Comment = ({
  id,
  content,
  createdAt,
  score,
  user,
  replies,
  replyingTo,
  currentUser,
  replyActive,
  commentList,
  setCommentList,
}: CommentReply) => {
  const replyShow = (id: number) => {
    setCommentList(
      commentList.map((comment: CommentReply) =>
        comment.id == id
          ? { ...comment, replyActive: !comment.replyActive }
          : comment
      )
    );
    console.log(commentList);
  };
  useEffect(() => {
    // setCommentList([...commentList, replies, comments.comments]);
  }, []);

  return (
    <>
      <div
        key={id}
        className="bg-neutral-white p-4 rounded-lg flex flex-col gap-2"
      >
        <div className="flex flex-col gap-4 ">
          <div className="flex place-items-center justify-self-start gap-2">
            <img
              src={user.image.png}
              alt="profile.icon"
              className="size-5 rounded-full "
            />
            <span className="text-neutral-darkBlue font-bold">
              {user.username}
            </span>
            {currentUser?.username == user.username && (
              <span className="mx-1 text-xs px-1 bg-primary-moderateBlue text-neutral-white">
                you
              </span>
            )}
            <span className="text-neutral-grayishBlue">{createdAt}</span>
          </div>

          <p className="text-left">
            <span className="text-primary-moderateBlue font-bold">
              @{replyingTo}
            </span>{" "}
            {content}
          </p>
          <div className="flex justify-between">
            <div className="flex place-items-center gap-3 bg-neutral-veryLightGray w-fit py-2 px-3  rounded-lg">
              <img src="../src/images/icon-plus.svg" alt="icon-plus" />
              <span className="font-bold text-primary-moderateBlue">
                {score}
              </span>
              <img src="../src/images/icon-minus.svg" alt="icon-minus" />
            </div>
            <div className="flex place-items-center">
              <button
                className="text-primary-moderateBlue font-bold"
                onClick={() => replyShow(id)}
              >
                {!replyActive ? (
                  <span className="flex gap-4 place-items-center">
                    <img src="../src/images/icon-reply.svg" alt="icon-reply" />
                    Reply
                  </span>
                ) : (
                  "Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {replyActive && <AddComment {...currentUser} />}
      {replies?.map((reply: CommentReply) => {
        return (
          <div
            key={reply.id}
            className="pl-4 mt-4 border-l-2 border-neutral-lightGray"
          >
            <Comment {...reply} currentUser={currentUser} />
          </div>
        );
      })}
    </>
  );
};

export default Comment;