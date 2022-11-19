import { FC, ReactNode, useState } from "react";
import { Button } from "src/components/Button";
import { useBlog } from "src/context/Blog";

export const PostForm = (props) => {
  const { user } = useBlog();
  const {
    onSubmit,
    postTitle,
    postContent,
    setPostContent,
    setPostTitle,
    formHeader,
    buttonText = "Post",
  } = props;
  const [loading, setLoading] = useState(false);

  return (
    <div className="rounded-lg py-4 flex  px-6 flex-col">
      {formHeader}
      <h1 className=" flex justify-center text-3xl">Create Post</h1>
      <input
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        type="text"
        placeholder="   Post title"
        className="bg-white w-full mt-4 ml-5 rounded mr-10 mb-4 h-10  black"
      />
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        name="content"
        id="content-area"
        rows={3}
        placeholder="   Describe your post..."
        className="bg-white w-full mt-4 ml-5 rounded py-16 black"
      ></textarea>
      <Button
        className="mt-6 ml-4"
        disabled={!user}
        loading={loading}
        onClick={async () => {
          setLoading(true);
          await onSubmit();
          setLoading(false);
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
};
