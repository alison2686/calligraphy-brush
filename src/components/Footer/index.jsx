import React from 'react'
import { 
    FaLinkedin, 
    FaInstagram, 
    FaYoutube 
} from 'react-icons/fa'
import {animateScroll as scroll} from 'react-scroll'
import { 
    FooterContainer, 
    FooterWrap, 
    FooterLinksContainer, 
    FooterLinksWrapper, 
    FooterLinkItems, 
    FooterLinkTitle, 
    FooterLink,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    SocialIcons,
    SocialIconLink,
    WebsiteRights,
    AffiliateLink,
    ImgWrap,
    Img
} from './FooterElements'
import logo from '../../images/elan_logo_black_background.png';

const Footer = () => {
    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>About Us</FooterLinkTitle>
                                <FooterLink to='/about'>How it works</FooterLink>
                                <FooterLink to='/about'>Testimonials</FooterLink>
                                <FooterLink to='/about'>Travel Blog</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                        <FooterLinkTitle>Contact Us</FooterLinkTitle>
                                <FooterLink to='/about'>Contact</FooterLink>
                                <FooterLink to='/about'>Support</FooterLink>
                                <FooterLink to='/about'>Destinations</FooterLink>
                                <FooterLink to='/about'>Travel Updates</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Affiliates</FooterLinkTitle>
                            <AffiliateLink href="//www.bravobeachvacations.com/">Bravo Beach Vacations</AffiliateLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to='/' onClick={toggleHome}>                        
                            <ImgWrap>
                                <Img src={logo} alt='Elan Travel Services'/>
                            </ImgWrap>
                        </SocialLogo>
                        <WebsiteRights>elan travel © {new Date().getFullYear()} All rights reserved</WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href='//www.instagram.com' target='_blank' aria-label='Instagram'>
                                <FaInstagram />
                            </SocialIconLink>
                            <SocialIconLink href='//wwwlinkedin.com' target='_blank' aria-label='Linkedin'>
                                <FaLinkedin />
                            </SocialIconLink>
                            <SocialIconLink href='//www.youtube.com' target='_blank' aria-label='Youtube'>
                                <FaYoutube />
                            </SocialIconLink>
                        </SocialIcons>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer
