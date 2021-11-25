import React from 'react'
import HeroSection from '../components/HeroSection'
import InfoSection from '../components/InfoSection'
import { 
    homeObjOne,
    homeObjTwo,
} from '../components/InfoSection/Data'
import Bio from '../components/Bio'

const Home = () => {
    return (
        <React.Fragment>
            <HeroSection />
            <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjTwo} />
            <Bio />
        </React.Fragment>
    )
}

export default Home