import { useEffect, useRef, useState } from "react";
import comments from "./data.json";
import "./App.css";
import Comment, {
  CommentReply,
  CommentType,
  Reply,
} from "./components/Comment";
import AddComment from "./components/AddComment";
import { SiRepublicofgamers } from "react-icons/si";

// type User = {
//   image: {
//     png: string;
//     webp: string;
//   };
//   username: string;
// };
type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

// type Comment = {
//   id: number;
//   content: string;
//   createdAt: string;
//   score: number;
//   user: User;
//   replies?: [];
//   replyingTo?: string;
//   currentUser: User;
// };
// type Data = {
//   comments: Comment[];
//   currentUser: CurrentUser;
// };

const defaultInput: CommentType = {
  content: "",
  createdAt: "",
  id: 0,
  replies: [],
  score: 1,
  replyingTo: "",
  user: {
    image: {
      png: "",
      webp: "",
    },
    username: "",
  },
};

function App() {
  const [commentList, setCommentList] = useState(comments.comments);
  const [currentUser, setCurrentUser] = useState(comments.currentUser);
  const [input, setInput] = useState("");

  const [parentInput, setParentInput] = useState("");

  useEffect(() => {
    console.log(commentList);
  }, [commentList]);

  function createDate() {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  }
  const onSubmit = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    replyingTo: any,
    parentID: number
  ) => {
    e.preventDefault();
    let newComment = {
      ...defaultInput,
      createdAt: createDate(),
      content: input,
      user: currentUser,
      id: Math.floor(Math.random() * 100000),
    };

    if (replyingTo) {
      setCommentList(
        commentList.map((comment: CommentType) =>
          comment.id === parentID || replyingTo === comment.user.username
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  { ...newComment, parentID, replyingTo },
                ],
              }
            : comment
        )
      );
    } else {
      setCommentList([
        ...commentList,
        {
          ...defaultInput,
          content: input,
          user: currentUser,
          id: Math.floor(Math.random() * 100000),
        },
      ]);
    }
    setInput("");
  };

  return (
    <div className="min-h-screen h-auto  bg-neutral-veryLightGray p-4 select-none ">
      <div
        className="flex
      flex-col gap-4 m-auto container"
      >
        {commentList.map((comment) => (
          <div key={comment.id}>
            <Comment
              comment={comment}
              currentUser={currentUser}
              setCommentList={setCommentList}
              commentList={commentList}
              setParentInput={setParentInput}
              input={input}
              setInput={setInput}
              onSubmit={onSubmit}
            />
            {comment.replies?.map((reply: any) => {
              return (
                <div
                  key={reply.id}
                  className="pl-4 mt-4 border-l-2 border-neutral-lightGray"
                  id="comments"
                >
                  <Comment
                    comment={reply}
                    currentUser={currentUser}
                    commentList={commentList}
                    setCommentList={setCommentList}
                    input={input}
                    setInput={setInput}
                    onSubmit={onSubmit}
                  />
                </div>
              );
            })}
          </div>
        ))}

        <AddComment
          currentUser={currentUser}
          setParentInput={setParentInput}
          parentInput={parentInput}
          input={input}
          setInput={setInput}
          onSubmit={onSubmit}
          type={"parent"}
          showReply={true}
        />
        <div className="text-center text-xs">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="#">Jonel Briones</a>.
        </div>
      </div>
    </div>
  );
}

export default App;
