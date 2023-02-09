import SignInSignUp from "../component/formulaire/modalForms/SignINSignUp";
import DefaultNav from "../component/navBars/DefaultNav";
const Home = ({ user, changeUser }) => {
  return (
    <div className="Container">
      <DefaultNav user={user} />
      {!props.state._user.name && (
        <SignInSignUp user={user} changeUser={changeUser} />
      )}
    </div>
  );
};

export default Home;
