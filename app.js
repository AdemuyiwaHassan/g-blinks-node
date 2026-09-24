const http = require("http");

const PORT = process.env.PORT || 3001;
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const { pathname } = url;

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const payload = body ? JSON.parse(body) : {};

      if (req.method === "GET" && pathname === "/users") {
        return sendResponse(res, 200, users);
      }

      if (req.method === "GET" && pathname.startsWith("/users/")) {
        const id = Number(pathname.split("/")[2]);
        const user = users.find((u) => u.id === id);

        if (!user) {
          return sendResponse(res, 404, { message: "User not found" });
        }

        return sendResponse(res, 200, user);
      }

      if (req.method === "POST" && pathname === "/users") {
        const newUser = {
          id: users.length ? users[users.length - 1].id + 1 : 1,
          name: payload.name || "Unknown",
        };

        users.push(newUser);
        return sendResponse(res, 201, newUser);
      }

      if (req.method === "PUT" && pathname.startsWith("/users/")) {
        const id = Number(pathname.split("/")[2]);
        const index = users.findIndex((u) => u.id === id);

        if (index === -1) {
          return sendResponse(res, 404, { message: "User not found" });
        }

        users[index] = { ...users[index], ...payload };
        return sendResponse(res, 200, users[index]);
      }

      if (req.method === "DELETE" && pathname.startsWith("/users/")) {
        const id = Number(pathname.split("/")[2]);
        const index = users.findIndex((u) => u.id === id);

        if (index === -1) {
          return sendResponse(res, 404, { message: "User not found" });
        }

        const deletedUser = users.splice(index, 1)[0];
        return sendResponse(res, 200, deletedUser);
      }

      return sendResponse(res, 404, { message: "Not found" });
    } catch (error) {
      return sendResponse(res, 400, { message: "Invalid JSON payload" });
    }
  });
});

server.listen(PORT, () => {
  console.log(`REST API running at http://localhost:${PORT}`);
});
