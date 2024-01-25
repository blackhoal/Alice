# 1번 - 함수의 매개변수
```ts
// 타입스크립트에서의 함수 매개변수는 변수에서의 매개변수 설정과 동일합니다.
// 다만 입력값도 타입이 있고, 출력값도 타입이 있어야 하므로 신경써야겠죠?
function addTwo(a: number, b: number): number {
  return a + b;
}

console.log(addTwo(2, 3));

// 한 개의 매개변수가 들어올 수도 있고, 두 개의 매개변수가 들어올 수도 있습니다.
// ?를 사용하는 것을 제외하면, 위 함수와 동일하게 작성합니다!
function addOneOrTwo(a: number, b?: number): number {
  if (b) {
    return a + b;
  } else {
    return a;
  }
}

console.log(addOneOrTwo(5, 10));
console.log(addOneOrTwo(10));

// JS에서도 기본값을 포함하는 함수를 만들어 본 적이 있지 않나요?
// 이번에도 마찬가지입니다!
// 두 개의 인자를 받되, 숫자가 1개만 들어오면 10을 더하도록 만들어 보세요.
function addDefault(a: number, b: number = 10): number {
  return a + b;
}
console.log(addDefault(3)); // return 13
console.log(addDefault(12, 15));

// JS도 가변인자 (나머지 매개변수)를 갖고 있어요.
// 워낙 유용하다보니, 많이 사용했을 것 같지만, 한 번 더 연습해 봅시다.
function addTwoOrMore(a: number, b: number, ...c: number[]) {
  if (c) {
    for (let i of c) {
      a += i;
    }
  }
  return a + b;
}

console.log(addTwoOrMore(2, 1));
console.log(addTwoOrMore(8, 8, 6, 1, 9, 6));
```

# 2번 - 클래스 생성
```ts
// Before
function bark(dog: any) {
    console.log(`${dog.name}(${dog.species}) : BOWWOW!`);
}

const daisy: object = {
    name: 'Daisy',
    species: 'Bulldog'
};

bark(daisy);

// After
class Dog {
  name: string;
  species: string;

  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
  }

  bark() {
    console.log(`${this.name}(${this.species}) : BOWWOW!`);
  }
}

const daisy: Dog = new Dog('Daisy', 'Bulldog');
daisy.bark();
```

# 3번 - 클래스 상속받기
```ts
class Dog {
  name: string;
  species: string;

  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
  }

  bark() {
    console.log(`${this.name}(${this.species}) : BOWWOW!`);
  }
}

class Puppy extends Dog {
  constructor(name: string, species: string) {
    // super을 사용해 Dog 클래스에 접근할 수 있습니다.
    super(name, species + '-baby');
  }

  bark() {
    console.log(`${this.name}(${this.species}) : bowwow!`);
  }
}

const daisy: Dog = new Dog('Daisy', 'Bulldog');
daisy.bark();

const tom: Puppy = new Puppy('Tom', 'Bulldog');
tom.bark();

```

# 4번 - 추상 클래스
```ts
abstract class Animal {
  name: string;
  species: string;

  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
  }

  abstract bark(): void;
}

class Dog extends Animal {
  constructor(name: string, species: string) {
    super(name, `Dog-${species}`);
  }

  bark() {
    console.log(`${this.name}(${this.species}) : BOWWOW!`);
  }
}

class Cat extends Animal {
  constructor(name: string, species: string) {
    super(name, `Cat-${species}`);
  }

  bark() {
    console.log(`${this.name}(${this.species}) : meow!`);
  }
}

const daisy: Dog = new Dog('Daisy', 'Bulldog');
daisy.bark();

const cheese: Cat = new Cat('Cheese', 'Bengal');
cheese.bark();
```

# 5번 - interface
```ts
interface shapeInterface {
  getArea(): number;
}

interface triangleInterface extends shapeInterface {
  width: number;
  height: number;
}

interface circleInterface extends shapeInterface {
  radius: number;
}

class triangle implements triangleInterface {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    return (this.width * this.height) / 2;
  }
}

class circle implements circleInterface {
  radius: number;

  constructor(r: number) {
    this.radius = r;
  }

  getArea(): number {
    return this.radius * this.radius * Math.PI;
  }
}

const tri = new triangle(10, 5);
const cir = new circle(4);

console.log(tri.getArea());
console.log(cir.getArea());
```

# 6번 - generic 함수
```ts
function add<T>(a: T, b: T): T {
  if (typeof a === 'boolean') {
    return a || b;
  }
  return <any>a + <any>b;
}

console.log(add<number>(13, 15));
console.log(add<string>('hell', 'o'));
console.log(add<boolean>(false, true));

// error
// console.log(add<number>(3, "5"));
```