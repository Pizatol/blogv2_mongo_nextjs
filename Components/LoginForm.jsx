import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import FirebaseAuthService from "../Firebase/FirebaseAuthService";
import Image from "next/image";
import css from "../styles/Components/LoginForm.module.scss";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import personIcon from "../public/assets/icons/person_icon.svg";

export default function LoginForm() {
    const { user, setUser, formOn, setFormOn, userName, setUserName } =
        useContext(LoginContext);

    const [newAccompt, setNewAccompt] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const trimedUsername = username.replace(/@.*$/, "");

    const toggleForm = () => {
        setFormOn(!formOn);
    };

    const switchToLogIn = () => {
        setNewAccompt(!newAccompt);
    };

    // register
    const handleSignForm = async (e) => {
        e.preventDefault();
    };

    // login
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        if (!newAccompt) {
            try {
                await FirebaseAuthService.loginUser(username, password);

                setUsername("");
                setPassword("");
                toggleForm();
                // FirebaseAuthService.subscribeToAuthChanges(user);
                FirebaseAuthService.subscribeToAuthChanges(setUser);

                toast.success(`Welcome ${trimedUsername} `, {
                    autoClose: 1000,
                    theme: "colored",
                    closeOnClick: true,
                    pauseOnHover: false,
                });
                //    console.log(user.email);
                setUserName(trimedUsername);
            } catch (error) {
                toast.error(` Email or Password invalid `, {
                    autoClose: 2000,
                    theme: "colored",
                    closeOnClick: true,
                    pauseOnHover: false,
                });
                return;
            }
        } else {
            try {
                await FirebaseAuthService.registerUser(username, password);
                setUsername("");
                setPassword("");
                toast.success(`Welcome ${trimedUsername} `, {
                    autoClose: 2000,
                    theme: "colored",
                    closeOnClick: true,
                    pauseOnHover: false,
                });
            } catch (error) {
                toast.error("User already signed with this email");

                return;
            }
        }
    };
    // logout
    function handleLogout() {
        FirebaseAuthService.logoutUser();
        toggleForm();
    }

    const resetPassword = async () => {
        if (!username) {
            toast.error(` PLease enter an email !  `, {
                autoClose: 2000,
                theme: "colored",
                closeOnClick: true,
                pauseOnHover: false,
            });
            return;
        }
        try {
            FirebaseAuthService.sendPasswordResetEmail(username);
            // alert("sent the password reset email");
            toast.info("Your password has been reset !  ");
        } catch (error) {
            toast.error(` Email unknown !  `, {
                autoClose: 2000,
                theme: "colored",
                closeOnClick: true,
                pauseOnHover: false,
            });

            return;
        }
    };

    return (
        <div className={css.global_containerOn}>
            {formOn ? (
                <div>
                    <div onClick={toggleForm} className={css.overlay}></div>

                    <div className={css.login_form_card}>
                        <div className={css.login_form_icon_member_container}>
                            <Image
                                src={personIcon}
                                width={75}
                                height={75}
                                alt="icon member"
                            />
                        </div>
                        {!newAccompt ? (
                            <h2 className={css.login_form_title}>
                                MEMBER LOGIN
                            </h2>
                        ) : (
                            <h2 className={css.login_form_title}>SIGN IN </h2>
                        )}

                        <form
                            onSubmit={handleSubmitForm}
                            className={css.login_form_form_container}
                        >
                            <label>
                                <input
                                    className={css.form_input}
                                    type="email"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                    placeholder="Email ID"
                                />
                            </label>
                            <label>
                                <input
                                    className={css.form_input}
                                    type="password"
                                    required
                                    value={password}
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </label>
                            <div>
                                {!newAccompt ? (
                                    <button
                                        onSubmit={handleSubmitForm}
                                        className={css.login_form_login_button}
                                    >
                                        LOG IN
                                    </button>
                                ) : (
                                    <button
                                        onSubmit={handleSignForm}
                                        className={css.login_form_login_button}
                                    >
                                        SIGN IN
                                    </button>
                                )}
                            </div>
                            <div>
                                {newAccompt ? (
                                    <div>
                                        <p
                                            className={
                                                css.login_form_reset_text
                                            }
                                        >
                                            Or
                                            <button
                                                type="button"
                                                className={
                                                    css.login_form_reset_button
                                                }
                                                onClick={switchToLogIn}
                                            >
                                                Log In
                                            </button>{" "}
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p
                                            className={
                                                css.login_form_reset_text
                                            }
                                        >
                                            Forget Password ?
                                            <button
                                                type="button"
                                                className={
                                                    css.login_form_reset_button
                                                }
                                                onClick={resetPassword}
                                            >
                                                Click to reset
                                            </button>{" "}
                                        </p>

                                        <p
                                            className={
                                                css.login_form_reset_text
                                            }
                                        >
                                            Or
                                            <button
                                                type="button"
                                                className={
                                                    css.login_form_reset_button
                                                }
                                                onClick={switchToLogIn}
                                            >
                                                Sign In
                                            </button>{" "}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
