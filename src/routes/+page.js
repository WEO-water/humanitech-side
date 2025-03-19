export function load({ url }) {
    return {
        name: url.searchParams.get("name") || "No name provided",
        first: url.searchParams.get("first") || 0,
    };
}
