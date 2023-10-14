"use client";
import { db } from "@/firebase";
import firebase from "firebase/compat/app";
import { useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";
import Image from "next/image";
function WriteComment() {
  const { isSignedIn, user, isLoaded } = useUser();
  const inputRef = useRef(null);
  const username = user?.fullName;
  const photoName = user?.imageUrl;
  const [realtimePost] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );

  // Filter posts by the current user's username
  const userPosts = realtimePost?.docs.filter(
    (post) => post.data().username === username
  );

  const sendPost = async (e) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;

    await db.collection("posts").add({
      message: inputRef.current.value,
      username: username,
      photo: photoName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      likes: [],
    });

    inputRef.current.value = "";
  };

  const likePost = async (postId) => {
    const postRef = db.collection("posts").doc(postId);
    const userLike = postRef.collection("likes").doc(user.id);

    const postSnapshot = await postRef.get();

    if (!userLike.exists) {
      await userLike.set({
        userId: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Update the likes count in the post document
      await postRef.update({
        likes: firebase.firestore.FieldValue.arrayUnion(user.id),
      });
    }
  };

  return (
    <div className="flex flex-col w-[58%] m-auto mt-[50px]">
      <form className="flex w-[80%]  flex-col mb-[50px]">
        <textarea
          className=" bg-[#f2f2f2] p-[10px]"
          type="text"
          placeholder="Enter your message"
          ref={inputRef}
          rows="7"
        ></textarea>

        <button
          onClick={sendPost}
          type="submit"
          className="bg-[#4e86ee] h-[45px] text-[white]"
        >
          Send
        </button>
      </form>
      <div className="w-[50%] flex flex-col gap-[20px] ">
        {userPosts?.map((post) => (
          <div key={post.id} className="flex flex-col gap-[20px]">
            <div className="usernmae ">
              <div className="flex gap-[10px] items-center">
                <Image
                  src={post.data().photo}
                  width={50}
                  height={50}
                  className="rounded-[50px]"
                />
                <p className="font-bold text-[15px]"> {post.data().username}</p>
              </div>
              <h2 className="text-[30px]">{post.data().message}</h2>
              <div>
                <span>{post.data().likes?.length || 0}</span> likes
                {isSignedIn && (
                  <button
                    className="bg-[#4e86ee] text-[white] w-[80px] ml-[10px]"
                    onClick={() => likePost(post.id)}
                  >
                    {" "}
                    Like
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WriteComment;
