import { useEffect, useState } from "react";
import AddComment from "./AddComment";
import comments from ".././data.json";

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

export type CommentType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: Reply[];
  replyActive?: boolean;
  replyingTo?: string;
};
type Reply = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
  replyActive?: boolean;
};
export type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};
interface Props {
  comment: CommentType | Reply;
  setCommentList: (value: any) => void;
  currentUser: User;
  commentList: [];
}

const Comment = ({
  comment,
  currentUser,
  setCommentList,
  commentList,
}: any) => {
  const {
    id,
    content,
    createdAt,
    score,
    user,
    replies,
    replyActive,
    replyingTo,
  } = comment as CommentType;
  useEffect(() => {}, []);

  const replyShow = (id: number) => {
    if (comment.replyingTo) {
      // show  replies comment reply
      setCommentList(
        commentList.map((parentComment: CommentType) => {
          return {
            ...parentComment,
            replies: parentComment.replies.map((reply: Reply) =>
              reply.id === id
                ? { ...reply, replyActive: !reply.replyActive }
                : reply
            ),
          };
        })
      );
    } else {
      // show  parent comment reply
      setCommentList(
        commentList.map((comment: CommentType) =>
          comment.id == id
            ? { ...comment, replyActive: !comment.replyActive }
            : comment
        )
      );
    }
  };

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
              {replyingTo && `@${replyingTo}`}
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
              <p>{}</p>
              <button
                className="text-primary-moderateBlue font-bold"
                onClick={() => {
                  replyShow(id);
                }}
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
      {replies?.map((reply: Reply) => {
        return (
          <div
            key={reply.id}
            className="pl-4 mt-4 border-l-2 border-neutral-lightGray"
          >
            <Comment
              comment={reply}
              currentUser={currentUser}
              commentList={commentList}
              setCommentList={setCommentList}
            />
          </div>
        );
      })}
    </>
  );
};

export default Comment;
