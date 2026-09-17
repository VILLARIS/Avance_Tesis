import {
  ArrowRight,
  Clock3,
  ShieldCheck,
  Users,
} from "lucide-react";

import heroBackground from "../../assets/hero/heroBackground.png";
import robotImage from "../../assets/hero/robotImage.png";

export default function Hero() {
  return (
    <section
      className="
        relative
        h-[calc(100dvh-198px)]
        min-h-[560px]
        w-full
        overflow-hidden
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage: `url(${heroBackground})`,
      }}
    >
      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white/[0.03]" />

      {/* =========================================
          ROBOT
      ========================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-[2%]
          hidden
          w-[48%]
          items-end
          justify-center
          lg:flex
        "
      >
        <img
          src={robotImage}
          alt="Asistente virtual J&P"
          className="
            block
            h-auto
            max-h-[92%]
            max-w-full
            object-contain
            object-bottom
            drop-shadow-[0_25px_35px_rgba(23,60,255,0.10)]
          "
        />
      </div>

      {/* =========================================
          CONTENT
      ========================================== */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          h-full
          max-w-[1500px]
          items-center
          px-6
        "
      >
        <div
          className="
            w-full
            max-w-[700px]
            lg:w-[48%]
          "
        >
          {/* BADGE */}
          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-blue-200
              bg-white/90
              px-4
              py-2
              text-[12px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#1740ff]
              shadow-sm
              backdrop-blur-sm
            "
          >
            Cotización digital
          </span>

          {/* TITLE */}
          <h1
            className="
              mt-6
              text-[42px]
              font-extrabold
              leading-[1.04]
              tracking-[-0.035em]
              text-[#07112d]
              md:text-[48px]
              xl:text-[56px]
              2xl:text-[60px]
            "
          >
            ¿Deseas una cotización rápida para tu página web?
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-5
              max-w-[600px]
              text-[16px]
              leading-7
              text-slate-600
              xl:text-[17px]
            "
          >
            Cuéntanos sobre tu proyecto respondiendo algunas preguntas y
            obtén una estimación inicial en minutos, de forma clara y
            personalizada.
          </p>

          {/* BUTTONS */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="#cotizador"
              className="
                inline-flex
                h-[54px]
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-[#173cff]
                px-7
                text-[15px]
                font-semibold
                text-white
                shadow-[0_14px_30px_rgba(23,60,255,0.20)]
                transition
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#102fe5]
              "
            >
              Comenzar cotización
              <ArrowRight size={18} />
            </a>

            <a
              href="#soluciones"
              className="
                inline-flex
                h-[54px]
                items-center
                justify-center
                rounded-xl
                border
                border-[#173cff]
                bg-white/75
                px-7
                text-[15px]
                font-semibold
                text-[#173cff]
                backdrop-blur-sm
                transition
                duration-200
                hover:bg-white
              "
            >
              Ver soluciones
            </a>
          </div>

          {/* BENEFITS */}
          <div
            className="
              mt-8
              grid
              max-w-[650px]
              grid-cols-1
              gap-4
              sm:grid-cols-3
            "
          >
            <Benefit
              icon={Clock3}
              title="Respuesta rápida"
              text="Obtén una estimación en minutos."
            />

            <Benefit
              icon={ShieldCheck}
              title="Sin compromiso"
              text="Sin obligaciones de compra."
            />

            <Benefit
              icon={Users}
              title="Asesoría personalizada"
              text="Te guiamos durante el proceso."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefit({ icon: Icon, title, text }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-white/90
          text-[#173cff]
          shadow-[0_8px_22px_rgba(15,23,42,0.07)]
        "
      >
        <Icon size={18} strokeWidth={2.2} />
      </div>

      <div className="min-w-0">
        <p className="text-[13px] font-bold leading-5 text-slate-950">
          {title}
        </p>

        <p className="mt-0.5 text-[11px] leading-[17px] text-slate-500">
          {text}
        </p>
      </div>
    </div>
  );
}