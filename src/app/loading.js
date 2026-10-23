export default function RootLoading() {
  return (
    <div className="fixed inset-x-0 top-0 z-[9999] h-1 overflow-hidden bg-orange-100/70">
      <div className="h-full w-full bg-gradient-to-r from-orange-400 via-[#D6451B] to-amber-500 animate-shimmer" />
    </div>
  );
}
