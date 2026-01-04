"use server";

import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

export async function renderEmail(component: React.ReactElement) {
	const html = renderToStaticMarkup(component);

	return `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
</head>
<body>
	${html}
</body>;
</html>`;
}
