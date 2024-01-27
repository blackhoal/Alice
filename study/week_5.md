# 1. Node.JS
## 1-1. What is Node.JS?
![5-1](https://github.com/blackhoal/Elice/blob/main/TIL/img/5-1.png?raw=true)  
- Chrome V8 JS 엔진으로 빌드된 자바스크립트 런타임 환경(Runtime Environment)
    - Runtime : 특정 언어로 만든 프로그램을 실행할 수 있는 환경
- 주로 서버 사이드 애플리케이션 개발에 사용되는 소프트웨어 플랫폼
- 자바스크립트를 어느 환경에서나 실행할 수 있도록 하는 실행기

## 1-2. 등장배경
- 단방향 통신 위주의 Web 1.0에서 사용자와의 상호작용이 빈번한 Web 2.0으로 발전 
- V8 엔진의 등장
    - 구글에서 개발한 오픈소스 자바스크립트 엔진
    - JIT(just-in-time) 컴파일러를 사용하여 코드를 실행
- 기존의 자바스크립트 프로그램은 웹 브라우저 내에서만 실행 가능
    - 브라우저 외의 다른 환경에서 자바스크립트를 실행하려는 시도가 있었으나 자바스크립트의 실행 속도 문제로 인해 불가
    - v8 엔진의 등장으로 고성능의 JS를 실행 가능하게 되어 JS를 브라우저 외부에서 사용 가능 → Node JS의 등장
- Browser의 JS VS Node.js

    |Browser의 JS|Node.js|
    |:---:|:---:|
    |브라우저에서 실행|크로스 플랫폼 실행|
    |웹 내부의 제한된 동작|제한 없이 동작|
    |웹 프론트 위주 개발|다양한 어플리케이션 개발|

- Node JS와 Spring Framework 속도적인 측면에서 차이가 나는 이유

    ```
    1. Node는 I/O 작업에 완전한 비동기 처리를 지원
    - 요청을 비동기로 받는 것까지는 동일
    - 하나의 요청 처리 과정 내에서 필요할 경우 비동기로 작업을 위임
    - 작업을 위임하기 때문에 대기 없이 다른 작업을 수행 가능하여 대기 시간이 매우 적거나 없음

    2. Spring은 요청 처리를 하는 부분에서 블로킹 방식으로 수행
    - I/O 작업과 같이 시간과 리소스를 필요로 하는 작업을 수행 시 요청 처리를 위해 할당받은 쓰레드가 대기
    - 요청을 받는 것은 비동기 방식이지만 언어의 특성으로 인해 요청의 처리는 블로킹 방식으로 수행
    - 요청이 많을 수록 쓰레드의 수가 많아지므로 컨텍스트 스위칭으로 인해 오버헤드 현상이 나타남에 따라 성능 차이가 발생
    ```

## 1-3. 주요 특징
### 1-3-1. 싱글 쓰레드(Single Thread)
![5-4](https://github.com/blackhoal/Elice/blob/main/TIL/img/5-4.png?raw=true)  

- 하나의 쓰레드가 주어진 작업을 하나 씩 처리하는 방식
- 싱글 쓰레드인 상황에서 성능(작업 처리 효율)을 극대화하기 위해 비동기(Non-Blocking & asynchronous) 처리 방식을 채택  

    ```
    Node JS는 싱글 쓰레드 기반의 비동기 이벤트 루프를 사용하므로 빠르다?
    - 싱글 쓰레드인 메인 스택에서 로직을 처리하며 비동기 작업은 쓰레드 풀에서 멀티 쓰레드로 처리

    위와 같은 방식인데도 싱글 쓰레드라 하는 이유?
    - Node를 실행 시 생성되는 프로세스 자체는 멀티 쓰레드
    - 이벤트 루프에서 메인 처리 스택인 호출 스택이 1개이므로 직접 제어 가능한 쓰레드는 1개이므로 싱글 쓰레드로 지칭
    ```

- Node가 싱글 쓰레드로 동작하지 않는 경우

    ```
    1. Thread Pool
    - Node가 암호화, 파일 입출력, 압축 등의 특정 동작을 수행 시 스스로 멀티 쓰레드를 사용

    2. Worker Thread
    - Node에서 멀티 쓰레드를 사용할 수 있게 된 기능
    - 직접 다수의 쓰레드를 제어 가능
    - CPU 작업이 많은 경우에 주로 사용 
    ```

- 싱글 쓰레드의 장단점

    ```
    1. 장점
    - 쓰레드가 늘어나지 않으므로 효율적인 리소스 관리 가능
    - 경쟁 상태 및 교착 상태 X

    2. 단점
    - 쓰레드 기반의 작업(CPU 연산 등) 처리의 효율성 ↓

    3. 싱글 쓰레드 방식의 효율성이 높으려면
    - 다중 처리를 동시에 처리할 필요성 존재
    - 많은 I/O 작업을 수행
    - 단순한 CPU 작업만을 수행
    ```

### 1-3-2. 논 블로킹 I/O 모델(Non-Blocking I/O Model)
![5-2 Non-Blocking](https://github.com/blackhoal/Elice/blob/main/TIL/img/5-2.png?raw=true)  

- 작업 시간이 긴 함수를 백그라운드로 보낸 후 다음 코드를 먼저 실행하며 이후 오래 걸리는 함수를 실행
- Non-Blocking : 하나의 작업을 실행 후 해당 작업이 종료되지 않아도 다음 작업을 실행하는 방식
- Blocking은 이전 작업이 반드시 완료되어야 다음 작업을 수행하는 것이므로 호출 스택(Call Stack)이 멈춘 상태
- JS는 논 블로킹(Non-Blocking) + 비동기(asynchronous) 방식을 지원

    ```
    비동기(asynchronous) == 논 블로킹(Non-Blocking)?
    - JS에서는 비동기와 논 블로킹을 혼용
    
    동기 VS 비동기 → 작업의 시간 흐름 + 질서/순서 관점
    Blocking VS Non-Blocking → 작업을 하는 작업자(Thread)의 관점
    ```

### 1-3-3. 이벤트 기반(Event-Driven)
![5-3 Event-Driven](https://github.com/blackhoal/Elice/blob/main/TIL/img/5-3.png?raw=true)  

- 이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식
- 이벤트 리스너에 콜백 함수를 등록하여 특정 이벤트가 발생 시 무엇을 할지 미리 설정 가능
- 여러 이벤트가 발생 시 어떤 순서로 콜백 함수를 호출할지 이벤트 루프(Event Loop)가 판단

    ```
    이벤트 루프(Event Loop)
    - 이벤트 발생 시 호출할 콜백 함수를 관리
    - 호출된 콜백 함수의 실행 순서를 결정
    - 노드가 실행이 종료될 때까지 이벤트 처리를 위한 작업을 반복(loop)
    - 이벤트 루프가 없을 경우 JS 코드는 동기 방식으로만 실행 가능
    ```
    
- Node는 JS 코드의 맨 위부터 한 줄씩 실행
    - 함수 호출 부분을 발견 시 호출한 함수를 호출 스택(call stack)에 넣고 다음 코드를 확인하며 호출 스택이 누적
    - 함수는 실행되는 동안 호출 스택에 머무르며 실행이 완료 시 호출 스택에서 삭제
    - 컨텍스트(함수가 호출되었을 때 실행되는 환경)까지 모두 실행이 완료 시 호출 스택 내의 모든 요소는 잔여 X

<br>

# 2. Typescript
## 2-1. 개요
- What is Typescript?
    - 자바스크립트의 슈퍼셋인 오픈소스 프로그래밍 언어
    - 자바스크립트에 타입을 부여하여 확장한 언어
    - 마이크로소프트에서 개발 및 유지중이며 엄격한 문법을 지원
- Why use Typescript?
    - 기존의 자바스크립트는 타입 시스템이 없는 동적 프로그래밍 언어
    - 자바스크립트의 변수는 문자열, 숫자, 불린 등 여러 타입의 값을 가지는 것이 가능(약한 타입의 언어)
    - 비교적 유연하게 개발할 수 있는 환경을 제공하는 한편 런타임 환경에서 쉽게 에러가 발생할 수 있다는 단점이 존재
    - C#, Java와 같은 강한 타입의 언어에서 사용하는 체계적이고 정제된 시스템은 높은 가독성과 코드 품질 등을 제공 가능하여 런타임이 아닌 컴파일 환경에서 에러가 발생 시 치명적인 오류를 쉽게 발견 가능
    - 타입스크립트를 통해 자바스크립트에 강한 타입 시스템을 적용함으로써 대부분의 에러를 컴파일 환경에서 코드를 입력하는 동안 체크 가능
- 기능
    - 크로스 플랫폼 지원: 자바스크립트가 실행되는 모든 플랫폼에서 사용 가능
    - 객체 지향 언어: 클래스, 인터페이스, 모듈 등의 강력한 기능을 제공하며 순수한 객체 지향 코드를 작성 가능
    - 정적 타입: 정적 타입을 사용하므로 코드를 입력하는 동안에 오류를 체크 가능(에디터 or 플러그인 필요)
    - DOM 제어: 자바스크립트와 같이 DOM을 제어하여 요소를 추가 또는 삭제 가능
    - 최신 ECMAScript 기능: ES6 이상의 최신 자바스크립트 문법을 지원

## 2-2. 타입
- String
    ```ts
    let hello: string = "helloWorld!";
    ```
- Number
    ```ts
    let tripleSeven: number = 777;
    ```
- Array
    ```ts
    let arr1: number[] = [10, 20, 30];
    let arr2: Array<number> = [10 , 20, 30];
    let arr3: Array<string> = ["hello", "world"];
    let arr4: [string, number] = ["jinyoung", 24];
    ```
- Object
    ```ts
    let jinyoung: object = { name: "jinyoung", age: 24 };
    let person: { name: string; age: number } = {
        name: "jinyoung",
        age: 24
    };
    ```
- Boolean
    ```ts
    let isThatTrue: boolean = true;
    ```

## 2-3. 객체지향 프로그래밍(Object-Oriented Programming)
- What is OOP?
    - 서로 관련 있는 데이터와 함수를 객체(하나의 역할을 수행하는 메소드와 변수의 집합)로 정의하여 서로 상호작용할 수 있도록 프로그래밍하는 것
    - 각각의 객체는 메시지를 주고받으며 데이터를 처리 가능
- OOP의 장점
    - 프로그램을 보다 유연하고 변경이 용이하도록 작성 가능
    - 코드의 변경을 최소화하며 유지보수에 유리
    - 코드의 재사용을 통해 반복적인 코드를 최소화하여 간결하게 표현 가능
- 핵심 특징 4가지
    - 캡슐화(Encapsulation)
        - 비슷한 역할을 하는 속성(필드)과 행위(메소드)를 하나로 묶고 접근 지정자(public, private, protected)를 통해 제어하는 것
        - 외부에서 알 필요가 없는 데이터를 숨기고 원하는 기능만 제공 가능 
        - 느슨한 결합(Loose Coupling) : 실행 순서에 기반한 절차적 수행을 따르지 않고 작성된 코드가 의도하는 실제 모습과 유사하도록 코드를 결합하는 것
        - 은닉화 : 내부 데이터나 코드 구현을 외부로 노출하지 않고 객체 외부에서 필요한 동작(메소드)만 노출시키는 특성
    - 추상화(Abstration)
        - 모델화하는 것으로 데이터의 공통된 성질을 추출하여 슈퍼 클래스를 선정하는 특성
        - private 키워드를 사용하여 내부의 복잡한 기능을 외부에서 볼 수 없게 함으로써 내부의 기능을 모르더라도 외부의 인터페이스(함수)를 통해 해당 기능을 이용 가능
    - 상속(Inheritance)
        - 부모 클래스의 특징을 자식 클래스가 물려받는 것
        - 기본 클래스(base class)의 특징을 파생 클래스(derived class)가 상속받는 것
        - 특정 클래스의 기능을 물려받고 새로 추가를 원하는 기능을 작성 가능
        - 불필요한 코드를 줄이므로 재사용성 상승
    - 다형성(Polymorphism)
        - 하나의 부모 클래스를 상속 받은 자식 클래스가 다양한 형태를 가질 수 있는 특성
        - 같은 모양의 함수일지라도 객체의 특성에 맞게 상황에 따라 다르게 동작 가능

## 2-4. 접근 지정자
```ts
// 부모 클래스
class Car {
	public name: string; 
    private color: string; // #color :string
    protected year: number;
    
    
    constructor(name :string, color:string, year: number){
    	this.name = name;
        this.color = color;
        this.year = year;
    }
    
    
    start(){
    	console.log("start");
        console.log(this.name);
        console.log(this.color); // this.#color
        console.log(this.year);
    }
}


// 자식 클래스 
class Bmw extends Car {
    
    constructor(name :string, color:string, year: number){
    	super(name, color, year);
    }
    

    showName(){
        console.log(super.name);
    }
    
    showColor(){
        console.log(super.color); // error 
    }
    
    showYear(){
        console.log(super.year);
    }
}

// 클래스 인스턴스
const mycar = new Bmw("black", "ccc", 1999);
console.log(mycar.name);
console.log(mycar.color); // error
console.log(mycar.year); // error
mycar.name = "zzz"; // 변경 가능
```

|종류|설명|
|:----:|:----:|
|public|자식 클래스나 클래스 인스턴스에서 접근 가능한 값(default)|  
|private(#)|자식 클래스에서 접근 불가능하며 자신 내부에서만 사용 가능|
|protected|자식 클래스에서 접근이 가능 클래스 인스턴스에서는 참조가 불가능|   

## 2-5. 추상 클래스(Abstrat Class)
```ts
abstract class Name{
    constructor(
        protected firstName: string,
        protected lastName: string,
        public nickname: string,
    ){}
    abstract getNickname(): string
    abstract getFullname(): string
}

class Person extends Name{
    getNickname(){
        return this.nickname
    }
    getFullname(){
        return `${this.firstName} ${this.lastName}`
    }
}

const heejin: Person = new Person("JS", "Ahn", "Jason")
console.log(heejin.getNickname())
console.log(heejin.getFullname())
```
- Class 앞에 abstract 키워드를 사용하여 추상 클래스를 정의 가능 
- new를 사용한 객체 생성 불가(객체의 인스턴스화 불가능)
- extends를 통해 자식 클래스를 생성하는 것만 가능
- 추상 클래스 내에 존재하는 추상 메소드는 상속받은 클래스(자식)에서 반드시 구현 필요(미구현 시 에러 발생)
- 모든 자식 클래스가 같은 메소드를 갖지만 세부적인 내용은 자식마다 같거나 상이

## 2-6. 인터페이스
```ts
interface IUser {
  name: string,
  age: number,
  isAdult: boolean
}
```
- What is Interface?
    - 여러 객체를 정의하는 일종의 규칙이며 구조
    - 자주 사용하는 타입을 Object 형태의 집합으로 정의하여 새로운 타입을 만드는 기능
    - 클래스를 정의 시 메소드와 속성만 정의한 것
    - 덕 타이핑(duck typing) / 구조적 서브타이핑 (Structural subtyping) : 타입 검사가 값의 형태에 초점을 맞추고 있는 타입스크립트의 핵심 원칙 
    - 코드 내의 계약 / 프로젝트 외부에서 사용하는 계약을 정의
- 정의 가능한 목록
    - 객체의 스펙(속성과 속성의 타입)
    - 함수의 파라미터
    - 함수의 스펙(파라미터, 반환 타입 등)
    - 배열과 객체에 접근하는 방식
    - 클래스
- Type VS Interface
    - 타입의 확장 가능 / 불가능 여부
    - 인터페이스는 확장이 가능하지만 타입 별칭은 확장이 불가능
    - Type이 아닌 Interface로 선언하여 사용하는 것을 권장
- Abstract Class VS Interface
    - 추상 클래스 : 기본적인 구현 외에도 필요한 경우 하위 클래스에서 재정의하거나 추가 구현이 가능하므로 계층적 클래스 구조를 생성 가능
    - 인터페이스 : 공통된 메소드와 속성의 공통된 부분을 정의 가능하지만 세부적인 구현은 제공 X

## 2-7. 제네릭(Generics)
```ts
function logText<T>(text: T): T {
  consol.log(text);
  return text;
}

logText<string>('Hello World!');
```
- 선언 시점이 아닌 생성 시점에 타입을 명시함으로써 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법
- 데이터의 타입을 일반화하여 자료형을 정하지 않고 여러 타입을 사용 가능
- C#, Java와 같은 언어의 경우 함수 또는 클래스를 정의하는 시점에서 매개변수나 반환값의 타입 선언이 필요
- 함수 또는 클래스를 정의하는 시점에 매개변수나 반환값의 타입을 선언하기 어려운 상황에 제네릭을 사용
- 단일 타입이 아닌 다양한 타입에서 작동하는 컴포넌트를 작성할 때 유리