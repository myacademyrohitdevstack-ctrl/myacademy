"use client";

import DashboardSkeleton from "@/app/Skeletons/DashBoardSkeleton";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  FaMoneyBillWave,
  FaLayerGroup,
  FaUsers,
  FaCalendarAlt,
  FaPlus,
  FaBookOpen,
} from "react-icons/fa";
export default function FeeStructuresPage({
  loading,
  data,
}) {
  if (loading) {
    return <DashboardSkeleton />;
  }

  const stats = [
    {
      title: "Fee Structures",
      value: data?.totalStructures || 0,
      icon: <FaLayerGroup />,
      color: "bg-orange-50 text-[#D6451B]",
    },
    {
      title: "Active Plans",
      value: data?.activeStructures || 0,
      icon: <FaMoneyBillWave />,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Students Assigned",
      value: data?.studentsAssigned || 0,
      icon: <FaUsers />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Average Fee",
      value: `₹${data?.averageFee || 0}`,
      icon: <FaBookOpen />,
      color: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="py-28">
      <div className="mx-auto max-w-7xl space-y-8 px-4 md:px-0">
        <motion.section
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#D6451B] to-[#ff855e] p-8 text-white shadow-xl"
>

<div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

<div>

<span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
Fee Structures
</span>

<h1 className="mt-6 text-4xl font-bold lg:text-5xl">
Manage Fee Structures 💰
</h1>

<p className="mt-4 max-w-2xl leading-7 text-orange-100">
Create reusable fee structures for courses and batches.
Assign them to students, define installments,
discounts and manage academy pricing from one place.
</p>

<div className="mt-8">

<Link
href="/admin-panel/fees/structures/create"
className="inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-[#D6451B] transition hover:scale-105"
>

<FaPlus />

Create Structure

</Link>

</div>

</div>

<div className="hidden w-80 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md lg:block">

<div className="flex items-center justify-between">

<h3 className="font-semibold">
Overview
</h3>

<FaMoneyBillWave />

</div>

<div className="mt-6 space-y-5">

<div className="flex items-center justify-between">

<span className="text-orange-100">
Structures
</span>

<span className="font-bold">
{data?.totalStructures || 0}
</span>

</div>

<div className="flex items-center justify-between">

<span className="text-orange-100">
Active
</span>

<span className="font-bold">
{data?.activeStructures || 0}
</span>

</div>

<div className="flex items-center justify-between">

<span className="text-orange-100">
Students Assigned
</span>

<span className="font-bold">
{data?.studentsAssigned || 0}
</span>

</div>

<div className="flex items-center justify-between">

<span className="text-orange-100">
Average Fee
</span>

<span className="font-bold">
₹{data?.averageFee || 0}
</span>

</div>

</div>

</div>

</div>

</motion.section>
<section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

{stats.map((item,index)=>(

<motion.div
key={item.title}
initial={{opacity:0,y:25}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.08}}
whileHover={{y:-5}}
className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg"
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
<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
>

<div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

<div>

<h2 className="text-2xl font-bold">

Quick Actions

</h2>

<p className="mt-2 text-slate-500">

Create and manage reusable fee structures.

</p>

</div>

<div className="flex flex-wrap gap-4">

<Link
href="/admin-panel/fees/structures/create"
className="rounded-2xl bg-[#D6451B] px-6 py-4 font-semibold text-white transition hover:bg-[#b93914]"
>

+ New Structure

</Link>

<Link
href="/admin-panel/fees"
className="rounded-2xl border border-slate-200 px-6 py-4 font-semibold hover:bg-slate-50"
>

Fee Dashboard

</Link>

</div>

</div>

</motion.div>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg"
>
  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

    <div className="flex-1">

      <input
        type="text"
        placeholder="Search fee structure..."
        className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-[#D6451B]"
      />

    </div>

    <div className="flex gap-4">

      <select
        className="rounded-2xl border border-slate-200 px-5 py-4 outline-none"
      >
        <option>All Courses</option>
      </select>

      <select
        className="rounded-2xl border border-slate-200 px-5 py-4 outline-none"
      >
        <option>All Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>

    </div>

  </div>
</motion.div>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[30px] border border-slate-200 bg-white shadow-lg overflow-hidden"
>

<div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">

<div>

<h2 className="text-2xl font-bold">
Fee Structures
</h2>

<p className="mt-1 text-slate-500">
Manage all academy fee structures.
</p>

</div>

<span className="rounded-full bg-orange-100 px-4 py-2 font-medium text-[#D6451B]">

{data?.structures?.length || 0} Structures

</span>

</div>
<div className="hidden overflow-x-auto lg:block">

<table className="w-full">

<thead>

<tr className="border-b border-slate-100 bg-slate-50">

<th className="px-8 py-5 text-left font-semibold">
Structure
</th>

<th className="text-left font-semibold">
Course
</th>

<th className="text-left font-semibold">
Fee
</th>

<th className="text-left font-semibold">
Installments
</th>

<th className="text-left font-semibold">
Students
</th>

<th className="text-left font-semibold">
Status
</th>

<th className="text-right font-semibold pr-8">
Actions
</th>

</tr>

</thead>

<tbody>

{data?.structures?.map((item)=>(
    <tr
key={item._id}
className="border-b border-slate-100 hover:bg-slate-50 transition"
>

<td className="px-8 py-6">

<div className="flex items-center gap-4">

<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 font-bold text-[#D6451B]">

{item.title.charAt(0)}

</div>

<div>

<h3 className="font-semibold text-lg">

{item.title}

</h3>

<p className="text-sm text-slate-500">

Created {item.createdAt}

</p>

</div>

</div>

</td>

<td>

{item.course}

</td>

<td>

<span className="font-bold text-green-600">

₹{item.totalFee}

</span>

</td>

<td>

{item.installments}

</td>

<td>

{item.students}

</td>

<td>

<span
className={`rounded-full px-4 py-2 text-sm font-medium ${
item.status==="Active"
?"bg-green-100 text-green-700"
:"bg-red-100 text-red-700"
}`}
>

{item.status}

</span>

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

Edit

</button>

</div>

</td>

</tr>
))}

</tbody>

</table>

</div>
<div className="space-y-5 p-6 lg:hidden">

{data?.structures?.map((item)=>(

<div
key={item._id}
className="rounded-3xl border border-slate-200 p-5"
>

<div className="flex items-start justify-between">

<div>

<h3 className="text-xl font-bold">

{item.title}

</h3>

<p className="mt-1 text-slate-500">

{item.course}

</p>

</div>

<span
className={`rounded-full px-4 py-2 text-sm ${
item.status==="Active"
?"bg-green-100 text-green-700"
:"bg-red-100 text-red-700"
}`}
>

{item.status}

</span>

</div>

<div className="mt-6 grid grid-cols-2 gap-4">

<div>

<p className="text-sm text-slate-500">

Fee

</p>

<h4 className="font-bold text-green-600">

₹{item.totalFee}

</h4>

</div>

<div>

<p className="text-sm text-slate-500">

Installments

</p>

<h4 className="font-bold">

{item.installments}

</h4>

</div>

<div>

<p className="text-sm text-slate-500">

Students

</p>

<h4 className="font-bold">

{item.students}

</h4>

</div>

</div>

<div className="mt-6 flex gap-3">

<button className="flex-1 rounded-xl border border-slate-200 py-3">

View

</button>

<button className="flex-1 rounded-xl bg-[#D6451B] py-3 text-white">

Edit

</button>

</div>

</div>

))}

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
Recently Created
</h2>

<p className="mt-2 text-slate-500">
Latest fee structures created in your academy.
</p>

</div>

<Link
href="/admin-panel/fees/structures"
className="text-[#D6451B] font-semibold hover:underline"
>

View All

</Link>

</div>

<div className="mt-8 space-y-5">

{data?.recentStructures?.length ? (

data.recentStructures.map((item)=>(

<div
key={item._id}
className="flex items-center justify-between rounded-3xl border border-slate-200 p-5 hover:border-[#D6451B] transition"
>

<div className="flex items-center gap-4">

<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 font-bold text-[#D6451B]">

{item.title.charAt(0)}

</div>

<div>

<h3 className="font-semibold text-lg">

{item.title}

</h3>

<p className="text-sm text-slate-500">

{item.course}

</p>

</div>

</div>

<div className="text-right">

<h3 className="font-bold text-green-600">

₹{item.totalFee}

</h3>

<p className="text-sm text-slate-500">

{item.students} Students

</p>

</div>

</div>

))

):(

<div className="rounded-3xl border border-dashed border-slate-300 py-12 text-center">

<p className="text-slate-500">

No fee structures found.

</p>

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

Revenue Insights

</h2>

<div className="mt-8 space-y-5">

<div className="rounded-2xl bg-green-50 p-5">

<p className="text-sm text-slate-500">

Estimated Revenue

</p>

<h3 className="mt-2 text-3xl font-bold text-green-600">

₹{data?.estimatedRevenue || 0}

</h3>

</div>

<div className="rounded-2xl bg-orange-50 p-5">

<p className="text-sm text-slate-500">

Average Structure

</p>

<h3 className="mt-2 text-3xl font-bold text-[#D6451B]">

₹{data?.averageFee || 0}

</h3>

</div>

<div className="rounded-2xl bg-blue-50 p-5">

<p className="text-sm text-slate-500">

Highest Fee

</p>

<h3 className="mt-2 text-3xl font-bold text-blue-600">

₹{data?.highestFee || 0}

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

Most Used Structure

</h2>

<div className="mt-8 rounded-3xl bg-gradient-to-r from-[#D6451B] to-[#ff8a63] p-6 text-white">

<h3 className="text-2xl font-bold">

{data?.mostUsed?.title || "-"}

</h3>

<p className="mt-3 text-orange-100">

Applied to {data?.mostUsed?.students || 0} students

</p>

<div className="mt-8 flex items-center justify-between">

<div>

<p className="text-sm text-orange-100">

Fee

</p>

<h3 className="text-2xl font-bold">

₹{data?.mostUsed?.totalFee || 0}

</h3>

</div>

<div>

<p className="text-sm text-orange-100">

Installments

</p>

<h3 className="text-2xl font-bold">

{data?.mostUsed?.installments || 0}

</h3>

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

Quick Actions

</h2>

<div className="mt-6 space-y-4">

<Link
href="/admin-panel/fees/structures/create"
className="block rounded-2xl bg-[#D6451B] py-4 text-center font-semibold text-white transition hover:bg-[#b93914]"
>

+ Create Structure

</Link>

<Link
href="/admin-panel/fees"
className="block rounded-2xl border border-slate-200 py-4 text-center font-semibold hover:bg-slate-50"
>

Fee Dashboard

</Link>

<Link
href="/admin-panel/fees/reports"
className="block rounded-2xl border border-slate-200 py-4 text-center font-semibold hover:bg-slate-50"
>

Revenue Reports

</Link>

</div>

</motion.div>
</div>
</div>
<div className="mt-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

<div>

<h2 className="text-3xl font-bold">

Create Fee Structure

</h2>

<p className="mt-2 text-slate-500">

Define reusable fee structures for courses and batches.

</p>

</div>

<button
className="rounded-2xl bg-[#D6451B] px-6 py-3 font-semibold text-white"
>

Save Structure

</button>

</div>
<div className="mt-10 grid gap-6 md:grid-cols-2">

<div>

<label className="mb-2 block font-medium">

Structure Name

</label>

<input
className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#D6451B]"
placeholder="NEET Premium"
/>

</div>

<div>

<label className="mb-2 block font-medium">

Course

</label>

<select
className="w-full rounded-2xl border border-slate-200 px-5 py-4"
>

<option>Select Course</option>

</select>

</div>

<div>

<label className="mb-2 block font-medium">

Batch (Optional)

</label>

<select
className="w-full rounded-2xl border border-slate-200 px-5 py-4"
>

<option>All Batches</option>

</select>

</div>

<div>

<label className="mb-2 block font-medium">

Status

</label>

<select
className="w-full rounded-2xl border border-slate-200 px-5 py-4"
>

<option>Active</option>

<option>Inactive</option>

</select>

</div>

</div>
<div className="mt-12">

<h3 className="text-2xl font-bold">

Fee Breakdown

</h3>

<div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

<input
placeholder="Admission Fee"
className="rounded-2xl border border-slate-200 px-5 py-4"
/>

<input
placeholder="Registration Fee"
className="rounded-2xl border border-slate-200 px-5 py-4"
/>

<input
placeholder="Tuition Fee"
className="rounded-2xl border border-slate-200 px-5 py-4"
/>

<input
placeholder="Study Material"
className="rounded-2xl border border-slate-200 px-5 py-4"
/>

<input
placeholder="Exam Fee"
className="rounded-2xl border border-slate-200 px-5 py-4"
/>

<input
placeholder="Other Charges"
className="rounded-2xl border border-slate-200 px-5 py-4"
/>

</div>

</div>
<div className="mt-12">

<div className="flex items-center justify-between">

<h3 className="text-2xl font-bold">

Installments

</h3>

<button
className="rounded-xl bg-orange-100 px-5 py-3 font-medium text-[#D6451B]"
>

+ Add Installment

</button>

</div>
<div className="mt-6 rounded-3xl border border-slate-200 p-6">

<div className="grid gap-5 md:grid-cols-3">

<input
placeholder="Installment Name"
className="rounded-2xl border border-slate-200 px-5 py-4"
/>

<input
placeholder="Amount"
className="rounded-2xl border border-slate-200 px-5 py-4"
/>

<input
type="date"
className="rounded-2xl border border-slate-200 px-5 py-4"
/>

</div>

</div>
</div>
<div className="mt-12">

<h3 className="text-2xl font-bold">

Additional Settings

</h3>

<div className="mt-6 grid gap-6 md:grid-cols-2">

<input
placeholder="Late Fee Per Day"
className="rounded-2xl border border-slate-200 px-5 py-4"
/>

<input
placeholder="Maximum Discount (%)"
className="rounded-2xl border border-slate-200 px-5 py-4"
/>

</div>

<div className="mt-6">

<textarea
rows={4}
placeholder="Notes..."
className="w-full rounded-2xl border border-slate-200 px-5 py-4"
/>

</div>

</div>
<div className="mt-12 rounded-3xl bg-orange-50 p-8">

<div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

<div>

<p className="text-slate-500">

Total Fee

</p>

<h2 className="mt-2 text-5xl font-bold text-[#D6451B]">

₹50,000

</h2>

</div>

<div className="flex gap-4">

<button
className="rounded-2xl border border-slate-300 bg-white px-6 py-4"
>

Cancel

</button>

<button
className="rounded-2xl bg-[#D6451B] px-8 py-4 font-semibold text-white"
>

Save Structure

</button>

</div>

</div>

</div>
</div>
</div>

</div>
);
}