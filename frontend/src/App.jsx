import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import QuoteAssistant from "./components/QuoteAssistant/QuoteAssistant";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import ProposalCTA from "./components/ProposalCTA/ProposalCTA";
import Footer from "./components/Footer/Footer";

function App() {
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