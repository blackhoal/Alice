const express = require("express");
const { coffeeRouter, orderRouter } = require("./router");

const app = express();

app.use(express.json());

// coffeeRouter를 /coffees path 아래에 메인 express 어플리케이션에 등록
app.use("/coffees", coffeeRouter);
// orderRouter를 /orders path 아래에 메인 express 어플리케이션에 등록
app.use("/orders", orderRouter);

app.use((req, res, next) => {
  const error = new Error("Resource Not Found");
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.statusCode = error.statusCode;
  res.json({
    error: error.message,
    data: null,
  });
});

app.listen(3000, () => {
  console.log("카페 서버가 포트 3000에서 운영중입니다 🚀");
});
