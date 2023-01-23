

import React from 'react'
import css from '../../styles/Components/Buttons/Button_transparent.module.scss'


export default function Button_transparent( {name, foo, red}) {
  return (
	<div>
	{red === true ? (
		<button 
	onClick={foo}
	className={`${css.custom_btn_red} ${css.btn_3}`}
	> <span> {name} </span> </button>
	) : (
		<button 
	onClick={foo}
	className={`${css.custom_btn} ${css.btn_3}`}
	> <span> {name} </span> </button>
	) }
	
 </div>
  )
}
