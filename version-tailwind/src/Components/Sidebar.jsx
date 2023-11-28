import React from 'react'
import { Link } from 'react-router-dom'


    function Sidebar() {

        const sidebarLinks = [
            {to: '/OverviewPage', text: 'Overview'},
            {to: '/MembershipPage', text: 'Membership'},
            {to: '/ConsultationPage', text: 'Consultation'},
            {to: '/EmailalertsPage', text: 'Email Alerts'},
            {to: '/SettingsPage', text: 'Settings'}
        ]

        const sidebarIcon = {
            OverviewPage: './images/overviewicon.png',
            MembershipPage: './images/membership.png',
            ConsultationPage: './images/consultation.png',
            EmailalertsPage: './images/emailalert.png',
            SettingsPage: './images/settings.png'
        }

        const personName = [
            {name: 'Jedd Juab'},
        ]

        const accountType = [
            {type: 'non-member'},
            {type: 'Basic'},
            {tpye: 'Elite'}
        ]

        


        return(
                <div className='bg-dark-elixir h-full mx-auto w-52 fixed text-white '>
                    <div className='text-center flex flex-col'>
                        <div className='mb-20 mt-8'>
                                <img src='./images/icon.png' alt= 'profile pic' className='ml-14 w-24'/>
                                <h2 className='mt-8'>{personName[0].name}</h2>
                                <h2>{accountType[0].type}</h2>
                        </div>
                        <ul>
                            {sidebarLinks.map((link, index) => (
                                <li
                                    key={index}
                                    className='hover:bg-sidebar cursor-pointer flex items-center'
                                >
                                    <img
                                        src={sidebarIcon[link.to.replace('/', '')]}
                                        alt={`${link.text} icon`}
                                        className='w-8 h-8 ml-4 mt-3 mb-4' 
                                    />
                                    
                                    <Link 
                                        to={link.to} 
                                        className='text-center ml-2'
                                        activeClassName='active bg-sidebar'
                                    >   
                                        {link.text}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className=' fixed mt-64 ml-8'>
                        <button 
                            className='bg-orangish w-36 h-12 rounded-xl cursor-pointer text-lg hover:bg-orange-800 transition-transform transform hover:scale-110 transition-duration-300'>
                                <img src='./images/log-out.png' className='absolute ml-4 w-8 h-8'></img>
                                <p className='ml-8'>Log out</p>
                        </button>
                    </div>
                </div>
        )
    }


    export default Sidebar