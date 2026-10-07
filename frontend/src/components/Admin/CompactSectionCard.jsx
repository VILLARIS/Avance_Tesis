export default function CompactSectionCard({ icon: Icon, title, children }) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
      <div className="mb-3 flex items-center gap-2">
        <span
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-lg
            bg-blue-50
            text-[#173cff]
          "
        >
          {Icon && <Icon size={14} />}
        </span>
        <h3 className="text-[12.5px] font-bold text-[#07112d]">{title}</h3>
      </div>

      <dl className="space-y-2">{children}</dl>
    </section>
  );
}