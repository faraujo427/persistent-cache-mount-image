import * as cache from "@actions/cache";

function isGhes(): boolean {
    const ghUrl = new URL(
        process.env["GITHUB_SERVER_URL"] || "https://github.com",
    );

    const hostname = ghUrl.hostname.trimEnd().toUpperCase();
    const isGitHubHost = hostname === "GITHUB.COM";
    const isGitHubEnterpriseCloudHost = hostname.endsWith(".GHE.COM");
    const isLocalHost = hostname.endsWith(".LOCALHOST");

    return !isGitHubHost && !isGitHubEnterpriseCloudHost && !isLocalHost;
}

export function isCacheFeatureAvailable(): boolean {
    if (cache.isFeatureAvailable()) {
        return true;
    }

    if (isGhes()) {
        console.warn(
            `Cache action is only supported on GHES version >= 3.5. If you are on version >=3.5 Please check with GHES admin if Actions cache service is enabled or not.
Otherwise please upgrade to GHES version >= 3.5 and If you are also using Github Connect, please unretire the actions/cache namespace before upgrade (see https://docs.github.com/en/enterprise-server@3.5/admin/github-actions/managing-access-to-actions-from-githubcom/enabling-automatic-access-to-githubcom-actions-using-github-connect#automatic-retirement-of-namespaces-for-actions-accessed-on-githubcom)`,
        );
        return false;
    }

    console.warn(
        "An internal error has occurred in cache backend. Please check https://www.githubstatus.com/ for any ongoing issue in actions.",
    );
    return false;
}
