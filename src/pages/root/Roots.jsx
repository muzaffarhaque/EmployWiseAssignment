import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, SideNaveBar } from '../../components'
import weaveImg from '../../assets/images/dash-bg.png'

export default function Roots() {
  return (
    <section className='outlet-root-main-section'>
        <img src={weaveImg} alt="" className='wave-be-img'/>
        <div className="outlet-root-wrapper">
        <div className="root-nave-section">
            <SideNaveBar/>
        </div>
        <div className="root-content-body">
            <Header/>
           <Outlet/>
        </div>
        </div>
    </section>
  )
}
