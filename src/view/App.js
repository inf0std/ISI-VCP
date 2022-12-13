import './App.css';
import Sidebar from './component/userProfile/Sidebar';
import Feed from './component/userProfile/Feed';
import Head from './component/userProfile/Head';


function App(){
  return(
      
    <div className='app' >
       <Head/>
       <div className='app_body'>
        <Sidebar/>
        <Feed/>
       </div>
   </div>
  
  )
  
}
export default App;