import {
  Monitor,
  PanelsTopLeft,
  Puzzle,
  Clock3,
  Coins,
  ArrowRight,
  Lightbulb,
  ClipboardList,
} from "lucide-react";

export default function QuoteSummary() {
  return (
    <aside
      className="
        self-start
        overflow-hidden
        rounded-[22px]
        border
        border-white/80
        bg-white/95
        shadow-[0_20px_60px_rgba(30,64,175,0.08)]
        backdrop-blur-sm
      "
    >
      {/* HEADER */}
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-[#eef4ff]
              text-[#173cff]
            "
          >
            <ClipboardList size={19} />
          </div>

          <div>
            <h3 className="text-[16px] font-bold text-[#07112d]">
              Resumen preliminar
            </h3>

            <p className="mt-0.5 text-[11px] text-slate-500">
              Estimación basada en tus respuestas
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="divide-y divide-slate-100">
          <SummaryRow
            icon={Monitor}
            label="Tipo de web"
            value="Web corporativa"
          />

          <SummaryRow
            icon={PanelsTopLeft}
            label="Secciones"
            value="4 - 6"
          />

          <SummaryRow
            icon={Puzzle}
            label="Integraciones"
            value="WhatsApp + Formulario de contacto"
          />

          <SummaryRow
            icon={Clock3}
            label="Tiempo estimado"
            value="2 - 3 semanas"
          />

          <SummaryRow
            icon={Coins}
            label="Inversión referencial"
            value="S/ 1,800 - S/ 2,600"
            highlight
          />
        </div>

        {/* NOTE */}
        <div
          className="
            mt-4
            flex
            items-start
            gap-3
            rounded-xl
            bg-[#fff8e6]
            px-4
            py-3
          "
        >
          <Lightbulb
            size={17}
            className="mt-0.5 shrink-0 text-amber-500"
          />

          <p className="text-[11px] leading-[18px] text-slate-600">
            Este es un estimado referencial. El valor final puede variar
            según los requerimientos específicos del proyecto.
          </p>
        </div>

        {/* CTA */}
        <button
          type="button"
          className="
            mt-4
            flex
            h-[50px]
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            bg-[#173cff]
            px-4
            text-[13px]
            font-semibold
            text-white
            shadow-[0_10px_25px_rgba(23,60,255,0.18)]
            transition
            hover:-translate-y-0.5
            hover:bg-[#0f31e6]
          "
        >
          Solicitar propuesta completa

          <ArrowRight size={17} />
        </button>
      </div>
    </aside>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="flex gap-4 py-3.5 first:pt-1">
      <div
        className="
          mt-0.5
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-blue-50
          text-[#173cff]
        "
      >
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-medium text-slate-400">
          {label}
        </p>

        <p
          className={`
            mt-1
            text-[13px]
            font-semibold
            leading-5
            ${
              highlight
                ? "text-[#173cff]"
                : "text-[#07112d]"
            }
          `}
        >
          {value}
        </p>
      </div>
    </div>
  );
}