import { HelmetProvider } from "react-helmet-async";
import Reveal from "./Reveal";

function App() {
  return (
    <HelmetProvider>
      <Reveal />
    </HelmetProvider>
  );
}

export default App;

