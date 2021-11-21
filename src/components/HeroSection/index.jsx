import React, {useState} from 'react'
import Video from '../../videos/video4.mp4'
import {Button} from '../ButtonElement'
import { 
    HeroContainer, 
    HeroBg, 
    VideoBg, 
    HeroContent, 
    HeroH1, 
    HeroP, 
    HeroBtnWrapper, 
    ArrowForward, 
    ArrowRight 
} from './HeroElements'

const HeroSection = () => {
    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }
 
    return (
        <HeroContainer id='home'>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video4/mp4' />
            </HeroBg>
            <HeroContent>
                <HeroH1>Looking for a reason to get away?</HeroH1>
                <HeroP>
                Stop looking and just book it!
                </HeroP>
                <HeroBtnWrapper>
                    <Button 
                        onClick={event => window.location.href='https://apps.itams.com/TASLive/customer/register?id=0x00d5a26df3a6ab468d3b11145121e520010000000ab765624c1bd406a5ba080d3b4b3f2e871bad6ebd20f05036e8e520e1b5cdf7'}
                        onMouseEnter={onHover}
                        onMouseLeave={onHover}
                        primary='true'
                        dark='true'
                        smooth={true} 
                        duration={500} 
                        spy={true} 
                        exact='true' 
                        offset={-80}    
                    >
                        Get Started {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
