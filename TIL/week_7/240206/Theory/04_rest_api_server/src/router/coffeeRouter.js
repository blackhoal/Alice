const express = require("express");
const { coffeeValidationMiddleware } = require("../middleware");

const router = express.Router();

// 기존 커피 메뉴를 배열로 구성
const COFFEE_LIST = [
  {
    id: 1,
    name: "americano",
    ingredients: ["water", "espresso"],
    beans: ["Kona"],
    grindingDegree: 0.25,
    servingAmount: 330,
    espressoAmount: 30,
  },
  {
    id: 2,
    name: "ice americano",
    ingredients: ["water", "espresso", "ice"],
    beans: ["Ethiopia Yirgacheffe G2"],
    grindingDegree: 0.3,
    servingAmount: 330,
    espressoAmount: 30,
  },
  {
    id: 3,
    name: "cafe latte",
    ingredients: ["steamed milk", "espresso"],
    beans: ["blend"],
    grindingDegree: 0.3,
    servingAmount: 330,
    espressoAmount: 25,
  },
  {
    id: 4,
    name: "ice cafe latte",
    ingredients: ["milk", "espresso", "ice"],
    beans: ["blend"],
    grindingDegree: 0.3,
    servingAmount: 330,
    espressoAmount: 30,
  },
  {
    id: 5,
    name: "cappuccino",
    ingredients: ["foamed milk", "steamed milk", "espresso"],
    beans: ["blend"],
    grindingDegree: 0.3,
    servingAmount: 400,
    espressoAmount: 20,
  },
  {
    id: 6,
    name: "ice cappuccino",
    ingredients: ["foamed milk", "milk", "espresso", "ice"],
    beans: ["blend"],
    grindingDegree: 0.3,
    servingAmount: 400,
    espressoAmount: 25,
  },
];

// READ: 모든 커피 메뉴를 가져오기 위한 API
router.get("/", (req, res) => {
  console.log("GET /coffees");
  const coffees = getAllCoffees();
  res.json({
    error: null,
    data: coffees,
  });
});

// READ: 단일 커피 메뉴를 가져오기 위한 API
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(`GET /coffees/${id}`);
  const coffee = getSingleCoffee(id);
  res.json({
    error: null,
    data: coffee,
  });
});

// CREATE: 단일 커피 메뉴를 생성하기 위한 API
// NOTE: 단일 커피 메뉴 검증을 위한 isValidCoffee가 탑재된 것을 확인
router.post("/", coffeeValidationMiddleware.isValidCoffee, (req, res) => {
  console.log(`POST /coffees`);
  const {
    name,
    ingredients,
    beans,
    grindingDegree,
    servingAmount,
    espressoAmount,
  } = req.body;
  const coffee = addCoffee({
    name,
    ingredients,
    beans,
    grindingDegree,
    servingAmount,
    espressoAmount,
  });
  res.statusCode = 201;
  res.json({
    error: null,
    data: coffee,
  });
});

// UPDATE: 복수 커피 메뉴을 수정하기 위한 API
// NOTE: 복수 커피 메뉴 검증을 위한 isValidCoffees가 탑재된 것을 확인
router.put("/", coffeeValidationMiddleware.areValidCoffees, (req, res) => {
  console.log(`PUT /coffees`);
  const coffeeList = req.body.coffees;
  const updatedCoffeeList = [];
  // 반복문으로 updateCoffee를 호출해서 여러 개의 커피 메뉴를 순차적으로 수정
  for (const coffee of coffeeList) {
    const {
      id,
      name,
      ingredients,
      beans,
      grindingDegree,
      servingAmount,
      espressoAmount,
    } = coffee;
    const updatedCoffee = updateCoffee(id, {
      name,
      ingredients,
      beans,
      grindingDegree,
      servingAmount,
      espressoAmount,
    });
    updatedCoffeeList.push(updatedCoffee);
  }
  res.json({
    error: null,
    data: updatedCoffeeList,
  });
});

// UPDATE: 단일 커피 메뉴을 수정하기 위한 API
// NOTE: 단일 커피 메뉴 검증을 위한 isValidCoffee가 탑재된 것을 확인
router.put("/:id", coffeeValidationMiddleware.isValidCoffee, (req, res) => {
  const id = Number(req.params.id);
  console.log(`PUT /coffees/${id}`);
  const {
    name,
    ingredients,
    beans,
    grindingDegree,
    servingAmount,
    espressoAmount,
  } = req.body;
  console.log(`PUT /coffees/${id}`);
  const coffee = updateCoffee(id, {
    name,
    ingredients,
    beans,
    grindingDegree,
    servingAmount,
    espressoAmount,
  });
  res.json({
    error: null,
    data: coffee,
  });
});

// DELETE: 단일 커피 메뉴를 삭제하기 위한 API
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(`DELETE /coffees/${id}`);
  const coffee = deleteCoffee(id);
  res.json({
    error: null,
    data: coffee,
  });
});

// 커피 메뉴를 생성하는 함수
function addCoffee({
  name,
  ingredients,
  beans,
  grindingDegree,
  servingAmount,
  espressoAmount,
}) {
  const newId = COFFEE_LIST[COFFEE_LIST.length - 1].id + 1;
  const newCoffee = {
    id: newId,
    name,
    ingredients,
    beans,
    grindingDegree,
    servingAmount,
    espressoAmount,
  };

  COFFEE_LIST.push(newCoffee);
  return newCoffee;
}

// 모든 커피 메뉴를 반환하는 함수
function getAllCoffees() {
  return COFFEE_LIST;
}

// 단일 커피 메뉴를 반환하는 함수
function getSingleCoffee(id) {
  const coffeeId = COFFEE_LIST.findIndex((coffee) => coffee.id === id);
  if (coffeeId > -1) {
    return COFFEE_LIST[coffeeId];
  }
  const error = new Error(`아이디가 '${id}'인 커피 메뉴를 찾지 못했습니다.`);
  error.statusCode = 404;
  throw error;
}

// 단일 커피 메뉴를 수정하는 함수
function updateCoffee(
  id,
  { name, ingredients, beans, grindingDegree, servingAmount, espressoAmount }
) {
  const coffeeId = COFFEE_LIST.findIndex((coffee) => coffee.id === id);
  if (coffeeId === -1) {
    const error = new Error(`아이디가 '${id}'인 커피 메뉴를 찾지 못했습니다.`);
    error.statusCode = 404;
    throw error;
  }
  COFFEE_LIST[coffeeId] = {
    ...COFFEE_LIST[coffeeId],
    name,
    ingredients,
    beans,
    grindingDegree,
    servingAmount,
    espressoAmount,
  };
  return COFFEE_LIST[coffeeId];
}

// 단일 커피 메뉴를 삭제하는 함수
function deleteCoffee(id) {
  const coffeeId = COFFEE_LIST.findIndex((coffee) => coffee.id === id);
  if (coffeeId > -1) {
    const [coffee] = COFFEE_LIST.splice(coffeeId, 1);
    return coffee;
  }
  const error = new Error(`아이디가 '${id}'인 커피를 찾지 못했습니다.`);
  error.statusCode = 404;
  throw error;
}

module.exports = router;
