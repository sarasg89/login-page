import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faRightToBracket, faRightFromBracket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import Auth from '../utils/auth';

function NavItem({ to, className, icon, text }) {
    return (
        <NavLink exact="true" activeclassname="active" className={className} to={to}>
            <div className="icon-container">
                <FontAwesomeIcon icon={icon} color="#343131" />
            </div>
            <div className="text-container">
                <span>{text}</span>
            </div>
        </NavLink>
    )
}

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const closeMobileMenu = () => {
        setIsOpen(false);
    };

    return (
        <header>
            <div className="logo">
                <Link to="/">
                    {/* <img src={Logo} alt="logo"></img> */}
                </Link>
            </div>
            <nav>
                <NavItem to="/" className="home-link" icon={faHome} text="HOME" />
                {Auth.loggedIn() &&
                    <NavItem to="/profile" className="profile-link" icon={faUser} text="PROFILE" />
                }
                {Auth.loggedIn() ?
                    <NavItem to="/logout" className="logout-link" icon={faRightFromBracket} text="LOGOUT" />
                    :
                    <NavItem to="/login" className="login-link" icon={faRightToBracket} text="LOGIN" />
                }
            </nav>
            <button className="hamburger" onClick={handleToggle}>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
            {isOpen && (
                <div className="mobile-menu">
                    <NavLink exact={true} activeclassname="active" to="/" onClick={closeMobileMenu}>HOME</NavLink>
                    {Auth.loggedIn() &&
                        <NavLink exact={true} activeclassname="active" to="/profile" onClick={closeMobileMenu}>PROFILE</NavLink>
                    }
                    {Auth.loggedIn() ?
                        <NavLink exact={true} activeclassname="active" to="logout" onClick={closeMobileMenu}>LOGOUT</NavLink>
                        :
                        <NavLink exact={true} activeclassname="active" to="login" onClick={closeMobileMenu}>LOGIN</NavLink>
                    }
                </div>
            )}
        </header>
    )
};

export default Navbar;