import TeacherExamsClient from "./TeacherExamsClient";

export const metadata = {
  title: "Batch Examinations & Grading | Teacher Portal",
  description: "Schedule exams, record marks, and publish grades for your students",
};

export default function TeacherExamsPage() {
  return <TeacherExamsClient />;
}
