# Port 3000 Deployment Test Guide

## Configuration Updated ✅

All deployment files have been updated to use port 3000:

### Files Modified:
1. **Dockerfile** - Now exposes port 3000
2. **nginx.conf** - Now listens on port 3000  
3. **deploy.ps1** - Updated test commands for port 3000
4. **deploy.sh** - Updated test commands for port 3000
5. **DEPLOYMENT.md** - Documentation updated for port 3000
6. **QUICK_REFERENCE.md** - Commands updated for port 3000

## To Test the Deployment:

### 1. Build the Docker Image
```bash
docker build -t ai-ml-intern-website:port3000 .
```

### 2. Run Locally on Port 3000
```bash
docker run -p 3000:3000 ai-ml-intern-website:port3000
```

### 3. Access Your Application
Open your browser and go to: http://localhost:3000

### 4. Deploy to AWS ECR (Windows)
```powershell
$env:AWS_ACCOUNT_ID = "your-account-id"
.\deploy.ps1 -ImageTag "port3000"
```

### 5. Deploy to AWS ECR (Linux/macOS)
```bash
export AWS_ACCOUNT_ID="your-account-id"
./deploy.sh --tag port3000
```

## What Changed:

- **Container Port**: Changed from 80 to 3000
- **Nginx Configuration**: Now listens on port 3000
- **Health Check**: Updated to check port 3000
- **Documentation**: All examples now use port 3000
- **Test Commands**: Updated to map port 3000:3000

## Next Steps:

1. Make sure Docker is installed and running
2. Test the build locally first
3. Then deploy to AWS ECR using the updated scripts
4. Your application will be accessible on port 3000 in the container

The deployment is now configured for port 3000! 🚀