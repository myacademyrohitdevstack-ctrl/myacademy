"use client";

import DashboardSkeleton from "@/app/Skeletons/DashBoardSkeleton";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  FaChartLine,
  FaMoneyBillWave,
  FaDownload,
  FaCalendarAlt,
  FaFilePdf,
  FaFileExcel,
//   FaArrowTrendUp,
  FaUsers,
} from "react-icons/fa";
export default function ReportsPage({
  loading,
  data,
}) {
  if (loading) {
    return <DashboardSkeleton />;
  }

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${data?.totalRevenue || 0}`,
      icon: <FaMoneyBillWave />,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Pending Amount",
      value: `₹${data?.pendingAmount || 0}`,
      icon: <FaMoneyBillWave />,
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Collection Rate",
      value: `${data?.collectionRate || 0}%`,
    //   icon: <FaArrowTrendUp />,
      icon: <FaMoneyBillWave />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Transactions",
      value: data?.transactions || 0,
      icon: <FaUsers />,
      color: "bg-orange-50 text-[#D6451B]",
    },
  ];

  return (
    <div className="py-28">

      <div className="mx-auto max-w-7xl space-y-8 px-4 md:px-0">
        <motion.section
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#D6451B] to-[#ff855e] p-8 text-white shadow-xl"
>

<div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

<div>

<span className="rounded-full bg-white/20 px-4 py-2 text-sm">

Fee Reports

</span>

<h1 className="mt-6 text-5xl font-bold">

Revenue & Analytics

</h1>

<p className="mt-4 max-w-2xl leading-7 text-orange-100">

Analyze revenue, pending fees, payment trends,
collections and export detailed financial reports.

</p>

<div className="mt-8 flex flex-wrap gap-4">

<Link
href="/admin-panel/fees"
className="rounded-2xl bg-white px-6 py-4 font-semibold text-[#D6451B]"
>

Fee Dashboard

</Link>

<Link
href="/admin-panel/fees/transactions"
className="rounded-2xl border border-white/30 px-6 py-4"
>

Transactions

</Link>

</div>

</div>

<div className="hidden w-80 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md lg:block">

<p className="text-orange-100">

This Month Revenue

</p>

<h2 className="mt-4 text-5xl font-bold">

₹{data?.monthlyRevenue || 0}

</h2>

<p className="mt-4 text-orange-100">

{data?.collectionRate || 0}% Collection Rate

</p>

</div>

</div>

</motion.section>
<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg"
>

<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

<div className="flex flex-wrap gap-4">

<div className="relative">

<FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"/>

<select
className="rounded-2xl border border-slate-200 py-4 pl-14 pr-8"
>

<option>This Month</option>
<option>Last Month</option>
<option>Last 3 Months</option>
<option>Last 6 Months</option>
<option>This Year</option>

</select>

</div>

<select
className="rounded-2xl border border-slate-200 px-6 py-4"
>

<option>All Courses</option>

</select>

<select
className="rounded-2xl border border-slate-200 px-6 py-4"
>

<option>All Batches</option>

</select>

</div>

<div className="flex gap-4">

<button
className="flex items-center gap-2 rounded-2xl border border-slate-200 px-6 py-4 hover:bg-slate-50"
>

<FaFilePdf />

PDF

</button>

<button
className="flex items-center gap-2 rounded-2xl border border-slate-200 px-6 py-4 hover:bg-slate-50"
>

<FaFileExcel />

Excel

</button>

</div>

</div>

</motion.div>
<section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

{stats.map((item,index)=>(

<motion.div
key={item.title}
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.08}}
whileHover={{y:-5}}
className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg"
>

<div className="flex items-center justify-between">

<div
className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl ${item.color}`}
>

{item.icon}

</div>

</div>

<h2 className="mt-6 text-4xl font-bold">

{item.value}

</h2>

<p className="mt-2 text-slate-500">

{item.title}

</p>

</motion.div>

))}

</section>
<div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<div className="flex items-center justify-between">

<div>

<h2 className="text-2xl font-bold">

Revenue Trend

</h2>

<p className="mt-2 text-slate-500">

Monthly fee collection overview.

</p>

</div>

<select className="rounded-xl border border-slate-200 px-4 py-2">

<option>Last 6 Months</option>
<option>Last 12 Months</option>

</select>

</div>

<div className="mt-8 flex h-96 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50">

<p className="text-slate-400">

Revenue Chart Here

</p>

</div>

<div className="mt-8 grid gap-5 md:grid-cols-3">

<div className="rounded-2xl bg-green-50 p-5">

<p className="text-sm text-slate-500">

Highest Month

</p>

<h3 className="mt-2 text-2xl font-bold text-green-600">

₹{data?.highestMonthRevenue || 0}

</h3>

</div>

<div className="rounded-2xl bg-blue-50 p-5">

<p className="text-sm text-slate-500">

Average Revenue

</p>

<h3 className="mt-2 text-2xl font-bold text-blue-600">

₹{data?.averageRevenue || 0}

</h3>

</div>

<div className="rounded-2xl bg-orange-50 p-5">

<p className="text-sm text-slate-500">

