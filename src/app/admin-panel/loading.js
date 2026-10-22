import PortalLoading from "@/app/Components/portal-ui/PortalLoading";

export default function AdminLoading() {
  return (
    <PortalLoading
      type="admin"
      title="Loading Admin Console..."
      subtitle="Syncing academy finances, multi-cohort batches, and student ledgers..."
    />
  );
}
