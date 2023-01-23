import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import connectMongo from "../utils/connectMongo";
// import Test from '../models/testModel'
import Article_model from "../Models/articleModel";
export default function DetailledPage({ articles }) {
    const router = useRouter();
    const slugID = Object.values(router.query);

    const [data, setData] = useState([]);

    console.log("data", data);

    useEffect(() => {
        const newArr = articles.filter((item) => item._id === slugID[0]);
        setData(newArr);
    }, []);

    return (
        <div>
            <Link href={"/"}> Retour</Link>
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
            )}
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
