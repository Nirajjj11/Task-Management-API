# TaskManagementBackend

Node.js + Express + MongoDB task management backend with JWT auth.

## ✅ Project overview

- User registration/login with hashed passwords (bcryptjs)
- JWT authentication (`/api/auth/register`, `/api/auth/login`)
- Authenticated task CRUD endpoints:
  - `POST /api/tasks` (create task)
  - `GET /api/tasks` (list user tasks)
  - `DELETE /api/tasks/:id` (delete task)
- Middleware: `authMiddleware` verifies `Authorization: Bearer <token>`
- Mongoose models: `User`, `Task`

## �️ Folder structure

```
TaskManagementBackend/
├─ .env                # environment variables (local only)
├─ .gitignore
├─ package.json
├─ README.md
├─ server.js           # app entry point
├─ config/
│  └─ db.js            # Mongoose DB connection
├─ controllers/
│  ├─ authController.js
│  └─ taskController.js
├─ middleware/
│  └─ authMiddleware.js
├─ models/
│  ├─ Task.js
│  └─ user.js
├─ routes/
│  ├─ authRoutes.js
│  └─ taskRoutes.js
├─ utils/
│  └─ generateToken.js
└─ node_modules/
```

## �🛠️ Prerequisites

- Node.js 16+ (tested)
- npm
- MongoDB running (local or cloud)

### Required libraries (install with npm)

```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken morgan
npm install --save-dev nodemon
```

## ⚙️ Install and run

```bash
git clone https://github.com/Nirajjj11/Task-Management-API.git
npm install
```

Create `.env` in root with at least:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskmanagement
JWT_SECRET=your_jwt_secret
```

Start server:

```bash
npm start
```

Expected log:

`Server is listening on port http://127.0.0.1:5000`

## 📁 API routes

### Auth

- `POST /api/auth/register`
  - body: `{ "email": "user@example.com", "password": "password123" }`
  - response: `{ "token": "...jwt..." }`
- `POST /api/auth/login`
  - body: same as register
  - response: `{ "token": "...jwt..." }`

### Tasks (requires auth)

- `POST /api/tasks`
  - headers: `Authorization: Bearer <token>`
  - body: `{ "title": "My task" }`
  - response: task object
- `GET /api/tasks`
  - headers: `Authorization: Bearer <token>`
  - response: array of tasks for user
- `DELETE /api/tasks/:id`
  - headers: `Authorization: Bearer <token>`
  - response: `{ "msg": "Task deleted" }`

## 🧪 Postman Test Guide (step-by-step)

### 1) New collection

1. Open Postman.
2. Create a collection: `TaskManagementBackend`.
3. Set collection-level variable (optional): `baseUrl` = `http://localhost:5000/api`.

### 2) Register user

- Method: POST
- URL: `{{baseUrl}}/auth/register` or `http://localhost:5000/api/auth/register`
- Body > raw > JSON:

```json
{
  "email": "testuser@example.com",
  "password": "mySecret123"
}
```

- Send, expect `200`, response JSON contains `token`.
- Copy the JWT value into environment variable `authToken`.

### 3) Login user

- Method: POST
- URL: `{{baseUrl}}/auth/login`
- Body same as register.
- Validate returned JWT and set `authToken`:

```json
{
  "token": "eyJhbGci..."
}
```

### 4) Create a task

- Method: POST
- URL: `{{baseUrl}}/tasks`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer {{authToken}}`
- Body:

```json
{
  "title": "Finish README for backend"
}
```

- Expect `200` and task object:
  - `_id`, `title`, `userId`, `createdAt`, `updatedAt`, `__v`

### 5) List tasks

- Method: GET
- URL: `{{baseUrl}}/tasks`
- Headers: same auth header.
- Expect `200`, response is array matching your created tasks.

### 6) Delete a task

- Method: DELETE
- URL: `{{baseUrl}}/tasks/{{taskId}}`
- Headers: same auth header.
- `taskId` can be from the `GET` result or `POST` response.
- Expect response:

```json
{
  "msg": "Task deleted"
}
```

### 7) Confirm deletion

- Re-run `GET /api/tasks`; removed task must not be present.

## 🔎 Troubleshooting

- `401 No token provided`: missing auth header.
- `401 Invalid token`: expired/incorrect `JWT_SECRET` or wrong token.
- `MongoNetworkError`: ensure MongoDB is reachable and `MONGO_URI` is correct.

## 🧩 Additional improvements

- Add validation on `email`, `password`, `title`.
- Add `PATCH /api/tasks/:id` for update.
- Add pagination to `GET /api/tasks`.
- Add request logging/error middleware.

---

Made for quick onboarding and Postman-based API testing.
