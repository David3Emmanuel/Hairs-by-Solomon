import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Home/HomePage";
// import GamePage from "./Games/GamePage";
import Root from "./Root";

import "./App.css";

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      {/* <Route path="game/:gameId" element={<GamePage />} /> */}
    </Route>
  </Routes></BrowserRouter>
}