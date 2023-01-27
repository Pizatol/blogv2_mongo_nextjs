
import React, {useState} from "react";
import css from "../styles/Components/CodeCopyBtn.module.scss";
import copyFile from '../public/assets/icons/copyFile.svg'
import copyFileOk from '../public/assets/icons/copyFileOk.svg'
import Image from "next/image";

export default function CodeCopyBtn({ children }) {
    const [copyOk, setCopyOk] = useState(false);

    const iconColor = copyOk ? '#0af20a' : '#ddd';
    const icon = copyOk ? copyFileOk : copyFile;

    const handleClick = (e) => {
        navigator.clipboard.writeText(children[0].props.children[0]);
        console.log(children)

        setCopyOk(true);
        setTimeout(() => {
            setCopyOk(false);
        }, 500);
    }

    return (
        <div className={css.code_copy_btn}>
          
				<Image
				style={{color: iconColor}}
					src={icon}
					alt="copy button"
					width={40}
					height={40}
					onClick={handleClick}
				/>
        </div>
    )
}