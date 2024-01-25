const a = require("./a");
const b = require("./b");

/**
 * a 모듈과 b모듈을 index.js에서 export해줌으로서
 * 해당 모듈들을 require하는 파일이 편하게 require할 수 있도록 할 수 있다.
 */
module.exports = {
  a,
  b,
};

// 위는 아래와 같다
// const a = require("./a");
// const b = require("./b");

// module.exports = {
//   a: a,
//   b: b,
// };
