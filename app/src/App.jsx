import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import IndicatorsBanner from './components/IndicatorsBanner';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

const ScrollToAnchor = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.hash]);

  return null;
};

function App() {
  return (
    <div className="app d-flex flex-column min-vh-100">
      <Navbar />
      <IndicatorsBanner />
      <ScrollToAnchor />

      <main className="flex-fill">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;
