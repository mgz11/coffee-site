// Data cache built-in to Next.js
import { unstable_cache as nextCache } from "next/cache";
// Caching for request memoization
import { cache as reactCache } from "react";

type Callback = (...args: any[]) => Promise<any>;
export function cache<T extends Callback>(
	callback: T,
	keyParts: string[],
	options: { revalidate?: number | false; tags?: string[] } = {}
) {
	// First cached using React and then cached using Next.js
	return nextCache(reactCache(callback), keyParts, options);
}
