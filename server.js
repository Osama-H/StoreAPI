require("dotenv").config();
const mongoose = require('mongoose')
const app = require("./app");

const dataBase = process.env.MONGO_URI;
mongoose
  .connect(dataBase, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DataBase Connected Successfully ");
  })
  .catch((err) => {
     console.log("There's an Error of DataBase Connection");
  });
  mongoose.set('strictQuery', true)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server Is Running on Port ${port}`);
});
