# 1. Mongoose
## 1-1. What is Mongoose?
- MongoDB를 Node.js로 사용할 수 있도록 하는 확장 모듈
- MongoDB에 데이터를 넣기 전 노드 서버 단에서 데이터를 한 번 필터링하는 역할
- 데이터를 만들고 관리하기 위해 스키마를 만들고, 해당 스키마로 모델을 만들어 데이터를 관리
- 스키마와 모델을 통하여 Data를 불러온 후 객체화 시켜 빠르게 수정함으로써 데이터에 접근 가능
- 모델링 된 문서(Document)가 모여있는 Collection을 관리하는 것이 용이
- MySQL의 JOIN 역할 기능을 populate 메소드를 통해 어느 정도의 수준으로 구현 가능
    - 직접 테이블을 일일히 구현 및 연결하는 SQL과 달리 ORM에서는 자동으로 JOIN 매핑 
    - MongoDB에도 관계라는 개념을 통해 ODM에서도 자동으로 populate하여 유기적이고 편리하게 관계 기능을 사용
    - 쿼리 한 번에 데이터를 합친 후 가져오는 것은 힘들지만 해당 작업을 사용자가 직접 할 필요가 없으므로 편리
- 쿼리를 프로미스 객체로 만들어 강력하고 가독성이 높은 쿼리 빌더를 지원 가능

## 1-2. Schema Class
- MongoDB와 주고 받는 document 구조에 대한 검증을 위한 클래스
- 해당 클래스가 없을 경우 mongoose가 MongoDB에 document를 어떤 collection에 저장
    - 기존에 저장된 document와 다른 구조여도 문제 제기 없이 저장하는 문제가 발생
    - MongoDB가 RDB와 달리 한 collection에 저장된 document가 모두 같은 구조를 가져야하는 강제성이 없어서 발생하는 문제
- 특정 필드에 저장될 값에 대한 규칙 / 제한을 부여하는 기능도 존재

## 1-3. mongoose.model & Model Class
```js
// mongoose.model
const Order = mongoose.model("Order", OrderSchema);

// 1. model_name.CRUD_Pattern
// 1-1. model_name.create
await Order.create({
    items: [
        {
        name: "americano",
        count: 2,
        },
    ],
    orderedBy: "Linda Presco",
});

// 1-2. model_name.read
const lindaOrder = await Order.findOne({
    orderedBy: "Linda Presco",
});

// 1-3. model_name.update
const updateResult = await Order.updateOne(
    { orderedBy: lindaOrder.orderedBy },
    {
      items: [
        { name: "americano", count: 1 },
        { name: "latte", count: 1 },
      ],
    }
);

// 1-4. model_name.delete
await Order.deleteOne({ _id: lindaOrder._id });

// 2. model_instance.save()
// 2-1. create
const mikeOrder = new Order({
    items: [
      {
        name: "cold brew",
        count: 1,
      },
    ],
    orderedBy: "Mike Anderson",
  });
await mikeOrder.save();

// 2-2. update
const mikeOrder1 = await Order.findOne({ _id: mikeOrder._id });

// lean 옵션
const andreasOrder = await Order.findById(mikeOrder1._id).lean();
```
- mongoose.model은 document 모델 class를 만들기 위한 모듈이며 모델이 X
    - 모델 클래스 생성기이므로 mongoose.model의 리턴값을 대문자로 시작하는 변수로 할당
- mongoose.model로 생성된 클래스로 CRUD를 수행
- `model_name.CRUD_Pattern` / `model_instance.save()`
    - `model_instance.save()` 패턴의 경우 매번 document의 데이터 검증을 수행
