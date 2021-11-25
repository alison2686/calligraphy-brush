import React, {useState} from 'react'
import Video from '../../video/yellow-ink.mp4'
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
import {useNavigate} from 'react-router-dom';


const HeroSection = () => {
    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    let navigate = useNavigate();

    function handleClick() {
        navigate('/paint')
    }
 
    return (
        <HeroContainer id='home'>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video4/mp4' />
            </HeroBg>
            <HeroContent>
                <HeroH1>Calligraphy Brush</HeroH1>
                <HeroP>
                Digital ink brush for calligraphy, lettering and more!
                </HeroP>
                <HeroBtnWrapper>
                    <Button 
                        onClick={handleClick}
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
                        Continue to Calligraphy Brush {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                    
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
