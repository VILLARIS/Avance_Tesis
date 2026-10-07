import StatusBadge from "./StatusBadge";
import { formatPriceRange } from "../../utils/formatQuote";

const PROJECT_TYPE_LABELS = {
  landing_page: "Landing page",
  corporate_web: "Web corporativa",
  ecommerce: "Tienda online",
  web_system: "Sistema web",
  other: "Otro",
};

function formatProjectType(value) {
  return PROJECT_TYPE_LABELS[value] ?? value ?? "No indicado";
}

function formatCurrencyRange(min, max) {
  const minNumber = Number(min);
  const maxNumber = Number(max);

  if (!Number.isFinite(minNumber) || !Number.isFinite(maxNumber)) {
    return "—";
  }

  return formatPriceRange(minNumber, maxNumber);
}

function formatDate(value) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function RequestsTable({ quotes = [], onSelectRow, selectedId }) {
  if (quotes.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="text-[14px] font-semibold text-[#07112d]">
          No se encontraron solicitudes
        </p>
        <p className="mt-1 text-[12px] text-slate-500">
          Cuando recibas cotizaciones desde la web aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60">
            {[
              "Código",
              "Cliente",
              "Correo",
              "Tipo de proyecto",
              "Inversión referencial",
              "Estado",
              "Fecha",
            ].map((heading) => (
              <th
                key={heading}
                className="
                  px-5
                  py-3
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {quotes.map((quote) => {
            const isSelected = selectedId === quote.id;

            return (
              <tr
                key={quote.id}
                onClick={() => onSelectRow?.(quote)}
                className={`
                  group
                  cursor-pointer
                  border-b
                  border-slate-100
                  transition
                  duration-150
                  last:border-b-0
                  ${
                    isSelected
                      ? "bg-blue-50/60"
                      : "hover:bg-slate-50/70"
                  }
                `}
              >
                <td className="px-5 py-4 text-[13px] font-semibold text-[#173cff] group-hover:underline group-hover:underline-offset-2">
                  {quote.code}
                </td>

                <td className="px-5 py-4 text-[13px] font-medium text-[#07112d]">
                  {quote.lead_name ?? "—"}
                </td>

                <td className="px-5 py-4 text-[13px] text-slate-600">
                  {quote.lead_email ?? "—"}
                </td>

                <td className="px-5 py-4 text-[13px] text-slate-600">
                  {formatProjectType(quote.project_type)}
                </td>

                <td className="px-5 py-4 text-[13px] font-semibold text-[#07112d]">
                  {formatCurrencyRange(quote.estimated_min, quote.estimated_max)}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={quote.status} />
                </td>

                <td className="px-5 py-4 text-[13px] text-slate-500">
                  {formatDate(quote.created_at)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}