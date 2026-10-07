const TONES = {
  blue: "bg-blue-50 text-[#173cff]",
  yellow: "bg-amber-50 text-amber-500",
  orange: "bg-orange-50 text-orange-500",
  emerald: "bg-emerald-50 text-emerald-600",
};

export default function AdminStatCard({
  icon: Icon,
  label,
  value,
  tone = "blue",
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-100
        bg-white
        p-5
        shadow-[0_8px_24px_rgba(30,64,175,0.05)]
        transition
        duration-200
        hover:shadow-[0_12px_30px_rgba(30,64,175,0.08)]
      "
    >
      <div
        className={`
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          ${TONES[tone] ?? TONES.blue}
        `}
      >
        {Icon && <Icon size={16} />}
      </div>

      <p className="mt-4 text-[30px] font-extrabold leading-none text-[#07112d]">
        {value}
      </p>

      <p className="mt-1.5 text-[12px] font-medium text-slate-500">{label}</p>
    </div>
  );
}