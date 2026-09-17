import { useEffect, useRef, useState } from "react";

import {
  Search,
  Phone,
  ShoppingBag,
  Heart,
  Menu,
  ChevronDown,
  RefreshCw,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";

import navbarLogo from "../../assets/Navbar/navbarLogo.png";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Siempre visible cerca del inicio
      if (currentScrollY <= 20) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Scroll hacia abajo
      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      }

      // Scroll hacia arriba
      if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed
        left-0
        top-0
        z-50
        w-full
        bg-white
        border-b
        border-gray-200

        transition-transform
        duration-300
        ease-out

        ${
          visible
            ? "translate-y-0"
            : "-translate-y-full"
        }
      `}
    >
      {/* TOP BAR */}
      <div className="bg-[#111] text-white">
        <div className="max-w-[1420px] mx-auto px-6 h-10 flex items-center justify-between">
          <p className="text-xs font-medium">
            10% DE DESCUENTO EN SERVICIO DE MANTENIMIENTO | REVISIÓN TÉCNICA GRATIS
          </p>

          <div className="flex items-center gap-4">
            <FaFacebookF size={13} />
            <FaInstagram size={14} />
            <FaWhatsapp size={14} />
            <FaTiktok size={13} />

            <div className="h-4 w-px bg-white/30" />

            <a
              href="#"
              className="text-xs transition hover:text-blue-300"
            >
              CONTACTO
            </a>

            <div className="h-4 w-px bg-white/30" />

            <a
              href="#"
              className="text-xs transition hover:text-blue-300"
            >
              BLOG
            </a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="max-w-[1420px] mx-auto px-6">
        <div className="h-[98px] flex items-center gap-8">
          {/* LOGO */}
          <a href="/" className="shrink-0">
            <img
              src={navbarLogo}
              alt="J&P Periféricos"
              className="w-[155px] h-auto"
            />
          </a>

          {/* SEARCH */}
          <div className="flex-1">
            <div className="h-[52px] flex border border-gray-300 bg-white">
              <input
                type="text"
                placeholder="Search for products"
                className="flex-1 px-5 outline-none text-sm"
              />

              <button
                type="button"
                className="
                  min-w-[190px]
                  px-4
                  border-l
                  border-gray-300
                  flex
                  items-center
                  justify-between
                  text-sm
                  text-gray-600
                  transition
                  hover:bg-gray-50
                "
              >
                SELECT CATEGORY
                <ChevronDown size={15} />
              </button>

              <button
                type="button"
                className="
                  w-[58px]
                  bg-[#1717f4]
                  text-white
                  flex
                  items-center
                  justify-center
                  transition
                  hover:bg-[#1010d6]
                "
              >
                <Search size={25} />
              </button>
            </div>
          </div>

          {/* SUPPORT */}
          <div className="flex items-center gap-3">
            <Phone
              size={36}
              className="text-[#1717f4]"
            />

            <div>
              <p className="text-sm font-bold text-[#1717f4]">
                SOPORTE 24/7
              </p>

              <p className="text-sm text-gray-500">
                997 662 381
              </p>
            </div>
          </div>

          {/* CART */}
          <div className="flex items-center gap-3">
            <ShoppingBag
              size={34}
              className="text-gray-500"
            />

            <div>
              <p className="text-sm font-bold text-[#1717f4]">
                S/ 0.00
              </p>

              <p className="text-sm text-gray-500">
                0 items
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NAV */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-[1420px] mx-auto px-6 h-[60px] flex">
          <button
            type="button"
            className="
              w-[300px]
              bg-[#111]
              text-white
              px-5
              flex
              items-center
              justify-between
            "
          >
            <div className="flex items-center gap-3">
              <Menu size={22} />

              <span className="text-sm font-semibold">
                CATEGORÍAS
              </span>
            </div>

            <ChevronDown size={18} />
          </button>

          <nav className="flex items-center gap-8 px-7 text-sm font-medium">
            <a
              href="#"
              className="transition hover:text-[#1717f4]"
            >
              TIENDA
            </a>

            <a
              href="#"
              className="transition hover:text-[#1717f4]"
            >
              ENVIOS
            </a>

            <a
              href="#"
              className="transition hover:text-[#1717f4]"
            >
              SERVICIOS
            </a>

            <a
              href="#"
              className="transition hover:text-[#1717f4]"
            >
              PROMOCIONES
            </a>

            <a
              href="#"
              className="transition hover:text-[#1717f4]"
            >
              NOSOTROS
            </a>
          </nav>

          <div className="ml-auto flex items-center gap-7">
            <a
              href="#"
              className="text-sm font-medium transition hover:text-[#1717f4]"
            >
              MY ACCOUNT
            </a>

            <button
              type="button"
              className="relative transition hover:text-[#1717f4]"
            >
              <Heart size={27} />

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-[#1717f4]
                  text-white
                  text-[10px]
                  w-4
                  h-4
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >
                0
              </span>
            </button>

            <button
              type="button"
              className="relative transition hover:text-[#1717f4]"
            >
              <RefreshCw size={26} />

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-[#1717f4]
                  text-white
                  text-[10px]
                  w-4
                  h-4
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}