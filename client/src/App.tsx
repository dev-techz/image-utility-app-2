import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CompressImage from './pages/CompressImage';
import ResizeImage from './pages/ResizeImage';
import ConvertImage from './pages/ConvertImage';
import CropImage from './pages/CropImage';
import RotateFlipImage from './pages/RotateFlipImage';
import RemoveBgImage from './pages/RemoveBgImage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compress" element={<CompressImage />} />
          <Route path="/resize" element={<ResizeImage />} />
          <Route path="/convert" element={<ConvertImage />} />
          <Route path="/crop" element={<CropImage />} />
          <Route path="/rotate" element={<RotateFlipImage />} />
          <Route path="/remove-bg" element={<RemoveBgImage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
