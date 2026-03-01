import React ,{useEffect,useState} from 'react'
import TeamComponents from '../components/Team/TeamCommponents'
import ConfirmRemovePopup from '../components/Team/ConfirmRemovePopup';

function TeamPage( {isAdminView = false} ) {

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [m, setM] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(()=>{
        window.scrollTo(0, 0);
      },[])

  return (
    <div>
      <TeamComponents refresh={refresh} setConfirmOpen={setConfirmOpen} setM={setM} isAdminView={isAdminView}/>
    {
      confirmOpen && (
        <ConfirmRemovePopup
          isOpen={true}
          member={m}
          onClose={() => {
            setConfirmOpen(false);
            setRefresh(!refresh); // Refresh the team list after removal
          }}
          
          />
      )
    }

    </div>
  )
}

export default TeamPage
