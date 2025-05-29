import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Fallback from "./components/custom/Fallback";
const Homepage = lazy(() => import("./pages/Homepage"));
const Errorpage = lazy(() => import("./pages/Errorpage"));

function AppRoutes() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}


