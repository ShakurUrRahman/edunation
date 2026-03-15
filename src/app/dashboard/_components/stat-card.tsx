export default function StatCard({
	icon: Icon,
	label,
	value,
	sub,
	color,
}: any) {
	return (
		<div className="relative bg-white rounded-2xl p-4 lg:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
			<div
				className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -translate-y-8 translate-x-8"
				style={{ background: color }}
			/>
			<div className="flex items-start justify-between gap-3">
				<div className="min-w-0 flex-1">
					<p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1 truncate">
						{label}
					</p>
					<p className="text-xl lg:text-3xl font-black text-gray-900 leading-none break-words">
						{value}
					</p>
					{sub && (
						<p className="text-xs text-gray-400 mt-1.5 truncate">
							{sub}
						</p>
					)}
				</div>
				<div
					className="p-2.5 lg:p-3 rounded-xl shrink-0"
					style={{ background: `${color}15` }}
				>
					<Icon className="w-4 h-4 lg:w-5 lg:h-5" style={{ color }} />
				</div>
			</div>
		</div>
	);
}
