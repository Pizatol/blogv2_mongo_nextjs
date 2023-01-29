import React, { useState, useEffect } from "react";
import css from "../styles/Components/AddArticle.module.scss";
import Axios from "Axios";
import Button_main from "./Buttons/Button_main";
import Input_image from "./Input_image";
import formattedDate from "./formattedDate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import { formattedDateWithSeconds } from "./formatted_precise_date";
import connectMongo from "../utils/connectMongo";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    deleteObject,
} from "firebase/storage";
import { storage } from "../Firebase/FirebaseConfig";
// import Articles from "../Models/articleModel";

export default function AddArticle({ data }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [text, setText] = useState("");
    const [date, setDate] = useState(undefined);
    const [author, setAuthor] = useState("");
    const [articlesList, setArticlesList] = useState([]);

    const [imageUpload, setImageUpload] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [commentaryID, setCommentaryID] = useState("");
    // const [tempoDisplayImages, setTempoDisplayImages] = useState([]);

    console.log(data.id);
    useEffect(() => {
        setTitle(data.title);
        setDescription(data.description);
        setText(data.text);
        setDate(data.date);
        setAuthor(data.author);
        setImageUpload(data.images.url);
        setCommentaryID(data.commentaryID);
    }, []);
    // **********************

    const imagesListRef = ref(storage, "images/");
    const router = useRouter();

    //  const createData = async (e) => {
    //      e.preventDefault();
    //      try {
    //          const time = formattedDateWithSeconds();
    //          const commentaryID = v4();

    //          const res = await fetch("/api/AddArticle/add", {
    //              method: "POST",
    //              headers: {
    //                  "Content-Type": "application/json",
    //              },
    //              body: JSON.stringify({
    //                  description: description,
    //                  title: title,
    //                  text: text,
    //                  date: time,
    //                  author: author,
    //                  commentaryID: commentaryID,
    //                  image: imageUrls,
    //              }),
    //          });
    //          const data = await res.json();
    //          console.log(data);
    //          try {
    //              toast.success(`Article uploaded ! `, {
    //                  autoClose: 2000,
    //                  theme: "colored",
    //                  closeOnClick: true,
    //                  pauseOnHover: false,
    //              });
    //              setTitle("");
    //              setAuthor("");
    //              setDescription("");
    //              setText("");
    //              setDate(undefined);

    //              setImageUrls([]);
    //              setImageUpload([]);
    //              router.push("/");
    //          } catch (error) {
    //              console.log(error);
    //          }
    //      } catch (error) {
    //          console.log(error.message);
    //      }
    //  };

    const editData = async (e) => {
        e.preventDefault();

        const time = formattedDateWithSeconds();

        const res = await fetch(`/api/handlerArticle/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: description,
                title: title,
                text: text,
                date: time,
                author: author,
                commentaryID: commentaryID,
                image: imageUrls,
            }),
        });

        router.push("/");
        try {
        } catch (error) {
            console.log(error);
        }
    };

    const countLetters = (cnt) => {
        if (cnt.length > -1) {
            const value = 200 - cnt.length;
            return value;
        }
    };

    return (
        <div>
            {" "}
            {/* <button onClick={createData}>Test</button> */}
            <form className={css.form_container}>
                <h2 className={css.title_form}>New Article</h2>
                <div className={css.input}>
                    <label>Author</label>
                    <input
                        onChange={(e) => setAuthor(e.target.value)}
                        type="text"
                        value={author}
                    />
                </div>
                <div className={css.input}>
                    <label>Title</label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        value={title}
                    />
                </div>
                <div className={`${css.input} ${css.description_textarea}`}>
                    <label> Description ({countLetters(description)}) </label>
                    <textarea
                        maxlength="200"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    ></textarea>
                </div>
                <div className={`${css.input} ${css.text_textarea}`}>
                    <label> Text</label>
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    ></textarea>
                </div>

                <div>
                    <Input_image
                        imageUrls={imageUrls}
                        setImageUrls={setImageUrls}
                        imageUpload={imageUpload}
                        setImageUpload={setImageUpload}
                    />
                </div>

                <Button_main name={"Edit"} color={"blue"} foo={editData} />
            </form>
        </div>
    );
}

// Lorem ipsum dolor sit amet.

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur ipsa dolorem facilis sapiente maxime dolore repudiandae pariatur quisquam sunt animi et nulla aliquam atque perspiciatis, laudantium quae nisi omnis deserunt.

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, repellendus!
