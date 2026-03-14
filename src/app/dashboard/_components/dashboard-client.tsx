"use client";

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	RadialBarChart,
	RadialBar,
	Legend,
} from "recharts";
import {
	BookOpen,
	Users,
	DollarSign,
	Star,
	TrendingUp,
	Award,
	Clock,
	ChevronRight,
	Sparkles,
} from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Props {
	instructor: {
		name: string;
		email: string;
		avatar: string | null;
		designation: string;
	};
	stats: {
		totalCourses: number;
		totalEnrollments: number;
		totalRevenue: number;
		totalReviews: number;
		avgRating: number | string;
	};
	courseBreakdown: Array<{
		id: string;
		title: string;
		fullTitle: string;
		enrollments: number;
		revenue: number;
		rating: number;
		price: number;
		active: boolean;
		thumbnail: string | null;
	}>;
	recentEnrollments: Array<{
		id: string;
		courseId: string;
		courseTitle: string;
		enrolledAt: string | null;
	}>;
	ratingDist: Array<{ star: number; count: number }>;
}

// ── Palette ───────────────────────────────────────────────────────────────────
const PRIMARY = "#2a9d5c";
const SECONDARY = "#22c55e";
const AMBER = "#f59e0b";
const BLUE = "#3b82f6";
const PIE_COLORS = [
	"#2a9d5c",
	"#22c55e",
	"#86efac",
	"#4ade80",
	"#bbf7d0",
	"#dcfce7",
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function timeAgo(date: string | null) {
	if (!date) return "Recently";
	const diff = Date.now() - new Date(date).getTime();
	const d = Math.floor(diff / 86400000);
	if (d === 0) return "Today";
	if (d === 1) return "Yesterday";
	if (d < 7) return `${d}d ago`;
	if (d < 30) return `${Math.floor(d / 7)}w ago`;
	return `${Math.floor(d / 30)}mo ago`;
}

function StatCard({ icon: Icon, label, value, sub, color }: any) {
	return (
		<div className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
			<div
				className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -translate-y-8 translate-x-8`}
				style={{ background: color }}
			/>
			<div className="flex items-start justify-between">
				<div>
					<p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
						{label}
					</p>
					<p className="text-3xl font-black text-gray-900 leading-none">
						{value}
					</p>
					{sub && (
						<p className="text-xs text-gray-400 mt-1.5">{sub}</p>
					)}
				</div>
				<div
					className="p-3 rounded-xl"
					style={{ background: `${color}15` }}
				>
					<Icon className="w-5 h-5" style={{ color }} />
				</div>
			</div>
		</div>
	);
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────────
function CustomBarTooltip({ active, payload, label }: any) {
	if (!active || !payload?.length) return null;
	return (
		<div className="bg-gray-900 text-white rounded-xl px-4 py-3 shadow-xl text-sm">
			<p className="font-bold mb-1">{label}</p>
			{payload.map((p: any) => (
				<p key={p.name} className="text-gray-300">
					{p.name}:{" "}
					<span className="text-white font-semibold">
						{p.name === "Revenue" ? formatPrice(p.value) : p.value}
					</span>
				</p>
			))}
		</div>
	);
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function DashboardClient({
	instructor,
	stats,
	courseBreakdown,
	recentEnrollments,
	ratingDist,
}: Props) {
	const avgRating = parseFloat(String(stats.avgRating)) || 0;
	const totalRatingCount = ratingDist.reduce((s, r) => s + r.count, 0);

	// Pie data — enrollments per course
	const pieData = courseBreakdown
		.filter((c) => c.enrollments > 0)
		.map((c) => ({ name: c.title, value: c.enrollments }));

	return (
		<div className="min-h-screen hero p-4 md:p-6 lg:p-8">
			{/* ── Header ────────────────────────────────────────────────────────── */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
				<div className="flex items-center gap-4">
					<div className="relative">
						{instructor.avatar ? (
							<Image
								src={instructor.avatar}
								alt={instructor.name}
								width={52}
								height={52}
								className="rounded-2xl object-cover border-2 border-white shadow-md"
							/>
						) : (
							<div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-primary to-green-400 flex items-center justify-center text-white font-black text-xl shadow-md">
								{instructor.name.charAt(0)}
							</div>
						)}
						<span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
					</div>
					<div>
						<p className="text-xs text-gray-400 font-medium">
							Welcome back
						</p>
						<h1 className="text-xl font-black text-gray-900">
							{instructor.name}
						</h1>
						<p className="text-xs text-gray-400">
							{instructor.designation}
						</p>
					</div>
				</div>
				<Link
					href="/dashboard/courses/add"
					className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
				>
					<Sparkles className="w-4 h-4" /> New Course
				</Link>
			</div>

			{/* ── Stat Cards ────────────────────────────────────────────────────── */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<StatCard
					icon={BookOpen}
					label="Total Courses"
					value={stats.totalCourses}
					sub="Published courses"
					color={PRIMARY}
				/>
				<StatCard
					icon={Users}
					label="Enrollments"
					value={stats.totalEnrollments}
					sub="Across all courses"
					color={BLUE}
				/>
				<StatCard
					icon={DollarSign}
					label="Revenue"
					value={formatPrice(stats.totalRevenue)}
					sub="Total earnings"
					color={AMBER}
				/>
				<StatCard
					icon={Star}
					label="Avg Rating"
					value={avgRating > 0 ? avgRating : "—"}
					sub={`${stats.totalReviews} reviews`}
					color="#a855f7"
				/>
			</div>

			{/* ── Charts Row 1 ──────────────────────────────────────────────────── */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
				{/* Enrollments Bar Chart */}
				<div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
					<div className="flex items-center justify-between mb-5">
						<div>
							<h2 className="font-black text-gray-900">
								Enrollments per Course
							</h2>
							<p className="text-xs text-gray-400 mt-0.5">
								Student distribution
							</p>
						</div>
						<TrendingUp className="w-4 h-4 text-primary" />
					</div>
					{courseBreakdown.length > 0 ? (
						<ResponsiveContainer width="100%" height={220}>
							<BarChart
								data={courseBreakdown}
								barSize={28}
								margin={{
									top: 0,
									right: 0,
									left: -20,
									bottom: 0,
								}}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#f1f5f9"
									vertical={false}
								/>
								<XAxis
									dataKey="title"
									tick={{ fontSize: 10, fill: "#94a3b8" }}
									axisLine={false}
									tickLine={false}
								/>
								<YAxis
									tick={{ fontSize: 10, fill: "#94a3b8" }}
									axisLine={false}
									tickLine={false}
									allowDecimals={false}
								/>
								<Tooltip content={<CustomBarTooltip />} />
								<Bar
									dataKey="enrollments"
									name="Enrollments"
									fill={PRIMARY}
									radius={[6, 6, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					) : (
						<div className="h-[220px] flex items-center justify-center text-gray-300 text-sm">
							No enrollment data yet
						</div>
					)}
				</div>

				{/* Enrollment Share Pie */}
				<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
					<div className="mb-5">
						<h2 className="font-black text-gray-900">
							Enrollment Share
						</h2>
						<p className="text-xs text-gray-400 mt-0.5">
							By course
						</p>
					</div>
					{pieData.length > 0 ? (
						<ResponsiveContainer width="100%" height={220}>
							<PieChart>
								<Pie
									data={pieData}
									cx="50%"
									cy="45%"
									innerRadius={55}
									outerRadius={85}
									paddingAngle={3}
									dataKey="value"
								>
									{pieData.map((_, i) => (
										<Cell
											key={i}
											fill={
												PIE_COLORS[
													i % PIE_COLORS.length
												]
											}
										/>
									))}
								</Pie>
								<Tooltip
									formatter={(v: any) => [`${v} students`]}
								/>
								<Legend
									iconType="circle"
									iconSize={8}
									formatter={(v) => (
										<span className="text-xs text-gray-500">
											{v}
										</span>
									)}
								/>
							</PieChart>
						</ResponsiveContainer>
					) : (
						<div className="h-[220px] flex items-center justify-center text-gray-300 text-sm">
							No data yet
						</div>
					)}
				</div>
			</div>

			{/* ── Charts Row 2 ──────────────────────────────────────────────────── */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
				{/* Revenue Bar Chart */}
				<div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
					<div className="flex items-center justify-between mb-5">
						<div>
							<h2 className="font-black text-gray-900">
								Revenue per Course
							</h2>
							<p className="text-xs text-gray-400 mt-0.5">
								Earnings breakdown
							</p>
						</div>
						<DollarSign className="w-4 h-4 text-amber-500" />
					</div>
					{courseBreakdown.length > 0 ? (
						<ResponsiveContainer width="100%" height={220}>
							<BarChart
								data={courseBreakdown}
								barSize={28}
								margin={{
									top: 0,
									right: 0,
									left: -10,
									bottom: 0,
								}}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#f1f5f9"
									vertical={false}
								/>
								<XAxis
									dataKey="title"
									tick={{ fontSize: 10, fill: "#94a3b8" }}
									axisLine={false}
									tickLine={false}
								/>
								<YAxis
									tick={{ fontSize: 10, fill: "#94a3b8" }}
									axisLine={false}
									tickLine={false}
									tickFormatter={(v) => `$${v}`}
								/>
								<Tooltip content={<CustomBarTooltip />} />
								<Bar
									dataKey="revenue"
									name="Revenue"
									fill={AMBER}
									radius={[6, 6, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					) : (
						<div className="h-[220px] flex items-center justify-center text-gray-300 text-sm">
							No revenue data yet
						</div>
					)}
				</div>

				{/* Rating Distribution */}
				<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
					<div className="mb-5">
						<h2 className="font-black text-gray-900">
							Rating Breakdown
						</h2>
						<div className="flex items-center gap-1.5 mt-0.5">
							<Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
							<span className="text-xs text-gray-400">
								{avgRating > 0
									? `${avgRating} avg`
									: "No ratings yet"}
							</span>
						</div>
					</div>
					<div className="space-y-2.5">
						{ratingDist.map(({ star, count }) => {
							const pct =
								totalRatingCount > 0
									? (count / totalRatingCount) * 100
									: 0;
							return (
								<div
									key={star}
									className="flex items-center gap-2"
								>
									<span className="text-xs font-bold text-gray-500 w-3">
										{star}
									</span>
									<Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
									<div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
										<div
											className="h-full rounded-full bg-amber-400 transition-all duration-700"
											style={{ width: `${pct}%` }}
										/>
									</div>
									<span className="text-xs text-gray-400 w-5 text-right">
										{count}
									</span>
								</div>
							);
						})}
					</div>
					{totalRatingCount > 0 && (
						<div className="mt-4 pt-4 border-t flex items-center justify-between">
							<span className="text-xs text-gray-400">
								{totalRatingCount} total reviews
							</span>
							<div className="flex items-center gap-0.5">
								{[1, 2, 3, 4, 5].map((s) => (
									<Star
										key={s}
										className="w-3 h-3"
										fill={
											s <= Math.round(avgRating)
												? "#f59e0b"
												: "transparent"
										}
										stroke={
											s <= Math.round(avgRating)
												? "#f59e0b"
												: "#d1d5db"
										}
										strokeWidth={1.5}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* ── Bottom Row ────────────────────────────────────────────────────── */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{/* Course Performance Table */}
				<div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
					<div className="flex items-center justify-between px-6 py-5 border-b">
						<div>
							<h2 className="font-black text-gray-900">
								Course Performance
							</h2>
							<p className="text-xs text-gray-400 mt-0.5">
								All your courses
							</p>
						</div>
						<Link
							href="/dashboard/courses"
							className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline"
						>
							View all <ChevronRight className="w-3 h-3" />
						</Link>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b bg-gray-50/50">
									<th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
										Course
									</th>
									<th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
										Students
									</th>
									<th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
										Revenue
									</th>
									<th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
										Rating
									</th>
								</tr>
							</thead>
							<tbody>
								{courseBreakdown.length === 0 ? (
									<tr>
										<td
											colSpan={4}
											className="text-center py-10 text-gray-300 text-sm"
										>
											No courses yet
										</td>
									</tr>
								) : (
									courseBreakdown.map((course, i) => (
										<tr
											key={course.id}
											className="border-b last:border-0 hover:bg-gray-50/50 transition-colors"
										>
											<td className="px-6 py-4">
												<div className="flex items-center gap-3">
													<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
														<BookOpen className="w-3.5 h-3.5 text-primary" />
													</div>
													<div>
														<p className="font-semibold text-gray-800 text-xs leading-tight line-clamp-1">
															{course.fullTitle}
														</p>
														<p className="text-[10px] text-gray-400 mt-0.5">
															{formatPrice(
																course.price,
															)}
														</p>
													</div>
												</div>
											</td>
											<td className="px-4 py-4 text-center">
												<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold text-xs">
													{course.enrollments}
												</span>
											</td>
											<td className="px-4 py-4 text-center">
												<span className="text-xs font-bold text-gray-700">
													{formatPrice(
														course.revenue,
													)}
												</span>
											</td>
											<td className="px-4 py-4 text-center">
												{course.rating > 0 ? (
													<span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
														<Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
														{course.rating}
													</span>
												) : (
													<span className="text-xs text-gray-300">
														—
													</span>
												)}
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Recent Enrollments */}
				<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
					<div className="flex items-center justify-between px-6 py-5 border-b">
						<div>
							<h2 className="font-black text-gray-900">
								Recent Enrollments
							</h2>
							<p className="text-xs text-gray-400 mt-0.5">
								Latest activity
							</p>
						</div>
						<Clock className="w-4 h-4 text-gray-300" />
					</div>
					<div className="divide-y">
						{recentEnrollments.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-10 text-gray-300">
								<Users className="w-8 h-8 mb-2" />
								<p className="text-sm">No enrollments yet</p>
							</div>
						) : (
							recentEnrollments.map((e) => (
								<div
									key={e.courseTitle}
									className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50/50 transition-colors"
								>
									<div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-green-200 flex items-center justify-center shrink-0">
										<Users className="w-3.5 h-3.5 text-primary" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-semibold text-gray-800 line-clamp-1">
											{e.courseTitle}
										</p>
										<p className="text-[10px] text-gray-400 mt-0.5">
											New enrollment
										</p>
									</div>
									<span className="text-[10px] text-gray-400 shrink-0">
										{timeAgo(e.enrolledAt)}
									</span>
								</div>
							))
						)}
					</div>

					{/* Quick stats footer */}
					<div className="px-6 py-4 border-t bg-gray-50/50">
						<div className="flex items-center justify-between text-xs">
							<span className="text-gray-400">Conversion</span>
							<span className="font-bold text-gray-700">
								{stats.totalCourses > 0
									? `${(stats.totalEnrollments / stats.totalCourses).toFixed(1)} avg/course`
									: "—"}
							</span>
						</div>
						<div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
							<div
								className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full"
								style={{
									width: `${Math.min((stats.totalEnrollments / Math.max(stats.totalCourses * 20, 1)) * 100, 100)}%`,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
