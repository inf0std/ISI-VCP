import SignInSignUp from "../component/formulaire/modalForms/SignINSignUp";
import DefaultNav from "../component/navBars/DefaultNav";
const Home = (props) => {
  return (
    <div className="Container">
      <DefaultNav username={null} />
      <SignInSignUp />
    </div>
  );
};

export default Home;
