// The one public address search engines should index. Update this if the site moves to a custom domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://dennism321.github.io/blissaway-website").replace(/\/$/, "");

// Pages are exported with trailing slashes, so the canonical form always ends in "/".
export const CANONICAL_URL = `${SITE_URL}/`;
