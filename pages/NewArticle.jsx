import React, { useState, useContext, useEffect } from "react";
import css from "../styles/Pages/NewArticle.module.scss";
import { useRouter } from "next/router";
import { LoginContext } from "../context/LoginContext";
import FirebaseAuthService from "../Firebase/FirebaseAuthService";
import AddArticle from "../Components/AddArticle";
import Link from "next/link";
import Button_transparent from "../Components/Buttons/Button_transparent";

export default function NewArticle() {
    const { user, setUser, formOn, setFormOn, userName, setUserName } =
        useContext(LoginContext);
    FirebaseAuthService.subscribeToAuthChanges(setUser);

    const router = useRouter();

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
