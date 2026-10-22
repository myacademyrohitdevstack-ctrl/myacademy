import TransactionsClient from "../transactions/TransactionsClient";

export const metadata = {
  title: "Transaction History | MyAcademy",
};

export default function HistoryPage() {
  return <TransactionsClient />;
}
