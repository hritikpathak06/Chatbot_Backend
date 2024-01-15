const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/connection");
const cookieParser = require("cookie-parser");

// Config
dotenv.config();
connectDB();


// Middlewares
// app.use(cors({
//   credentials:true,
//   methods:["GET","POST","PUT","DELETE"]
// }));
// app.use(cors());
app.use(cors({
  origin: 'https://chatbot-ashen-tau.vercel.app',
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(express.json());


// Initialising Port
const port = process.env.PORT || 8000;

// Routes Paths
const userRoutes = require("./routes/userRoutes");
const openAiRoutes = require("./routes/openAiRoutes");

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/openai", openAiRoutes);

// Default Api
app.get("/", (req, res) => {
  res.send("On Dev Mode || Cors Origin Changed 😁");
});

// Server Config
app.listen(port, () => {
  console.log(
    `Server Started Succesffuly in Dev Mode on the port:${port}`.bold
  );
});