- findOneAnd* 메소드 : find / Delete / Update를 Atomic하게 수행
- find와 findOne 메소드의 lean 옵션
    - hydrated document가 아닌 POJO(Plain Old JavaScript Object) 형식의 객체를 반환
    - hydrated document: 각 document가 가진 정보(필드+값) 외에 Model Class에서 제공하는 메소드(save 등) 및 메타 데이터가 포함된 객체
    - MongoDB에서 쿼리를 통해 가져온 정보를 그대로 REST API 응답으로 제공할 때 사용 시 용이

## mongoose connection
```
<!-- MongoDB URL -->
mongodb://username:password@host:port/database?options...
```
- 다른 NoSQL DB나 RDB과 비슷한 유형의 URL 구조
- 기본 PORT : 27017
- Connection Pooling
  - 재사용이 가능한 Active Connection을 관리하는 개념
  - Connection : 클라이언트와 서버(DB) 간의 특정 프로토콜을 이용한 연결
  - Connection은 어느 한 쪽이 연결을 끊을 시 바로 없어지며 연결을 맺는 절차가 시간이 걸리므로 개발자는 최대한 유지하도록 설정
  - 하나의 풀장(pool)에 여러 Active Connection을 담고서 재사용하는 것이 주된 목적
  - 유연한 connection 관리로 Application 입장에서는 query의 병목 현상이 감소하고, DB 입장에서는 불필요한 connection 감소로 connection 가용성을 확보
  - 설정한 pool 사이즈 내에서 클라이언트는 connection을 자유롭게 생성 / 사용 / 삭제 가능
  - mongoose의 pool 사이즈는 mongoose.connect 메소드의 minPoolSize & maxPoolSize 옵션으로 조절 가능
  - 현재 사용하는 connection의 갯수와 가용 가능량과 동일한 상태에서 새로운 쿼리가 실행 시 새로운 connection을 생성
- Connection Event 지원
  - connection이 이루어질 시 발생하는 이벤트의 집합
  - 개발자가 정의하여 Node.js의 EventEmitter로 제공
  - 해당 이벤트에 핸들러 함수(.on)를 등록하여 이벤트가 발생 시 특정 작업을 수행 가능

<br>

# 2. RESTful API
## 2-1. 개요
- API(Application Programming Interface)
  - 둘 이상의 애플리케이션이나 디바이스가 서로 간 연결하여 통신할 수 있는 방법을 정의한 규약
  - 웹 어플리케이션(프론트엔드)에서 원하는 기능을 수행하는 URL과 인터페이스를 제공
- RESTful(REpresentational State Transfer)
  - HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)을 명시하고 HTTP Method(POST, GET, PUT, DELETE, PATCH 등)를 통해 해당 자원(URI)에 대한 CRUD Operation을 적용하는 것
  - URI는 자원을 표현하는 데에 집중하고, 행위에 대한 정의는 HTTP METHOD를 통해 수행

## 2-2. REST API 핵심 규칙
- ① URI는 정보의 자원을 표현해야 한다.
  ```
  # bad
  GET /getTodos/1
  GET /todos/show/1

  # good
  GET /todos/1
  ```
  - 리소스명은 동사보다는 명사를 사용
  - URI는 자원을 표현하는데에 중점
  - get 같은 행위에 대한 표현 X

- ② 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE 등)으로 표현한다.
  ```
  # bad
  GET /todos/delete/1

  # good
  DELETE /todos/1
  ```

## 2-3. REST API 구성
|구성 요소|내용|표현 방법|
|:---:|:---:|:---:|
|자원(Resource)|자원|HTTP URI|
|행위(Verb)|자원에 대한 행위|HTTP Method|
|표현(Representations)|자원에 대한 행위의 내용|HTTP Message Pay Load|

## 2-4. REST API 특징
- Uniform(유니폼 인터페이스)
  - URI로 지정한 리소스에 대한 조작을 통일하고 한정적인 인터페이스로 수행하는 아키텍처 스타일
