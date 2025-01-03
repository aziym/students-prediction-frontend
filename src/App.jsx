import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout, CompanyInfo, PastResults, PastResults2022, Predictions2024 } from './components/Dashboard';
import PredictionForm from './components/PredictionForm';
import GeneralActions from './components/GeneralActions';

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<CompanyInfo />} />
          <Route path="/prediction" element={<PredictionForm />} />
          <Route path="/results" element={<PastResults />} />
          <Route path="/predictions-2024" element={<Predictions2024 />} />
          <Route path="/actions" element={<GeneralActions />} />
          <Route path="/results-2022" element={<PastResults2022 />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;

