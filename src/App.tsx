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
import { ProteinCalculator } from './tools/ProteinCalculator';
import { TrainingDiagnostic } from './tools/TrainingDiagnostic';
import { GuideTip } from './tools/GuideTip';

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

        {/* Guia Artemis Ecosystem */}
        <Route path="/guia" element={<ToolsHub />} />
        <Route path="/guia/ciclo-e-treino" element={<CycleCalculator />} />
        <Route path="/guia/gerador-de-treino" element={<WorkoutGenerator />} />
        <Route path="/guia/calculadora-proteina" element={<ProteinCalculator />} />
        <Route path="/guia/diagnostico-treino" element={<TrainingDiagnostic />} />
        <Route path="/guia/dicas/:slug" element={<GuideTip />} />

        {/* Legacy redirects */}
        <Route path="/ferramentas" element={<ToolsHub />} />
        <Route path="/ferramentas/*" element={<ToolsHub />} />

        {/* Fallback to home */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
