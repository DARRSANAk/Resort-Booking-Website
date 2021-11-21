import React, { useState, useContext, useEffect } from 'react'
import "./header.css"
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../utils/Context'

const Header = (props) => {
    const { setMenuOpen, menuOpen } = useContext(GlobalContext)
    let pageName = props.page

    const user = JSON.parse(localStorage.getItem('User'))

    return (
        <div className="fixed-header"
            style={menuOpen ? { backgroundColor: '#262626f6', backdropFilter: 'blur(0px)' } : {}}>
            <div className="header-content">
                <div className="brand">
                    <div className="page-name">
                        {pageName}
                    </div>
                </div>
                {user && (
                    <div className="collection">
                        <div class={`menu-icon ${menuOpen ? 'close-icon' : ''}`}
                            onClick={() => setMenuOpen(!menuOpen)}>
                            <div class="leftright"></div>
                            <div class="rightleft"></div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Header

