const coffeeRouter = require("./coffeeRouter");
const orderRouter = require("./orderRouter");

// 다른 모듈에서 한 줄로 require하기 쉽도록 index.js에서 router 경로 아래에 있는 router들을 require해서 다시 재-export
module.exports = {
  coffeeRouter,
  orderRouter,
};
