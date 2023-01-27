import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import css from "../styles/Pages/DetailledArticle.module.scss";
import Image from "next/image";
import img from "../public/assets/images/2.jpg";
import connectMongo from "../utils/connectMongo";
import Articles from "../Models/articleModel";
import Commentaires from "../Models/commentaireModel";
import { LoginContext } from "../context/LoginContext";
import ReactMarkdown from "react-markdown";
import CodeCopyBtn from "../Components/CodeCopyBtn";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function DetailledPage({ articles, commentaires }) {
    const { user } = useContext(LoginContext);
    const router = useRouter();
    const slugID = Object.values(router.query);
    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState({});
    const [commentaireSlug, setCommentaireSlug] = useState([]);

    useEffect(() => {
        const newArr = articles.filter((item) => item._id === slugID[0]);
        setArticle(newArr[0]);

        const newArrCom = commentaires.filter(
            (item) => item.articleID == slugID[0]
        );

        setCommentaireSlug(Object.values(newArrCom));
    }, [setCommentaireSlug, setArticle, article]);

    const Pre = ({ children }) => (
        <pre className={css.blog_pre}>
            <CodeCopyBtn>{children}</CodeCopyBtn>
            {children}
        </pre>
    );

    return (
        <div>
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
                        <button> delete</button>
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
                        components={{
                            pre: Pre,
                            code({
                                node,
                                inline,
                                className = "blog-code",
                                children,
                                ...props
                            }) {
                                const match = /language-(\w+)/.exec(
                                    className || ""
                                );
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={a11yDark}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
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

            {commentaireSlug.length > 0 ? (
                <div>
                    {commentaireSlug.map((item, index) => (
                        <h1 key={index}> {item.commentaryText} </h1>
                    ))}
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export const getServerSideProps = async () => {
    try {
        await connectMongo();

        console.log("mongo connected");
        const articles = await Articles.find();
        const commentaires = await Commentaires.find();
        console.log("data fetched");

        return {
            props: {
                articles: JSON.parse(JSON.stringify(articles)),
                commentaires: JSON.parse(JSON.stringify(commentaires)),
            },
        };
    } catch (error) {
        console.log(error.message);
    }
};
