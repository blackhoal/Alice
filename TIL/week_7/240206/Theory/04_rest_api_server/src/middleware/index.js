const coffeeValidationMiddleware = require("./coffeeValidationMiddleware");
const orderValidationMiddleware = require("./orderValidationMiddleware");

// 다른 모듈에서 한 줄로 require하기 쉽도록 index.js에서 middleware 경로 아래에 있는 미들웨어들을 require해서 다시 재-export
module.exports = {
  coffeeValidationMiddleware,
  orderValidationMiddleware,
};
