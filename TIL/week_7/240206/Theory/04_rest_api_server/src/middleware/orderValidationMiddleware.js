// 커피 주문을 생성/수정할 때 체크해야하는 요소들을 체크해주는 함수
function validateOrder({ items, orderedBy }) {
  for (const item of items) {
    const { id, count } = item;
    // 커피 ID는 필수 값
    if (id === undefined) {
      const error = new Error(`커피 아이디(id)를 명시해야합니다.`);
      error.statusCode = 400;
      throw error;
    }
    // 커피 갯수는 1개 이상이어야 함
    if (count === undefined || count <= 0) {
      const error = new Error(
        `수량(count)를 명시 안했거나 0으로 설정했습니다. 수량은 1 이상이어야 합니다.`
      );
      error.statusCode = 400;
      throw error;
    }
  }
  // 주문자가 명시되어야 함
  if (orderedBy === undefined || orderedBy === "") {
    const error = new Error(
      `주문자(orderedBy)를 명시 안했거나 빈 값으로 설정했습니다.`
    );
    error.statusCode = 400;
    throw error;
  }
}

// 단일 커피 주문을 체크하기 위한 미들웨어
// NOTE: validateOrder를 재활용
function isValidOrder(req, res, next) {
  validateOrder(req.body);
  next();
}

// 복수 커피 주문을 체크하기 위한 미들웨어
// NOTE: validateOrder를 재활용
function areValidOrders(req, res, next) {
  const orderList = req.body.orders;
  if (orderList === undefined || !Array.isArray(orderList)) {
    const error = new Error(
      `orders값을 명시 안했거나 배열 타입에 담아서 제공하지 않았습니다.`
    );
    error.statusCode = 400;
    throw error;
  }
  // forEach로 배열에 담긴 모든 커피 주문에 대해 검증 진행
  orderList.forEach((order) => validateOrder(order));
  next();
}

// 미들웨어 함수만 export!
module.exports = {
  isValidOrder,
  areValidOrders,
};
