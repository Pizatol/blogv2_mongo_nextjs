import React, { useState, useEffect } from "react";
import css from "../styles/Components/AddArticle.module.scss";

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

export default function AddArticle() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [text, setText] = useState("");
    const [date, setDate] = useState(undefined);
    const [author, setAuthor] = useState("");
    const [keyWord, setKeyWord] = useState('')
    const [articlesList, setArticlesList] = useState([]);

    const [imageUpload, setImageUpload] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    // const [tempoDisplayImages, setTempoDisplayImages] = useState([]);

    // **********************

    const imagesListRef = ref(storage, "images/");
    const router = useRouter();

    const createData = async (e) => {
        e.preventDefault();
        try {
            const time = formattedDateWithSeconds();
            const commentaryID = v4();

            const res = await fetch("/api/handlerArticle/id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: description,
                    title: title,
                    text: text,
                    date: time,
                    keyWord: keyWord,
                    commentaryID: commentaryID,
                    image: imageUrls,
                }),
            });
            const data = await res.json();
            console.log(data);

            try {
                toast.success(`Article uploaded ! `, {
                    autoClose: 2000,
                    theme: "colored",
                    closeOnClick: true,
                    pauseOnHover: false,
                });
                setTitle("");
                setKeyWord("");
                setDescription("");
                setText("");
                setDate(undefined);

                setImageUrls([]);
                setImageUpload([]);
                router.push("/");
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error.message);
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
                    <label>Key word</label>
                    <input
                        onChange={(e) => setKeyWord(e.target.value)}
                        type="text"
                        value={keyWord}
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

                <Button_main
                    name={"Submit"}
                    color={"blue"}
                    foo={(e) => createData(e)}
                />
            </form>
        </div>
    );
}

// Lorem ipsum dolor sit amet.

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur ipsa dolorem facilis sapiente maxime dolore repudiandae pariatur quisquam sunt animi et nulla aliquam atque perspiciatis, laudantium quae nisi omnis deserunt.

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, repellendus!
