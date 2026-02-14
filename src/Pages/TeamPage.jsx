import React ,{useEffect} from 'react'
import TeamComponents from '../components/Team/TeamCommponents'

function TeamPage() {

  useEffect(()=>{
        window.scrollTo(0, 0);
      },[])

  return (
    <div>
      <TeamComponents/>
    </div>
  )
}

export default TeamPage
