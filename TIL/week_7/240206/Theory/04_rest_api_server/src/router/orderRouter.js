const crypto = require("crypto");
const express = require("express");
const { orderValidationMiddleware } = require("../middleware");

const router = express.Router();

// 커피 주문 목록을 저장하는 배열. 처음에는 주문이 하나도 없기 때문에 빈 배열이다.
const ORDER_LIST = [];

// READ: 현재까지의 모든 주문을 가져오기 위한 API
router.get("/", (req, res) => {
  console.log("GET /orders");
  const orders = getAllOrders();
  res.json({
    error: null,
    data: orders,
  });
});

// READ: 특정 커피 주문(단수)을 가져오기 위한 API
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`GET /orders/${id}`);
  const order = getSingleOrder(id);
  res.json({
    error: null,
    data: order,
  });
});

// CREATE: 단일 커피 주문을 생성하기 위한 API
// NOTE: 단일 커피 주문 검증을 위한 isValidOrder가 탑재된 것을 확인
router.post("/", orderValidationMiddleware.isValidOrder, (req, res) => {
  console.log(`POST /orders`);
  const { items, orderedBy } = req.body;
  const order = createOrder({ items, orderedBy });
  res.statusCode = 201;
  res.json({
    error: null,
    data: order,
  });
});

// UPDATE: 복수 커피 주문을 수정하기 위한 API
// NOTE: 복수 커피 주문 검증을 위한 isValidOrders가 탑재된 것을 확인
router.put("/", orderValidationMiddleware.areValidOrders, (req, res) => {
  console.log(`PUT /orders`);
  const orderList = req.body.orders;
  const updatedOrderList = [];
  // 반복문으로 updateOrder을 호출해서 여러 개의 커피 주문을 순차적으로 수정
  for (const order of orderList) {
    const { id, items, orderedBy } = order;
    const updatedOrder = updateOrder(id, {
      items,
      orderedBy,
    });
    updatedOrderList.push(updatedOrder);
  }
  res.json({
    error: null,
    data: updatedOrderList,
  });
});

// UPDATE: 단일 커피 주문을 수정하기 위한 API
// NOTE: 단일 커피 주문 검증을 위한 isValidOrder가 탑재된 것을 확인
router.put("/:id", orderValidationMiddleware.isValidOrder, (req, res) => {
  const { id } = req.params;
  console.log(`PUT /orders/${id}`);
  const { items, orderedBy } = req.body;
  const order = updateOrder(id, { items, orderedBy });
  res.json({
    error: null,
    data: order,
  });
});

// DELETE: 단일 커피 주문을 삭제하기 위한 API
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /orders/${id}`);
  const order = deleteOrder(id);
  res.json({
    error: null,
    data: order,
  });
});

// 커피 주문을 생성하는 함수
function createOrder({ items, orderedBy }) {
  const createdOrders = {
    id: crypto.randomUUID(),
    items,
    orderedBy,
  };
  ORDER_LIST.push(createdOrders);
  return createdOrders;
}

// 모든 커피 주문을 반환하는 함수
function getAllOrders() {
  return ORDER_LIST;
}

// 특정 커피 주문(단일)을 반환하는 함수
function getSingleOrder(id) {
  const orderId = ORDER_LIST.findIndex((order) => order.id === id);
  if (orderId > -1) {
    return ORDER_LIST[orderId];
  }
  const error = new Error(`아이디가 '${id}'인 주문을 찾지 못했습니다.`);
  error.statusCode = 404;
  throw error;
}

// 특정 커피 주문(단일)을 수정하는 함수
function updateOrder(id, { items, orderedBy }) {
  const orderId = ORDER_LIST.findIndex((order) => order.id === id);
  if (orderId === -1) {
    const error = new Error(`아이디가 '${id}'인 주문을 찾지 못했습니다.`);
    error.statusCode = 404;
    throw error;
  }
  ORDER_LIST[orderId] = { ...ORDER_LIST[orderId], items, orderedBy };
  return ORDER_LIST[orderId];
}

// 특정 커피 주문(단일)을 삭제하는 함수
function deleteOrder(id) {
  const orderId = ORDER_LIST.findIndex((order) => order.id === id);
  if (orderId > -1) {
    const [order] = ORDER_LIST.splice(orderId, 1);
    return order;
  }
  const error = new Error(`아이디가 '${id}'인 주문을 찾지 못했습니다.`);
  error.statusCode = 404;
  throw error;
}

module.exports = router;
