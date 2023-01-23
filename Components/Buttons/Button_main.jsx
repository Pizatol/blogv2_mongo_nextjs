import React, { useContext } from "react";

import css from "../../styles/Components/Buttons/Button_main.module.scss";

export default function Button_main({ foo, name, color }) {
    return (
        <>
        {color === "blue" ? ( 

            <button
                onClick={foo}
                type="submit"
                className={`${css.global_container} ${css.blue}`}
            >
                {name}
            </button>
        ) :'' }
        {color === "red" ? (
            <button
                onClick={foo}
                type="submit"
                className={`${css.global_container} ${css.red}`}
            >
                {name}
            </button>
        ) : ''}
        
        {color === "orange" ? ( 

<button
    onClick={foo}
    type="submit"
    className={`${css.global_container} ${css.orange}`}
>
    {name}
</button>
) :'' }


        </>
    );
}
