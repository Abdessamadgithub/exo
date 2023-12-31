
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import {Home} from './components/Home';
import {Participant} from './components/participant';
import { Formateur } from "./components/formateur";
import {Add} from "./components/ajouter";
import { Update } from "./components/update";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/participant" element={<Participant />} />
        <Route path="/formateur" element={<Formateur />} />
        <Route path="/ajouter" element={<Add/>} />
        <Route path="/update" element={<Update/>} />
      </Routes>
    </Router>
    </>
  )


}

export default App;
