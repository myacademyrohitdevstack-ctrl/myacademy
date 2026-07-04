"use client";

import DashboardSkeleton from "@/app/Skeletons/DashBoardSkeleton";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  FaExclamationCircle,
  FaMoneyBillWave,
  FaUsers,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
export default function PendingFeesPage({
  loading,
  data,
}) {

if (loading) {
  return <DashboardSkeleton />;
}

const stats=[
{
title:"Pending Students",
value:data?.pendingStudents || 0,
icon:<FaUsers />,
color:"bg-red-50 text-red-600"
},
{
title:"Pending Amount",
value:`₹${data?.pendingAmount || 0}`,
icon:<FaMoneyBillWave />,
color:"bg-orange-50 text-[#D6451B]"
},
{
title:"Overdue",
value:data?.overdueStudents || 0,
icon:<FaExclamationCircle />,
color:"bg-yellow-50 text-yellow-600"
},
{
title:"Due Today",
value:data?.dueToday || 0,
icon:<FaCalendarAlt />,
color:"bg-blue-50 text-blue-600"
},
];

return(

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

Pending Fees

</span>

<h1 className="mt-6 text-5xl font-bold">

Pending Fee Collection

</h1>

<p className="mt-4 max-w-2xl leading-7 text-orange-100">

Track unpaid students, overdue installments and collect fees quickly.

</p>

<div className="mt-8 flex flex-wrap gap-4">

<Link
href="/admin-panel/fees"
className="rounded-2xl bg-white px-6 py-4 font-semibold text-[#D6451B]"
>

Fee Dashboard

</Link>

<Link
href="/admin-panel/fees/reports"
className="rounded-2xl border border-white/30 px-6 py-4"
>

Reports

</Link>

</div>

</div>

<div className="hidden w-80 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md lg:block">

<p className="text-orange-100">

Total Pending

</p>

<h2 className="mt-4 text-5xl font-bold">

₹{data?.pendingAmount || 0}

</h2>

<p className="mt-4 text-orange-100">

Across {data?.pendingStudents || 0} students

</p>

</div>

</div>

</motion.section>
<section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

{stats.map((item,index)=>(

<motion.div
key={item.title}
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.08}}
className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg"
>

<div className="flex items-center justify-between">

<div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl ${item.color}`}>

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
<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg"
>

<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

<div className="relative flex-1">

<FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"/>

<input
placeholder="Search student..."
className="w-full rounded-2xl border border-slate-200 py-4 pl-14 pr-5 outline-none focus:border-[#D6451B]"
/>

</div>

<div className="flex flex-wrap gap-4">

<select className="rounded-2xl border border-slate-200 px-5 py-4">

<option>All Courses</option>

</select>

<select className="rounded-2xl border border-slate-200 px-5 py-4">

<option>All Batches</option>

</select>

<select className="rounded-2xl border border-slate-200 px-5 py-4">

<option>All Status</option>
<option>Overdue</option>
<option>Due Today</option>

</select>

<button className="rounded-2xl bg-[#D6451B] px-6 text-white">

<FaFilter />

</button>

</div>

</div>

</motion.div>
<div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-lg"
>

<div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">

<div>

<h2 className="text-2xl font-bold">
Pending Students
</h2>

<p className="mt-2 text-slate-500">
Students with unpaid fees.
</p>

</div>

<span className="rounded-full bg-orange-100 px-4 py-2 font-medium text-[#D6451B]">

{data?.pendingFees?.length || 0} Students

</span>

</div>
<div className="hidden overflow-x-auto lg:block">

<table className="w-full">

<thead>

<tr className="border-b border-slate-100 bg-slate-50">

<th className="px-8 py-5 text-left font-semibold">
Student
</th>

<th className="text-left font-semibold">
Batch
</th>

<th className="text-left font-semibold">
Pending
</th>

<th className="text-left font-semibold">
Due Date
</th>

<th className="text-left font-semibold">
Progress
</th>

<th className="text-right pr-8 font-semibold">
Action
</th>

</tr>

</thead>

<tbody>

{data?.pendingFees?.map((student)=>(

<tr
key={student._id}
className="border-b border-slate-100 transition hover:bg-slate-50"
>

<td className="px-8 py-6">

<div className="flex items-center gap-4">

<div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-[#D6451B]">

{student.fullName?.charAt(0)}

</div>

<div>

<h3 className="font-semibold">

{student.fullName}

</h3>

<p className="text-sm text-slate-500">

{student.phone}

</p>

</div>

</div>

</td>

<td>

{student.batch?.title}

</td>

<td>

<div>

<p className="font-bold text-red-600">

₹{student.pendingAmount}

</p>

<p className="text-xs text-slate-500">

Total ₹{student.totalFee}

</p>

</div>

</td>

<td>

<div>

<p>

{student.nextDueDate}

</p>

{student.overdue && (

<span className="mt-2 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">

Overdue

</span>

)}

</div>

</td>

<td className="w-56">

<div className="h-3 overflow-hidden rounded-full bg-slate-100">

<div
style={{
width:`${student.percentagePaid}%`
}}
className="h-full rounded-full bg-green-500"
/>

</div>

<p className="mt-2 text-xs text-slate-500">

{student.percentagePaid}% Paid

</p>

</td>

<td className="pr-8">

<div className="flex justify-end gap-3">

<button
className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50"
>

View

</button>

<button
className="rounded-xl bg-[#D6451B] px-4 py-2 text-white"
>

Collect

</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>
<div className="space-y-5 p-6 lg:hidden">

{data?.pendingFees?.map((student)=>(

<div
key={student._id}
className="rounded-3xl border border-slate-200 p-5"
>

<div className="flex justify-between">

<div>

<h3 className="text-lg font-bold">

{student.fullName}

</h3>

<p className="text-slate-500">

{student.batch?.title}

</p>

</div>

<span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">

₹{student.pendingAmount}

</span>

</div>

<div className="mt-5">

<div className="h-3 overflow-hidden rounded-full bg-slate-100">

<div
style={{
width:`${student.percentagePaid}%`
}}
className="h-full rounded-full bg-green-500"
/>

</div>

<p className="mt-2 text-sm text-slate-500">

{student.percentagePaid}% Paid

</p>

</div>

<div className="mt-6 flex gap-3">

<button className="flex-1 rounded-xl border border-slate-200 py-3">

View

</button>

<button className="flex-1 rounded-xl bg-[#D6451B] py-3 text-white">

Collect

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

Collection Summary

</h2>

<div className="mt-8 space-y-5">

<div className="rounded-2xl bg-green-50 p-5">

<p className="text-sm text-slate-500">

Collected This Month

</p>

<h3 className="mt-2 text-3xl font-bold text-green-600">

₹{data?.monthlyCollection || 0}

</h3>

</div>

<div className="rounded-2xl bg-orange-50 p-5">

<p className="text-sm text-slate-500">

Pending Amount

</p>

<h3 className="mt-2 text-3xl font-bold text-[#D6451B]">

₹{data?.pendingAmount || 0}

</h3>

</div>

<div className="rounded-2xl bg-red-50 p-5">

<p className="text-sm text-slate-500">

Overdue Amount

</p>

<h3 className="mt-2 text-3xl font-bold text-red-600">

₹{data?.overdueAmount || 0}

</h3>

</div>

</div>

</motion.div>
</div>
</div>
<div className="mt-8 grid gap-6 xl:grid-cols-[2fr_1fr]">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<div className="flex items-center justify-between">

<div>

<h2 className="text-2xl font-bold">

Upcoming Due Payments

</h2>

<p className="mt-2 text-slate-500">

Students whose fee is due in the next few days.

</p>

</div>

<Link
href="/admin-panel/fees/upcoming"
className="font-semibold text-[#D6451B]"
>

View All

</Link>

</div>

<div className="mt-8 space-y-5">

{data?.upcomingPayments?.length ? (

data.upcomingPayments.map((student)=>(

<div
key={student._id}
className="flex items-center justify-between rounded-3xl border border-slate-200 p-5 transition hover:border-[#D6451B]"
>

<div className="flex items-center gap-4">

<div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 font-bold text-[#D6451B]">

{student.fullName.charAt(0)}

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

<h3 className="font-bold text-red-600">

₹{student.pendingAmount}

</h3>

<p className="text-sm text-slate-500">

Due {student.nextDueDate}

</p>

</div>

</div>

))

):(

<div className="rounded-3xl border border-dashed border-slate-300 py-12 text-center">

No upcoming dues.

</div>

)}

</div>

</motion.div>
<div className="space-y-6">
    <motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<h2 className="text-2xl font-bold">

Fee Recovery

</h2>

<div className="mt-8">

<div className="h-4 overflow-hidden rounded-full bg-slate-100">

<div
style={{
width:`${data?.recoveryPercentage || 0}%`
}}
className="h-full rounded-full bg-green-500"
/>

</div>

<div className="mt-4 flex items-center justify-between">

<span>

Recovered

</span>

<span className="font-bold text-green-600">

{data?.recoveryPercentage || 0}%

</span>

</div>

</div>

<div className="mt-8 rounded-2xl bg-green-50 p-5">

<p className="text-sm text-slate-500">

Collected

</p>

<h3 className="mt-2 text-3xl font-bold text-green-600">

₹{data?.collectedAmount || 0}

</h3>

</div>

<div className="mt-5 rounded-2xl bg-red-50 p-5">

<p className="text-sm text-slate-500">

Remaining

</p>

<h3 className="mt-2 text-3xl font-bold text-red-600">

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

Highest Pending

</h2>

<div className="mt-6 space-y-4">

{data?.highestPending?.map((student)=>(

<div
key={student._id}
className="flex items-center justify-between"
>

<div className="flex items-center gap-3">

<div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 font-bold text-[#D6451B]">

{student.fullName.charAt(0)}

</div>

<div>

<h3 className="font-medium">

{student.fullName}

</h3>

<p className="text-xs text-slate-500">

{student.batch?.title}

</p>

</div>

</div>

<span className="font-bold text-red-600">

₹{student.pendingAmount}

</span>

</div>

))}

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
href="/admin-panel/fees/reports"
className="block rounded-2xl border border-slate-200 py-4 text-center font-semibold hover:bg-slate-50"
>

Revenue Report

</Link>

<Link
href="/admin-panel/fees/transactions"
className="block rounded-2xl border border-slate-200 py-4 text-center font-semibold hover:bg-slate-50"
>

View Transactions

</Link>

</div>

</motion.div>
</div>
</div>
<div className="mt-8">
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<div className="flex items-center justify-between">

<div>

<h2 className="text-2xl font-bold">
Monthly Target
</h2>

<p className="mt-2 text-slate-500">
Collection progress this month.
</p>

</div>

<span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

{data?.targetPercentage || 0}%

</span>

</div>

<div className="mt-8">

<div className="flex justify-between text-sm">

<span>Collected</span>

<span>
₹{data?.monthlyCollection || 0}
</span>

</div>

<div className="mt-3 h-4 overflow-hidden rounded-full bg-slate-100">

<div
style={{
width:`${data?.targetPercentage || 0}%`
}}
className="h-full rounded-full bg-green-500"
/>

</div>

<div className="mt-5 flex justify-between text-sm text-slate-500">

<span>
Target
</span>

<span>
₹{data?.monthlyTarget || 0}
</span>

</div>

</div>

</motion.div>
<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<h2 className="text-2xl font-bold">

Collection by Payment Mode

</h2>

<div className="mt-8 space-y-5">

<div>

<div className="mb-2 flex justify-between">

<span>Cash</span>

<span>

₹{data?.paymentModes?.cash || 0}

</span>

</div>

<div className="h-3 rounded-full bg-slate-100">

<div
style={{
width:"70%"
}}
className="h-full rounded-full bg-green-500"
/>

</div>

</div>

<div>

<div className="mb-2 flex justify-between">

<span>UPI</span>

<span>

₹{data?.paymentModes?.upi || 0}

</span>

</div>

<div className="h-3 rounded-full bg-slate-100">

<div
style={{
width:"55%"
}}
className="h-full rounded-full bg-blue-500"
/>

</div>

</div>

<div>

<div className="mb-2 flex justify-between">

<span>Card</span>

<span>

₹{data?.paymentModes?.card || 0}

</span>

</div>

<div className="h-3 rounded-full bg-slate-100">

<div
style={{
width:"25%"
}}
className="h-full rounded-full bg-violet-500"
/>

</div>

</div>

<div>

<div className="mb-2 flex justify-between">

<span>Bank Transfer</span>

<span>

₹{data?.paymentModes?.bank || 0}

</span>

</div>

<div className="h-3 rounded-full bg-slate-100">

<div
style={{
width:"45%"
}}
className="h-full rounded-full bg-orange-500"
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

Collection Trend

</h2>

<p className="mt-2 text-slate-500">

Last 6 months collection overview.

</p>

<div className="mt-8 flex h-64 items-center justify-center rounded-3xl border border-dashed border-slate-300">

<p className="text-slate-400">

Revenue Chart Here

</p>

</div>

</motion.div>
<div className="mt-8 grid gap-6 lg:grid-cols-3">
<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<div className="flex items-center justify-between">

<h2 className="text-2xl font-bold">

Recent Collections

</h2>

<Link
href="/admin-panel/fees/transactions"
className="font-semibold text-[#D6451B]"
>

View All

</Link>

</div>

<div className="mt-8 space-y-4">

{data?.recentCollections?.map((item)=>(

<div
key={item._id}
className="flex items-center justify-between border-b border-slate-100 pb-4"
>

<div>

<h3 className="font-semibold">

{item.student?.fullName}

</h3>

<p className="text-sm text-slate-500">

{item.paymentMode}

</p>

</div>

<div className="text-right">

<h3 className="font-bold text-green-600">

₹{item.amount}

</h3>

<p className="text-xs text-slate-500">

{item.date}

</p>

</div>

</div>

))}

</div>

</motion.div>
</div>

</div>

</div>
</div>

);
}