# 🏠 RealEstateConnect

**A full‑stack real estate platform to browse, list, and manage properties—complete with user auth and contextual chatbot support.**

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)  
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)  
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)  
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)  
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)  

## 📸 Screenshots

<div align="center">
  <img src="screenshots/home.png"   alt="Home Page"       width="300"/>
  <img src="screenshots/create.png" alt="Create Listing"   width="300"/>
  <img src="screenshots/list.png"   alt="Listing Page"     width="300"/>
  <img src="screenshots/chat.png"   alt="Chatbot Support"  width="300"/>
</div>

## ✨ Features

- 🔐 **User Auth** – Register, login, profile  
- 🏘️ **Listings** – Create, edit, delete posts  
- 🔍 **Search & Filter** – By location, price, type  
- 💬 **Contact Owners** – In‑app messaging  
- 🤖 **Chatbot** – Contextual Python support  
- 📱 **Responsive** – Desktop & mobile ready  

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/RealEstateConnect.git
cd RealEstateConnect

# 2. Frontend (React)
cd client
npm install
npm start &

# 3. Backend (Node/Express)
cd ../api
npm install
# create a .env file with MONGO_URI and JWT_SECRET
npm start &

# 4. Chatbot (Python/Flask)
cd ../contextual-chatbot
pip install -r requirements.txt
python app.py

# 5. Open the app
# Frontend: http://localhost:3000
# API:      http://localhost:5000
# Chatbot: see port in app.py
