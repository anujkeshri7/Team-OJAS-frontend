import React from 'react'
import Hero from '../components/Home/Hero'
import AboutClub from '../components/Home/AboutUs'
import Domains from '../components/Home/Domains'
import FeaturedProjects from '../components/Home/Projects'
import WhyJoinUs from '../components/Home/WhyJoinUs'
import TeamPreview from '../components/Home/Team'
import FinalCTA from '../components/Home/CTA'

function HomePage() {
  return (
    <div>
        <Hero/>
        <AboutClub/>
        <Domains/>
        <FeaturedProjects/>
        <WhyJoinUs/>
        <FinalCTA/>
      
    </div>
  )
}

export default HomePage
