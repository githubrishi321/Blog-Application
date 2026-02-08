<<<<<<< HEAD
# YouTube Blog Application

A simple blog application built with Node.js, Express, MongoDB, and EJS.

## Features

- User authentication (signup/signin)
- Create and view blogs
- Add comments to blogs
- Image upload for blog covers
- Responsive design with Bootstrap

  ## Screenshots

### 🏠 Home Page
![Home Page](.public/uploads/Screenshot 2025-11-20 002005.png)

### ✍️ Add New Blog
![Add Blog](.public/uploads/Create_New_Blog.png)

### 👤 Signup Page
![Signup Page](.public/uploads/Create_Account.png)

### 👤 SignIn Page
![SignIn Page](.public/uploads/SignInPage.png)


## Setup

1. **Install dependencies:**
=======
# 📝 Blogify - Full-Stack Blog Application

A modern, full-featured blogging platform built with **Node.js**, **Express.js**, **MongoDB**, and **EJS**. Users can create accounts, write blog posts with cover images, and engage through comments.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)

---

## 🚀 Features

- **User Authentication** - Secure signup/signin with password hashing (SHA-256)
- **JWT Token-Based Sessions** - Stateless authentication using cookies
- **Create & Read Blogs** - Write blog posts with rich content
- **Cover Image Upload** - Add cover images to blogs using Multer
- **Commenting System** - Engage with blog posts through comments
- **User Profiles** - Profile images and role-based access (USER/ADMIN)
- **Responsive Design** - EJS templates with modern styling

---

## 🏗️ Project Structure

```
YOUTUBE-BLOG/
├── 📄 app.js                    # Main application entry point
├── 📄 package.json              # Dependencies and scripts
├── 📄 .env                      # Environment variables
│
├── 📂 models/                   # Mongoose schemas
│   ├── user.js                  # User model with password hashing
│   ├── blog.js                  # Blog post model
│   └── comment.js               # Comment model
│
├── 📂 routes/                   # Express route handlers
│   ├── user.js                  # Authentication routes (signup/signin/logout)
│   └── blog.js                  # Blog CRUD & comment routes
│
├── 📂 middlewares/              # Custom middleware
│   └── authentication.js        # JWT token validation & auth guards
│
├── 📂 services/                 # Business logic
│   └── authentication.js        # JWT token creation & validation
│
├── 📂 views/                    # EJS templates
│   ├── home.ejs                 # Homepage with blog listing
│   ├── blog.ejs                 # Individual blog page
│   ├── addBlog.ejs              # Create new blog form
│   ├── signin.ejs               # Login page
│   ├── signup.ejs               # Registration page
│   ├── error.ejs                # Error page
│   └── partials/                # Reusable template components
│
└── 📂 public/                   # Static assets
    ├── Images/                  # Default images
    └── uploads/                 # User-uploaded blog images
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js |
| **Framework** | Express.js 5.x |
| **Database** | MongoDB with Mongoose ODM |
| **View Engine** | EJS (Embedded JavaScript) |
| **Authentication** | JWT (jsonwebtoken) |
| **Password Hashing** | Crypto (SHA-256 HMAC) |
| **File Upload** | Multer |
| **Session Management** | Cookie-Parser |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd YOUTUBE-BLOG
   ```

2. **Install dependencies**
>>>>>>> 22c7f8b (Some ui fixes has been done .)
   ```bash
   npm install
   ```

<<<<<<< HEAD
2. **Create a `.env` file** by copying the sample:
   ```bash
   cp env.sample .env
   ```
   Update the variables to match your environment (see Environment Variables below).

3. **Start MongoDB** (make sure MongoDB is running on your system)

4. **Run the application:**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

5. **Access the application** at `http://localhost:8000`

## Environment Variables

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `PORT` | No | Port for local development (Render assigns one automatically) | `8000` |
| `NODE_ENV` | No | Environment mode (`development` or `production`) | `production` |
| `MONGO_URL` | Yes | MongoDB connection string (use MongoDB Atlas or another managed DB for Render) | `mongodb+srv://user:pass@cluster.mongodb.net/blogify` |
| `JWT_SECRET` | Yes | Strong secret used to sign authentication cookies | `1d0a75c3a...` |
| `PASSWORD_SALT` | Recommended | Salt for password hashing (use a strong random string in production) | `your-random-salt-here` |

> ⚠️ Render cannot reach `localhost` databases. Use a hosted MongoDB instance.

## Project Structure

