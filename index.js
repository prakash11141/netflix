import express from "express";
import movieRouters from "./movie.routes.js";
import userRouters from "./user.routes.js";
const app = express();
//port
const PORT = 5000;
//to make app understand json
app.use(express.json());
//register routes
app.use(movieRouters);
app.use(userRouters);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
