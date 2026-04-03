export default function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] rounded-lg bg-secondary" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-20 bg-secondary rounded" />
        <div className="h-5 w-32 bg-secondary rounded" />
        <div className="h-3 w-24 bg-secondary rounded" />
        <div className="h-5 w-16 bg-secondary rounded" />
      </div>
    </div>
  );
}
