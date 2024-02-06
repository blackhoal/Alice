const mongoose = require("mongoose");
const sampleOrders = require("../sample.json");

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  const ItemSchema = new mongoose.Schema({
    name: {
      type: String,
      // 열거형: 아래 8개의 값 중 하나인 경우에만 허용
      enum: [
        "espresso",
        "americano",
        "ice americano",
        "cappuccino",
        "ice cappuccino",
        "latte",
        "ice latte",
        "cold brew",
      ],
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  });

  const OrderSchema = new mongoose.Schema(
    {
      items: {
        type: [ItemSchema],
        validate: (v) => Array.isArray(v) && v.length > 0,
        required: true,
      },
      orderedBy: {
        type: String,
        required: true,
        default: "Anonymous",
      },
    },
    {
      collection: "Order", // 주의 collection 이름을 명시하지 않으면 아래 mongoose.model의 첫 번째 인자로 전달된 값을 복수형으로 해서 사용한다.
    }
  );

  const Order = mongoose.model("Order", OrderSchema);

  // 먼저 Order collection을 초기화
  await Order.deleteMany({});
  // 일단 Order collection에 sample order 데이터를 추가
  await Order.insertMany(sampleOrders);

  /**
   * <model_name>.<CRUD_method> 패턴
   */
  // #1 Create
  await Order.create({
    items: [
      {
        name: "americano",
        count: 2,
      },
    ],
    orderedBy: "Linda Presco",
  });

  // #2 Read
  const lindaOrder = await Order.findOne({
    orderedBy: "Linda Presco",
  });
  console.log("\n\n추가한 Linda의 커피: ");
  console.log(lindaOrder);

  // #3 Update
  const updateResult = await Order.updateOne(
    { orderedBy: lindaOrder.orderedBy },
    {
      items: [
        { name: "americano", count: 1 },
        { name: "latte", count: 1 },
      ],
    }
  ); // update 시 데이터를 검증하려면 세 번째 인자로 { runValidators: true }을 추가하면 된다.
  console.log("\n\n업데이트 결과: ");
  console.log(updateResult);

  const updatedOrderLinda = await Order.findById(lindaOrder._id);
  console.log("변경된 값: ");
  console.log(updatedOrderLinda);

  // find와 udpate를 한 번에
  const finalOrderLinda = await Order.findOneAndUpdate(
    { _id: lindaOrder._id },
    { items: [{ name: "ice americano", count: 1 }] },
    { runValidators: true, new: true } // update 시 데이터를 검증하려면 runValidators 옵션을 true로 해주면 된다.
  );
  console.log("최종 변경 값: ");
  console.log(finalOrderLinda);

  // #4 Delete
  await Order.deleteOne({ _id: lindaOrder._id });

  /**
   * <model_instance>.save()
   */
  // #1 create
  const mikeOrder = new Order({
    items: [
      {
        name: "cold brew",
        count: 1,
      },
    ],
    orderedBy: "Mike Anderson",
  });
  // MongoDB에 Mike Anderson의 주문을 저장
  await mikeOrder.save();

  // #2 update
  const mikeOrder1 = await Order.findOne({ _id: mikeOrder._id });
  console.log("\n\n추가된 Order document: ");
  console.log(mikeOrder1);

  mikeOrder1.items = [
    { name: "ice latte", count: 1 },
    { name: "ice cappuccino", count: 1 },
  ];
  mikeOrder1.orderedBy = "Andreas Deno";
  // MongoDB에 수정사항을 저장, findOneAndUpdate와는 다르게 save 메소드는 validation은 무조건 진행한다!!
  await mikeOrder1.save();

  // lean
  const andreasOrder = await Order.findById(mikeOrder1._id).lean();
  console.log("\n\nHydrated Document와 POJO의 차이: ");
  console.dir(mikeOrder1); // 특수 메소드들이 있음
  console.log("====================");
  console.dir(andreasOrder); // 특수 메소드들이 없음

  process.exit(0);
}

main();