- Stateless(무상태성)
  - 작업을 위한 상태 정보를 따로 저장 및 관리 X
  - 세션 및 쿠키 데이터를 별도로 저장 및 관리하지 않으므로 API 서버는 들어오는 요청만 간단하게 처리
  - 서비스의 자유도가 높아지고 서버에서 불필요한 정보를 관리하지 않으므로 단순한 구현이 가능
- Cacheable(캐시 가능)
  - 기존 웹 표준인 HTTP를 그대로 사용하므로 웹에서 사용하는 기존 인프라를 그대로 활용 가능함에 따라 캐싱 기능도 적용 가능
  - HTTP 프로토콜 표준에서 사용하는 Last-Modified 태그나 E-Tag를 사용하여 캐싱 기능을 구현
- Self-descriptiveness(자체 표현 구조)
  - REST API 메시지만으로도 쉽게 이해 가능한 자체 표현 구조
- Client-Server 구조
  - 서버 : API를 제공
  - 클라이언트 : 사용자 인증이나 컨텍스트(세션, 로그인 정보) 등을 직접 관리
  - 각자 역할이 확실히 구분되는 구조이므로 서버 및 클라이언트에서 개발이 필요한 내용이 명확하고 서로 간의 의존성이 감소
- 계층형 구조
  - 다중 계층의 구조로 구성이 가능 
  - 보안, 로드 밸런싱, 암호화 계층을 추가하여 구조상의 유연성을 두는 것이 가능
  - PROXY, 게이트웨이 등 네트워크 기반의 중간 매체를 사용 가능

## 2-5. REST API 메소드
|Method|Action|역할|Payload|
|:---:|:---:|:---:|:---:|
|GET|index / retrieve|모든 or 특정 리소스를 조회|x|
|POST|create|리소스를 생성|○|
|PUT|replace|리소스의 전체를 교체|○|
|PATCH|modify|리소스의 일부를 수정|○|
|DELETE|delete|모든 or 특정 리소스를 삭제|x|
- Payload : Body에 담기는 데이터
- PUT VS PATCH
  ```
  1. UPDATE 요청 시 자원의 일부만 새로 대입하여 보냈을 때
  - PUT : 보내지 않은 값은 NULL로 대체
  - PATCH : 보내지 않은 값은 그대로 유지

  2. 요청한 URI에 자원이 존재하지 않을 때
  - PUT : 새로운 자원을 생성
  - PATCH : 새로운 자원을 생성 X

  3. 멱등성 여부
  - PUT : 멱등성 O
  - PATCH : 멱등성 X

  * What is 멱등성(Idempotent)?
  - 동일한 요청을 여러 번 수행해도 결과가 달라지지 않는 성질
  - 한 번 보내는 것과 여러 번 연속으로 보내는 것이 효과가 같고 서버의 상태도 동일
  ```

## 2-6. REST API 설계 시 주의할 점
```
a. 슬래시 구분자(/)는 계층 관계를 나타낼 때 사용
b. URI 마지막 문자에 슬래시(/)를 포함 X
- URI에 포함되는 모든 글자는 리소스의 유일한 식별자로 사용
c. 하이픈(-)은 URI 가독성을 높일 때 사용
- 불가피하게 긴 URI 경로를 사용 시 하이픈(-)을 통해 가독성 향상
d. 밑줄(_)은 URI에 사용 X
- 가독성을 위해 밑줄(_) 대신 하이픈(-)을 권장
e. URI 경로에는 소문자 사용을 권장
- 대소문자에 따라 다른 리소스로 인식되므로 대문자 사용을 지양
f. 파일 확장자는 URI에 포함 X
- Accept Header를 사용하여 파일 확장자를 표현
```

## 2-7. REST API Maturity Level(성숙도)
- REST API의 구현이 어느 정도 되었는지를 표현하는 0 ~ 3단계로 이루어진 모델
- 단계가 클수록 RESTfull의 정도가 높으며 개발의 사용성(Usability)도 높은 것을 의미
- Level 2까지만 구현하여도 충분한 단계 

