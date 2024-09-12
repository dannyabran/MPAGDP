import Remistura from './pages/remistura';
import HomePage from './pages/HomePage';
import Recolha from './pages/Recolha';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Divulgação from './pages/Divulgação';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/recolha' element={<Recolha />} />
        <Route path="/remistura" element={<Remistura />} />
        <Route path='/divulgação' element={<Divulgação />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
