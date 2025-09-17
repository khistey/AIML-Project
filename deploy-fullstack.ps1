# AI/ML Intern Website - Full Stack Deployment Script
# This script builds and runs both frontend and backend services

param(
    [string]$Mode = \"development\",
    [string]$GeminiApiKey = \"\",
    [switch]$Build = $false,
    [switch]$Stop = $false,
    [switch]$Logs = $false,
    [switch]$Help = $false
)

if ($Help) {
    Write-Host \"AI/ML Intern Website - Full Stack Deployment\" -ForegroundColor Green
    Write-Host \"\"
    Write-Host \"Usage: .\\deploy-fullstack.ps1 [OPTIONS]\" -ForegroundColor Yellow
    Write-Host \"\"
    Write-Host \"Options:\"
    Write-Host \"  -Mode <string>        Deployment mode: 'development' or 'production' (default: development)\"
    Write-Host \"  -GeminiApiKey <key>   Google Gemini API key (required for AI features)\"
    Write-Host \"  -Build               Build Docker images before starting services\"
    Write-Host \"  -Stop                Stop all running services\"
    Write-Host \"  -Logs                Show logs from running services\"
    Write-Host \"  -Help                Show this help message\"
    Write-Host \"\"
    Write-Host \"Examples:\"
    Write-Host \"  .\\deploy-fullstack.ps1 -GeminiApiKey 'your-api-key' -Build\"
    Write-Host \"  .\\deploy-fullstack.ps1 -Stop\"
    Write-Host \"  .\\deploy-fullstack.ps1 -Logs\"
    exit 0
}

# Check if Docker is running
Write-Host \"Checking Docker status...\" -ForegroundColor Blue
try {
    docker info | Out-Null
    Write-Host \"✅ Docker is running\" -ForegroundColor Green
} catch {
    Write-Host \"❌ Docker is not running. Please start Docker Desktop and try again.\" -ForegroundColor Red
    exit 1
}

# Stop services if requested
if ($Stop) {
    Write-Host \"Stopping all services...\" -ForegroundColor Yellow
    docker-compose down
    Write-Host \"✅ All services stopped\" -ForegroundColor Green
    exit 0
}

# Show logs if requested
if ($Logs) {
    Write-Host \"Showing service logs...\" -ForegroundColor Blue
    docker-compose logs -f
    exit 0
}

# Check for Gemini API key
if (-not $GeminiApiKey -and -not (Test-Path \"backend\\.env\")) {
    Write-Host \"⚠️  Gemini API key not provided and no .env file found\" -ForegroundColor Yellow
    Write-Host \"AI features will not work without a valid API key.\"
    Write-Host \"Get your API key from: https://makersuite.google.com/app/apikey\"
    Write-Host \"\"
    $continue = Read-Host \"Continue anyway? (y/N)\"
    if ($continue -ne \"y\" -and $continue -ne \"Y\") {
        exit 1
    }
}

# Create .env file for backend if API key provided
if ($GeminiApiKey) {
    Write-Host \"Setting up environment configuration...\" -ForegroundColor Blue
    
    $envContent = @\"
GEMINI_API_KEY=$GeminiApiKey
PORT=5000
NODE_ENV=$Mode
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
\"@
    
    $envContent | Out-File -FilePath \"backend\\.env\" -Encoding UTF8
    Write-Host \"✅ Backend environment configured\" -ForegroundColor Green
}

# Create frontend .env file
Write-Host \"Configuring frontend environment...\" -ForegroundColor Blue
$frontendEnv = \"REACT_APP_API_URL=http://localhost:5000/api\"
$frontendEnv | Out-File -FilePath \".env\" -Encoding UTF8
Write-Host \"✅ Frontend environment configured\" -ForegroundColor Green

# Build images if requested
if ($Build) {
    Write-Host \"Building Docker images...\" -ForegroundColor Blue
    docker-compose build
    if ($LASTEXITCODE -ne 0) {
        Write-Host \"❌ Failed to build Docker images\" -ForegroundColor Red
        exit 1
    }
    Write-Host \"✅ Docker images built successfully\" -ForegroundColor Green
}

# Start services
Write-Host \"Starting services in $Mode mode...\" -ForegroundColor Blue
docker-compose up -d

if ($LASTEXITCODE -eq 0) {
    Write-Host \"\"
    Write-Host \"🚀 AI/ML Intern Website is now running!\" -ForegroundColor Green
    Write-Host \"\"
    Write-Host \"Services:\" -ForegroundColor Yellow
    Write-Host \"  📱 Frontend:  http://localhost:3000\" -ForegroundColor Cyan
    Write-Host \"  🔧 Backend:   http://localhost:5000\" -ForegroundColor Cyan
    Write-Host \"  📊 API Health: http://localhost:5000/api/health\" -ForegroundColor Cyan
    Write-Host \"\"
    Write-Host \"Features:\" -ForegroundColor Yellow
    Write-Host \"  🤖 AI Chat Assistant - Click the chat button on the website\"
    Write-Host \"  📄 Resume Analyzer - Get AI feedback on your resume\"
    Write-Host \"  🎯 Learning Path Generator - Get personalized learning recommendations\"
    Write-Host \"  💬 Technical Q&A - Ask questions about AI/ML topics\"
    Write-Host \"\"
    Write-Host \"Management Commands:\" -ForegroundColor Yellow
    Write-Host \"  View logs:     .\\deploy-fullstack.ps1 -Logs\"
    Write-Host \"  Stop services: .\\deploy-fullstack.ps1 -Stop\"
    Write-Host \"  Rebuild:       .\\deploy-fullstack.ps1 -Build -GeminiApiKey 'your-key'\"
    Write-Host \"\"
    
    # Wait a moment for services to start
    Start-Sleep -Seconds 3
    
    # Check service health
    Write-Host \"Checking service health...\" -ForegroundColor Blue
    try {
        $healthResponse = Invoke-RestMethod -Uri \"http://localhost:5000/api/health\" -TimeoutSec 10
        Write-Host \"✅ Backend service is healthy\" -ForegroundColor Green
    } catch {
        Write-Host \"⚠️  Backend service might still be starting up\" -ForegroundColor Yellow
        Write-Host \"   Try accessing http://localhost:5000/api/health in a few seconds\"
    }
    
    Write-Host \"\"
    Write-Host \"Happy coding! 🎉\" -ForegroundColor Green
    
} else {
    Write-Host \"❌ Failed to start services\" -ForegroundColor Red
    Write-Host \"Check the logs with: docker-compose logs\"
    exit 1
}