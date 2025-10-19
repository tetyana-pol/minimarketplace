import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage} from "./components/HomePage";
import { NotFound } from "./components/NotFound";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:projectId" element={<HomePage/>} />
          <Route path="/create-project" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
