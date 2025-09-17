# AWS ECR Deployment Script for Windows PowerShell
# This script builds, tags, and pushes a Docker image to AWS ECR

param(
    [string]$ImageTag = "latest",
    [string]$AwsRegion = "us-east-1",
    [string]$AwsAccountId = $env:AWS_ACCOUNT_ID,
    [string]$EcrRepository = "ai-ml-intern-website",
    [switch]$Cleanup,
    [switch]$Help
)

# Application configuration
$AppName = "ai-ml-intern-website"

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Cyan"

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
    Write-Host "AWS ECR Deployment Script for AI/ML Intern Website" -ForegroundColor $Green
    Write-Host ""
    Write-Host "USAGE:" -ForegroundColor $Yellow
    Write-Host "  .\deploy.ps1 [OPTIONS]"
    Write-Host ""
    Write-Host "OPTIONS:" -ForegroundColor $Yellow
    Write-Host "  -ImageTag <tag>        Set image tag (default: latest)"
    Write-Host "  -AwsRegion <region>    Set AWS region (default: us-east-1)"
    Write-Host "  -AwsAccountId <id>     Set AWS Account ID"
    Write-Host "  -EcrRepository <name>  Set ECR repository name (default: ai-ml-intern-website)"
    Write-Host "  -Cleanup               Clean up local images after push"
    Write-Host "  -Help                  Show this help message"
    Write-Host ""
    Write-Host "ENVIRONMENT VARIABLES:" -ForegroundColor $Yellow
    Write-Host "  AWS_ACCOUNT_ID         Your AWS Account ID (required)"
    Write-Host "  AWS_REGION            AWS region (default: us-east-1)"
    Write-Host ""
    Write-Host "EXAMPLE:" -ForegroundColor $Yellow
    Write-Host "  `$env:AWS_ACCOUNT_ID = '123456789012'"
    Write-Host "  .\deploy.ps1 -ImageTag 'v1.0.0' -AwsRegion 'us-west-2'"
    Write-Host ""
}

function Test-Requirements {
    Write-Status "Checking requirements..."
    
    # Check if Docker is installed
    try {
        $dockerVersion = docker --version 2>$null
        if (-not $dockerVersion) {
            throw "Docker command not found"
        }
    }
    catch {
        Write-Error "Docker is not installed or not in PATH. Please install Docker Desktop."
        exit 1
    }
    
    # Check if AWS CLI is installed
    try {
        $awsVersion = aws --version 2>$null
        if (-not $awsVersion) {
            throw "AWS CLI command not found"
        }
    }
    catch {
        Write-Error "AWS CLI is not installed or not in PATH. Please install AWS CLI."
        exit 1
    }
    
    # Check if Docker daemon is running
    try {
        docker info 2>$null | Out-Null
        if ($LASTEXITCODE -ne 0) {
            throw "Docker daemon not running"
        }
    }
    catch {
        Write-Error "Docker daemon is not running. Please start Docker Desktop."
        exit 1
    }
    
    Write-Success "All requirements met"
}

function Test-Environment {
    Write-Status "Validating environment variables..."
    
    if (-not $AwsAccountId) {
        Write-Error "AWS_ACCOUNT_ID is not set"
        Write-Status "You can get your AWS Account ID by running: aws sts get-caller-identity --query Account --output text"
        exit 1
    }
    
    # Validate AWS credentials
    try {
        aws sts get-caller-identity 2>$null | Out-Null
        if ($LASTEXITCODE -ne 0) {
            throw "AWS credentials invalid"
        }
    }
    catch {
        Write-Error "AWS credentials are not configured or invalid"
        Write-Status "Please run: aws configure"
        exit 1
    }
    
    Write-Success "Environment variables validated"
}

function New-EcrRepository {
    Write-Status "Checking ECR repository..."
    
    # Check if repository exists
    try {
        aws ecr describe-repositories --repository-names $EcrRepository --region $AwsRegion 2>$null | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Success "ECR repository '$EcrRepository' exists"
            return
        }
    }
    catch {
        # Repository doesn't exist, create it
    }
    
    Write-Status "Creating ECR repository '$EcrRepository'..."
    try {
        aws ecr create-repository `
            --repository-name $EcrRepository `
            --region $AwsRegion `
            --image-scanning-configuration scanOnPush=true `
            --encryption-configuration encryptionType=AES256 2>$null | Out-Null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "ECR repository created successfully"
        } else {
            throw "Failed to create repository"
        }
    }
    catch {
        Write-Error "Failed to create ECR repository: $($_.Exception.Message)"
        exit 1
    }
}

