import ParentExamsClient from "./ParentExamsClient";

export const metadata = {
  title: "Child Exam Results | Parent Portal",
  description: "Track your child's academic test scores, grades, and teacher remarks",
};

export default function ParentExamsPage() {
  return <ParentExamsClient />;
}
