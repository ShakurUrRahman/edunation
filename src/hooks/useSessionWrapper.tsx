"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface SessionProviderWrapperProps {
	children: ReactNode;
}

export default function SessionProviderWrapper({
	children,
}: SessionProviderWrapperProps): JSX.Element {
	return <SessionProvider>{children}</SessionProvider>;
}