function Connect-DockerToEcr {
    Write-Status "Authenticating Docker with ECR..."
    
    try {
        $loginToken = aws ecr get-login-password --region $AwsRegion
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to get ECR login token"
        }
        
        echo $loginToken | docker login --username AWS --password-stdin "$AwsAccountId.dkr.ecr.$AwsRegion.amazonaws.com"
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to authenticate Docker with ECR"
        }
        
        Write-Success "Docker authenticated with ECR"
    }
    catch {
        Write-Error "Failed to authenticate Docker with ECR: $($_.Exception.Message)"
        exit 1
    }
}

function Build-DockerImage {
    Write-Status "Building Docker image..."
    
    try {
        # Build the image
        docker build -t "${AppName}:${ImageTag}" .
        if ($LASTEXITCODE -ne 0) {
            throw "Docker build failed"
        }
        
        # Tag for ECR
        $EcrUri = "$AwsAccountId.dkr.ecr.$AwsRegion.amazonaws.com/$EcrRepository`:$ImageTag"
        docker tag "${AppName}:${ImageTag}" $EcrUri
        if ($LASTEXITCODE -ne 0) {
            throw "Docker tag failed"
        }
        
        Write-Success "Docker image built and tagged successfully"
        Write-Status "Local image: ${AppName}:${ImageTag}"
        Write-Status "ECR image: $EcrUri"
        
        return $EcrUri
    }
    catch {
        Write-Error "Failed to build Docker image: $($_.Exception.Message)"
        exit 1
    }
}

function Push-ImageToEcr {
    param([string]$EcrUri)
    
    Write-Status "Pushing image to ECR..."
    
    try {
        docker push $EcrUri
        if ($LASTEXITCODE -ne 0) {
            throw "Docker push failed"
        }
        
        Write-Success "Image pushed to ECR successfully"
        Write-Success "Image URI: $EcrUri"
        
        return $EcrUri
    }
    catch {
        Write-Error "Failed to push image to ECR: $($_.Exception.Message)"
        exit 1
    }
}

function Remove-LocalImages {
    param([string]$EcrUri)
    
    if ($Cleanup) {
        Write-Status "Cleaning up local images..."
        try {
            docker rmi "${AppName}:${ImageTag}" 2>$null
            docker rmi $EcrUri 2>$null
            Write-Success "Local cleanup completed"
        }
        catch {
            Write-Warning "Some images could not be removed"
        }
    }
}

function Show-DeploymentInfo {
    param([string]$EcrUri)
    
    Write-Host ""
    Write-Success "=========================================="
    Write-Success "    DEPLOYMENT COMPLETED SUCCESSFULLY"
    Write-Success "=========================================="
    Write-Host ""
    Write-Status "Image Details:"
    Write-Status "  Repository: $EcrRepository"
    Write-Status "  Tag: $ImageTag"
    Write-Status "  Region: $AwsRegion"
    Write-Status "  Full URI: $EcrUri"
    Write-Host ""
    Write-Status "Next Steps:"
    Write-Status "  1. Use this image URI in your ECS task definition, EKS deployment, or other container service"
    Write-Status "  2. Configure your container to expose port 80"
    Write-Status "  3. Set up load balancer and DNS as needed"
    Write-Host ""
    Write-Status "To run locally for testing:"
    Write-Status "  docker run -p 3000:3000 $EcrUri"
    Write-Host ""
}

# Main execution
if ($Help) {
    Show-Usage
    exit 0
}

Write-Status "Starting AWS ECR deployment for $AppName"
Write-Status "=========================================="

Test-Requirements
Test-Environment
New-EcrRepository
Connect-DockerToEcr
$ecrUri = Build-DockerImage
$finalEcrUri = Push-ImageToEcr -EcrUri $ecrUri
Remove-LocalImages -EcrUri $finalEcrUri
Show-DeploymentInfo -EcrUri $finalEcrUri

Write-Success "Deployment completed successfully!"