import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import EditProduct from "./EditProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editar/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
