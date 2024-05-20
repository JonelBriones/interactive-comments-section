import { useEffect } from "react";
import AddComment from "./AddComment";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

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
  onSubmitEdit,
}: any) => {
  const { id, content, createdAt, score, user, replyActive, replyingTo } =
    comment as CommentType;

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
    setInput("");
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
  const replyEdit = (id: number) => {
    // const comment = commentList.find((comment: CommentType) =>
    //   comment.id === id
    //     ? comment
    //     : comment.replies.find((reply) => reply.id == id)
    // );
    // console.log(comment, id);
    setInput(content);
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
  const replyDelete = (id: number) => {
    const isParentComment = commentList.find(
      (comment: CommentType) => comment.id === id
    );
    if (isParentComment) {
      setCommentList(
        commentList.filter((comment: CommentType) => comment.id != id)
      );
    } else {
      setCommentList(
        commentList.map((comment: CommentType) => {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id != id),
          };
        })
      );
    }
  };

  useEffect(() => {
    // replyShow(id);
  }, []);
  function daysAgo(createdAt: any) {
    const now: any = new Date();
    const diff = now - createdAt;
    const days = diff / (1000 * 60 * 60 * 24);
    return `${Math.floor(days)}`;
  }

  return (
    <>
      <div className="bg-neutral-white p-4 rounded-lg ">
        <div className="flex flex-col gap-4 md:flex-row md:gap-4 ">
          <div className="hidden md:flex place-items-center bg-neutral-veryLightGray w-fit rounded-lg md:flex-col">
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
          <div className="flex justify-between flex-col md:justify-start md:gap-2 w-full">
            <div className="flex justify-between">
              <div className="flex place-items-center justify-between gap-2">
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
                <span className="text-neutral-grayishBlue">
                  {daysAgo(new Date(createdAt))} days ago
                </span>
              </div>
              <div className="hidden md:flex place-items-center ">
                {currentUser?.username === user.username ? (
                  <div className="flex gap-4 font-bold">
                    <button
                      className="flex gap-2 place-items-center  text-primary-softRed"
                      onClick={() => replyDelete(id)}
                    >
                      <FaTrash />
                      Delete
                    </button>
                    <button
                      className="flex gap-2 place-items-center text-primary-moderateBlue"
                      onClick={() => replyEdit(id)}
                    >
                      {!replyActive ? (
                        <>
                          <MdEdit />
                          Edit
                        </>
                      ) : (
                        <>cancel</>
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    className="text-primary-moderateBlue font-bold"
                    onClick={() => {
                      replyShow(id);
                    }}
                  >
                    {!replyActive ? (
                      <span className="flex gap-4 place-items-center">
                        <img
                          src="../src/images/icon-reply.svg"
                          alt="icon-reply"
                        />
                        Reply
                      </span>
                    ) : (
                      "Cancel"
                    )}
                  </button>
                )}
              </div>
            </div>
            {currentUser?.username == user.username ? (
              <>
                {!replyActive && content}
                <AddComment
                  showReply={comment.replyActive}
                  currentUser={currentUser}
                  input={input}
                  setInput={setInput}
                  onSubmit={onSubmit}
                  onSubmitEdit={onSubmitEdit}
                  type={"edit"}
                  user={user}
                  replyShow={replyShow}
                  id={id}
                  comment={comment}
                />
              </>
            ) : (
              <p className="text-left block">
                <span className="text-primary-moderateBlue font-bold">
                  {replyingTo && `@${replyingTo}`}
                </span>{" "}
                {content}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex place-items-center bg-neutral-veryLightGray w-fit rounded-lg md:flex-col md:hidden">
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
            <div className="md:hidden flex place-items-center">
              {currentUser?.username === user.username ? (
                <div>delete | edit</div>
              ) : (
                <button
                  className="text-primary-moderateBlue font-bold"
                  onClick={() => {
                    replyShow(id);
                  }}
                >
                  {!replyActive ? (
                    <span className="flex gap-4 place-items-center">
                      <img
                        src="../src/images/icon-reply.svg"
                        alt="icon-reply"
                      />
                      Reply
                    </span>
                  ) : (
                    "Cancel"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {currentUser?.username !== user.username && (
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
      )}
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
