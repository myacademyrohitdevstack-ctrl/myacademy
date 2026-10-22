import DashboardSkeleton from "@/app/Skeletons/DashBoardSkeleton";

export default function AdminLoading() {
  return (
    <div className="w-full min-w-0 p-3 sm:p-6 lg:p-8">
      <DashboardSkeleton />
    </div>
  );
}
