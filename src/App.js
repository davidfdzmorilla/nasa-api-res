
import { useState } from "react";
import './App.css';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import { RoutesComponent } from "./routes/RoutesComponent";

function App() {
  const [scrollY, setScrolly] = useState(null)
  window.onscroll = function () {
    let y = window.scrollY
    setScrolly(y)
  }
  return (
    <div className="App">
      <ErrorBoundary fallback={<p>Algo salió mal</p>}>
        <Header />
        <RoutesComponent scrollY={scrollY} />
      </ErrorBoundary>
    </div>
  )
}

export default App;
