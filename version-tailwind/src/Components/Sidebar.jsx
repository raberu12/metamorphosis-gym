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
            OverviewPage: 'overviewicon.png',
            MembershipPage: 'membership.png',
            ConsultationPage: 'consultation.png',
            EmailalertsPage: 'emailalert.png',
            SettingsPage: 'settings.png'
        }

        const personName = [
            {name: 'Jedd Juab'},
        ]

        

        


        return(
                <div className='bg-dark-elixir h-screen w-52 fixed text-white '>
                    <div className='text-center flex flex-col'>
                        <img src='icon.png' alt= 'profile pic' className='ml-14 mt-8 mb-20 w-24'/>
                        <h2 className='mb-4'>{personName[0].name}</h2>
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
                    <div className=' fixed mt-60 ml-8'>
                        <button 
                            className='bg-orangish w-36 h-12 rounded-lg cursor-pointer text-lg'>
                                <img src='log-out.png' className='absolute ml-4 w-8 h-8'></img>
                                <p className='ml-8'>Log out</p>
                        </button>
                    </div>
                </div>
        )
    }


    export default Sidebar