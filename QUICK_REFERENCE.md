# Quick Deployment Reference

## Prerequisites Checklist
- [ ] Docker installed and running
- [ ] AWS CLI installed and configured
- [ ] AWS Account ID obtained
- [ ] IAM permissions configured

## Quick Commands

### Get AWS Account ID
```bash
aws sts get-caller-identity --query Account --output text
```

### Windows Deployment
```powershell
$env:AWS_ACCOUNT_ID = "your-account-id"
.\deploy.ps1
```

### Linux/macOS Deployment
```bash
export AWS_ACCOUNT_ID="your-account-id"
chmod +x deploy.sh
./deploy.sh
```

### Manual Docker Commands
```bash
# Build
docker build -t ai-ml-intern-website:latest .

# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account-id.dkr.ecr.us-east-1.amazonaws.com

# Tag
docker tag ai-ml-intern-website:latest your-account-id.dkr.ecr.us-east-1.amazonaws.com/ai-ml-intern-website:latest

# Push
docker push your-account-id.dkr.ecr.us-east-1.amazonaws.com/ai-ml-intern-website:latest
```

## Test Locally
```bash
# Run container on port 3000
docker run -p 3000:3000 your-account-id.dkr.ecr.us-east-1.amazonaws.com/ai-ml-intern-website:latest
# Then open http://localhost:3000
```

## Environment Variables
```env
AWS_ACCOUNT_ID=123456789012
AWS_REGION=us-east-1
ECR_REPOSITORY=ai-ml-intern-website
IMAGE_TAG=latest
```

## Common Issues
- **Docker not running**: Start Docker Desktop
- **AWS credentials**: Run `aws configure`
- **Permissions**: Check IAM ECR permissions
- **PowerShell**: Set execution policy with `Set-ExecutionPolicy RemoteSigned`

## Next Steps After ECR
1. Deploy to ECS/EKS
2. Set up load balancer
3. Configure domain and SSL
4. Set up CI/CD pipeline
5. Configure monitoring