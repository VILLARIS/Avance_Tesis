const PROJECT_TYPE_LABELS = {
  landing_page: "Landing page",
  corporate_web: "Web corporativa",
  ecommerce: "Tienda online",
  web_system: "Sistema web",
  other: "Otro",
};

export function getProjectTypeLabel(slug) {
  if (!slug) return "—";
  return PROJECT_TYPE_LABELS[slug] ?? slug;
}