import {
  MessageSquareText,
  FileText,
  UserRound,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: MessageSquareText,
      title: "Responde algunas preguntas",
      text: "Cuéntanos sobre tu proyecto de forma simple y rápida.",
    },
    {
      number: "02",
      icon: FileText,
      title: "Recibe tu estimación",
      text: "Obtén un rango de inversión y tiempo estimado.",
    },
    {
      number: "03",
      icon: UserRound,
      title: "Habla con un especialista",
      text: "Si lo deseas, un asesor te brindará más detalles.",
    },
    {
      number: "04",
      icon: CheckCircle2,
      title: "Recibe tu propuesta",
      text: "Te enviaremos una cotización formal y personalizada.",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="
        w-full
        bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]
        py-14
        lg:py-16
      "
    >
      <div className="mx-auto max-w-[1360px] px-6">
        {/* HEADER */}
        <div className="text-center">
          <h2
            className="
              text-[34px]
              font-extrabold
              tracking-[-0.03em]
              text-[#07112d]
              md:text-[40px]
            "
          >
            ¿Cómo funciona?
          </h2>

          <p className="mt-2 text-[15px] text-slate-500">
            En pocos pasos obtén tu estimación inicial
          </p>
        </div>

        {/* STEPS */}
        <div
          className="
            mt-10
            grid
            gap-5
            lg:grid-cols-4
          "
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">
                <article
                  className="
                    group
                    relative
                    h-full
                    rounded-[20px]
                    border
                    border-slate-200
                    bg-white
                    px-6
                    py-6
                    shadow-[0_12px_35px_rgba(15,23,42,0.04)]
                    transition
                    duration-200
                    hover:-translate-y-1
                    hover:shadow-[0_18px_45px_rgba(23,60,255,0.08)]
                  "
                >
                  {/* TOP */}
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-[#eef4ff]
                        text-[15px]
                        font-extrabold
                        text-[#173cff]
                      "
                    >
                      {step.number}
                    </div>

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        text-[#173cff]
                        transition
                        group-hover:bg-blue-50
                      "
                    >
                      <Icon size={26} strokeWidth={2} />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="mt-5">
                    <h3
                      className="
                        text-[16px]
                        font-bold
                        leading-6
                        text-[#07112d]
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        max-w-[240px]
                        text-[14px]
                        leading-6
                        text-slate-500
                      "
                    >
                      {step.text}
                    </p>
                  </div>
                </article>

                {/* ARROW */}
                {index < steps.length - 1 && (
                  <div
                    className="
                      pointer-events-none
                      absolute
                      right-[-18px]
                      top-1/2
                      z-10
                      hidden
                      -translate-y-1/2
                      lg:flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-[#173cff]
                    "
                  >
                    <ChevronRight size={25} strokeWidth={2.2} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}