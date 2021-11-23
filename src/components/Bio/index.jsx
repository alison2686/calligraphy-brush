import React from 'react'
import Icon1 from '../../images/svg-7.svg'
import Icon2 from '../../images/svg-8.svg'
import Icon3 from '../../images/svg-2.svg'
import { 
    ServicesContainer, 
    ServicesH1, 
    ServicesWrapper, 
    ServicesCard, 
    ServicesIcon, 
    ServicesH2, 
    ServicesP } from './Bio'

const Bio = () => {
    return (
        <ServicesContainer id='services'>
            <ServicesH1>
                Our Services
            </ServicesH1>
            <ServicesWrapper>
                <ServicesCard>
                    <ServicesIcon src={Icon1}/>
                    <ServicesH2>Corprorate travel</ServicesH2>
                    <ServicesP>Book a business trip or corporate retreat</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon2}/>
                    <ServicesH2>Road trips</ServicesH2>
                    <ServicesP> Plan your next road trip, hike or camping excursion
                    </ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon3}/>
                    <ServicesH2>Leisure getaways</ServicesH2>
                    <ServicesP> Finding those hidden gems is such a wonderful feeling
                    </ServicesP>
                </ServicesCard>
            </ServicesWrapper>
        </ServicesContainer>
    )
}

export default Bio
