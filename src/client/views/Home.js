import SignInSignUp from "../component/formulaire/modalForms/SignINSignUp";
import DefaultNav from "../component/navBars/DefaultNav";
const Home = (props) => {
  return (
    <div className="Container">
      <DefaultNav user={props.state._user} />
      {!props.state._user.name && (
        <SignInSignUp handlers={{ user: props.handlers.handleChangeUser }} />
      )}
    </div>
  );
};

export default Home;
