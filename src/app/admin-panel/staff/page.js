import StaffClient from "./StaffClient";

export const metadata = {
  title: "Academy Staff & Permissions | MyAcademy",
  description: "Manage academy staff members, delegated role assignments, and granular access permissions.",
};

export default function StaffPage() {
  return <StaffClient />;
}
