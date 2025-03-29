import React from 'react'
import filterIon from '../assets/images/filter-icon.png';
import searchIcon from '../assets/images/search_icon.png';
import profileImg from '../assets/images/profile_image.png';
export default function Table({isSearch=false, isFilter=false,title="",subTitle=""}) {
  return (
    <div className='main-table-section'>
        <div className="table-header">
            <div className="text-heading-frame">
                {title && <h4 className='title-head' >{title}</h4>}
                {subTitle && <p className='text-para'>{subTitle || 'View historical data of actions taken within the app'}</p>}
            </div>
            <div className="right-search-filter">
                {isSearch &&
                <div className="global-search-fields">
                            <input type="text" placeholder='Search by user, date, or activity type' />
                            <span>
                                Search
                            </span>
                </div>
                }
                {isFilter && 
                 <img src={filterIon} alt="" className='filter-icon' />
                }
            </div>
        </div>
        <table className='table'>
            <thead>
                <tr>
                    <th><input type="checkbox" name="" id="" /></th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Date Time</th>
                    <th>React</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={5}>
                        <div className="table-data-sub-head">
                            <p className=''>Showing 5 of 5556 total users</p>
                            <h5 className=''>Select All</h5>
                        </div>
                    </td>
                </tr>
                {[1,2,3,4,5,6,7].map((item, index) =>{
                    return(
                        <tr>
                        <td><input type="checkbox" name="" id="" className='cheked-box' /></td>
                        <td>
                            <div className="user-name-wraper">
                                <img src={profileImg} alt="" className='profile' />
                                <h6 className='fs-16-13'>John Doe</h6>
                            </div>
                        </td>
                        <td> User</td>
                        <td>12/10/2025</td>
                        <td> ...</td>
                    </tr>
                    )
                })}
               
            </tbody>
        </table>
    </div>
  )
}
