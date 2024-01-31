import React, { useState } from 'react';
import DashboardLogo from './../../assets/dashboard-logo.png';
import ProfilePic from './../../assets/profile_pic.enc'
import './Dashboard.css';
import FileUpload from './../../components/FileUpload/FileUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCalendar, faGear, faGrip, faSquarePollVertical, faSquarePollHorizontal, faFileInvoice, faHamburger } from '@fortawesome/free-solid-svg-icons';
import { faBell as faBellOutline } from '@fortawesome/free-regular-svg-icons';

const Dashboard = () => {
    const sidebarValues = [['Dashboard', faGrip], ['Upload', faSquarePollVertical], ['Invoice', faFileInvoice], ['Schedule', faSquarePollHorizontal], ['Settings', faGear], ['Notifications', faBell], ['Calendar', faCalendar]];
    const [selectedItem, setSelectedItem] = useState(sidebarValues[1][0]);
    const [sidebarShow, setSidebarShow] = useState(false);
    //on default the first item is selected
    if (!selectedItem) {
        setSelectedItem(sidebarValues[0]);
    }
    const handleItemClick = (item) => {
        setSelectedItem(item[0]);
    };

    return (
        <div className="dashboard">
            <div style={{left: sidebarShow ? '0':'-100%'}} className="sidebar-wrapper fixed top-0 left-0 lg:static lg:w-1/5 overflow-hidden transition-all ease-in-out duration-300 bg-white h-full">
                <div className="sidebar  flex flex-col items-center w-screen lg:w-full overflow-hidden h-full bg-white relative">
                    <div className="closeBtn absolute right-8 top-12 lg:hidden" onClick={()=>setSidebarShow(false)}>X</div>
                    <div className="sidebar-header flex mt-3 justify-center items-center font-medium w-full mr-4">
                        <img src={DashboardLogo} alt="logo" className='mr-0  w-20 h-20 pt-3 rouned-full' />
                        Base
                    </div>
                    <div className="sidebar-content px-3 mt-3 flex flex-col w-full">
                        {sidebarValues.map((item) => (
                            <div
                                key={item}
                                className={`sidebar-item flex justify-start items-center w-full mt-3 pl-8 h-12 rounded-lg ${selectedItem === item[0] ? 'selected' : ''}`}
                                onClick={() => handleItemClick(item)}
                            >
                                <FontAwesomeIcon className='sidebar-icon mr-3' icon={item[1]} />
                                {item[0]}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="main-section w-full lg:w-4/5 h-full px-5 lg:px-0 overflow-x-hidden">
                <div className='main-section-header'>
                    <FontAwesomeIcon className='hamburger-icon lg:hidden' onClick={()=>setSidebarShow(true)} icon={faHamburger} />
                    {selectedItem && <h1 className='hidden lg:block'>{selectedItem}</h1>}
                    <div className='main-section-header-icons'>
                        <FontAwesomeIcon className='main-section-header-icon' icon={faBellOutline} />
                        <img className='profile-pic' src={ProfilePic} alt='profile-pic' />
                    </div>
                </div>
                {selectedItem && (
                    <div>
                        <h1 className='lg:hidden'>{selectedItem}</h1>
                        {selectedItem === 'Upload' && <FileUpload />}
                        {selectedItem === 'Item 2' && <h2>Content for Item 2</h2>}
                        {selectedItem === 'Item 3' && <h2>Content for Item 3</h2>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
