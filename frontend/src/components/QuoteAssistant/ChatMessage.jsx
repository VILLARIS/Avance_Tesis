export default function ChatMessage({ children }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#eef4ff]
          text-[10px]
          font-extrabold
          text-[#173cff]
        "
      >
        J&P
      </div>

      <div className="max-w-[76%]">
        <div
          className="
            rounded-2xl
            rounded-tl-md
            bg-[#f1f5f9]
            px-4
            py-2.5
            text-[13px]
            leading-5
            text-slate-700
          "
        >
          {children}
        </div>

        <p className="mt-1 pl-1 text-[10px] text-slate-400">
          10:24
        </p>
      </div>
    </div>
  );
}