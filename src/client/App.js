import React from 'react';
/*import PrgmReunion from'./component/Programmer/PrgmReunion'*/
/*import PrgmConference from'./component/Programmer/PrgmConference'*/
import PrgmConference from'./component/Programmation/PrgmConference'
import PrgmDebat from'./component/Programmation/PrgmDebat'
import NewOrganization from './component/Create/NewOrganization';
import NewGroupe from './component/Create/NewGroupe';
import PrgmReunion from './component/Programmation/PrgmReunion';
/*import Organisation from './component/Create/organisation';*/



const App = () => {
  return (
    <div>
      <PrgmReunion />
      <PrgmConference />
       <PrgmDebat />
      <NewOrganization />
  <NewGroupe />
    

      
    </div>
  );
};

export default App;