### 2-7-1. Level 0
```
[Request]
POST /api/user
{
  "function": "getUser",
  "arguments" [
    "1"
  ]
}

[Response]
HTTP/1.1 200 OK
{
  "result" {
    "id": "1"
    "name": "honey",
  }
}

[CRUD]
CREATE : POST /api/user
READ   : POST /api/user
UPDATE : POST /api/user
DELETE : POST /api/user
```
- 원격 머신과의 상호 작용을 위해 HTTP 프로토콜을 사용하지만 웹 메커니즘을 사용하지 않는 단계
- HTTP 프로토콜을 원격 호출을 위한 전송 시스템으로만 사용
- RPC(Remote Procedure Call)와 같이 리소스의 구분 없이 설계된 HTTP API
- 서버는 하나의 URI와 POST method를 사용하여 모든 요청을 처리
- 서로 다른 매개변수를 통해서만 여러 동작을 수행

### 2-7-2. Level 1
```
[Request]
POST /api/users/create
{
  "name": "honey"
}

[Response]
HTTP/1.1 200 OK
{
  "result" {
    "error": "already exist member"
  }
}

[CRUD]
CREATE : POST /api/users/create
READ   : GET /api/users/1
UPDATE : POST /api/users/update
DELETE : POST /api/users/remove/1
```
- Level 0에 리소스를 고려한 단계
- 리소스 별로 별도의 URI를 가져 개별 통신이 가능
- HTTP Method는 GET과 POST만 사용
- Status Code는 무조건 200으로 전달
- Header에 Content-Type이나 Cache 관련 정보를 제공 X
- 하나의 리소스에 대한 작업을 여러 개의 불필요한 URI로 생성하는 문제점이 존재

### 2-7-3. Level 2
```
[Request]
POST /api/users
{
  "name": "honey"
}

[Response]
HTTP/1.1 201 Created
Content-Type: application/json
{
  "result" {
    "id": "1",
    "name": "honey"
  }
}

[CRUD]
CREATE : POST /api/users
READ   : GET /api/users/1
UPDATE : PUT /api/users/1
DELETE : DELETE /api/users/1
```
- 기존의 Level 1에 동사(HTTP Verb)를 고려한 단계
- 2단계부터 HTTP 규칙(Header, Query Parameter, Status Code, Idempotency 등)을 
- HTTP 제공 Method를 동사로 사용하여 CRUD를 표현 
- StatusCode를 활용하여 상태를 반환
- URI에는 행위(Action)가 포함되지 않고 HTTP Method로 표현
- GET은 항상 같은 결과를 반환 
- 헤더에 Content-Type을 제공하고 멱등성을 보장하는 GET의 경우 캐시가 적용
- 대다수의 REST API가 2단계에 해당

### 2-7-4. Level 3
```
[Request]
GET https://www.cafe.com/menu

[Response]
HTTP/1.1 200 OK
Content-Type: application/json
{
  "id": 6,
  "name": "ice cappuccino", 
  "ingredients": ["foamed milk", "milk", "espresso", "ice"], 
  "beans": ["blend"],
  "grindingDegree": 0.3,
  "servingAmount": 400,
  "espressoAmount": 25, 
  links: {
    "request_order_url": "https://www.cafe.com/orders",
    "all_menus_url": "https://www.cafe.com/menus"
  }
}
```
- 기존의 Level 2에 HATEOS(Hypermedia As The Engine of application State)를 고려한 단계
- 현재 API 호출 후에 진행 가능한 작업이나 행위에 대한 URI를 제공
- API 서비스의 모든 End-point를 최초 진입점이 되는 URI를 통해 Hypertext Link 형태로 제공

<br>

# Reference
- [참조 1](https://jaehoney.tistory.com/176)
- [참조 2](https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-REST-API-%EC%A0%95%EB%A6%AC)
- [참조 3](https://poiemaweb.com/js-rest-api)
