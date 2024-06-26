"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  return (
    <div className="promptcard glassmorphism dropSm">
      <div className="flex  flex-between  w-full">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer w-full">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          ></Image>
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-700 capitalize">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={14}
            height={14}
          ></Image>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-800">{post.prompt}</p>
      <div className="flex-between flex-row">
        <p
          className="tag_p blue_gradient"
          onClick={() => handleClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>
        {session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className="edit-dele-con flex-between">
            <div className="edit_delete_btn px-3">
              <p
                className="font-inter text-sm green_gradient cursor-pointer"
                onClick={handleEdit}
              >
                Edit
              </p>
            </div>
            <div className="edit_delete_btn px-2">
              <p
                className="font-inter text-sm orange_gradient cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </p>
            </div>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptCard;
