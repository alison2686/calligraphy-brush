import React, { useState } from 'react'
// import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
// import InfoSection from '../components/InfoSection'
// import { 
//     homeObjOne,
//     homeObjTwo,
//     homeObjThree,
//     homeObjFour
// } from '../components/InfoSection/Data'
// import Navbar from '../components/Navbar'
// import Sidebar from '../components/Sidebar'
// import Services from '../components/TravelServices'

const Home = () => {
    // const [isOpen, setIsOpen] = useState(false)

    // const toggle = () => {
    //   setIsOpen(!isOpen)
    // }

    return (
        <React.Fragment>
            {/* <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle}/> */}
            <HeroSection />
            {/* <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjTwo} />
            <Services />
            <InfoSection {...homeObjThree} />
            <InfoSection {...homeObjFour} />
            <Footer /> */}
        </React.Fragment>
    )
}

export default Home