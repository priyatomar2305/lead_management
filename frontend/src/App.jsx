import { BrowserRouter, Routes, Route } from "react-router-dom";

import LeadForm from "./pages/LeadForm";
import Dashboard from "./pages/Dashboard";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LeadForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
