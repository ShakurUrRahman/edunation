export const formatMyDate = (date) => {
	// Handle null/undefined
	if (!date) return "N/A";

	// Convert string to Date object if needed
	const dateObj = typeof date === "string" ? new Date(date) : date;

	// Check if valid date
	if (isNaN(dateObj.getTime())) {
		return "Invalid Date";
	}

	const options = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
		dateObj
	);
	return formattedDate;
};

export const formatDuration = (duration) => {
	if (!duration) return null;

	var hour = Math.floor(duration / 3600);
	var min = Math.floor((duration % 3600) / 60);
	var sec = Math.floor((duration % 3600) % 60);

	const durationString = `${hour}:${min}:${sec}`;

	console.log(durationString);

	return durationString;
};
