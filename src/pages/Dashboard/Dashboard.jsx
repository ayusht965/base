import React, { useState } from 'react';
import DashboardLogo from './../../assets/dashboard-logo.png';
import ProfilePic from './../../assets/profile_pic.enc'
import './Dashboard.css';
import FileUpload from './../../components/FileUpload/FileUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCalendar, faGear, faGrip, faSquarePollVertical, faSquarePollHorizontal, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { faBell as faBellOutline } from '@fortawesome/free-regular-svg-icons';

const Dashboard = () => {
    const sidebarValues = [['Dashboard', faGrip], ['Upload', faSquarePollVertical], ['Invoice', faFileInvoice], ['Schedule', faSquarePollHorizontal],['Settings', faGear], ['Notifications', faBell], ['Calendar', faCalendar]];
    const [selectedItem, setSelectedItem] = useState(sidebarValues[0][0]);

    //on default the first item is selected
    if (!selectedItem) {
        setSelectedItem(sidebarValues[0]);
    }
    const handleItemClick = (item) => {
        setSelectedItem(item[0]);
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="sidebar-header">
                    <img src={DashboardLogo} alt="logo" />
                    Base
                </div>
                <div className="sidebar-content">
                    {sidebarValues.map((item) => (
                        <div
                            key={item}
                            className={`sidebar-item ${selectedItem === item[0] ? 'selected' : ''}`}
                            onClick={() => handleItemClick(item)}
                        >
                            <FontAwesomeIcon className='sidebar-icon' icon={item[1]} />
                            {item[0]}
                        </div>
                    ))}
                </div>
            </div>

            <div className="main-section">
            <div className='main-section-header'>
                    {selectedItem && <h1>{selectedItem}</h1>}
                    <div className='main-section-header-icons'>
                        <FontAwesomeIcon className='main-section-header-icon' icon={faBellOutline} />
                        <img className='profile-pic' src={ProfilePic} alt='profile-pic' />
                    </div>
                </div>
                    {selectedItem && (
                        <div>
                            {/* Render content based on the selected item */}
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
