import { redirect } from "next/navigation";

export default function Page() {
  redirect("/admin-panel/add-user?role=student");
}
