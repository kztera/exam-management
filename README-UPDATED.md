# Exam Management System

A modern exam management system built with **TypeScript**, **Mantine UI**, and **await-to-js** for error handling.

## 🚀 Tech Stack

### Frontend
- ⚡️ **Vite** - Fast development build tool
- ⚛️ **React 19** - UI framework
- 🎨 **Mantine** - Modern React components library
- 🔗 **await-to-js** - Error handling for async/await
- 🛣️ **React Router** - Client-side routing
- 📝 **TypeScript** - Type safety

### Backend
- 🟢 **Node.js** with **Express** - Web framework
- 📝 **TypeScript** - Type safety
- 🗄️ **Prisma ORM** - Database toolkit
- 🐘 **PostgreSQL** - Database
- 🔐 **Security** - Helmet, rate limiting, CORS
- ✅ **Validation** - Celebrate/Joi

## 📁 Project Structure

```
src/
├── client/                 # Frontend React application
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components
│   ├── services/          # API services using await-to-js
│   └── index.tsx          # App entry point
├── server/                # Backend Express application
│   ├── routes/            # API routes (TypeScript)
│   ├── services/          # Business logic services
│   ├── middleware/        # Express middleware
│   └── utils/             # Utility functions
└── prisma/                # Database schema and migrations
```

## 🛠️ Setup & Development

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm or yarn

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <your-repo>
   cd exam-management
   npm install
   ```

2. **Database setup**
   ```bash
   # Copy environment file
   cp example.env .env
   
   # Update DATABASE_URL in .env with your PostgreSQL credentials
   # Example: DATABASE_URL="postgresql://username:password@localhost:5432/exam_management_db"
   
   # Run database migrations
   npm run migrate
   ```

3. **Start development**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or run separately:
   npm run server  # Backend on port 8080
   npm run client  # Frontend on port 3000
   ```

## 🔧 Available Scripts

- `npm run dev` - Start both client and server
- `npm run client` - Start Vite development server
- `npm run server` - Start Express server with nodemon
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run migrate` - Run Prisma migrations

## 🎯 Features

### Implemented
- ✅ **Modern TypeScript** setup for both frontend and backend
- ✅ **Mantine UI** components with beautiful design
- ✅ **await-to-js** for clean error handling
- ✅ **Student Management** - CRUD operations
- ✅ **Responsive Layout** with navigation
- ✅ **Form validation** and error handling
- ✅ **Database integration** with Prisma

### Architecture Highlights
- **Type-safe** - Full TypeScript coverage
- **Component-based** - Reusable Mantine components
- **API-first** - RESTful API with standardized responses
- **Security** - Helmet, CORS, rate limiting
- **Modern** - Latest React, ES modules, async/await

## 🔌 API Endpoints

### Students
- `GET /api/v1/student/list` - Get all students
- `GET /api/v1/student/:id` - Get student by ID
- `GET /api/v1/student/code/:code` - Get student by code
- `POST /api/v1/student/create` - Create new student
- `PUT /api/v1/student/:id` - Update student
- `DELETE /api/v1/student/:id` - Delete student

### Health Check
- `GET /api/v1/health` - Server health check

## 📊 Database Schema

The system includes comprehensive models for:
- **Students** - Student information and management
- **Exams** - Exam scheduling and details
- **Student Groups** - Group management
- **Face Data** - AI-based face recognition
- **Exam Monitoring** - Real-time monitoring
- **Attendance** - Attendance tracking
- **Violations** - Violation detection and management

## 🎨 UI Components

Built with Mantine for:
- **Tables** - Data display with sorting and filtering
- **Forms** - Input validation and submission
- **Modals** - Create/edit dialogs
- **Notifications** - Success/error messages
- **Navigation** - Responsive sidebar
- **Buttons & Actions** - Consistent styling

## 🔄 Error Handling

Using **await-to-js** for:
- **Clean syntax** - No try/catch blocks needed
- **Better error handling** - Explicit error checking
- **Type-safe** - Full TypeScript support
- **Lightweight** - Minimal overhead
- **Async-friendly** - Works perfectly with async/await

## 🏗️ Development Guidelines

### Adding New Features

1. **Database Model** (if needed)
   ```prisma
   // Add to prisma/schema.prisma
   model YourModel {
     id        Int      @id @default(autoincrement())
     // Add your fields
   }
   ```

2. **Backend Service**
   ```typescript
   // src/server/services/your-model.service.ts
   class YourModelService {
     async findAll() { /* implementation */ }
     // Add CRUD methods
   }
   ```

3. **API Routes**
   ```typescript
   // src/server/routes/v1/your-model.route.ts
   router.get('/list', async (req, res) => { /* implementation */ });
   ```

4. **Frontend Service**
   ```typescript
   // src/client/services/yourModelService.ts
   export const yourModelService = {
     getAll: () => apiService.get('/your-model/list'),
     // Add API methods
   };
   ```

5. **React Components**
   ```typescript
   // src/client/pages/YourModel.tsx
   const YourModelPage: React.FC = () => {
     // Use Mantine components
   };
   ```

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**
   ```bash
   NODE_ENV=production
   DATABASE_URL="your-production-db-url"
   PORT=8080
   ```

3. **Start production server**
   ```bash
   npm start
   ```

## 📝 Environment Variables

Required variables in `.env`:
```env
PORT=8080
NODE_ENV=development
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
```

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use Mantine components for consistency
3. Add proper error handling
4. Write meaningful commit messages
5. Test your changes

## 📄 License

This project is licensed under the ISC License.