Growth

</p>

<h3 className="mt-2 text-2xl font-bold text-[#D6451B]">

{data?.growth || 0}%

</h3>

</div>

</div>

</motion.div>
<div className="space-y-6">
    <motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<h2 className="text-2xl font-bold">

Collection Progress

</h2>

<div className="mt-8">

<div className="flex justify-between">

<span>

Collected

</span>

<span className="font-semibold">

₹{data?.collectedAmount || 0}

</span>

</div>

<div className="mt-3 h-4 overflow-hidden rounded-full bg-slate-100">

<div
style={{
width:`${data?.collectionRate || 0}%`
}}
className="h-full rounded-full bg-green-500"
/>

</div>

<p className="mt-3 text-sm text-slate-500">

{data?.collectionRate || 0}% of expected revenue collected.

</p>

</div>

<div className="mt-8 rounded-2xl bg-orange-50 p-5">

<p className="text-sm text-slate-500">

Pending Revenue

</p>

<h3 className="mt-2 text-3xl font-bold text-[#D6451B]">

₹{data?.pendingAmount || 0}

</h3>

</div>

</motion.div>
<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<h2 className="text-2xl font-bold">

Collection vs Pending

</h2>

<div className="mt-8 space-y-6">

<div>

<div className="mb-2 flex justify-between">

<span>

Collected

</span>

<span>

₹{data?.collectedAmount || 0}

</span>

</div>

<div className="h-3 rounded-full bg-slate-100">

<div
style={{
width:`${data?.collectionRate || 0}%`
}}
className="h-full rounded-full bg-green-500"
/>

</div>

</div>

<div>

<div className="mb-2 flex justify-between">

<span>

Pending

</span>

<span>

₹{data?.pendingAmount || 0}

</span>

</div>

<div className="h-3 rounded-full bg-slate-100">

<div
style={{
width:`${100-(data?.collectionRate || 0)}%`
}}
className="h-full rounded-full bg-red-500"
/>

</div>

</div>

</div>

</motion.div>
<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<h2 className="text-2xl font-bold">

Monthly Summary

</h2>

<div className="mt-8 space-y-5">

<div className="flex justify-between">

<span>

Revenue

</span>

<span className="font-bold">

₹{data?.monthlyRevenue || 0}

</span>

</div>

<div className="flex justify-between">

<span>

Expenses

</span>

<span className="font-bold">

₹{data?.expenses || 0}

</span>

</div>

<div className="flex justify-between">

<span>

Net Income

</span>

<span className="font-bold text-green-600">

₹{data?.netIncome || 0}

</span>

</div>

<div className="flex justify-between">

<span>

Transactions

</span>

<span className="font-bold">

{data?.transactions || 0}

</span>

</div>

</div>

</motion.div>
</div>

</div>
<div className="grid gap-6 lg:grid-cols-2">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<div className="flex items-center justify-between">

<div>

<h2 className="text-2xl font-bold">

Revenue by Course

</h2>

<p className="mt-2 text-slate-500">

Highest earning courses.

</p>

</div>

<button className="rounded-xl border border-slate-200 px-4 py-2">

View All

</button>

</div>

<div className="mt-8 space-y-6">

{data?.courseRevenue?.map((course)=>(

<div key={course._id}>

<div className="mb-2 flex justify-between">

<div>

<h3 className="font-semibold">

{course.title}

</h3>

<p className="text-sm text-slate-500">

{course.students} Students

</p>

</div>

<span className="font-bold text-green-600">

₹{course.revenue}

</span>

</div>

<div className="h-3 overflow-hidden rounded-full bg-slate-100">

<div
style={{
width:`${course.percentage}%`
}}
className="h-full rounded-full bg-green-500"
/>

</div>

</div>

))}

</div>

</motion.div>
<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<div className="flex items-center justify-between">

<div>

<h2 className="text-2xl font-bold">

Revenue by Batch

</h2>

<p className="mt-2 text-slate-500">

Collection performance across batches.

</p>

</div>

</div>

<div className="mt-8 space-y-5">

{data?.batchRevenue?.map((batch)=>(

<div
key={batch._id}
className="rounded-2xl border border-slate-200 p-5"
>

<div className="flex items-center justify-between">

<div>

<h3 className="font-semibold">

{batch.title}

</h3>

<p className="mt-1 text-sm text-slate-500">

{batch.students} Students

</p>

</div>

<div className="text-right">

<h3 className="text-2xl font-bold text-[#D6451B]">

₹{batch.revenue}

</h3>

<p className="text-sm text-green-600">

{batch.collectionRate}% Collected

</p>

</div>

</div>

</div>

))}

</div>

</motion.div>
</div>
<div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
    <motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<h2 className="text-2xl font-bold">

Payment Methods

</h2>

<p className="mt-2 text-slate-500">

Collection distribution.

</p>

<div className="mt-8 space-y-6">

{data?.paymentMethods?.map((method)=>(

<div key={method.name}>

<div className="mb-2 flex justify-between">

<span>

{method.name}

</span>

<span className="font-semibold">

₹{method.amount}

</span>

</div>

<div className="h-3 overflow-hidden rounded-full bg-slate-100">

<div
style={{
width:`${method.percentage}%`
}}
className="h-full rounded-full bg-[#D6451B]"
/>

</div>

</div>

))}

