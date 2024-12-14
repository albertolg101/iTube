import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import { Home, Results, Watch } from "./routes";
import { Error404 } from "@/routes/Error404";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/itube/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="results" element={<Results />} />
          <Route path="watch" element={<Watch />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);