import { getStatusMeta } from "../../utils/quoteStatus";

export default function StatusBadge({ status }) {
  const { label, classes } = getStatusMeta(status);

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-2.5
        py-1
        text-[11px]
        font-semibold
        ${classes}
      `}
    >
      {label}
    </span>
  );
}