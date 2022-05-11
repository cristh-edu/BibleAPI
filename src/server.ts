import express from "express";
import cors from "cors";
import { routes } from "./routes/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log("HTTP server running on http://localhost:3333");
});