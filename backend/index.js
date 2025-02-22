import express from "express";
import cors from "cors";
import router from "./main1.js";

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app"  
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.json());


app.options("*", cors()); 

app.use("/auth", router);

app.listen(1234, () => {
  console.log("✅ Backend running on port 1234");
});
