require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

const pmoAuthRoutes = require("./routes/pmo-auth-routes");
const pmoRoutes = require("./routes/pmo-routes");
const supervisorAuthRoutes = require("./routes/supervisor-auth-routes");
const supervisorRoutes = require("./routes/supervisor-routes");
const studentAuthRoutes = require("./routes/student-auth-routes");
const studentRoutes = require("./routes/student-routes");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// extra packages

// routes
app.use("/api/v1/auth/pmo", pmoAuthRoutes);
//app.use("/api/v1/pmo", authenticateUser, pmoRoutes);
app.use("/api/v1/pmo", pmoRoutes);

app.use("/api/v1/auth/supervisor", supervisorAuthRoutes);
app.use("/api/v1/supervisor", supervisorRoutes);
// app.use("/api/v1/supervisor", authenticateUser, supervisorRoutes);

app.use("/api/v1/auth/student", studentAuthRoutes);
app.use("/api/v1/student", authenticateUser, studentRoutes);
// app.use("/api/v1/student", studentRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
