## Kiddie Cache - E-commerce Platform

Kiddie Cache is a modern e-commerce platform built with Next.js 15, designed to offer a seamless shopping experience for kids’ apparel and accessories. This project showcases best practices in modern full-stack development with authentication, file uploads, secure payments, and a scalable architecture.

### Live Site
[kiddie-cache.vercel.app](https://kiddie-cache.vercel.app)

![Image](https://github.com/user-attachments/assets/af0cb406-80d3-4009-b162-d9a4f6b72a2b)

### Features

#### Core Functionalities
 - **Product Catalog** – Showcase items with images, details, categories, and pricing.

 - **Search & Pagination**  – Efficient product filtering and pagination.

 - **Shopping Cart** – Add/remove items to cart with quantity control (supports guest sessions).

 - **Checkout System** – Place orders with flexible payment methods.

 - **User Account** – View order history and order details.

#### 🔐 Authentication
 - Google OAuth (via NextAuth.js v5)

 - Email/Password (Credentials provider)

 - Session cart merging on login

#### Payment Integration
 - ✅ PayPal Checkout (Live/Sandbox)

 - 💳 Stripe

 - 💵 Pay on Delivery

#### 📂 File Upload

 - Managed using UploadThing for smooth image/file handling in product management.

#### Form Validation

 - All forms validated using Zod, with type-safe schemas and clean error handling.


### Tech Stack

The project leverages a robust stack for performance, scalability, and maintainability:

 - **Next.js 15**: Framework for frontend and backend (App Router)
 
 - **TypeScript**: Static typing across the codebase

 - **Tailwind CSS + ShadCN UI**: UI components & styling

 - **Prisma ORM**: Database ORM for Postgres

 - **Neon**: Serverless Postgres database

 - **Vercel**: Hosting and edge deployment

 - **NextAuth.js v5**: Authentication (Google & Credentials)

 - **UploadThing**: Product image uploads

 - **PayPal / Stripe**: Payment gateways

 - **Zod**: Form validation



## Screenshots


### Homepage setup

#### Landing Page
![Image](https://github.com/user-attachments/assets/af0cb406-80d3-4009-b162-d9a4f6b72a2b)


### Search Page

#### Search Page ('/search')
![Image](https://github.com/user-attachments/assets/4c0cf21b-0aa4-4178-82fe-ee162576f629)



### Product Page

#### initial product page setup
![Image](https://github.com/user-attachments/assets/69f8c6e7-9752-47bb-86e6-8b61fbefbd6e)



### Admin

#### Admin Overview Page ('/admin/overview')
![Image](https://github.com/user-attachments/assets/084b4f0c-08af-4207-89ba-ff66ce5188ca)

##### Dark Mode
![Image](https://github.com/user-attachments/assets/ba15fbf6-da8a-47a7-837d-6f09e777c7f2)

#### Admin Orders Page ('/admin/orders')
![Image](https://github.com/user-attachments/assets/84df43ca-e5cb-4494-9841-c6a502e4f541)

#### Create Product ('admin/products/create')
![Image](https://github.com/user-attachments/assets/b59b96c3-89ff-42a2-9c80-9b826bb1d6f4)

#### Update Product ('admin/products/{id}')
![Image](https://github.com/user-attachments/assets/481e52b1-9c10-4b56-840c-95b05d060906)


#### Admin User Manipulation

###### List Users
![Image](https://github.com/user-attachments/assets/a1aa1396-5ed7-4a9e-ac0f-6ab61154d22f)

###### Update Users
![Image](https://github.com/user-attachments/assets/34bc63af-5569-45d8-9bff-e57c3dcb192b)



