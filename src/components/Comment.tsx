import { useEffect, useRef, useState } from "react";
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
  parentID?: number;
  replies: Reply[];
  replyActive?: boolean;
  replyingTo?: string;
};
export type Reply = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  parentID: number;
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

const Comment = ({
  comment,
  currentUser,
  setCommentList,
  commentList,
  input,
  setInput,
  onSubmit,
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
    parentID,
  } = comment as CommentType;

  const like = (id: number) => {
    if (score == 99) return;
    if (comment.replyingTo) {
      // show  replies comment reply
      setCommentList(
        commentList.map((parentComment: CommentType) => {
          return {
            ...parentComment,
            replies: parentComment.replies.map((reply: Reply) =>
              reply.id === id ? { ...reply, score: reply.score + 1 } : reply
            ),
          };
        })
      );
    } else {
      // show  parent comment reply
      setCommentList(
        commentList.map((comment: CommentType) =>
          comment.id == id ? { ...comment, score: comment.score + 1 } : comment
        )
      );
    }
  };
  const dislike = (id: number) => {
    if (score == 0) return;
    if (comment.replyingTo) {
      // show  replies comment reply
      setCommentList(
        commentList.map((parentComment: CommentType) => {
          return {
            ...parentComment,
            replies: parentComment.replies.map((reply: Reply) =>
              reply.id === id ? { ...reply, score: reply.score - 1 } : reply
            ),
          };
        })
      );
    } else {
      // show  parent comment reply
      setCommentList(
        commentList.map((comment: CommentType) =>
          comment.id == id ? { ...comment, score: comment.score - 1 } : comment
        )
      );
    }
  };
  const replyShow = (id: number) => {
    setCommentList(
      commentList.map((comment: CommentType) =>
        comment.id == id
          ? {
              ...comment,
              replyActive: !comment.replyActive,
              replies: comment.replies.map((reply) => {
                return { ...reply, replyActive: false };
              }),
            }
          : {
              ...comment,
              replyActive: false,
              replies: comment.replies.map((reply) =>
                reply.id == id
                  ? { ...reply, replyActive: !replyActive }
                  : { ...reply, replyActive: false }
              ),
            }
      )
    );
  };

  useEffect(() => {
    // replyShow(id);
  }, []);

  return (
    <>
      <div className="bg-neutral-white p-4 rounded-lg flex flex-col gap-2 ">
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
            <div className="flex place-items-center bg-neutral-veryLightGray w-fit rounded-lg md:flex-col">
              <div
                onClick={() => like(id)}
                className="flex place-items-center justify-center size-full py-3 px-3 md:px-4 md:py-4"
              >
                <img src="../src/images/icon-plus.svg" alt="icon-plus" />
              </div>
              <span className="font-bold text-primary-moderateBlue min-w-6 md:w-2 text-center ">
                {score}
              </span>
              <div
                onClick={() => dislike(id)}
                className="flex place-items-center justify-center size-full py-2 px-3 md:px-4 md:py-4 "
              >
                <img src="../src/images/icon-minus.svg" alt="icon-minus" />
              </div>
            </div>
            <div className="flex place-items-center">
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
      <AddComment
        showReply={comment.replyActive}
        currentUser={currentUser}
        input={input}
        setInput={setInput}
        onSubmit={onSubmit}
        type={"child"}
        user={user}
        replyShow={replyShow}
        id={id}
        comment={comment}
      />
      {/* </div> */}
      {/* {replies?.map((reply: Reply) => {
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
              setInput={setInput}
              input={input}
            />
          </div>
        );
      })} */}
    </>
  );
};

export default Comment;
