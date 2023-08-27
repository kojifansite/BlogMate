import React, { useContext, useState } from "react";
import Editor from "../components/Editor";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import { IoMdReverseCamera } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";
import { UserContext } from "../UserContext";
import Loader from "../components/Loader";
import { updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../firebase";

const FileInput = () => {
  const [file, setFile] = useState(null);
  const { postImage, setPostImage, info, darkMode } = useContext(UserContext);
  const files = postImage == "" ? info.files : postImage;

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      e.preventDefault();
      setPostImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col relative">
      <label htmlFor="image" className="absolute right-2 top-2">
        <IoMdReverseCamera size={25} className="text-red" />
      </label>
      <input
        type="file"
        className="hidden"
        id="image"
        onChange={handleFileInputChange}
      />
      <img
        src={files}
        className="border-light-mode border-2 text-black h-52  rounded-3xl outline-none shadow-md placeholder:text-sm w-full"
      />
    </div>
  );
};

const EditPost = () => {
  const { darkMode, info, postImage } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState(info.title);
  const [summary, setSummary] = useState(info.summary);
  const [category, setCategory] = useState(info.category);
  const [content, setContent] = useState(info.content);
  const [redirect, setRedirect] = useState(false);
  const files = postImage == "" ? info.files : postImage;

  const updatePost = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "posts", info.id);

    updateDoc(docRef, {
      title,
      summary,
      category,
      files,
      content,
      timestamp: serverTimestamp(),
    });
    console.log(files);
    setRedirect(true);
  };
  const deletePost = async () => {
    await deleteDoc(doc(db, "posts", info.id));
    navigate("/");
  };

  if (content === "") return <Loader />;

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }
  return (
<<<<<<< Updated upstream
    <div
      className={`${
        darkMode ? "bg-gradient-to-r from-zinc-900 to-zinc-800" : "flex justify-center min-h-body bg-gradient-to-br from-gray-200 to-white"
      } flex justify-center min-h-body`}
    >
=======
    <div className="flex justify-center min-h-body bg-gradient-to-br from-gray-200 to-white">
>>>>>>> Stashed changes
      <div className="max-w-xl mx-auto flex flex-col items-center p-5 w-full">
        <Link
          to="/"
          className={`${
            darkMode ? "text-dark-text" : "text-light-mode-text"
          } flex items-center gap-2 text-sm hover:underline underline-offset-4 pb-5`}
        >
          <BiArrowBack /> Вернуться на Главную
        </Link>
        <h1
          className={`${
            darkMode ? "text-white" : ""
          } text-3xl font-semibold text-center mt-5 mb-10`}
        >
          Изменить статью:
        </h1>
        <form className="flex flex-col gap-5" onSubmit={updatePost}>
          <div className="flex flex-col gap-3">
            <h2
              className={`${
                darkMode ? "text-dark-text" : "text-light-mode-text"
              } text-2xl`}
            >
              Название статьи:
            </h2>
            <input
              className={`${
                darkMode ? "text-white" : ""
              } border-light-mode bg-white border-2 text-black p-4 text-lg rounded-3xl outline-none shadow-md placeholder:text-sm w-full p-2`}
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={title}
              size={1}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2
              className={`${
                darkMode ? "text-dark-text" : "text-light-mode-text"
              } text-2xl`}
            >
              Краткое описание:
            </h2>
            <input
              className={`${
                darkMode ? "text-white" : ""
              } border-light-mode bg-white border-2 text-black p-4 text-lg rounded-3xl outline-none shadow-md placeholder:text-sm w-full h-24`}
              type="text"
              name="summary"
              id="summary"
              placeholder="Summary"
              value={summary}
              size={1}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <h2
              className={`${
                darkMode ? "text-dark-text" : "text-light-mode-text"
              } text-2xl`}
            >
              Добавить изображение:
            </h2>
            <FileInput />
          </div>

          <div className="flex flex-col gap-3">
            <h2
              className={`${
                darkMode ? "text-dark-text" : "text-light-mode-text"
              } text-2xl`}
            >
              Текст статьи:
            </h2>
            <Editor
              value={content}
              onChange={setContent}
              theme={darkMode && "text-white"}
            />
          </div>

          <button className="bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold p-4 mt-10 rounded-2xl hover:bg-dark">
            Обновить статью
          </button>
        </form>
        <button
          onClick={deletePost}
          className="bg-red mt-5 w-full text-white font-semibold p-4 rounded-2xl hover:bg-dark"
        >
          Удалить статью
        </button>
      </div>
    </div>
  );
};

export default EditPost;
