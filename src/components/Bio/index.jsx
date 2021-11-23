import React from 'react'
// import Icon1 from '../../images/bridge.svg'
import Icon2 from '../../images/bio.jpg'
// import Icon3 from '../../images/svg-2.svg'
import { 
    BioContainer, 
    BioH1, 
    BioWrapper, 
    BioCard, 
    BioIcon, 
    BioH2,
    BioH3, 
    BioP } from './Bio'

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
                </BioCard>
            </BioWrapper>
        </BioContainer>
    )
}

export default Bio
