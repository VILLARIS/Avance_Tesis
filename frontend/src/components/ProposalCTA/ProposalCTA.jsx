import { ArrowRight } from "lucide-react";

export default function ProposalCTA() {
  return (
    <section className="w-full bg-[#f8fbff] pb-14">
      <div className="mx-auto max-w-[1360px] px-6">
        <div
          className="
            relative
            overflow-hidden
            rounded-[22px]
            border
            border-blue-300/40
            bg-[linear-gradient(135deg,#123acb_0%,#1d4fff_55%,#2463ff_100%)]
            px-8
            py-7
            shadow-[0_18px_45px_rgba(23,60,255,0.16)]
            md:px-10
            md:py-8
          "
        >
          {/* decoraciones suaves */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-[240px] w-[240px] rounded-full bg-white/10 blur-3xl" />

          <div className="pointer-events-none absolute right-[28%] top-[-80px] h-[260px] w-[120px] rotate-[28deg] bg-white/[0.05]" />

          <div className="pointer-events-none absolute right-[20%] top-[-60px] h-[260px] w-[90px] rotate-[28deg] bg-white/[0.04]" />

          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* LEFT */}
            <div className="max-w-[820px]">
              <p className="text-[14px] font-medium text-blue-100">
                ¿Listo para llevar tu negocio al siguiente nivel?
              </p>

              <h2 className="mt-2 text-[28px] font-bold tracking-[-0.02em] text-white md:text-[34px]">
                Solicita tu propuesta web personalizada
              </h2>

              <p className="mt-2 max-w-[760px] text-[15px] leading-6 text-blue-100">
                Cuéntanos tu proyecto y uno de nuestros especialistas se pondrá
                en contacto contigo.
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex shrink-0 flex-col items-start md:items-center">
              <a
                href="#cotizador"
                className="
                  inline-flex
                  h-[54px]
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-white
                  px-7
                  text-[14px]
                  font-semibold
                  text-[#173cff]
                  shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                  transition
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-blue-50
                "
              >
                Solicitar ahora
                <ArrowRight size={18} />
              </a>

              <p className="mt-3 text-[11px] text-blue-100">
                Sin compromiso de compra
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}