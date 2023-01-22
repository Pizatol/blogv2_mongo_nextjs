
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import connectMongo from '../utils/connectMongo'
import Test from '../models/testModel'
export default function DetailledPage({articles}) {

  const router = useRouter()
  const slugID = Object.values(router.query)

  
  const [data, setData] = useState([])
  
  console.log(data);

  useEffect(() => {
    const newArr = articles.filter(item => item._id === slugID[0] )
    setData(newArr)
  }, [])

  return (
	 <div>

    <Link href={"/"} > Retour</Link>
    <h1>TEST</h1>
    {data.length > 0 ? (

      <div>
        <h1> {data[0].name} </h1>
         <p>{data[0].email} </p>
      </div>
    ) : ''}

   </div>
  )
}



export const getServerSideProps = async () => {
  try {
  
    await connectMongo();
  
    console.log("mongo connected");
    const articles = await Test.find()
    console.log('data fetched');

    return {
      props : {
        articles : JSON.parse(JSON.stringify(articles))
      }
    }
    
} catch (error) {
    console.log(error.message);
  
}
}