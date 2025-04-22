function parseSearchParamAsFloat(params: string | URLSearchParams, key: string): number | null {
	const searchParams = typeof params === 'string' ? new URLSearchParams(params) : params;
	const value = searchParams.get(key);

	if (value === null) return null;

	const floatVal = parseFloat(value);
	return isNaN(floatVal) ? null : floatVal;
}


export {
    parseSearchParamAsFloat
}