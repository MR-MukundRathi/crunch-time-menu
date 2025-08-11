# Crunch Time Menu App

## Overview
A simple menu application for "Crunch Time", a home-based food business operating in Aparna Serenity society. This app allows residents to view available food items and party order options.

## Features
- **Customer-facing menu**: Displays all available food items with prices and descriptions
- **Party order options**: Special section for bulk/party orders with minimum quantities and pricing
- **Admin panel**: Manage menu items and party options
- **Offline functionality**: Works even without an internet connection
- **Mobile-friendly**: Responsive design for all device sizes

## Technology Stack
- React
- TypeScript
- React Router
- Local Storage for data persistence
- Progressive Web App (PWA) capabilities

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the customer menu
5. Open [http://localhost:3000/login](http://localhost:3000/login) to access the admin login page
6. Enter the password: `crunchtime2023` to access the admin panel

## Usage

### Customer View
- Browse available menu items
- Click on the "Party Orders Available" banner to view party pack options
- Use the WhatsApp or Call buttons to place orders

### Admin Panel
- Password protected for security
- Add, edit, and remove menu items
- Mark items as available/unavailable
- Manage party order options
- All changes are automatically saved to local storage

## Deployment

### Local Build
To build the app for production locally:

```
npm run build
```

This creates an optimized production build in the `build` folder that can be deployed to any static hosting service.

### Vercel Deployment
This project is configured for easy deployment to Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure the following secrets in your GitHub repository:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

4. The GitHub Actions workflow will automatically deploy your application to Vercel when you push to the main branch

## License
This project is licensed under the MIT License.