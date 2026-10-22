import PortalLoading from "@/app/Components/portal-ui/PortalLoading";

export default function StudentRouteLoading() {
  return (
    <PortalLoading
      type="student"
      title="Loading Student Portal..."
      subtitle="Preparing your enrolled cohorts, attendance tracking, and fee receipts..."
    />
  );
}
