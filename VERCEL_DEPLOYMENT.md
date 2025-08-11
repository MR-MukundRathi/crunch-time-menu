# Deploying to Vercel

This guide will walk you through the process of deploying your Crunch Time Menu application to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (you can sign up at [vercel.com](https://vercel.com) using your GitHub account)

## Step 1: Push Your Code to GitHub

1. Create a new repository on GitHub at [github.com/new](https://github.com/new)
2. Run the provided setup script to initialize your Git repository:
   ```
   ./setup-github.sh
   ```
3. Follow the instructions provided by the script to push your code to GitHub

## Step 2: Connect to Vercel

1. Go to [vercel.com/import/git](https://vercel.com/import/git)
2. Select your GitHub repository (you may need to configure Vercel to access your repositories)
3. Vercel will automatically detect that this is a React application

## Step 3: Configure Your Project

1. Keep the default settings for your project
2. You can customize the project name if you wish
3. The framework preset should be automatically set to "Create React App"
4. Click "Deploy"

## Step 4: Wait for Deployment

Vercel will now build and deploy your application. This usually takes less than a minute.

## Step 5: Access Your Deployed Application

1. Once deployment is complete, Vercel will provide you with a URL for your application (e.g., `https://crunch-time-menu.vercel.app`)
2. You can access your application at this URL
3. The admin panel will be available at `https://crunch-time-menu.vercel.app/login` with the password `crunchtime2023`

## Custom Domains

If you want to use a custom domain for your application:

1. Go to your project settings in Vercel
2. Click on "Domains"
3. Add your custom domain and follow the instructions to configure DNS settings

## Continuous Deployment

Vercel automatically sets up continuous deployment for your application. Whenever you push changes to your GitHub repository, Vercel will automatically rebuild and redeploy your application.

## Environment Variables

If you need to add environment variables to your application:

1. Go to your project settings in Vercel
2. Click on "Environment Variables"
3. Add your environment variables

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs in Vercel for error messages
2. Ensure that your application builds successfully locally with `npm run build`
3. Verify that all dependencies are correctly listed in your `package.json` file

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/)