<#
.SYNOPSIS
    Pushes master to the production remote and then triggers the GitHub Actions
    "Post to Social Media" workflow on dwengovzw/Dwengo-Website.

.DESCRIPTION
    Requires the GitHub CLI (gh) to be installed and authenticated:
        gh auth login
    or set the GH_TOKEN environment variable to a Personal Access Token with
    the 'workflow' scope.
#>

param(
    [string]$Remote = "production",
    [string]$Branch = "master",
    [string]$Repo   = "dwengovzw/Dwengo-Website",
    [string]$Workflow = "post_to_socials.yml"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ── 1. Push to production ─────────────────────────────────────────────────
Write-Host "Pushing $Branch to $Remote..." -ForegroundColor Cyan
git push $Remote $Branch
if ($LASTEXITCODE -ne 0) {
    Write-Error "git push failed (exit code $LASTEXITCODE). Aborting."
    exit $LASTEXITCODE
}

# ── 2. Trigger GitHub Actions workflow ────────────────────────────────────
Write-Host "Triggering workflow '$Workflow' on $Repo..." -ForegroundColor Cyan

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Error "GitHub CLI (gh) is not installed or not on PATH. Install it from https://cli.github.com/ and authenticate with 'gh auth login'."
    exit 1
}

gh workflow run $Workflow --repo $Repo --ref $Branch
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to trigger workflow (exit code $LASTEXITCODE)."
    exit $LASTEXITCODE
}

Write-Host "Done. The workflow will post new/updated articles to social media." -ForegroundColor Green
