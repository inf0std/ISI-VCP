import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/home/Home";
import Messagerie from "./component/messagerie/Messagerie";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Messagerie />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
