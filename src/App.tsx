import { useEffect, useState } from "react";
import comments from "./data.json";
import "./App.css";
import Comment, { CommentReply } from "./components/Comment";
import AddComment from "./components/AddComment";
console.log(comments);

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

function App() {
  const parentComment = comments.comments;

  const [allComments, setAllComments] = useState<CommentReply[]>([]);
  const [commentList, setCommentList] = useState(comments.comments);
  const [currentUser, setCurrentUser] = useState(comments.currentUser);
  console.log("Parent Comment", parentComment);
  useEffect(() => {
    let joinedComments = [];
    for (const parentComment of comments.comments) {
      joinedComments.push(parentComment);
    }
    parentComment.forEach((comment) => {
      if (comment.replies) {
        comment.replies.forEach((reply) => joinedComments.push(reply));
      }
    });
    setAllComments(joinedComments as any);
    console.log(joinedComments);

    // for(const childComment of comments.comments) {
    //   joinedComments.push(parentComment)
    // }
  }, []);
  return (
    <div className="min-h-screen h-auto bg-neutral-veryLightGray p-4  ">
      <div
        className="flex
      flex-col gap-4"
      >
        {commentList.map((comment) => (
          <div key={comment.id}>
            <Comment
              {...(comment as CommentReply)}
              currentUser={currentUser}
              setCommentList={setCommentList}
              commentList={commentList}
            />
          </div>
        ))}

        <AddComment {...currentUser} />
        <div className="text-center text-xs">
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
