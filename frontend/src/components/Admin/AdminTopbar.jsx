import { Search, Menu } from "lucide-react";

export default function AdminTopbar({ search = "", onSearchChange, onOpenSidebar }) {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-[76px]
        items-center
        gap-4
        border-b
        border-slate-100
        bg-white/90
        px-5
        backdrop-blur-sm
      "
    >
      <button
        type="button"
        onClick={onOpenSidebar}
        aria-label="Abrir menú"
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          text-slate-500
          transition
          hover:bg-slate-50
          lg:hidden
        "
      >
        <Menu size={18} />
      </button>

      {/* SEARCH */}
      <div
        className="
          flex
          h-11
          max-w-[420px]
          flex-1
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-[#f8faff]
          px-3
          transition
          focus-within:border-blue-300
          focus-within:bg-white
          focus-within:shadow-[0_0_0_4px_rgba(23,60,255,0.05)]
        "
      >
        <Search size={16} className="shrink-0 text-slate-400" />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder="Buscar solicitudes por cliente, correo o código..."
          className="
            h-full
            min-w-0
            flex-1
            bg-transparent
            text-[13px]
            text-slate-700
            outline-none
            placeholder:text-slate-400
          "
        />
      </div>

      {/* USER */}
      <div className="ml-auto flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#173cff]
            text-[13px]
            font-bold
            text-white
            shadow-[0_8px_20px_rgba(23,60,255,0.22)]
          "
        >
          AD
        </div>

        <div className="hidden sm:block">
          <p className="text-[13px] font-bold text-[#07112d]">Administrador</p>
          <p className="text-[11px] text-slate-500">J&P Periféricos S.A.C.</p>
        </div>
      </div>
    </header>
  );
}