#  Blogify - Full-Stack Blog Application

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
- **Responsive Design** - Modern UI with Bootstrap and custom styling
- **Custom Favicon** - Brand identity with custom favicon

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
│       ├── head.ejs             # CSS, favicon & meta tags
│       ├── nav.ejs              # Navigation bar
│       ├── footer.ejs           # Footer with social links
│       └── scripts.ejs          # JavaScript includes
│
└── 📂 public/                   # Static assets
    ├── Images/                  # Default images & favicon
    │   ├── fevicon.png          # Site favicon
    │   ├── default.png          # Default profile image
    │   └── default.svg          # SVG profile image
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
| **Styling** | Bootstrap 5 + Custom CSS |

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
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create/update `.env` file:
   ```env
   PORT=8000
   MONGO_URL=mongodb://localhost:27017/blogify
   JWT_SECRET=your-jwt-secret-key
   PASSWORD_SALT=your-password-salt
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

## 🔑 Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | No | Server port (default: 8000) | `8000` |
| `NODE_ENV` | No | Environment mode | `production` |
| `MONGO_URL` | Yes | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/blogify` |
| `JWT_SECRET` | Yes | Secret for JWT signing | `your-secret-key` |
| `PASSWORD_SALT` | Recommended | Salt for password hashing | `your-random-salt` |

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

## 🚀 Deployment

### Deploying to Render

1. Push the repository to GitHub/GitLab
2. Create a new Web Service on Render
3. Add environment variables:
   - `MONGO_URL` – MongoDB Atlas connection string
   - `JWT_SECRET` – Random secret string
   - `PASSWORD_SALT` – Random salt for passwords
   - `NODE_ENV` – Set to `production`
4. Deploy!

> ⚠️ **Note**: Uploaded images are stored locally. For production, consider using S3 or Cloudinary.

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

**Rishi** - Crafted with dedication for learning and demonstration purposes.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rishikesh-c-rpc/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/githubrishi321)
