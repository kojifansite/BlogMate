import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import BlogPost from "./BlogPost";
import Loader from "./Loader";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const Blog = () => {
  const { setPosts, posts, setBackup } = useContext(UserContext);

  const getPosts = async () => {
    let data = [];
    const q = query(collection(db, "posts"), orderBy("timestamp", "asc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.unshift(doc.data());
    });
    setPosts(data);
    setBackup(data);
  };

  useEffect(() => {
    // get posts
    window.scrollTo(0, 0);
    getPosts();
  }, []);

  if (!posts) return <Loader />;

  return (
    <div
      className={`max-w-6xl ${
        posts?.length !== 0 && "md:grid md:grid-cols-2 xl:grid-cols-3"
      } flex pt-5 flex-col gap-5 items-center overflow-x-hidden`}
    >
      {posts?.length > 0 &&
        posts?.map((blog) => <BlogPost {...blog} key={blog.id} />)}
      {posts?.length == 0 && (
        <h1
          className="text-3xl font-semibold text-center mt-20"
        >
          Статей пока нет!
        </h1>
      )}
    </div>
  );
};

export default Blog;
