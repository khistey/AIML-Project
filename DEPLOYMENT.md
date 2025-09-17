# AWS ECR Deployment Guide

This guide will help you deploy your AI/ML Intern Website to AWS Elastic Container Registry (ECR) using Docker containers.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Step-by-Step Deployment](#step-by-step-deployment)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

## Prerequisites

Before you begin, ensure you have the following installed and configured:

### Required Software

1. **Docker Desktop** (for Windows/macOS) or **Docker Engine** (for Linux)
   - Download from: https://www.docker.com/products/docker-desktop
   - Verify installation: `docker --version`

2. **AWS CLI** (Command Line Interface)
   - Download from: https://aws.amazon.com/cli/
   - Verify installation: `aws --version`

3. **Git** (for version control)
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

### AWS Configuration

1. **AWS Account**: You need an active AWS account
2. **AWS Credentials**: Configure your AWS credentials using one of these methods:
   ```bash
   # Method 1: Using AWS CLI
   aws configure
   
   # Method 2: Set environment variables
   export AWS_ACCESS_KEY_ID=your_access_key
   export AWS_SECRET_ACCESS_KEY=your_secret_key
   export AWS_DEFAULT_REGION=us-east-1
   ```

3. **AWS Account ID**: Get your 12-digit AWS Account ID:
   ```bash
   aws sts get-caller-identity --query Account --output text
   ```

### Required IAM Permissions

Your AWS user/role needs these permissions:
- `ecr:GetAuthorizationToken`
- `ecr:BatchCheckLayerAvailability`
- `ecr:GetDownloadUrlForLayer`
- `ecr:BatchGetImage`
- `ecr:BatchImportLayerPart`
- `ecr:CompleteLayerUpload`
- `ecr:DescribeRepositories`
- `ecr:CreateRepository`
- `ecr:InitiateLayerUpload`
- `ecr:PutImage`
- `ecr:UploadLayerPart`

## Quick Start

If you want to deploy immediately with default settings:

### For Windows (PowerShell):
```powershell
# Set your AWS Account ID
$env:AWS_ACCOUNT_ID = "123456789012"  # Replace with your actual Account ID

# Run deployment
.\deploy.ps1
```

### For Linux/macOS (Bash):
```bash
# Set your AWS Account ID
export AWS_ACCOUNT_ID="123456789012"  # Replace with your actual Account ID

# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## Step-by-Step Deployment

### Step 1: Prepare Your Environment

1. **Clone or navigate to your project directory**:
   ```bash
   cd /path/to/your/ai-ml-intern-website
   ```

2. **Set up environment variables**:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit the .env file with your settings
   nano .env  # or use your preferred editor
   ```

3. **Configure your `.env` file**:
   ```env
   AWS_ACCOUNT_ID=123456789012        # Your 12-digit AWS Account ID
   AWS_REGION=us-east-1               # Your preferred AWS region
   ECR_REPOSITORY=ai-ml-intern-website # ECR repository name
   IMAGE_TAG=latest                   # Docker image tag
   CLEANUP_LOCAL=false                # Clean up local images after push
   ```

### Step 2: Build and Deploy

#### Option A: Using PowerShell Script (Windows)

1. **Open PowerShell as Administrator**

2. **Navigate to your project directory**:
   ```powershell
   cd "C:\path\to\your\project"
   ```

3. **Set execution policy** (if needed):
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

4. **Run the deployment script**:
   ```powershell
   # Basic deployment
   .\deploy.ps1
   
   # With custom options
   .\deploy.ps1 -ImageTag "v1.0.0" -AwsRegion "us-west-2" -Cleanup
   ```

#### Option B: Using Bash Script (Linux/macOS)

1. **Open Terminal**

2. **Navigate to your project directory**:
   ```bash
   cd /path/to/your/project
   ```

3. **Make the script executable**:
   ```bash
   chmod +x deploy.sh
   ```

4. **Run the deployment script**:
   ```bash
   # Basic deployment
   ./deploy.sh
   
   # With custom options
   ./deploy.sh --tag v1.0.0 --region us-west-2 --cleanup
   ```

#### Option C: Manual Step-by-Step Deployment

1. **Build the Docker image**:
   ```bash
   docker build -t ai-ml-intern-website:latest .
   ```

2. **Create ECR repository** (if it doesn't exist):
   ```bash
   aws ecr create-repository \
       --repository-name ai-ml-intern-website \
       --region us-east-1 \
       --image-scanning-configuration scanOnPush=true
   ```

3. **Authenticate Docker with ECR**:
   ```bash
   aws ecr get-login-password --region us-east-1 | \
       docker login --username AWS --password-stdin \
       123456789012.dkr.ecr.us-east-1.amazonaws.com
   ```

4. **Tag the image for ECR**:
   ```bash
   docker tag ai-ml-intern-website:latest \
       123456789012.dkr.ecr.us-east-1.amazonaws.com/ai-ml-intern-website:latest
   ```

5. **Push the image to ECR**:
   ```bash
   docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/ai-ml-intern-website:latest
   ```

### Step 3: Verify Deployment

1. **Check the ECR repository**:
   ```bash
   aws ecr describe-images --repository-name ai-ml-intern-website --region us-east-1
   ```

2. **Test the image locally** (optional):
   ```bash
   docker run -p 3000:3000 123456789012.dkr.ecr.us-east-1.amazonaws.com/ai-ml-intern-website:latest
   ```
   Then open http://localhost:3000 in your browser.

## Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `AWS_ACCOUNT_ID` | Your 12-digit AWS Account ID | - | Yes |
| `AWS_REGION` | AWS region for ECR repository | `us-east-1` | No |
| `ECR_REPOSITORY` | Name of the ECR repository | `ai-ml-intern-website` | No |
| `IMAGE_TAG` | Docker image tag | `latest` | No |
| `CLEANUP_LOCAL` | Clean up local images after push | `false` | No |

### Script Options

#### PowerShell Script Options:
```powershell
.\deploy.ps1 [OPTIONS]

-ImageTag <string>        # Set image tag (default: latest)
-AwsRegion <string>       # Set AWS region (default: us-east-1)
-AwsAccountId <string>    # Set AWS Account ID
-EcrRepository <string>   # Set ECR repository name
-Cleanup                  # Clean up local images after push
-Help                     # Show help message
```

#### Bash Script Options:
```bash
./deploy.sh [OPTIONS]

-t, --tag TAG             # Set image tag (default: latest)
-r, --region REGION       # Set AWS region (default: us-east-1)
-a, --account-id ID       # Set AWS Account ID
-n, --repository NAME     # Set ECR repository name
--cleanup                 # Clean up local images after push
-h, --help                # Show help message
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Docker Daemon Not Running
**Error**: `Cannot connect to the Docker daemon`
**Solution**:
- Windows/macOS: Start Docker Desktop
- Linux: `sudo systemctl start docker`

#### 2. AWS Credentials Not Configured
**Error**: `Unable to locate credentials`
**Solution**:
```bash
aws configure
# or
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret
```

#### 3. ECR Repository Access Denied
**Error**: `AccessDeniedException`
**Solution**:
- Verify your AWS Account ID is correct
- Check IAM permissions for ECR operations
- Ensure you're using the correct AWS region

#### 4. Docker Build Fails
**Error**: Various build errors
**Solution**:
- Check if all required files exist (package.json, src/, etc.)
- Ensure Docker has enough disk space
- Try building with `--no-cache` flag

#### 5. Image Push Fails
**Error**: `denied: requested access to the resource is denied`
**Solution**:
- Re-authenticate with ECR: `aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account.dkr.ecr.your-region.amazonaws.com`
- Check repository permissions

#### 6. PowerShell Execution Policy Error
**Error**: `execution of scripts is disabled on this system`
**Solution**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Debugging Steps

1. **Check AWS CLI configuration**:
   ```bash
   aws configure list
   aws sts get-caller-identity
   ```

2. **Verify Docker is working**:
   ```bash
   docker info
   docker ps
   ```

3. **Check ECR repository status**:
   ```bash
   aws ecr describe-repositories --region your-region
   ```

4. **View deployment script logs**: Both scripts provide detailed logging. Look for specific error messages.

## Next Steps

After successful deployment to ECR, you can:

### 1. Deploy to Amazon ECS (Elastic Container Service)

Create an ECS task definition using your ECR image:
```json
{
  "family": "ai-ml-intern-website",
  "taskRoleArn": "arn:aws:iam::account:role/ecsTaskRole",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "ai-ml-intern-website",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/ai-ml-intern-website:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/ai-ml-intern-website",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### 2. Deploy to Amazon EKS (Elastic Kubernetes Service)

Create a Kubernetes deployment:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-ml-intern-website
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ai-ml-intern-website
  template:
    metadata:
      labels:
        app: ai-ml-intern-website
    spec:
      containers:
      - name: ai-ml-intern-website
        image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/ai-ml-intern-website:latest
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: ai-ml-intern-website-service
spec:
  selector:
    app: ai-ml-intern-website
  ports:
  - port: 3000
    targetPort: 3000
  type: LoadBalancer
```

### 3. Set Up CI/CD Pipeline

Use AWS CodePipeline, GitHub Actions, or GitLab CI to automate deployments:

**GitHub Actions Example** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to ECR

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Deploy to ECR
      run: |
        export AWS_ACCOUNT_ID=${{ secrets.AWS_ACCOUNT_ID }}
        chmod +x deploy.sh
        ./deploy.sh --tag ${{ github.sha }}
```

### 4. Set Up Monitoring and Logging

- Configure CloudWatch for container monitoring
- Set up log aggregation with CloudWatch Logs
- Create CloudWatch dashboards for application metrics

### 5. Domain and SSL Setup

- Register a domain with Route 53
- Set up Application Load Balancer
- Configure SSL certificate with AWS Certificate Manager

## File Structure

After deployment, your project will have these additional files:

```
your-project/
├── src/                          # Your React application source
├── public/                       # Static assets
├── package.json                  # Node.js dependencies
├── vite.config.js               # Vite configuration
├── Dockerfile                   # Docker container definition
├── .dockerignore               # Files to exclude from Docker build
├── nginx.conf                  # Nginx web server configuration
├── deploy.sh                   # Linux/macOS deployment script
├── deploy.ps1                  # Windows PowerShell deployment script
├── .env.example               # Environment variables template
└── DEPLOYMENT.md              # This documentation file
```

## Security Considerations

1. **Never commit AWS credentials** to version control
2. **Use IAM roles** with minimal required permissions
3. **Enable ECR image scanning** for vulnerability detection
4. **Regularly update base images** and dependencies
5. **Use specific image tags** instead of 'latest' in production
6. **Set up VPC and security groups** properly for ECS/EKS deployments

## Cost Optimization

1. **Use ECR lifecycle policies** to automatically delete old images
2. **Choose appropriate instance sizes** for ECS/EKS
3. **Set up auto-scaling** based on demand
4. **Monitor costs** with AWS Cost Explorer
5. **Use Spot instances** for development environments

## Support and Resources

- [AWS ECR Documentation](https://docs.aws.amazon.com/ecr/)
- [Docker Documentation](https://docs.docker.com/)
- [AWS CLI Documentation](https://docs.aws.amazon.com/cli/)
- [ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [EKS Documentation](https://docs.aws.amazon.com/eks/)

---

**Happy Deploying! 🚀**

If you encounter any issues or need assistance, please check the troubleshooting section or refer to the AWS documentation.