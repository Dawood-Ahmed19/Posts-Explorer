import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Home from "./screens/home";

function App() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

export default App;
