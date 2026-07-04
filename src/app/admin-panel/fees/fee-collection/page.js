"use client";

import DashboardSkeleton from "@/app/Skeletons/DashBoardSkeleton";
import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaUserGraduate,
  FaWallet,
  FaPhoneAlt,
  FaEnvelope,
  FaUniversity,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
export default function CollectFeePage({
  student,
  fee,
  loading,
}) {
  if (loading) return <DashboardSkeleton />;

  return (
    <div className="py-28">
      <div className="mx-auto max-w-7xl space-y-8 px-4 md:px-0">
        <motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#D6451B] to-[#ff855e] p-8 text-white shadow-xl"
>
  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
        Fee Collection
      </span>

      <h1 className="mt-6 text-4xl font-bold lg:text-5xl">
        Collect Student Fee 💳
      </h1>

      <p className="mt-4 max-w-2xl text-orange-100 leading-7">
        Collect student payments, generate receipts and
        keep fee records updated in real time.
      </p>

    </div>

    <div className="hidden w-80 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md lg:block">

      <div className="flex items-center justify-between">

        <h3 className="font-semibold">
          Pending Amount
        </h3>

        <FaWallet />

      </div>

      <h2 className="mt-6 text-5xl font-bold">
        ₹{fee?.pendingAmount || 0}
      </h2>

      <p className="mt-4 text-orange-100">
        Remaining fee to be collected.
      </p>

    </div>

  </div>
</motion.section>
<div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

  <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-4xl font-bold text-[#D6451B]">

      {student?.fullName?.charAt(0)}

    </div>

    <div className="flex-1">

      <h2 className="text-3xl font-bold">

        {student?.fullName}

      </h2>

      <p className="mt-2 text-slate-500">

        Admission No : {student?.admissionNumber}

      </p>

    </div>

    <div>

      <span className="rounded-full bg-green-100 px-5 py-2 font-medium text-green-700">

        Active

      </span>

    </div>

  </div>

  <div className="mt-10 grid gap-6 md:grid-cols-2">

    <div className="flex items-center gap-4">

      <div className="rounded-2xl bg-orange-50 p-4 text-[#D6451B]">

        <FaPhoneAlt />

      </div>

      <div>

        <p className="text-sm text-slate-500">
          Phone
        </p>

        <h3 className="font-semibold">

          {student?.phone}

        </h3>

      </div>

    </div>

    <div className="flex items-center gap-4">

      <div className="rounded-2xl bg-blue-50 p-4 text-blue-600">

        <FaEnvelope />

      </div>

      <div>

        <p className="text-sm text-slate-500">
          Email
        </p>

        <h3 className="font-semibold">

          {student?.email || "-"}

        </h3>

      </div>

    </div>

    <div className="flex items-center gap-4">

      <div className="rounded-2xl bg-violet-50 p-4 text-violet-600">

        <FaUniversity />

      </div>

      <div>

        <p className="text-sm text-slate-500">
          Batch
        </p>

        <h3 className="font-semibold">

          {student?.batch?.title}

        </h3>

      </div>

    </div>

    <div className="flex items-center gap-4">

      <div className="rounded-2xl bg-green-50 p-4 text-green-600">

        <FaUserGraduate />

      </div>

      <div>

        <p className="text-sm text-slate-500">
          Course
        </p>

        <h3 className="font-semibold">

          {student?.course?.title}

        </h3>

      </div>

    </div>

  </div>

</motion.div>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

  <h2 className="text-2xl font-bold">

    Fee Summary

  </h2>

  <div className="mt-8 space-y-5">

    <div className="flex justify-between">

      <span>Total Fee</span>

      <span className="font-bold">

        ₹{fee?.totalFee}

      </span>

    </div>

    <div className="flex justify-between">

      <span>Discount</span>

      <span className="font-bold text-blue-600">

        ₹{fee?.discount}

      </span>

    </div>

    <div className="flex justify-between">

      <span>Paid</span>

      <span className="font-bold text-green-600">

        ₹{fee?.paidAmount}

      </span>

    </div>

    <div className="flex justify-between">

      <span>Pending</span>

      <span className="font-bold text-red-600">

        ₹{fee?.pendingAmount}

      </span>

    </div>

    <hr />

    <div className="flex items-center justify-between">

      <span>Status</span>

      <span className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">

        <FaCheckCircle />

        {fee?.status}

      </span>

    </div>

    <div className="flex items-center justify-between">

      <span>Next Due</span>

      <span className="font-semibold">

        <FaCalendarAlt className="mr-2 inline" />

        {fee?.nextDueDate}

      </span>

    </div>

  </div>

</motion.div>
</div>
<div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>
  <div className="flex items-center justify-between">

    <h2 className="text-2xl font-bold">
      Collect Payment
    </h2>

    <FaMoneyBillWave className="text-3xl text-[#D6451B]" />

  </div>

  <form className="mt-8 space-y-6">

    {/* Amount */}

    <div>

      <label className="mb-2 block font-medium text-slate-700">
        Amount
      </label>

      <div className="relative">

        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">
          ₹
        </span>

        <input
          type="number"
          placeholder="Enter amount"
          className="w-full rounded-2xl border border-slate-200 py-4 pl-12 pr-5 outline-none transition focus:border-[#D6451B]"
        />

      </div>

    </div>

    {/* Payment Mode */}

    <div>

      <label className="mb-4 block font-medium text-slate-700">
        Payment Mode
      </label>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {[
          "Cash",
          "UPI",
          "Card",
          "Bank Transfer",
        ].map((mode) => (

          <button
            type="button"
            key={mode}
            className="rounded-2xl border border-slate-200 py-4 font-medium transition hover:border-[#D6451B] hover:bg-orange-50"
          >
            {mode}
          </button>

        ))}

      </div>

    </div>

    {/* Reference */}

    <div>

      <label className="mb-2 block font-medium text-slate-700">
        Reference Number
      </label>

      <input
        type="text"
        placeholder="Transaction / UPI / Cheque Number"
        className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-[#D6451B]"
      />

    </div>

    {/* Payment Date */}

    <div>

      <label className="mb-2 block font-medium text-slate-700">
        Payment Date
      </label>

      <input
        type="date"
        className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-[#D6451B]"
      />

    </div>

    {/* Remarks */}

    <div>

      <label className="mb-2 block font-medium text-slate-700">
        Remarks
      </label>

      <textarea
        rows={4}
        placeholder="Optional remarks..."
        className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-[#D6451B]"
      />

    </div>

    {/* Submit */}

    <button
      className="w-full rounded-2xl bg-[#D6451B] py-4 text-lg font-semibold text-white transition hover:bg-[#b93914]"
    >
      Collect Payment
    </button>

  </form>

</motion.div>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

  <h2 className="text-2xl font-bold">
    Payment Preview
  </h2>

  <div className="mt-8 space-y-5">

    <div className="flex justify-between">

      <span>Total Fee</span>

      <span className="font-bold">
        ₹{fee?.totalFee}
      </span>

    </div>

    <div className="flex justify-between">

      <span>Already Paid</span>

      <span className="font-bold text-green-600">
        ₹{fee?.paidAmount}
      </span>

    </div>

    <div className="flex justify-between">

      <span>Pending</span>

      <span className="font-bold text-red-600">
        ₹{fee?.pendingAmount}
      </span>

    </div>

    <hr />

    <div className="rounded-2xl bg-orange-50 p-5">

      <p className="text-sm text-slate-500">
        Receipt Number
      </p>

      <h3 className="mt-2 text-2xl font-bold text-[#D6451B]">
        #{fee?.nextReceiptNo || 1001}
      </h3>

    </div>

    <div className="rounded-2xl bg-green-50 p-5">

      <p className="text-sm text-slate-500">
        Collector
      </p>

      <h3 className="mt-2 font-bold">
        {student?.academyStaff?.fullName || "Admin"}
      </h3>

    </div>

    <div className="rounded-2xl bg-blue-50 p-5">

      <p className="text-sm text-slate-500">
        Payment Status
      </p>

      <h3 className="mt-2 font-bold text-blue-700">
        {fee?.status}
      </h3>

    </div>

  </div>

</motion.div>
</div>
<div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>
  <div className="flex items-center justify-between">

    <div>

      <h2 className="text-2xl font-bold">
        Payment History
      </h2>

      <p className="mt-1 text-slate-500">
        All transactions for this student.
      </p>

    </div>

    <button className="rounded-xl bg-orange-50 px-4 py-2 text-[#D6451B] transition hover:bg-orange-100">
      Export
    </button>

  </div>
  <div className="mt-8 hidden overflow-x-auto lg:block">

<table className="w-full">

<thead>

<tr className="border-b border-slate-200">

<th className="pb-4 text-left">
Receipt
</th>

<th className="pb-4 text-left">
Amount
</th>

<th className="pb-4 text-left">
Mode
</th>

<th className="pb-4 text-left">
Date
</th>

<th className="pb-4 text-left">
Collected By
</th>

<th className="pb-4 text-right">
Actions
</th>

</tr>

</thead>

<tbody>

{fee?.transactions?.length ? (

fee.transactions.map((payment)=>(
<tr
key={payment._id}
className="border-b border-slate-100"
>

<td className="py-5">

<div>

<h3 className="font-semibold">
#{payment.receiptNumber}
</h3>

<p className="text-sm text-slate-500">
Receipt
</p>

</div>

</td>

<td>

<span className="font-bold text-green-600">
₹{payment.amount}
</span>

</td>

<td>

<span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
{payment.paymentMode}
</span>

</td>

<td>

{payment.date}

</td>

<td>

{payment.collectedBy}

</td>

<td>

<div className="flex justify-end gap-3">

<button className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">

Print

</button>

<button className="rounded-lg bg-[#D6451B] px-3 py-2 text-sm text-white">

Receipt

</button>

</div>

</td>

</tr>
))

):(

<tr>

<td
colSpan={6}
className="py-10 text-center text-slate-500"
>

No payment history available.

</td>

</tr>

)}

</tbody>

</table>

</div>
<div className="mt-6 space-y-4 lg:hidden">

{fee?.transactions?.map((payment)=>(

<div
key={payment._id}
className="rounded-2xl border border-slate-200 p-5"
>

<div className="flex justify-between">

<div>

<h3 className="font-semibold">
#{payment.receiptNumber}
</h3>

<p className="text-sm text-slate-500">
{payment.paymentMode}
</p>

</div>

<div className="text-right">

<h3 className="font-bold text-green-600">
₹{payment.amount}
</h3>

<p className="text-sm text-slate-500">
{payment.date}
</p>

</div>

</div>

<div className="mt-5 flex gap-3">

<button className="flex-1 rounded-xl border border-slate-200 py-2">

Print

</button>

<button className="flex-1 rounded-xl bg-[#D6451B] py-2 text-white">

Receipt

</button>

</div>

</div>

))}

</div>
</motion.div>
<div className="space-y-6">
    <motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<h2 className="text-2xl font-bold">
Payment Insights
</h2>

<div className="mt-8 space-y-5">

<div className="rounded-2xl bg-green-50 p-5">

<p className="text-sm text-slate-500">
Total Payments
</p>

<h3 className="mt-2 text-3xl font-bold text-green-600">
{fee?.transactions?.length || 0}
</h3>

</div>

<div className="rounded-2xl bg-orange-50 p-5">

<p className="text-sm text-slate-500">
Average Payment
</p>

<h3 className="mt-2 text-3xl font-bold text-[#D6451B]">

₹{fee?.averagePayment || 0}

</h3>

</div>

<div className="rounded-2xl bg-blue-50 p-5">

<p className="text-sm text-slate-500">
Last Payment
</p>

<h3 className="mt-2 text-2xl font-bold text-blue-600">

₹{fee?.lastPayment || 0}

</h3>

</div>

</div>

</motion.div>
<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<h2 className="text-2xl font-bold">
Quick Actions
</h2>

<div className="mt-6 space-y-4">

<button className="w-full rounded-2xl bg-[#D6451B] py-4 font-semibold text-white">
Print Receipt
</button>

<button className="w-full rounded-2xl border border-slate-200 py-4 font-semibold hover:bg-slate-50">
Download PDF
</button>

<button className="w-full rounded-2xl border border-slate-200 py-4 font-semibold hover:bg-slate-50">
Send Receipt
</button>

<button className="w-full rounded-2xl border border-red-200 py-4 font-semibold text-red-600 hover:bg-red-50">
Refund Payment
</button>

</div>

</motion.div>
</div>
</div>

</div>
</div>
);
}