import React from "react";
import css from "../../styles/Button_input.module.scss";

export default function Button_input({ props, input, file, onImageUpload,  }) {


   
    return (
        <div  className={
			file.length  === 0
				 ? `${css.global_container}`
				 : ` ${css.disabled}`
	  }>
     

            <label for='pic' >
                {props}

                <input
					 className={css.input}
                   title=" "
                    id="pic"
                    type="file"
                    onChange={input}
                    // onChange={(e) => onImageUpload(e)}
                />
            </label>
        </div>
    );
}
