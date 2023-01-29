import React, { useState, useContext, useEffect } from "react";
import css from "../styles/Pages/NewArticle.module.scss";
import { useRouter } from "next/router";
import { LoginContext } from "../context/LoginContext";
import FirebaseAuthService from "../Firebase/FirebaseAuthService";
import AddArticle from "../Components/AddArticle";
import Link from "next/link";
import Button_transparent from "../Components/Buttons/Button_transparent";


export default function NewArticle({ articles }) {
    const { user, setUser, formOn, setFormOn, userName, setUserName } =
        useContext(LoginContext);
    FirebaseAuthService.subscribeToAuthChanges(setUser);

    const router = useRouter();
    const query = router.query.id;
   

    if(query){
        const fecthing = async () => {
            await connectMongo()

            const data = await Articles.findById(query.id).exec()
            console.log(data);
        }
    }

    console.log(query);

    useEffect(() => {
        user ? "" : router.push("/");
    }, []);

    return (
        <div className={css.global_container}>
            <div className={css.btn_return}>
                <Link href={"/"}>
                    <Button_transparent name={"Retour"} />
                </Link>
            </div>
            <div>
                <AddArticle />
            </div>
        </div>
    );
}

// export const getServerSideProps = async ({ id }) => {
//     console.log(id);
//     try {
//         await connectMongo();

//         console.log("mongo connected");
//         const articles = await Articles.findById(id);

//         console.log("data fetched");

//         return {
//             props: {
//                 articles: JSON.parse(JSON.stringify(articles)),
//             },
//         };
//     } catch (error) {
//         console.log(error.message);
//     }
// };
