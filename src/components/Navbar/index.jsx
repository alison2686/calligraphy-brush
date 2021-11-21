import React, {useState, useEffect} from 'react'
import {FaBars} from 'react-icons/fa'
import {IconContext} from 'react-icons/lib'
import {animateScroll as scroll} from 'react-scroll'
import { 
    Nav, 
    NavbarContainer, 
    NavLogo, 
    MobileIcon, 
    NavMenu, 
    NavItem, 
    NavLinks,
    NavBtn,
    NavBtnLink,
    ImgWrap,
    Img
} from './NavbarElements'
// import logo from '../../images/elan_logo_black_whitebackground.png';

const Navbar = ({ toggle }) => {
const [scrollNav, setScrollNav] = useState(false)

const changeNav = () => {
    if(window.scrollY >= 80) {
        setScrollNav(true)
    } else {
        setScrollNav(false)
    }
}

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, [])

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <React.Fragment>
        <IconContext.Provider value={{ color: '#fff'}}>
            <Nav scrollNav={scrollNav}>
                <NavbarContainer>
                {/* <img src={logo} alt='Elan Travel Services'/> */}
                    {/* <NavLogo to="/" onClick={toggleHome}>
                        <ImgWrap>
                            <Img src={logo} alt='Elan Travel Services'/>
                        </ImgWrap>
                    </NavLogo> */}
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="discover"
                            scrollNav={scrollNav}
                            smooth={true} 
                            duration={500} 
                            spy={true} 
                            exact='true' 
                            offset={-80}                            
                            >Discover</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="services"
                            scrollNav={scrollNav}
                            smooth={true} 
                            duration={500} 
                            spy={true} 
                            exact='true' 
                            offset={-80}                        
                            >Travel Services</NavLinks>
                        </NavItem>
                        <NavItem>
                        <NavLinks to="contact"
                            scrollNav={scrollNav}
                            smooth={true} 
                            duration={500} 
                            spy={true} 
                            exact='true' 
                            offset={-80}                           
                            >Contact Us</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="aboutElana"
                            scrollNav={scrollNav}
                            smooth={true} 
                            duration={500}
                            spy={true} 
                            exact='true' 
                            offset={-80}
                            >About</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink 
                            onClick={event => window.location.href='https://apps.itams.com/TASLive/customer/register?id=0x00d5a26df3a6ab468d3b11145121e520010000000ab765624c1bd406a5ba080d3b4b3f2e871bad6ebd20f05036e8e520e1b5cdf7'}
                        >
                            Book A Trip
                        </NavBtnLink>
                    </NavBtn>
                </NavbarContainer>
            </Nav>
            </IconContext.Provider>
        </React.Fragment>
    )
}

export default Navbar;
