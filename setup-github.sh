#!/bin/bash

# This script initializes a Git repository and pushes it to GitHub
# Make sure to run this script from the root of your project

# Colors for output
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
NC="\033[0m" # No Color

echo -e "${YELLOW}Setting up Git repository for Crunch Time Menu...${NC}"

# Check if git is already initialized
if [ -d .git ]; then
  echo -e "${GREEN}Git repository already initialized.${NC}"
else
  echo -e "${YELLOW}Initializing Git repository...${NC}"
  git init
  echo -e "${GREEN}Git repository initialized.${NC}"
fi

# Add all files to git
echo -e "${YELLOW}Adding files to Git...${NC}"
git add .

# Commit changes
echo -e "${YELLOW}Committing files...${NC}"
git commit -m "Initial commit with password protection and Vercel deployment setup"

# Instructions for pushing to GitHub
echo -e "\n${GREEN}Repository is ready to be pushed to GitHub.${NC}"
echo -e "${YELLOW}To push to GitHub, follow these steps:${NC}"
echo -e "1. Create a new repository on GitHub (https://github.com/new)"
echo -e "2. Run the following commands to push your code:${NC}"
echo -e "   git remote add origin https://github.com/YOUR_USERNAME/crunch-time-menu.git"
echo -e "   git branch -M main"
echo -e "   git push -u origin main"

echo -e "\n${YELLOW}After pushing to GitHub, you can set up Vercel deployment:${NC}"
echo -e "1. Go to https://vercel.com/import/git"
echo -e "2. Select your GitHub repository"
echo -e "3. Configure your project settings"
echo -e "4. Deploy!"

echo -e "\n${GREEN}Done!${NC}"