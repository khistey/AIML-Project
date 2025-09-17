# Simple Docker Build Script for AI/ML Intern Website
# This script builds a local Docker image for development and testing

param(
    [string]$ImageTag = "latest",
    [string]$ImageName = "ai-ml-intern-website",
    [switch]$Run,
    [switch]$Help
)

# Colors for output
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Cyan"
$Red = "Red"

function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Red
}

function Show-Usage {
    Write-Host "Docker Build Script for AI/ML Intern Website" -ForegroundColor $Green
    Write-Host ""
    Write-Host "USAGE:" -ForegroundColor $Yellow
    Write-Host "  .\build-docker.ps1 [OPTIONS]"
    Write-Host ""
    Write-Host "OPTIONS:" -ForegroundColor $Yellow
    Write-Host "  -ImageTag <tag>        Set image tag (default: latest)"
    Write-Host "  -ImageName <name>      Set image name (default: keds-learning-project)"
    Write-Host "  -Run                   Run container after building"
    Write-Host "  -Help                  Show this help message"
    Write-Host ""
    Write-Host "EXAMPLES:" -ForegroundColor $Yellow
    Write-Host "  .\build-docker.ps1                    # Build image with default settings"
    Write-Host "  .\build-docker.ps1 -Run               # Build and run container"
    Write-Host "  .\build-docker.ps1 -ImageTag v1.0.0   # Build with custom tag"
    Write-Host ""
}

function Test-DockerAvailable {
    Write-Status "Checking Docker availability..."
    
    try {
        $dockerVersion = docker --version 2>$null
        if (-not $dockerVersion) {
            throw "Docker command not found"
        }
        Write-Success "Docker is installed: $dockerVersion"
    }
    catch {
        Write-Error "Docker is not installed or not in PATH."
        Write-Status "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop/"
        exit 1
    }
    
    try {
        docker info 2>$null | Out-Null
        if ($LASTEXITCODE -ne 0) {
            throw "Docker daemon not running"
        }
        Write-Success "Docker daemon is running"
    }
    catch {
        Write-Error "Docker daemon is not running."
        Write-Status "Please start Docker Desktop and try again."
        exit 1
    }
}

function Build-Image {
    Write-Status "Building Docker image: ${ImageName}:${ImageTag}"
    
    try {
        # Build the Docker image
        docker build -t "${ImageName}:${ImageTag}" .
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Docker image built successfully!"
            Write-Status "Image: ${ImageName}:${ImageTag}"
        } else {
            throw "Docker build failed with exit code $LASTEXITCODE"
        }
    }
    catch {
        Write-Error "Failed to build Docker image: $($_.Exception.Message)"
        exit 1
    }
}

function Start-Container {
    Write-Status "Starting container from image: ${ImageName}:${ImageTag}"
    
    try {
        # Stop and remove existing container if it exists
        docker stop "ai-ml-app" 2>$null | Out-Null
        docker rm "ai-ml-app" 2>$null | Out-Null
        
        # Run the container
        docker run -d -p 3000:3000 --name "ai-ml-app" "${ImageName}:${ImageTag}"
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Container started successfully!"
            Write-Status "Container name: ai-ml-app"
            Write-Status "Port mapping: localhost:3000 -> container:3000"
            Write-Status "Access your application at: http://localhost:3000"
            Write-Host ""
            Write-Status "Container status:"
            docker ps --filter "name=ai-ml-app"
        } else {
            throw "Failed to start container"
        }
    }
    catch {
        Write-Error "Failed to start container: $($_.Exception.Message)"
        exit 1
    }
}

function Show-CompletionInfo {
    Write-Host ""
    Write-Success "=========================================="
    Write-Success "    DOCKER BUILD COMPLETED SUCCESSFULLY"
    Write-Success "=========================================="
    Write-Host ""
    Write-Status "Image Details:"
    Write-Status "  Name: ${ImageName}:${ImageTag}"
    Write-Status "  Size: $(docker images ${ImageName}:${ImageTag} --format 'table {{.Size}}' | Select-Object -Skip 1)"
    Write-Host ""
    
    if (-not $Run) {
        Write-Status "To run the container:"
        Write-Status "  docker run -d -p 3000:3000 --name ai-ml-app ${ImageName}:${ImageTag}"
        Write-Status "  # Then visit: http://localhost:3000"
        Write-Host ""
        Write-Status "Other useful commands:"
        Write-Status "  docker images                    # List all images"
        Write-Status "  docker ps                        # List running containers"
        Write-Status "  docker stop ai-ml-app             # Stop the container"
        Write-Status "  docker rm ai-ml-app               # Remove the container"
        Write-Status "  docker rmi ${ImageName}:${ImageTag}    # Remove the image"
    }
    Write-Host ""
}

# Main execution
if ($Help) {
    Show-Usage
    exit 0
}

Write-Status "Starting Docker build for AI/ML Intern Website"
Write-Status "================================================"

Test-DockerAvailable
Build-Image

if ($Run) {
    Start-Container
}

Show-CompletionInfo

Write-Success "Build process completed successfully!"