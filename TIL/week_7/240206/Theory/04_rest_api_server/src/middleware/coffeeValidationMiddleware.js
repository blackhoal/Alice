// 커피 메뉴를 생성/수정할 때 체크해야하는 요소들을 체크해주는 함수
function validateCoffee({
  name,
  ingredients,
  beans,
  grindingDegree,
  servingAmount,
  espressoAmount,
}) {
  // 이름은 반드시 있어야 함! 빈 문자열도 허용하지 않음.
  if (name === undefined || name === "") {
    const error = new Error(`커피 이름(name)을 명시해야합니다.`);
    error.statusCode = 400;
    throw error;
  }
  // 재료는 반드시 있어야 함!
  if (
    ingredients === undefined ||
    !Array.isArray(ingredients) ||
    ingredients.length === 0
  ) {
    const error = new Error(`재료(ingredients)를 명시해야합니다.`);
    error.statusCode = 400;
    throw error;
  }
  // 커피 메뉴이니 원두 타입은 반드시 있어야 함! 블랜딩인 경우를 대비해서 배열만을 허용
  if (beans === undefined || !Array.isArray(beans) || beans.length === 0) {
    const error = new Error(
      `원두(beans)를 명시 안했거나 배열 타입에 담아서 제공하지 않았습니다.`
    );
    error.statusCode = 400;
    throw error;
  }
  // 분쇄도는 반드시 있어야 함! 1이상의 값만 허용
  if (grindingDegree === undefined || grindingDegree < 0) {
    const error = new Error(
      `원두 분쇄도(grindingDegree)를 명시 안했거나 0으로 설정했습니다. 분쇄도는 0 이상이어야 합니다.`
    );
    error.statusCode = 400;
    throw error;
  }
  // 제공량은 반드시 있어야 함! 1이상의 값만 허용
  if (servingAmount === undefined || servingAmount <= 0) {
    const error = new Error(
      `제공량(servingAmount)을 명시 안했거나 0으로 설정했습니다. 제공량은 1 이상이어야 합니다.`
    );
    error.statusCode = 400;
    throw error;
  }
  // 에스프레소량은 반드시 있어야 함! 1이상의 값만 허용
  if (espressoAmount === undefined || espressoAmount <= 0) {
    const error = new Error(
      `에스프레소량(espressoAmount)을 명시 안했거나 0으로 설정했습니다. 에스프레소량은 1 이상이어야 합니다.`
    );
    error.statusCode = 400;
    throw error;
  }
}

// 커피 단품 메뉴를 체크하기 위한 미들웨어
// NOTE: validateCoffee를 재활용
function isValidCoffee(req, res, next) {
  validateCoffee(req.body);
  next();
}

// 다수 커피(배열) 메뉴를 체크하기 위한 미들웨어
// NOTE: validateCoffee를 재활용
function areValidCoffees(req, res, next) {
  const coffeeList = req.body.coffees;
  if (coffeeList === undefined || !Array.isArray(coffeeList)) {
    const error = new Error(
      `coffees값을 명시 안했거나 배열 타입에 담아서 제공하지 않았습니다.`
    );
    error.statusCode = 400;
    throw error;
  }
  // forEach로 배열에 담긴 모든 커피 메뉴에 대해 검증 진행
  coffeeList.forEach((coffee) => validateCoffee(coffee));
  next();
}

// 미들웨어 함수만 export!
module.exports = {
  isValidCoffee,
  areValidCoffees,
};
