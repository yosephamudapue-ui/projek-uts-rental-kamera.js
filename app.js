const express = require("express");
const kameraRoutes = require("./routes/kamera");

const app = express();
app.use(express.json());

app.use("/kamera", kameraRoutes);

app.listen(3000, () => {
    console.log("Server jalan di http://localhost:3000");
});