import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router";
import App from "./App.tsx";
import { Home, Results, Watch } from "./routes";
import { Error404 } from "@/routes/Error404";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="results" element={<Results />} />
          <Route path="watch" element={<Watch />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
);
