import React from 'react'
import Icon2 from '../../images/bio.jpg'
import { 
    BioContainer, 
    BioH1, 
    BioWrapper, 
    BioCard, 
    BioIcon, 
    BioH2,
    BioH3, 
    BioP, 
    SocialLinks, 
    SocialIcon
 } from './Bio'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"

const Bio = () => {
    return (
        <BioContainer id='services'>
            <BioH1>
                Hi! I'm Alison.
            </BioH1>
            <BioWrapper>
                <BioCard>
                    <BioIcon src={Icon2}/>
                    <BioH2>Front End Developer</BioH2>
                    <BioH3>San Francisco, CA</BioH3>
                    <BioP> Check out my GitHub Profile or Find Me on LinkedIn
                    </BioP>
        
                    <SocialLinks>
                    <a target="_blank" rel="noreferrer" href="http://www.linkedin.com/in/alison-lee-4547b114">
                        <SocialIcon>
                        <FontAwesomeIcon icon={faLinkedin} />
                        </SocialIcon>
                    </a>
                    <a target="_blank" rel="noreferrer" href="https://github.com/alison2686">
                        <SocialIcon>
                        <FontAwesomeIcon icon={faGithub} />
                        </SocialIcon>
                    </a>
                    </SocialLinks>
          
                </BioCard>
            </BioWrapper>
        </BioContainer>
    )
}

export default Bio
