const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.get('/api', (req, res) => {
  res.send('API is running');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));




// ROUTES  

const UserRoutes = require('./Routes/UserRoutes');
const UploadRoutes = require("./Routes/UploadRoutes");
const TaskRoutes = require("./Routes/TaskRoutes");
const DayRoutes = require("./Routes/DayRoutes");
const WeeklyProgressRoutes = require("./Routes/WeeklyProgressRoutes");

app.use("/uploads", express.static("uploads"));

app.use("/api/upload", UploadRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/task', TaskRoutes);
app.use("/api/day", DayRoutes);
app.use("/api/weekly-progress", WeeklyProgressRoutes);