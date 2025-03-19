export function load({ url }) {
    return {
        paramValue: url.searchParams.get("name") || "No name provided"
    };
}