</div>

</motion.div>
<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<div className="flex items-center justify-between">

<h2 className="text-2xl font-bold">

Top Paying Students

</h2>

<button className="rounded-xl border border-slate-200 px-4 py-2">

View All

</button>

</div>

<div className="mt-8 space-y-5">

{data?.topStudents?.map((student,index)=>(

<div
key={student._id}
className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 hover:bg-slate-50"
>

<div className="flex items-center gap-4">

<div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-bold text-[#D6451B]">

{index+1}

</div>

<div>

<h3 className="font-semibold">

{student.fullName}

</h3>

<p className="text-sm text-slate-500">

{student.batch?.title}

</p>

</div>

</div>

<div className="text-right">

<h3 className="font-bold text-green-600">

₹{student.totalPaid}

</h3>

<p className="text-xs text-slate-500">

Paid

</p>

</div>

</div>

))}

</div>

</motion.div>
</div>
<div className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[30px] border border-slate-200 bg-white shadow-lg"
>

<div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">

<div>

<h2 className="text-2xl font-bold">

Recent Transactions

</h2>

<p className="mt-2 text-slate-500">

Latest fee collections.

</p>

</div>

<button className="rounded-xl border border-slate-200 px-5 py-3">

View All

</button>

</div>

<div className="overflow-x-auto">

<table className="w-full">

<thead>

<tr className="border-b border-slate-100 bg-slate-50">

<th className="px-8 py-4 text-left">

Student

</th>

<th className="text-left">

Batch

</th>

<th className="text-left">

Payment Mode

</th>

<th className="text-left">

Date

</th>

<th className="pr-8 text-right">

Amount

</th>

</tr>

</thead>

<tbody>

{data?.recentTransactions?.map((transaction)=>(

<tr
key={transaction._id}
className="border-b border-slate-100 hover:bg-slate-50"
>

<td className="px-8 py-5">

<div className="flex items-center gap-4">

<div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-bold text-[#D6451B]">

{transaction.student?.fullName?.charAt(0)}

</div>

<div>

<h3 className="font-semibold">

{transaction.student?.fullName}

</h3>

<p className="text-sm text-slate-500">

#{transaction.receiptNo}

</p>

</div>

</div>

</td>

<td>

{transaction.batch?.title}

</td>

<td>

<span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">

{transaction.paymentMode}

</span>

</td>

<td>

{transaction.paymentDate}

</td>

<td className="pr-8 text-right font-bold text-green-600">

₹{transaction.amount}

</td>

</tr>

))}

</tbody>

</table>

</div>

</motion.div>
<div className="space-y-6">
    <motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<h2 className="text-2xl font-bold">

Business Insights

</h2>

<div className="mt-8 space-y-5">

<div className="rounded-2xl bg-green-50 p-5">

<h3 className="font-semibold text-green-700">

📈 Collection Increased

</h3>

<p className="mt-2 text-sm text-slate-600">

{data?.growth || 0}% higher than previous month.

</p>

</div>

<div className="rounded-2xl bg-red-50 p-5">

<h3 className="font-semibold text-red-700">

⚠ Pending Fees

</h3>

<p className="mt-2 text-sm text-slate-600">

{data?.pendingStudents || 0} students still have pending dues.

</p>

</div>

<div className="rounded-2xl bg-blue-50 p-5">

<h3 className="font-semibold text-blue-700">

🏆 Best Course

</h3>

<p className="mt-2 text-sm text-slate-600">

{data?.bestCourse || "-"}

</p>

</div>

</div>

</motion.div>
<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<h2 className="text-2xl font-bold">

Export Reports

</h2>

<p className="mt-2 text-slate-500">

Download reports instantly.

</p>

<div className="mt-8 space-y-4">

<button className="w-full rounded-2xl bg-[#D6451B] py-4 font-semibold text-white">

Export PDF

</button>

<button className="w-full rounded-2xl border border-slate-200 py-4 font-semibold hover:bg-slate-50">

Export Excel

</button>

<button className="w-full rounded-2xl border border-slate-200 py-4 font-semibold hover:bg-slate-50">

Export CSV

</button>

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

<Link
href="/admin-panel/fees"
className="block rounded-2xl bg-[#D6451B] py-4 text-center font-semibold text-white"
>

Fee Dashboard

</Link>

<Link
href="/admin-panel/fees/collection"
className="block rounded-2xl border border-slate-200 py-4 text-center font-semibold hover:bg-slate-50"
>

Collect Fees

</Link>

<Link
href="/admin-panel/fees/pending"
className="block rounded-2xl border border-slate-200 py-4 text-center font-semibold hover:bg-slate-50"
>

Pending Fees

</Link>

<Link
href="/admin-panel/fees/transactions"
className="block rounded-2xl border border-slate-200 py-4 text-center font-semibold hover:bg-slate-50"
>

Transactions

</Link>

</div>

</motion.div>
</div>

</div>

</div>

</div>

);
}