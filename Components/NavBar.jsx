import css from "../styles/Components/NavBar.module.scss";
import React, { useState, useContext, useEffect } from "react";
import { LoginContext } from "../context/LoginContext";
import FirebaseAuthService from "../Firebase/FirebaseAuthService";

import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Button_main from "./Buttons/Button_main";
import Button_transparent from "./Buttons/Button_transparent";

export default function NavBar() {
    const { user, setUser, formOn, setFormOn, userName, setUserName } =
        useContext(LoginContext);

       
        
        useEffect(() => {
        FirebaseAuthService.subscribeToAuthChanges(setUser);

        
        setUserName(userName);
    }, [user, setUser, userName]);


    const router = useRouter();

    const toggleForm = () => {
        setFormOn(!formOn);
    };

    const logOut = () => {
        FirebaseAuthService.logoutUser();
        router.push("/");

        toast.info(`Bye `, {
            autoClose: 1000,
            theme: "colored",
            closeOnClick: true,
            pauseOnHover: false,
        });
    };

    return (
        <div className={css.global_container}>
            <div className={css.left}>
                {/* {user ? (
                    <div>
                        <h3>
                            welcome,{" "}
                            <span className={css.userName}> {userName}</span>{" "}
                        </h3>
                    </div>
                ) : (
                    ""
                )} */}
            </div>
            <div className={css.middle}>
                <h1>Le Blog</h1>
             
            </div>
            <div className={css.right}>
                {user ? (
                    <Button_transparent name={"log out"} foo={logOut} />
                ) : (
                    <Button_transparent name={"log"} foo={toggleForm} />
                )}
            </div>
        </div>
    );
}
