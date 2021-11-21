import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const FooterContainer = styled.footer`
    background-color: #101522;
`
export const FooterWrap = styled.div`
    padding: 48px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
`

export const FooterLinksContainer = styled.div`
    display: flex;
    justify-content: center;

    @media screen and (max-width: 820px) {
        padding-top: 32px;
    }
`
export const FooterLinksWrapper = styled.div`
    display: flex;

    @media screen and (max-width: 820px) {
        flex-direction: column;
 }
`
export const FooterLinkItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 16px;
    text-align: left;
    width: 160px;
    box-sizing: borger-box;
    color: #fff;

    @media screen and (max-width: 420) {
        margin: 0;
        padding: 10px;
        width: 100%;
 }
`

export const FooterLinkTitle = styled.div`
    font-size: 14px;
    margin-bottom: 16px;
`

export const FooterLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 14px;

    &:hover {
        color: #01bf71;
        transition: 0.3s ease-out;
    }
`

export const SocialMedia = styled.section`
    max-width: 1000px;
    width: 100%;
`
export const SocialMediaWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1100px;
    margin: 40px auto 0 auto;

    @media screen and (max-width: 820px) {
        flex-direction: column;
    }
`

export const SocialLogo = styled(Link)`
    color: #fff;
    justify-self: start;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-weight: bold;
`

export const WebsiteRights = styled.small`
    color: #fff;
    margin-bottom: 16px;
` 
export const SocialIcons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 240px;
`

export const SocialIconLink = styled.a`
    color: #fff;
    font-size: 24px;
`
export const AffiliateLink = styled.a`
    color: #fff;
`
export const ImgWrap = styled.div`
    max-width: 90px;
    height: 100%;
`
export const Img = styled.img`
    margin-top: 2px;
    width: 75px;
    height: 75px;
    border-radius: 50px;
`