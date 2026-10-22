import CollectFeeClient from "../CollectFeeClient";

export const metadata = {
  title: "Collect Fee | MyAcademy",
};

export default async function CollectFeeWithIdPage({ params }) {
  const { id } = await params;
  return <CollectFeeClient studentId={id} />;
}
