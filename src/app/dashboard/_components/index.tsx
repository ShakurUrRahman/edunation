import { formatPrice } from "@/lib/formatPrice";

export function timeAgo(date: string | null) {
	if (!date) return "Recently";
	const diff = Date.now() - new Date(date).getTime();
	const d = Math.floor(diff / 86400000);
	if (d === 0) return "Today";
	if (d === 1) return "Yesterday";
	if (d < 7) return `${d}d ago`;
	if (d < 30) return `${Math.floor(d / 7)}w ago`;
	return `${Math.floor(d / 30)}mo ago`;
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────────
export function CustomBarTooltip({ active, payload, label }: any) {
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
