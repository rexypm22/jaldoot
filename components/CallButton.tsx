interface CallButtonProps {
  phone: string;
  label?: string;
  tone?: "red" | "green";
  size?: "sm" | "md" | "lg";
}

export default function CallButton({
  phone,
  label = "Call",
  tone = "red",
  size = "md"
}: CallButtonProps) {
  const toneClasses =
    tone === "red"
      ? "bg-alert-red hover:bg-alert-redDark focus-visible:outline-alert-red"
      : "bg-alert-green hover:bg-alert-greenDark focus-visible:outline-alert-green";

  const sizeClasses =
    size === "lg"
      ? "px-5 py-3 text-base"
      : size === "sm"
      ? "px-2.5 py-1.5 text-xs"
      : "px-4 py-2 text-sm";

  return (
    <a
      href={`tel:${phone}`}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-white shadow-sm transition-colors ${toneClasses} ${sizeClasses}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path
          d="M4.6 3.5h3.2l1.4 4.4-2.2 1.7a12.6 12.6 0 0 0 5.4 5.4l1.7-2.2 4.4 1.4v3.2c0 1-.9 1.8-1.9 1.7A17.6 17.6 0 0 1 3 4.9c0-.8.7-1.4 1.6-1.4Z"
          fill="currentColor"
        />
      </svg>
      <span className="truncate">{label}</span>
    </a>
  );
}
