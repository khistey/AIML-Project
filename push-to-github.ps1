# GitHub Push Helper Script for AI/ML Intern Website
# This script helps you easily push updates to your GitHub repository

param(
    [string]$Message = "",
    [switch]$Force = $false,
    [switch]$Status = $false,
    [switch]$Help = $false
)

if ($Help) {
    Write-Host "AI/ML Intern Website - GitHub Push Helper" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usage: .\push-to-github.ps1 [OPTIONS]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Options:"
    Write-Host "  -Message <string>     Commit message for your changes"
    Write-Host "  -Force               Force push (use with caution)"
    Write-Host "  -Status              Show current Git status"
    Write-Host "  -Help                Show this help message"
    Write-Host ""
    Write-Host "Examples:"
    Write-Host "  .\push-to-github.ps1 -Message 'Add new AI feature'"
    Write-Host "  .\push-to-github.ps1 -Status"
    Write-Host "  .\push-to-github.ps1 -Message 'Fix bug in chat component'"
    Write-Host ""
    exit 0
}

# Show status if requested
if ($Status) {
    Write-Host "=== Git Repository Status ===" -ForegroundColor Blue
    git status
    Write-Host ""
    Write-Host "=== Remote Repository ===" -ForegroundColor Blue
    git remote -v
    Write-Host ""
    Write-Host "=== Recent Commits ===" -ForegroundColor Blue
    git log --oneline -5
    exit 0
}

Write-Host "🚀 AI/ML Intern Website - GitHub Push Helper" -ForegroundColor Green
Write-Host ""

# Check if Git repository exists
if (-not (Test-Path ".git")) {
    Write-Host "❌ This is not a Git repository!" -ForegroundColor Red
    Write-Host "Run 'git init' first to initialize Git."
    exit 1
}

# Check current status
Write-Host "📊 Checking repository status..." -ForegroundColor Blue
$gitStatus = git status --porcelain

if (-not $gitStatus) {
    Write-Host "✅ No changes detected. Repository is up to date!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Current status:" -ForegroundColor Yellow
    git status
    exit 0
}

# Show what will be committed
Write-Host "📁 Changes detected:" -ForegroundColor Yellow
git status --short
Write-Host ""

# Get commit message if not provided
if (-not $Message) {
    Write-Host "📝 Enter a commit message for your changes:" -ForegroundColor Yellow
    $Message = Read-Host "Commit message"
    
    if (-not $Message) {
        Write-Host "❌ Commit message is required!" -ForegroundColor Red
        exit 1
    }
}

# Confirm before proceeding
Write-Host "🔍 About to commit and push with message: '$Message'" -ForegroundColor Cyan
$confirm = Read-Host "Continue? (y/N)"

if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "❌ Operation cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "🔄 Processing changes..." -ForegroundColor Blue

try {
    # Add all changes
    Write-Host "1️⃣ Adding changes..." -ForegroundColor Gray
    git add .
    
    # Commit changes
    Write-Host "2️⃣ Creating commit..." -ForegroundColor Gray
    git commit -m $Message
    
    # Push to GitHub
    Write-Host "3️⃣ Pushing to GitHub..." -ForegroundColor Gray
    if ($Force) {
        git push origin main --force
    } else {
        git push origin main
    }
    
    Write-Host ""
    Write-Host "🎉 Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Your repository: https://github.com/khistey/AIML-Project" -ForegroundColor Cyan
    Write-Host "📱 View on GitHub: https://github.com/khistey/AIML-Project" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "✨ Latest commits:" -ForegroundColor Yellow
    git log --oneline -3
    
} catch {
    Write-Host ""
    Write-Host "❌ Error occurred during push:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Troubleshooting tips:" -ForegroundColor Yellow
    Write-Host "  - Check your internet connection"
    Write-Host "  - Verify GitHub repository exists"
    Write-Host "  - Try: git pull origin main (if remote has changes)"
    Write-Host "  - Use -Force flag only if you're sure (destructive)"
    Write-Host ""
    exit 1
}