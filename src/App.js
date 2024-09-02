import Remistura from './pages/remistura';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/remistura" element={<Remistura />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
