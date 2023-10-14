"use client";
import { db } from "@/firebase";
import firebase from "firebase/compat/app";
import { format } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";
import Image from "next/image";

function OnlinePagePosts() {
  const { isSignedIn, user, isLoaded } = useUser();
  const username = user?.fullName;

  const [realtimePost] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );

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
    <div className=" gap-[20px] ">
      <div className=" flex  bg-[white] w-[50%] flex-col m-auto gap-[10px] p-[20px] cursor-pointer ">
        {realtimePost?.docs?.map((post) => (
          <div
            className="border-[1px]  border-[#c2c1c1]  p-[20px] rounded-[10px] ] cursor-pointer hover:bg-[#e8e6e6]  "
            key={post.id}
          >
            <div className="usernmae">
              <div className="flex items-center gap-[10px]">
                <Image
                  src={post.data().photo} // Display the user's profile photo
                  alt="User's Profile Photo"
                  width={40}
                  height={40}
                  className="rounded-[50px]"
                />
                <div>
                  <p className="font-bold text-[15px]">
                    {" "}
                    {post.data().username}
                  </p>
                  <p className="text-[#9b9b9b]">
                    {" "}
                    {format(post.data().timestamp.toDate(), "HH:mm")}
                  </p>
                </div>
              </div>

              <h2 className="text-[20px] mt-[10px] mb-[10px]">
                {post.data().message}
              </h2>
              <div>
                <span>{post.data().likes?.length || 0}</span> likes
                {isSignedIn && (
                  <button
                    className="bg-[#416ef6] text-[white] w-[80px] p-[5px]  rounded-[5px] ml-[10px]"
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

export default OnlinePagePosts;
