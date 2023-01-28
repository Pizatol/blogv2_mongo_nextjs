import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import css from "../../styles/Pages/DetailledArticle.module.scss";
import Image from "next/image";
import img from "../../public/assets/images/2.jpg";
import connectMongo from "../../utils/connectMongo";
import Articles from "../../Models/articleModel";
// import Commentaires from "../../Models/commentaireModel";
import { LoginContext } from "../../context/LoginContext";
import ReactMarkdown from "react-markdown";
import CodeCopyBtn from "../../Components/CodeCopyBtn";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    deleteObject,
} from "firebase/storage";
import { storage } from "../../Firebase/FirebaseConfig";

import { Prism } from "prismjs";

export default function DetailledPage({ articles }) {
    const { user } = useContext(LoginContext);
    const router = useRouter();
    const slugID = Object.values(router.query);
    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState({});
    // const [commentaireSlug, setCommentaireSlug] = useState([]);

    useEffect(() => {
        // const newArr = articles.filter((item) => item._id === slugID[0]);
        setArticle(articles);
    }, [setArticle, article]);

    const deleteData = async () => {
        for (img of article.image) {
            const imgRef = ref(storage, `images/${img.name}`);
            deleteObject(imgRef)
                .then(() => {
                    // File deleted successfully
                    console.log("image deleted");
                })
                .catch((error) => {
                    // Uh-oh, an error occurred!
                    console.log(error.message);
                });
        }

        const articleID = router.query.DetailledPage;

        try {
            await fetch(`/api/DeleteArticle/${articleID}`, {
                method: "Delete",
            });

            router.push("/");
        } catch (error) {
            console.log(error);
        }

   
    };

    return (
        <div>
            <Link href={"/"}>
                <button>Retour</button>
            </Link>
            <div className={css.global_container}>
                <div className={css.image_container_upper}>
                    {loading === true &&
                    article.image &&
                    article.image.length > 0 ? (
                        <Image
                            className={css.image_card}
                            src={article.image[0].url}
                            alt="image blog"
                            fill
                        />
                    ) : (
                        <Image
                            className={css.image_card}
                            src={img}
                            alt="image blog"
                            fill
                            loading="lazy"
                        />
                    )}
                </div>
                {user ? (
                    <div>
                        <button onClick={deleteData}> delete</button>
                    </div>
                ) : (
                    ""
                )}

                <div className={css.data_container}>
                    <p>{article.author} </p>
                    <h4> {article.date}</h4>

                    <h1>{article.title} </h1>

                    <h3 className={css.description}>{article.description}</h3>

                    <ReactMarkdown
                        children={article.text}
                        className={css.markdown}
                        // components={{
                        //     code({
                        //         node,
                        //         inline,
                        //         className,
                        //         children,
                        //         ...props
                        //     }) {
                        //         return (
                        //             <SyntaxHighlighter
                        //                 children={String(children).replace(
                        //                     /\n$/,
                        //                     ""
                        //                 )}
                        //                 style={dark}

                        //                 PreTag="div"
                        //                 {...props}
                        //             />

                        //         );
                        //     },
                        // }}
                    />
                    <p></p>
                </div>

                <div className={css.images_container}>
                    {article.image
                        ? article.image.map((img, index) => (
                              <div
                                  className={css.image_container_mini}
                                  key={index}
                              >
                                  <a
                                      className={css.a_image}
                                      target="_blank"
                                      href={img.url}
                                  >
                                      <Image
                                          className={css.image}
                                          src={img.url}
                                          alt="image article"
                                          fill
                                          loading="lazy"
                                          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                                      />
                                  </a>
                              </div>
                          ))
                        : ""}
                </div>
            </div>

            {/* {commentaireSlug.length > 0 ? (
                <div>
                    {commentaireSlug.map((item, index) => (
                        <h1 key={index}> {item.commentaryText} </h1>
                    ))}
                </div>
            ) : (
                ""
            )} */}
        </div>
    );
}

export const getServerSideProps = async ({ params }) => {
    console.log("PARAMS", params.DetailledPage);
    const id = params.DetailledPage;
    try {
        await connectMongo();

        console.log("mongo connected");
        const articles = await Articles.findById(id);

        console.log("data fetched");

        return {
            props: {
                articles: JSON.parse(JSON.stringify(articles)),
            },
        };
    } catch (error) {
        console.log(error.message);
    }
};