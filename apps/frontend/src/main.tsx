import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Refine } from "@refinedev/core";
import { RpsGame } from "./rps-game";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={{
          getList: async () => ({ data: [], total: 0 }),
          getOne: async () => ({ data: {} }),
          getMany: async () => ({ data: [] }),
          create: async () => ({ data: {} }),
          update: async () => ({ data: {} }),
          deleteOne: async () => ({ data: {} }),
          getApiUrl: () => "",
        }}
        resources={[]}
        options={{
          syncWithLocation: false,
        }}
      >
        <Routes>
          <Route path="/" element={<RpsGame />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
