export default function QuickOptions({
  options = [],
  selected = [],
  onSelect,
  disabled = false,
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-2 pl-12">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect?.(option.value)}
            disabled={disabled}
            aria-pressed={isSelected}
            className={`
              rounded-full
              border
              px-4
              py-2
              text-[12px]
              font-semibold
              transition-all
              duration-200
              disabled:cursor-not-allowed
              disabled:opacity-60

              ${
                isSelected
                  ? `
                    border-[#173cff]
                    bg-[#173cff]
                    text-white
                    shadow-[0_6px_15px_rgba(23,60,255,0.15)]
                  `
                  : `
                    border-slate-200
                    bg-white
                    text-slate-600
                    hover:border-blue-300
                    hover:bg-blue-50/50
                    hover:text-[#173cff]
                  `
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}