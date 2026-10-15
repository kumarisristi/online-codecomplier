export default function Loader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted">
      <span className="w-3 h-3 rounded-full border-2 border-brand border-t-transparent animate-spin" />
      {label}
    </div>
  );
}
