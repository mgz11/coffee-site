# Coffee Site Project

## Overview

This project is a minimalistic designed coffee site where users can:

- View the menu.
- Order coffee and other items.
- Access a cart to manage their selections.
- Proceed to checkout to complete their order using Stripe for payments.
- Receive order confirmation and details in an email using the Resend API.

---

## Features

### User Features

- **Menu Viewing:** Browse the cafe's offerings with detailed descriptions and prices.
- **Cart Management:** Add items to the cart, adjust quantities, or remove items.
- **Checkout:** Seamlessly checkout with Stripe integration.

### Admin Features

- **Login:** Secure login using hashed admin password (SHA-512 hash)
- **Dashboard:** Manage the menu, update inventory, track user orders, view popular items, and view sales data.

---

### Preview

#### Customer Facing

![Site Homepage](./public/assets/Coffee%20Site%20Screenshots/homepage.png)
![About Page](./public/assets/Coffee%20Site%20Screenshots/about.png)
![Menu Page](./public/assets/Coffee%20Site%20Screenshots/menu.png)
![Cart Page](./public//assets/Coffee%20Site%20Screenshots/cart.png)
![Checkout Page](./public/assets/Coffee%20Site%20Screenshots/checkout.png)

#### Admin Facing

![Dashboard](./public/assets/Coffee%20Site%20Screenshots/admindash.png)
![Products](./public/assets/Coffee%20Site%20Screenshots/adminproducts.png)
![Sales](./public/assets/Coffee%20Site%20Screenshots/adminsales.png)

---

## Technologies Used

- **Frontend:** Next.js (React), TypeScript, HTML/CSS
- **Backend:** Node.js
- **Database:** PostgreSQL with Prisma for ORM
- **Payment:** Stripe
- **Styling:** Tailwind CSS, Shadcn UI
- **State Management:** Context API

---

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mgz11/coffee-site.git
   ```

2. Navigate to the project directory:

   ```bash
   cd coffee-site
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     DATABASE_URL=your_database_url
     ADMIN_USERNAME=your_admin_username
     HASHED_ADMIN_PASSWORD=_hashed_admin_password
     STRIPE_SECRET_KEY=your_stripe_secret_key
     STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_key
     RESEND_API_KEY=your_resend_api_key
     NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
     NEXT_PUBLIC_SERVER_URL=http://localhost:3000
     ```

5. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Start Stripe Webhook to listen for events (Will need Stripe account to be able to run the webhook):
   ```bash
   stripe listen --forward-to localhost:3000/webhooks/stripe
   ```

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- Thanks to the open-source community for the amazing tools and libraries.
- Inspiration from various coffee shops
