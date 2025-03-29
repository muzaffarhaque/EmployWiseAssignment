import React from 'react'
import { NavLink } from 'react-router-dom';

export default function SideNaveBar() {
    const sidebarMenu = [
  { name: "Dashboard", route: "/dashboard" },
  { name: "User Management", route: "/user-management" },
  { name: "Rating and Review", route: "/rating-review" },
  { name: "Settings", route: "/settings" },
  { name: "History", route: "/history" },
  { name: "All Bookings", route: "/all-bookings" },
  { name: "Push Notification", route: "/push-notification" },
  { name: "Transaction List", route: "/transaction-list" },
  { name: "Google Analytics", route: "/google-analytics" },
  { name: "Multi-Currency", route: "/multi-currency" },
  { name: "Category", route: "/category" },
  { name: "Live Chat History", route: "/live-chat-history" },
  { name: "Package Plan", route: "/package-plan" },
  { name: "Referral History", route: "/referral-history" },
  { name: "Google Map", route: "/google-map" }
];



  return (
    <nav className='nav-bar'>
        <div className="logo-head"> Logo </div>
        <ul>
            {sidebarMenu.map((item, index) =>{
                return(
                    <li key={index} onClick={()=>{}}> 
                        <NavLink to={item.route} activeClassName="active">{item.name}</NavLink>
                    </li>
                )
            })}
            
        </ul>
    </nav>
  )
}
