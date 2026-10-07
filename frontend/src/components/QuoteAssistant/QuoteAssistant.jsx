import { useCallback, useState } from "react";

import useQuoteFlow from "../../hooks/useQuoteFlow";
import ChatPanel from "./ChatPanel";
import QuoteRequestForm from "./QuoteRequestForm";
import QuoteSummary from "./QuoteSummary";

export default function QuoteAssistant() {
    const flow = useQuoteFlow();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const { isComplete, answers, quote, reset } = flow;

    const handleOpenForm = useCallback(() => {
        if (isComplete) setIsFormOpen(true);
    }, [isComplete]);

    const handleCloseForm = useCallback(() => {
        setIsFormOpen(false);
    }, []);

    const handleStartOver = useCallback(() => {
        setIsFormOpen(false);
        reset();
        document
            .getElementById("cotizador")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [reset]);

    return (
        <section
            id="cotizador"
            className="
        relative
        w-full
        overflow-hidden
        bg-[linear-gradient(180deg,#f9fbff_0%,#f5f9ff_45%,#f8fbff_100%)]
        py-10
        lg:py-6
      "
        >
            {/* decoraciones suaves */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-[-120px] top-[80px] h-[260px] w-[260px] rounded-full bg-blue-100/30 blur-3xl" />
                <div className="absolute right-[-80px] top-[120px] h-[300px] w-[300px] rounded-full bg-blue-100/25 blur-3xl" />
                <div className="absolute bottom-[-120px] left-[20%] h-[240px] w-[240px] rounded-full bg-sky-100/20 blur-3xl" />
            </div>

            <div className="relative mx-auto w-full max-w-[1280px] px-6">
                {/* HEADER */}
                <div className="mx-auto max-w-[760px] text-center">
                    <span
                        className="
              inline-flex
              items-center
              rounded-full
              border
              border-blue-100
              bg-white
              px-4
              py-2
              text-[11px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#173cff]
              shadow-sm
            "
                    >
                        ✦ Cotizador guiado
                    </span>

                    <h2
                        className="
              mt-4
              text-[36px]
              font-extrabold
              leading-tight
              tracking-[-0.035em]
              text-[#07112d]
              md:text-[44px]
            "
                    >
                        Tu cotización empieza{" "}
                        <span className="text-[#173cff]">aquí</span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-[700px] text-[15px] leading-6 text-slate-600">
                        Responde algunas preguntas para entender mejor tu proyecto y
                        obtener una estimación inicial.
                    </p>
                </div>

                {/* MAIN */}
                <div
                    className="
            mt-8
            grid
            items-start
            gap-5
            lg:grid-cols-[1.75fr_0.85fr]
          "
                >
                    <ChatPanel flow={flow} />
                    <QuoteSummary flow={flow} onRequest={handleOpenForm} />
                </div>
            </div>

            {isFormOpen && (
                <QuoteRequestForm
                    answers={answers}
                    quote={quote}
                    onClose={handleCloseForm}
                    onStartOver={handleStartOver}
                />
            )}
        </section>
    );
}