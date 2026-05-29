const t = require("tap");
const supertest = require("supertest");
const app = require("../app");

const server = supertest(app);

t.test("POST /tasks", async (t) => {
  const newTask = {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
    priority: "low",
  };

  const response = await server.post("/airtribe/v1/tasks").send(newTask);

  t.equal(response.status, 201);
});

t.test("POST /tasks with invalid data", async (t) => {
  const newTask = {
    title: "New Task",
  };

  const response = await server.post("/airtribe/v1/tasks").send(newTask);

  t.equal(response.status, 400);
});

t.test("GET /tasks", async (t) => {
  const response = await server.get("/airtribe/v1/tasks");

  t.equal(response.status, 200);

  t.ok(Object.hasOwn(response.body[0], "id"));
  t.ok(Object.hasOwn(response.body[0], "title"));
  t.ok(Object.hasOwn(response.body[0], "description"));
  t.ok(Object.hasOwn(response.body[0], "completed"));

  t.equal(typeof response.body[0].id, "number");
  t.equal(typeof response.body[0].title, "string");
  t.equal(typeof response.body[0].description, "string");
  t.equal(typeof response.body[0].completed, "boolean");
});

t.test("GET /tasks/:id", async (t) => {
  const response = await server.get("/airtribe/v1/tasks/1");

  t.equal(response.status, 200);

  const expectedTask = {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
    priority: "low",
  };

  t.match(response.body, expectedTask);
});

t.test("GET /tasks/:id with invalid id", async (t) => {
  const response = await server.get("/airtribe/v1/tasks/999");

  t.equal(response.status, 404);
});

t.test("PUT /tasks/:id", async (t) => {
  const updatedTask = {
    title: "Updated Task",
    description: "Updated Task Description",
    completed: true,
    priority: "low",
  };

  const response = await server
    .put("/airtribe/v1/tasks/1")
    .send(updatedTask);

  t.equal(response.status, 200);
});

t.test("PUT /tasks/:id with invalid id", async (t) => {
  const updatedTask = {
    title: "Updated Task",
    description: "Updated Task Description",
    completed: true,
    priority: "low",
  };

  const response = await server
    .put("/airtribe/v1/tasks/999")
    .send(updatedTask);

  t.equal(response.status, 404);
});

t.test("PUT /tasks/:id with invalid data", async (t) => {
  const updatedTask = {
    title: "Updated Task",
    description: "Updated Task Description",
    completed: "true",
    priority: "medium",
  };

  const response = await server
    .put("/airtribe/v1/tasks/1")
    .send(updatedTask);

  t.equal(response.status, 400);
});

t.test("DELETE /tasks/:id", async (t) => {
  const response = await server.delete("/airtribe/v1/tasks/1");

  t.equal(response.status, 200);
});

t.test("DELETE /tasks/:id with invalid id", async (t) => {
  const response = await server.delete("/airtribe/v1/tasks/999");

  t.equal(response.status, 404);
});