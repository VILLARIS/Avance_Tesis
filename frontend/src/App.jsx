import { useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import QuoteAssistant from "./components/QuoteAssistant/QuoteAssistant";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import ProposalCTA from "./components/ProposalCTA/ProposalCTA";
import Footer from "./components/Footer/Footer";
import { getHealth } from "./services/api";

function App() {
  useEffect(() => {
    if (!import.meta.env.DEV) return;

    getHealth()
      .then((health) => console.info("[api] Backend:", health.status, "| DB:", health.database))
      .catch((error) => console.warn("[api] Backend no disponible:", error.message));
  }, []);

  return (
    <>
      <Navbar />

      <main>
        {/* Reserva el espacio del navbar fijo */}
        <div className="h-[198px]" />

        <Hero />

        <QuoteAssistant />

        <HowItWorks />

        <ProposalCTA />

        <Footer />
      </main>
    </>
  );
}

export default App;