import React, { useEffect, useState } from 'react'
import commonGetApi from '../server/Api';

export default function Home() {
  const [data,setData]=useState([]);
  async function getData(){
    const data=await commonGetApi('https://randomuser.me/api/?page=1&results=1');
    console.log(data)
    setData(data.data)
  }
  useEffect(()=>{
   getData()
  },[])
  return (
    <section className='main-home-section'>
this is Home
    </section>
  )
}
