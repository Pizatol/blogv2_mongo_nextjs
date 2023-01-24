import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import css from "../styles/Pages/DetailledArticle.module.scss";
import Image from "next/image";
import connectMongo from "../utils/connectMongo";
import ReactMarkdown from "react-markdown";
import img from "../public/assets/images/2.jpg";
import Article_model from "../Models/articleModel";
export default function DetailledPage({ articles }) {
    const router = useRouter();
    const slugID = Object.values(router.query);
    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState({});

    useEffect(() => {
        const newArr = articles.filter((item) => item._id === slugID[0]);
        setArticle(newArr[0]);
    }, []);

    return (
        <div>
            {/* <Link href={"/"}> Retour</Link>
            <h1>TEST</h1>
            {data.length > 0 ? (
                <div>
                    <h1> {data[0].title} </h1>
                    <p>{data[0].author} </p>

                    {data[0].image.length > 0 ? (
                        <div>
                            <Image
                                src={data[0].image[0].url}
                                height={300}
                                width={300}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )} */}

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

                <div className={css.data_container}>
                    <p>{article.author} </p>
                    <h4> {article.date}</h4>

                    <h1>{article.title} </h1>

                    <h3 className={css.description}>{article.description}</h3>

                    <ReactMarkdown
                        children={article.text}
                        className={css.markdown}
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
        </div>
    );
}

export const getServerSideProps = async () => {
    try {
        await connectMongo();

        console.log("mongo connected");
        const articles = await Article_model.find();
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
