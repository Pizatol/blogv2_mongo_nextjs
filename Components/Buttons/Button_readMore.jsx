

import React from 'react'
import css from '../../styles/Components/Buttons/Button_readMore.module.scss'

export default function Button_readMore({func}) {

  return (
	 <div>
		<button 
		onClick={func}
		className={`${css.custom_btn} ${css.btn_3}`}
		> <span>Read More</span> </button>
	 </div>
  )
}
