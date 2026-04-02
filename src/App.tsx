import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Landing from './Landing';
import { Privacy } from './Privacy';
import { Terms } from './Terms';
import { Cookies } from './Cookies';
import { Technology } from './Technology';
import { ToolsHub } from './ToolsHub';
import { CycleCalculator } from './tools/CycleCalculator';
import { WorkoutGenerator } from './tools/WorkoutGenerator';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/privacidade" element={<Privacy />} />
        <Route path="/termos" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/tecnologia" element={<Technology />} />

        {/* Tools Ecosystem */}
        <Route path="/ferramentas" element={<ToolsHub />} />
        <Route path="/ferramentas/ciclo-e-treino" element={<CycleCalculator />} />
        <Route path="/ferramentas/gerador-de-treino" element={<WorkoutGenerator />} />

        {/* Fallback to home */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