- `models/` - MongoDB schemas
- `routes/` - Express routes
- `views/` - EJS templates
- `middlewares/` - Authentication middleware
- `services/` - Authentication services
- `public/` - Static files (CSS, JS, images)

## API Endpoints

- `GET /` - Home page with all blogs
- `GET /user/signup` - Signup page
- `POST /user/signup` - Create new user
- `GET /user/signin` - Signin page
- `POST /user/signin` - Authenticate user
- `GET /user/logout` - Logout user
- `GET /blog/add-new` - Add new blog page
- `POST /blog` - Create new blog
- `GET /blog/:id` - View specific blog
- `POST /blog/comment/:blogId` - Add comment to blog

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- EJS templating
- Bootstrap for UI
- Multer for file uploads
- JWT for authentication 

## Deploying to Render

1. Push the repository to GitHub/GitLab.
2. In Render, choose **New ➜ Blueprint** (or **New ➜ Web Service**) and point it at this repo. The included `render.yaml` describes a Node web service that installs dependencies and executes `npm start`.
3. When prompted, add the environment variables:
   - `MONGO_URL` – MongoDB Atlas or another hosted Mongo connection string.
   - `JWT_SECRET` – a long, random secret string.
   - `PASSWORD_SALT` – a strong random salt for password hashing (recommended).
   - `NODE_ENV` – set to `production` (already configured in `render.yaml`).
   - (Optional) `PORT` for local overrides; Render provides its own port at runtime.
4. Click **Deploy**. Render will run `npm install` during the build stage and `npm start` for the runtime.

> Uploaded cover images are stored under `public/uploads`. Render’s disk is ephemeral; for long-term storage use S3, Cloudinary, etc.
=======
3. **Configure environment variables**
   
   Create/update `.env` file:
   ```env
   PORT=8000
   MONGO_URL=mongodb://localhost:27017/blogify
   ```

4. **Create uploads directory**
   ```bash
   mkdir -p public/uploads
   ```

5. **Start the application**
   ```bash
   # Development (with hot reload)
   npm run dev
   
   # Production
   npm start
   ```

6. **Open in browser**
   ```
   http://localhost:8000
   ```

---

## 📚 API Routes

### Authentication Routes (`/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/signin` | Render login page |
| GET | `/user/signup` | Render registration page |
| POST | `/user/signin` | Authenticate user |
| POST | `/user/signup` | Register new user |
| GET | `/user/logout` | Clear session & logout |

### Blog Routes (`/blog`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Home - List all blogs | ❌ |
| GET | `/blog/add-new` | Render create blog form | ✅ |
| POST | `/blog` | Create new blog post | ✅ |
| GET | `/blog/:id` | View single blog | ❌ |
| POST | `/blog/comment/:blogId` | Add comment to blog | ✅ |

---

## 🗃️ Database Models

### User Schema
```javascript
{
  fullName: String,          // Required
  email: String,             // Required, Unique
  password: String,          // Hashed with SHA-256
  salt: String,              // Password salt
  profileImageURL: String,   // Default: '/Images/default.svg'
  role: ['USER', 'ADMIN'],   // Default: 'USER'
  timestamps: true
}
```

### Blog Schema
```javascript
{
  title: String,             // Required
  body: String,              // Required
  coverImageURL: String,     // Optional
  createdBy: ObjectId,       // Ref: 'user'
  timestamps: true
}
```

### Comment Schema
```javascript
{
  content: String,           // Required
  blogId: ObjectId,          // Ref: 'blog'
  createdBy: ObjectId,       // Ref: 'user'
  createdAt: Date
}
```

---

## 🔐 Authentication Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Sign Up    │────▶│ Hash Password│────▶│  Save User   │
└──────────────┘     │  (SHA-256)   │     │  (MongoDB)   │
                     └──────────────┘     └──────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Sign In    │────▶│Verify Password│───▶│ Create JWT   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │ Set Cookie   │
                                          │  (token)     │
                                          └──────────────┘
```

---

## 📸 File Upload

- **Supported formats**: Images only (JPEG, PNG, GIF, etc.)
- **Storage**: Local filesystem (`/public/uploads/`)
- **Naming**: Timestamp-prefixed to avoid collisions
- **Access**: Served statically via Express

---

## 🧪 Development

```bash
# Run with nodemon (auto-reload)
npm run dev

# Run production server
npm start
```

---

## 📝 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `node app.js` | Start production server |
| `dev` | `nodemon app.js` | Start development server with hot reload |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

Built with ❤️ for learning and demonstration purposes.
>>>>>>> 22c7f8b (Some ui fixes has been done .)
