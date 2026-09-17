import {
  MapPin,
  Phone,
  Mail,
  ArrowUp,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";

import footerImage from "../../assets/footer/footerImage.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-[#0b0b0c] text-white">
      <div className="mx-auto max-w-[1360px] px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr_0.8fr_0.9fr]">
          {/* BRAND */}
          <div>
            <img
              src={footerImage}
              alt="J&P Periféricos S.A.C"
              className="w-[220px] object-contain"
            />

            <p className="mt-5 max-w-[320px] text-sm leading-6 text-white/60">
              Tecnología, periféricos y soluciones digitales para personas,
              empresas y negocios.
            </p>

            <div className="mt-6 space-y-3 text-sm text-white/70">
              <FooterInfo
                icon={MapPin}
                text="Av. Bolivia 148 Of. 2218 Pta 4 - Galería Centro de Lima"
              />

              <FooterInfo
                icon={MapPin}
                text="Ca. Emilio Fernández 160 of. 1804"
              />

              <FooterInfo
                icon={Phone}
                text="946 201 443"
              />

              <FooterInfo
                icon={Mail}
                text="ventas@jypsac.com"
              />
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Servicios
            </h3>

            <nav className="mt-5 space-y-3">
              <FooterLink href="#cotizador">
                Cotización web
              </FooterLink>

              <FooterLink href="#soluciones">
                Desarrollo web
              </FooterLink>

              <FooterLink href="#">
                Soporte técnico
              </FooterLink>

              <FooterLink href="#">
                Mantenimiento
              </FooterLink>

              <FooterLink href="#">
                Asesoría tecnológica
              </FooterLink>
            </nav>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Empresa
            </h3>

            <nav className="mt-5 space-y-3">
              <FooterLink href="#">
                Nosotros
              </FooterLink>

              <FooterLink href="#">
                Contacto
              </FooterLink>

              <FooterLink href="#">
                Servicios
              </FooterLink>

              <FooterLink href="#">
                Promociones
              </FooterLink>

              <FooterLink href="#">
                Blog
              </FooterLink>
            </nav>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Términos legales
            </h3>

            <nav className="mt-5 space-y-3">
              <FooterLink href="#">
                Política de privacidad
              </FooterLink>

              <FooterLink href="#">
                Términos y condiciones
              </FooterLink>

              <FooterLink href="#">
                Libro de reclamaciones
              </FooterLink>

              <FooterLink href="#">
                Política y objetivos
              </FooterLink>
            </nav>

            {/* SOCIAL */}
            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Síguenos
              </p>

              <div className="mt-3 flex gap-3">
                <SocialButton>
                  <FaFacebookF size={14} />
                </SocialButton>

                <SocialButton>
                  <FaInstagram size={15} />
                </SocialButton>

                <SocialButton>
                  <FaWhatsapp size={15} />
                </SocialButton>

                <SocialButton>
                  <FaTiktok size={14} />
                </SocialButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-4 px-6 py-5 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 J&P Periféricos S.A.C. Todos los derechos reservados.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="transition hover:text-white"
            >
              Términos
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacidad
            </a>
          </div>
        </div>
      </div>

      {/* SCROLL TO TOP */}
      <button
        type="button"
        onClick={scrollToTop}
        className="
          absolute
          bottom-5
          right-6
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-white
          text-slate-900
          shadow-lg
          transition
          hover:-translate-y-1
        "
        aria-label="Volver arriba"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}

function FooterInfo({ icon: Icon, text }) {
  return (
    <div className="flex items-start gap-3">
      <Icon
        size={16}
        className="mt-0.5 shrink-0 text-white/40"
      />

      <span>{text}</span>
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="
        block
        text-sm
        text-white/60
        transition
        hover:translate-x-1
        hover:text-white
      "
    >
      {children}
    </a>
  );
}

function SocialButton({ children }) {
  return (
    <button
      type="button"
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        bg-white/[0.04]
        text-white/70
        transition
        hover:-translate-y-0.5
        hover:border-white/20
        hover:bg-white/10
        hover:text-white
      "
    >
      {children}
    </button>
  );
}