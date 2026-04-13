# Om Tex Spares - Full Stack Product Catalog

A premium, full-stack textile machinery spare parts catalog and enquiry management system.

## 🚀 Key Features

- **Dynamic Product Catalog**: Browse parts with high-resolution images and specialized branding.
- **Reference Number System**: Sequential product numbering for precise inventory tracking and customer communication.
- **Integrated Enquiries**: Streamlined WhatsApp integration for instant part availability checks.
- **Admin Management**: Secure dashboard for product inventory control and enquiry tracking.
- **Automated Data Seeding**: Image-driven seeding logic for rapid deployment.

## 🛠 Project Architecture

This application follows a modern decoupled architecture:
- **Frontend**: Single Page Application (SPA) built with React and Tailwind CSS.
- **Backend**: Asynchronous REST API powered by FastAPI and Python.
- **Database**: Document-based storage using MongoDB.

## 📦 Local Configuration

To run this project locally, you must set up an environment file.

### Required Environment Variables:
Create a `.env` file in the `backend/` directory with the following keys:
- `MONGO_URL`: Your MongoDB connection string.
- `ADMIN_USERNAME`: Desired admin login username.
- `ADMIN_PASSWORD`: Desired admin login password.
- `ADMIN_WHATSAPP`: The WhatsApp number for receiving enquiries (including country code).
- `JWT_SECRET`: A secure string for authentication tokens.

## 📂 Repository Structure

- `/backend`: API routes, Pydantic models, and database logic.
- `/frontend`: React components, hooks, and stylized page layouts.
- `/frontend/public/images/products`: Product asset repository.

---
*Developed for efficient textile spare parts management.*
