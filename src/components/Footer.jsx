import React from 'react'
import logo from "../images/logo.svg"
import "../css/Footer.css"
import { Typography } from '@mui/material'

export default function Footer() {
    return (
        <div className='footerDiv'>
            <img className='logoIcon' src={logo} alt='siteLogo'/>
            <Typography style={{color:"gray",fontSize:"14px",paddingTop:"1%"}} variant='body1'>© 2023 BookStore.com. All rights reserved.</Typography>
        </div>
    )
}
