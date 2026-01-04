export const replaceMongoIdInArray = (array) => {
	const mappedArray = array
		.map((item) => {
			return {
				id: item._id.toString(),
				...item,
			};
		})
		.map(({ _id, ...rest }) => rest);

	return mappedArray;
};

export const replaceMongoIdInObject = <T extends { _id?: any }>(
	obj: T | null
) => {
	if (!obj || !obj._id) return null;

	const { _id, ...rest } = obj;

	return {
		...rest,
		id: _id.toString(),
	};
};
