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
   ```bash
   npm install
   ```

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
