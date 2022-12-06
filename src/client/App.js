import React from 'react';
import PrgmReunion from'./component/Programmer/PrgmReunion'
import PrgmConference from'./component/Programmer/PrgmConference'
import PrgmDebat from'./component/Programmer/PrgmDebat'



const App = () => {
  return (
    <div>
      <PrgmReunion />
      <PrgmConference />
      <PrgmDebat />
    </div>
  );
};

export default App;