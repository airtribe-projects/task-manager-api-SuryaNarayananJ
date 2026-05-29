# Task Manager API

A RESTful API for managing tasks, built with Node.js and Express. This API provides CRUD operations for task management with filtering, sorting, and validation capabilities.

## Project Overview

This is a backend engineering assignment that demonstrates:
- RESTful API design with Express.js
- File-based JSON data storage
- Request validation using custom middleware
- Comprehensive test suite using Tap
- Logging middleware for request tracking

## Features

- Create, read, update, and delete tasks
- Filter tasks by completion status and priority
- Sort tasks by creation date
- Request validation and error handling
- Request logging
- Comprehensive test coverage

## Tech Stack

- **Node.js** (>= 18.0.0)
- **Express.js** v4.18.2
- **dotenv** v17.4.2
- **Testing**: Tap v21.7.4, Supertest v7.2.2
- **Dev Tools**: Nodemon v3.1.14

## Setup Instructions

### Prerequisites

- Node.js version 18 or higher
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/airtribe-projects/task-manager-api-SuryaNarayananJ.git
cd task-manager-api-SuryaNarayananJ
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Quick Start

```bash
npm install
npm run dev
```

## Project Structure

```
task-manager-api-SuryaNarayananJ/
├── app.js                 # Main application entry point
├── controllers/           # Business logic
│   └── tasksController.js
├── middlewares/           # Custom middleware
│   ├── loggerMiddleware.js
│   └── tasksMiddleware.js
├── models/                # Data models
│   └── tasks.json         # JSON file storage
├── routes/                # API routes
│   └── tasksRoute.js
├── test/                  # Test suite
│   └── server.test.js
├── package.json
└── .env
```

## API Endpoints

Base URL: `http://localhost:3000/airtribe/v1/tasks`

### 1. Get All Tasks

**Endpoint:** `GET /airtribe/v1/tasks`

**Query Parameters:**
- `sort` (optional): Sort by creation date - `asc` or `desc`
- `priority` (optional): Filter by priority - `low`, `medium`, or `high`
- `completed` (optional): Filter by completion status - `true` or `false`

**Example Request:**
```bash
curl http://localhost:3000/airtribe/v1/tasks
```

**Example Response:**
```json
[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true,
    "priority": "low",
    "createdAt": "2026-05-01T00:00:00.000Z"
  }
]
```

### 2. Get Task by ID

**Endpoint:** `GET /airtribe/v1/tasks/:id`

**Example Request:**
```bash
curl http://localhost:3000/airtribe/v1/tasks/1
```

**Example Response:**
```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true,
  "priority": "low",
  "createdAt": "2026-05-01T00:00:00.000Z"
}
```

### 3. Create Task

**Endpoint:** `POST /airtribe/v1/tasks`

**Required Fields:**
- `title` (string): Task title
- `description` (string): Task description
- `completed` (boolean): Task completion status
- `priority` (string): Task priority - must be `low`, `medium`, or `high`

**Example Request:**
```bash
curl -X POST http://localhost:3000/airtribe/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "completed": false,
    "priority": "high"
  }'
```

**Example Response:**
```json
{
  "id": 16,
  "title": "New Task",
  "description": "Task description",
  "completed": false,
  "priority": "high",
  "createdAt": "2026-05-29T12:00:00.000Z"
}
```

### 4. Update Task

**Endpoint:** `PUT /airtribe/v1/tasks/:id`

**Required Fields:** Same as create task

**Example Request:**
```bash
curl -X PUT http://localhost:3000/airtribe/v1/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "description": "Updated description",
    "completed": true,
    "priority": "medium"
  }'
```

**Example Response:**
```json
{
  "id": 1,
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true,
  "priority": "medium",
  "createdAt": "2026-05-01T00:00:00.000Z"
}
```

### 5. Delete Task

**Endpoint:** `DELETE /airtribe/v1/tasks/:id`

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/airtribe/v1/tasks/1
```

**Example Response:**
```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true,
  "priority": "low",
  "createdAt": "2026-05-01T00:00:00.000Z"
}
```

## Validation Rules

- **title**: required string
- **description**: required string
- **completed**: required boolean
- **priority**: required, one of low, medium, high

## Testing

### Run Tests

```bash
npm test
```

### Test Coverage

The test suite includes:
- POST /tasks (valid and invalid data)
- GET /tasks (with property validation)
- GET /tasks/:id (valid and invalid IDs)
- PUT /tasks/:id (valid data, invalid ID, invalid data)
- DELETE /tasks/:id (valid and invalid IDs)

All tests use Tap and Supertest for comprehensive API testing.

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Resource created
- `400` - Bad request (invalid data)
- `404` - Resource not found
- `500` - Internal server error

## Data Storage

Tasks are stored in a JSON file (`models/tasks.json`). The API uses file-based storage with synchronous read/write operations. Note that this is not suitable for production use with high concurrency.

## Known Limitations

- File-based storage is not suitable for high-concurrency scenarios
- No database transactions or ACID guarantees
- Race conditions possible with concurrent requests
- No authentication or authorization
- In-memory data may become stale if file is modified externally

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite

## License

ISC

## Author

Surya Narayanan J
