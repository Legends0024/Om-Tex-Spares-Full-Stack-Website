# Om Tex Spares - Full Stack Product Catalog

A premium, production-ready textile machinery spare parts catalog and enquiry system. Built for **Om Tex Spares**, this platform allows customers to browse over 40 high-quality parts with a seamless WhatsApp-integrated enquiry flow and a robust admin dashboard for inventory management.

## 🚀 Key Features

- **Dynamic Product Catalog**: Browse 40+ textile machinery parts (SOMET, VAMATEX, SULZER, etc.) with high-resolution images.
- **Sequential Numbering System**: Each product is assigned a unique `Product No.` for easy customer enquiries.
- **WhatsApp Integration**: Every product card has a direct-to-WhatsApp link that pre-fills the message with the specific part details.
- **Admin Dashboard**: Secure management system to add, edit, or delete products and track customer enquiries.
- **Automated Seeding**: Local image-based seeding logic that intelligently populates the database on startup.
- **Responsive Design**: Fast, modern, and mobile-friendly UI.

## 🛠 Tech Stack

### Frontend
- **React 19** with **Vite**
- **Tailwind CSS** for premium styling
- **React Router Dom** for navigation
- **Lucide React** for modern iconography

### Backend
- **FastAPI** (Python 3.14 compatible)
- **MongoDB Atlas** for secure, cloud database storage
- **Motor** (Asynchronous MongoDB driver)
- **Bcrypt** for secure password hashing

## 📦 Installation & Setup

### 1. Prerequisites
- Node.js (v18+)
- Python (3.12+)
- MongoDB Atlas Account

### 2. Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .\.venv\Scripts\activate
pip install -r requirements.txt
```
Create a `.env` file in the `backend` folder:
```env
MONGO_URL=your_mongodb_atlas_url
ADMIN_USERNAME=admin
ADMIN_PASSWORD=omtex@2024
ADMIN_WHATSAPP=918222085999
JWT_SECRET=your_jwt_secret
```
Run the server:
```bash
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Visit `http://localhost:5173`.

## 📂 Project Structure

- `/backend`: FastAPI application, models, and routes.
- `/frontend`: React application, components, and pages.
- `/frontend/public/images/products`: Storage for the 40+ product photos used for automated seeding.

## 🔐 Admin Access
- **Url**: `/login`
- **Username**: `admin`
- **Password**: `omtex@2024`

---
*Built with ❤️ for Om Tex Spares.*
