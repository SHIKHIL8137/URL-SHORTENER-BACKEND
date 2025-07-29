# 🧠URL Shortener Backend (NestJS + Clean Architecture)
A scalable and modular backend service for shortening URLs, built using NestJS, TypeScript, and Clean Architecture principles. Supports URL creation, redirection, analytics, and expiration handling.

---

## 🚀 Features

- ✨ Shorten long URLs to compact identifiers
- 🔁 Redirect short URLs to original destinations
- 📊 Track visit counts and timestamps
- 🧼 Clean Architecture (Domain, Use-Cases, Infrastructure, Presentation)
- 🧪 Unit-tested use-cases and services
- ⚙️ Environment-based configuration
- 🔐 CORS & security middleware included

---

## 📦 Tech Stack

- Framework: NestJS (TypeScript)
- Architecture: Clean Architecture
- Database: MongoDB
- Other:  CORS, dotenv, pnpm,Docker


---

## 🛠 Setup (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/url-shortener-backend.git
cd backend
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Create a `.env` file

```env
PORT=3000
MONGO_URI=mongodb+srv://
ACCESS_SECRET=84DF05C0CE97917E2BFFD4DC686E7CAC26
REFRESH_SECRET=7C3F7B1DD17278952EB020C7775E9399
FRONTEND_URL=http://localhost:2000
```

### 4. Run the development server

```bash
pnpm start:dev

```

---

## 🐳 Run in Docker (Production)

### 1. Build the Docker image

```bash
docker build -t nest-url-shortener .
```

### 2. Run the container

```bash
docker run -p 5000:5000 --env-file .env nest-url-shortener

```

Your backend will be available at: [http://localhost:5000](http://localhost:5000)

---

---

## 🔒 CORS Configuration

Make sure CORS is enabled to allow requests from the frontend:

```ts
import cors from 'cors';

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
```

---

## 🧪 Preview Build (Optional)

To test the production build locally:

```bash
pnpm build
node dist/main

```

---

## ✍️ Author

Built with ❤️ by [Shikhil K S](https://github.com/SHIKHIL8137)

---

## 📄 License

This project is licensed under the MIT License.
