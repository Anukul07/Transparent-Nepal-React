import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/authentication/login";
import Explore from "./components/Explore"; // Assume you have this component for the 'Explore' page
import Companies from "./components/Companies";
import Faq from "./components/Faq";
import SuccessDialog from "./components/common/SuccessDialog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/faq" element={<Faq />} />
        {/* You can add other routes as necessary */}
      </Routes>
    </Router>
  );
}

export default App;
