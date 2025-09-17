#!/bin/bash

# AWS ECR Deployment Script for AI/ML Intern Website
# This script builds, tags, and pushes a Docker image to AWS ECR

set -e

# Configuration variables
APP_NAME="ai-ml-intern-website"
AWS_REGION="${AWS_REGION:-us-east-1}"
AWS_ACCOUNT_ID="${AWS_ACCOUNT_ID}"
ECR_REPOSITORY="${ECR_REPOSITORY:-$APP_NAME}"
IMAGE_TAG="${IMAGE_TAG:-latest}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    # Check if AWS CLI is installed
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install AWS CLI first."
        exit 1
    fi
    
    # Check if Docker daemon is running
    if ! docker info &> /dev/null; then
        print_error "Docker daemon is not running. Please start Docker."
        exit 1
    fi
    
    print_success "All requirements met"
}

# Function to validate environment variables
validate_environment() {
    print_status "Validating environment variables..."
    
    if [ -z "$AWS_ACCOUNT_ID" ]; then
        print_error "AWS_ACCOUNT_ID environment variable is not set"
        print_status "You can get your AWS Account ID by running: aws sts get-caller-identity --query Account --output text"
        exit 1
    fi
    
    # Validate AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "AWS credentials are not configured or invalid"
        print_status "Please run: aws configure"
        exit 1
    fi
    
    print_success "Environment variables validated"
}

# Function to create ECR repository if it doesn't exist
create_ecr_repository() {
    print_status "Checking ECR repository..."
    
    # Check if repository exists
    if aws ecr describe-repositories --repository-names "$ECR_REPOSITORY" --region "$AWS_REGION" &> /dev/null; then
        print_success "ECR repository '$ECR_REPOSITORY' exists"
    else
        print_status "Creating ECR repository '$ECR_REPOSITORY'..."
        aws ecr create-repository \
            --repository-name "$ECR_REPOSITORY" \
            --region "$AWS_REGION" \
            --image-scanning-configuration scanOnPush=true \
            --encryption-configuration encryptionType=AES256
        print_success "ECR repository created successfully"
    fi
}

# Function to authenticate Docker with ECR
authenticate_docker() {
    print_status "Authenticating Docker with ECR..."
    
    aws ecr get-login-password --region "$AWS_REGION" | \
        docker login --username AWS --password-stdin \
        "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"
    
    print_success "Docker authenticated with ECR"
}

# Function to build Docker image
build_image() {
    print_status "Building Docker image..."
    
    # Build the image
    docker build -t "$APP_NAME:$IMAGE_TAG" .
    
    # Tag for ECR
    ECR_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG"
    docker tag "$APP_NAME:$IMAGE_TAG" "$ECR_URI"
    
    print_success "Docker image built and tagged successfully"
    print_status "Local image: $APP_NAME:$IMAGE_TAG"
    print_status "ECR image: $ECR_URI"
}

# Function to push image to ECR
push_image() {
    print_status "Pushing image to ECR..."
    
    ECR_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG"
    docker push "$ECR_URI"
    
    print_success "Image pushed to ECR successfully"
    print_success "Image URI: $ECR_URI"
}

# Function to clean up local images (optional)
cleanup_local() {
    if [ "$CLEANUP_LOCAL" = "true" ]; then
        print_status "Cleaning up local images..."
        docker rmi "$APP_NAME:$IMAGE_TAG" || true
        docker rmi "$ECR_URI" || true
        print_success "Local cleanup completed"
    fi
}

# Function to display deployment information
display_info() {
    echo ""
    print_success "=========================================="
    print_success "    DEPLOYMENT COMPLETED SUCCESSFULLY"
    print_success "=========================================="
    echo ""
    print_status "Image Details:"
    print_status "  Repository: $ECR_REPOSITORY"
    print_status "  Tag: $IMAGE_TAG"
    print_status "  Region: $AWS_REGION"
    print_status "  Full URI: $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG"
    echo ""
    print_status "Next Steps:"
    print_status "  1. Use this image URI in your ECS task definition, EKS deployment, or other container orchestration service"
    print_status "  2. Configure your container to expose port 80"
    print_status "  3. Set up load balancer and DNS as needed"
    echo ""
    print_status "To run locally for testing:"
    print_status "  docker run -p 3000:3000 $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG"
    echo ""
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help              Show this help message"
    echo "  -t, --tag TAG          Set image tag (default: latest)"
    echo "  -r, --region REGION    Set AWS region (default: us-east-1)"
    echo "  -a, --account-id ID    Set AWS Account ID"
    echo "  -n, --repository NAME  Set ECR repository name (default: ai-ml-intern-website)"
    echo "  --cleanup              Clean up local images after push"
    echo ""
    echo "Environment Variables:"
    echo "  AWS_ACCOUNT_ID         Your AWS Account ID (required)"
    echo "  AWS_REGION            AWS region (default: us-east-1)"
    echo "  ECR_REPOSITORY        ECR repository name (default: ai-ml-intern-website)"
    echo "  IMAGE_TAG             Docker image tag (default: latest)"
    echo "  CLEANUP_LOCAL         Set to 'true' to cleanup local images"
    echo ""
    echo "Example:"
    echo "  export AWS_ACCOUNT_ID=123456789012"
    echo "  $0 --tag v1.0.0 --region us-west-2"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_usage
            exit 0
            ;;
        -t|--tag)
            IMAGE_TAG="$2"
            shift 2
            ;;
        -r|--region)
            AWS_REGION="$2"
            shift 2
            ;;
        -a|--account-id)
            AWS_ACCOUNT_ID="$2"
            shift 2
            ;;
        -n|--repository)
            ECR_REPOSITORY="$2"
            shift 2
            ;;
        --cleanup)
            CLEANUP_LOCAL="true"
            shift
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Main execution flow
main() {
    print_status "Starting AWS ECR deployment for $APP_NAME"
    print_status "=========================================="
    
    check_requirements
    validate_environment
    create_ecr_repository
    authenticate_docker
    build_image
    push_image
    cleanup_local
    display_info
}

# Run main function
main "$@"