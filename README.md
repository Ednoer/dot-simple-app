# Next.js Simple App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

### Installation

First, install the required dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Application

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Login Credentials

Use the following credentials to log in:
- **Email:** persona@gmail.com  
- **Password:** person  
- Login URL: [https://dot-simple-app-j3ct.vercel.app/auth/login](https://dot-simple-app-j3ct.vercel.app/auth/login)

## API and Data Handling

This application uses **local API routes** in Next.js to handle data. The data is stored in the `public` folder, so you need to ensure the `public` folder has **read and write permissions** when running locally.

### Local API Setup
If you are running this application locally, make sure to set the `public` folder as **read and write**:

```bash
chmod -R 777 public
```

However, **on Vercel, this setup is not possible** since the `public` folder is read-only in production. Therefore, API-based data handling will not work as expected on the Vercel deployment.

### Demo Link
You can check the live demo of the application here: [https://dot-simple-app-j3ct.vercel.app](https://dot-simple-app-j3ct.vercel.app)

## Responsiveness
This application is **fully responsive**, ensuring a smooth experience across different screen sizes, including desktop, tablet, and mobile devices.

## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

