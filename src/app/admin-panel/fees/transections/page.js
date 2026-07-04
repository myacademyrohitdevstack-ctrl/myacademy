"use client";

import DashboardSkeleton from "@/app/Skeletons/DashBoardSkeleton";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  FaMoneyBillWave,
  FaReceipt,
  FaWallet,
  FaCreditCard,
  FaSearch,
  FaCalendarAlt,
  FaFilePdf,
  FaFileExcel,
} from "react-icons/fa";
export default function TransactionsPage({
  loading,
  data,
}) {

if (loading){
    return <DashboardSkeleton />
}

const stats=[
{
title:"Transactions",
value:data?.totalTransactions || 0,
icon:<FaReceipt />,
color:"bg-blue-50 text-blue-600"
},
{
title:"Today's Collection",
value:`₹${data?.todayCollection || 0}`,
icon:<FaMoneyBillWave />,
color:"bg-green-50 text-green-600"
},
{
title:"Cash Collection",
value:`₹${data?.cashCollection || 0}`,
icon:<FaWallet />,
color:"bg-orange-50 text-[#D6451B]"
},
{
title:"Online Collection",
value:`₹${data?.onlineCollection || 0}`,
icon:<FaCreditCard />,
color:"bg-violet-50 text-violet-600"
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

Fee Transactions

</span>

<h1 className="mt-6 text-5xl font-bold">

Transactions

</h1>

<p className="mt-4 max-w-2xl leading-7 text-orange-100">

Track every fee payment, receipt, refund and payment method in one place.

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

Today's Collection

</p>

<h2 className="mt-4 text-5xl font-bold">

₹{data?.todayCollection || 0}

</h2>

<p className="mt-4 text-orange-100">

{data?.totalTransactions || 0} Transactions

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
whileHover={{y:-5}}
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

<div className="grid gap-4 lg:grid-cols-6">

<div className="relative lg:col-span-2">

<FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"/>

<input
placeholder="Search student or receipt..."
className="w-full rounded-2xl border border-slate-200 py-4 pl-14 pr-5 outline-none focus:border-[#D6451B]"
/>

</div>

<select className="rounded-2xl border border-slate-200 px-4 py-4">

<option>Payment Mode</option>
<option>Cash</option>
<option>UPI</option>
<option>Card</option>
<option>Bank</option>

</select>

<select className="rounded-2xl border border-slate-200 px-4 py-4">

<option>Status</option>
<option>Paid</option>
<option>Refunded</option>
<option>Failed</option>

</select>

<div className="relative">

<FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"/>

<input
type="date"
className="w-full rounded-2xl border border-slate-200 py-4 pl-14 pr-4"
/>

</div>

<div className="flex gap-3">

<button
className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 hover:bg-slate-50"
>

<FaFilePdf />

PDF

</button>

<button
className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 hover:bg-slate-50"
>

<FaFileExcel />

Excel

</button>

</div>

</div>

</motion.div>
<div className="grid gap-6">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-lg"
>

<div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">

<div>

<h2 className="text-2xl font-bold">

Fee Transactions

</h2>

<p className="mt-2 text-slate-500">

Recent fee collections and payment history.

</p>

</div>

<span className="rounded-full bg-orange-100 px-4 py-2 font-medium text-[#D6451B]">

{data?.transactions?.length || 0} Transactions

</span>

</div>
<div className="hidden overflow-x-auto lg:block">

<table className="w-full">

<thead>

<tr className="border-b border-slate-100 bg-slate-50">

<th className="px-8 py-5 text-left font-semibold">

Receipt

</th>

<th className="text-left font-semibold">

Student

</th>

<th className="text-left font-semibold">

Batch

</th>

<th className="text-left font-semibold">

Mode

</th>

<th className="text-left font-semibold">

Status

</th>

<th className="text-left font-semibold">

Date

</th>

<th className="text-right font-semibold">

Amount

</th>

<th className="pr-8 text-right font-semibold">

Actions

</th>

</tr>

</thead>

<tbody>

{data?.transactions?.map((transaction)=>(

<tr
key={transaction._id}
className="border-b border-slate-100 transition hover:bg-slate-50"
>

<td className="px-8 py-6">

<p className="font-semibold">

{transaction.receiptNo}

</p>

</td>

<td>

<div className="flex items-center gap-4">

<div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-bold text-[#D6451B]">

{transaction.student?.fullName?.charAt(0)}

</div>

<div>

<h3 className="font-semibold">

{transaction.student?.fullName}

</h3>

<p className="text-sm text-slate-500">

{transaction.student?.phone}

</p>

</div>

</div>

</td>

<td>

<div>

<p className="font-medium">

{transaction.batch?.title}

</p>

<p className="text-sm text-slate-500">

{transaction.course?.title}

</p>

</div>

</td>

<td>

<span
className={`rounded-full px-3 py-1 text-sm font-medium

${
transaction.paymentMode==="Cash"
?"bg-green-100 text-green-700"
:transaction.paymentMode==="UPI"
?"bg-blue-100 text-blue-700"
:transaction.paymentMode==="Card"
?"bg-violet-100 text-violet-700"
:"bg-slate-100 text-slate-700"
}

`}
>

{transaction.paymentMode}

</span>

</td>

<td>

<span
className={`rounded-full px-3 py-1 text-sm font-medium

${
transaction.status==="Paid"
?"bg-green-100 text-green-700"
:transaction.status==="Refunded"
?"bg-yellow-100 text-yellow-700"
:"bg-red-100 text-red-700"
}

`}
>

{transaction.status}

</span>

</td>

<td>

{transaction.paymentDate}

</td>

<td className="text-right">

<p className="text-lg font-bold text-green-600">

₹{transaction.amount}

</p>

</td>

<td className="pr-8">

<div className="flex justify-end gap-3">

<button
className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-100"
>

View

</button>

<button
className="rounded-xl bg-[#D6451B] px-4 py-2 text-white"
>

Print

</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>
<div className="space-y-5 p-6 lg:hidden">

{data?.transactions?.map((transaction)=>(

<div
key={transaction._id}
className="rounded-3xl border border-slate-200 p-5"
>

<div className="flex justify-between">

<div>

<h3 className="font-bold">

{transaction.student?.fullName}

</h3>

<p className="text-sm text-slate-500">

{transaction.receiptNo}

</p>

</div>

<p className="font-bold text-green-600">

₹{transaction.amount}

</p>

</div>

<div className="mt-5 flex flex-wrap gap-2">

<span className="rounded-full bg-blue-100 px-3 py-1 text-sm">

{transaction.paymentMode}

</span>

<span className="rounded-full bg-green-100 px-3 py-1 text-sm">

{transaction.status}

</span>

</div>

<div className="mt-5 text-sm text-slate-500">

{transaction.batch?.title}

</div>

<div className="mt-6 flex gap-3">

<button className="flex-1 rounded-xl border border-slate-200 py-3">

View

</button>

<button className="flex-1 rounded-xl bg-[#D6451B] py-3 text-white">

Print

</button>

</div>

</div>

))}

</div>

</motion.div>

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

Daily Collection Summary

</h2>

<p className="mt-2 text-slate-500">

Revenue collected over the last 7 days.

</p>

</div>

<select className="rounded-xl border border-slate-200 px-4 py-2">

<option>Last 7 Days</option>
<option>Last 30 Days</option>

</select>

</div>

<div className="mt-8 flex h-80 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50">

<p className="text-slate-400">

Daily Collection Chart Here

</p>

</div>

<div className="mt-8 grid gap-5 md:grid-cols-3">

<div className="rounded-2xl bg-green-50 p-5">

<p className="text-sm text-slate-500">

Highest Collection

</p>

<h3 className="mt-2 text-2xl font-bold text-green-600">

₹{data?.highestCollection || 0}

</h3>

</div>

<div className="rounded-2xl bg-blue-50 p-5">

<p className="text-sm text-slate-500">

Average Per Day

</p>

<h3 className="mt-2 text-2xl font-bold text-blue-600">

₹{data?.averageCollection || 0}

</h3>

</div>

<div className="rounded-2xl bg-orange-50 p-5">

<p className="text-sm text-slate-500">

Today's Collection

</p>

<h3 className="mt-2 text-2xl font-bold text-[#D6451B]">

₹{data?.todayCollection || 0}

</h3>

</div>

</div>

</motion.div>
<div className="space-y-6">
    <motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<h2 className="text-2xl font-bold">

Payment Methods

</h2>

<div className="mt-8 space-y-6">

{data?.paymentMethodStats?.map((item)=>(

<div key={item.name}>

<div className="mb-2 flex justify-between">

<span>

{item.name}

</span>

<span className="font-semibold">

₹{item.amount}

</span>

</div>

<div className="h-3 overflow-hidden rounded-full bg-slate-100">

<div
style={{
width:`${item.percentage}%`
}}
className="h-full rounded-full bg-[#D6451B]"
/>

</div>

</div>

))}

</div>

</motion.div>
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<h2 className="text-2xl font-bold">

Recent Activity

</h2>

<div className="mt-6 space-y-5">

{data?.recentActivity?.map((activity)=>(

<div
key={activity._id}
className="flex items-start gap-4"
>

<div className="mt-1 h-3 w-3 rounded-full bg-[#D6451B]" />

<div>

<p className="font-medium">

{activity.message}

</p>

<p className="mt-1 text-sm text-slate-500">

{activity.time}

</p>

</div>

</div>

))}

</div>

</motion.div>
</div>

</div>
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg md:flex-row"
>

<p className="text-slate-500">

Showing

<strong>

 {(data?.page - 1) * data?.limit + 1}

</strong>

-

<strong>

{Math.min(data?.page * data?.limit, data?.totalTransactions || 0)}

</strong>

of

<strong>

{data?.totalTransactions || 0}

</strong>

transactions

</p>

<div className="flex gap-3">

<button
className="rounded-xl border border-slate-200 px-5 py-3 hover:bg-slate-50 disabled:opacity-50"
disabled={data?.page===1}
>

Previous

</button>

<button className="rounded-xl bg-[#D6451B] px-5 py-3 text-white">

{data?.page || 1}

</button>

<button
className="rounded-xl border border-slate-200 px-5 py-3 hover:bg-slate-50"
>

Next

</button>

</div>

</motion.div>
<div className="mt-8 grid gap-6 xl:grid-cols-[2fr_1fr]">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<div className="flex items-center justify-between">

<div>

<h2 className="text-2xl font-bold">

Transaction Insights

</h2>

<p className="mt-2 text-slate-500">

Quick financial overview of recent collections.

</p>

</div>

</div>

<div className="mt-8 grid gap-5 md:grid-cols-2">

<div className="rounded-2xl bg-green-50 p-6">

<p className="text-sm text-slate-500">

Largest Transaction

</p>

<h3 className="mt-2 text-3xl font-bold text-green-600">

₹{data?.largestTransaction || 0}

</h3>

<p className="mt-2 text-sm text-slate-500">

Highest single fee payment.

</p>

</div>

<div className="rounded-2xl bg-orange-50 p-6">

<p className="text-sm text-slate-500">

Average Transaction

</p>

<h3 className="mt-2 text-3xl font-bold text-[#D6451B]">

₹{data?.averageTransaction || 0}

</h3>

<p className="mt-2 text-sm text-slate-500">

Average amount collected.

</p>

</div>

<div className="rounded-2xl bg-blue-50 p-6">

<p className="text-sm text-slate-500">

Successful Payments

</p>

<h3 className="mt-2 text-3xl font-bold text-blue-600">

{data?.successfulPayments || 0}

</h3>

<p className="mt-2 text-sm text-slate-500">

Completed transactions.

</p>

</div>

<div className="rounded-2xl bg-red-50 p-6">

<p className="text-sm text-slate-500">

Refunds

</p>

<h3 className="mt-2 text-3xl font-bold text-red-600">

{data?.refundCount || 0}

</h3>

<p className="mt-2 text-sm text-slate-500">

Refunded transactions.

</p>

</div>

</div>

</motion.div>
<div className="space-y-6">
    <motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<h2 className="text-2xl font-bold">

Export

</h2>

<p className="mt-2 text-slate-500">

Download transaction reports.

</p>

<div className="mt-8 space-y-4">

<button className="w-full rounded-2xl bg-[#D6451B] py-4 font-semibold text-white transition hover:opacity-90">

Export PDF

</button>

<button className="w-full rounded-2xl border border-slate-200 py-4 font-semibold transition hover:bg-slate-50">

Export Excel

</button>

<button className="w-full rounded-2xl border border-slate-200 py-4 font-semibold transition hover:bg-slate-50">

Export CSV

</button>

</div>

</motion.div>
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<h2 className="text-2xl font-bold">

Quick Actions

</h2>

<div className="mt-6 space-y-4">

<Link
href="/admin-panel/fees/collection"
className="block rounded-2xl bg-[#D6451B] py-4 text-center font-semibold text-white"
>

Collect Fee

</Link>

<Link
href="/admin-panel/fees/pending"
className="block rounded-2xl border border-slate-200 py-4 text-center font-semibold hover:bg-slate-50"
>

Pending Fees

</Link>

<Link
href="/admin-panel/fees/reports"
className="block rounded-2xl border border-slate-200 py-4 text-center font-semibold hover:bg-slate-50"
>

View Reports

</Link>

<Link
href="/admin-panel/fees/plans"
className="block rounded-2xl border border-slate-200 py-4 text-center font-semibold hover:bg-slate-50"
>

Fee Structures

</Link>

</div>

</motion.div>
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="rounded-[30px] border border-orange-200 bg-orange-50 p-8"
>

<h2 className="text-xl font-bold text-[#D6451B]">

💡 Tips

</h2>

<ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">

<li>
• Review today's transactions before closing the day.
</li>

<li>
• Export reports regularly for accounting records.
</li>

<li>
• Follow up on pending fees to improve collection rates.
</li>

<li>
• Verify refunds before approving them.
</li>

</ul>

</motion.div>
</div>

</div>

</div>

</div>

);

}