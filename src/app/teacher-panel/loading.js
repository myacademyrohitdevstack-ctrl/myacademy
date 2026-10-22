import PortalLoading from "@/app/Components/portal-ui/PortalLoading";

export default function TeacherLoading() {
  return (
    <PortalLoading
      type="teacher"
      title="Loading Teacher Portal..."
      subtitle="Fetching assigned classroom cohorts, attendance registers, and schedules..."
    />
  );
}
