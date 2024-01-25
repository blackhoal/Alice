# Promise
- Promise 생성자 내의 코드는 동기로 실행
- Promise 생성자를 사용하는 경우는 거의 X
    - Web API나 Node.js API에서 제공하는 여러 모듈이 Promise를 반환하는 메소드를 제공하므로
- then 메소드에 넘겨주는 함수는 일반 값 or Promise를 반환 가능
    - Promise를 반환 시 해당 Promise가 fulfilled 상태일 때 제공되는 값을 반환
- Promise.resolve, Promise.reject : 일반 값을 Promise화될 수 있도록 하는 기능을 수행
- 사용자가 작성한 메소드 / 함수가 Promise를 반환하는지 아닌지가 핵심
    - 이에 따라 await 또는 .then으로 코드를 작성

# 캐시(Cache)

# CommonJS
- 각 디렉터리의 index.js는 디렉터리 이름을 대표
    - /src/sample/index.js 경로에 존재하는 파일에서 module = {a: 1}을 작성 시 다른 파일(/src/app.js)에서 require('./sample');만으로 index.js 내의 모듈을 사용 가능
- index.js를 올바르게 활용 시 간결하게 require문을 작성 가능
- json 파일을 require하여 일반 객체처럼 사용 가능
    - fs로 파일을 읽어 JSON.parse를 사용하는 것보다 편리

# 타입스크립트
## 동적 타입(Dynamic Typing / Run-time)
- 컴파일 단계 없이 인터프리터와 같은 코드 해석기가 코드를 라인 단위로 읽으며 코드를 실행 시 코드 내의 변수(데이터) 타입이 즉각적으로 정해지는 방식
- 인터프리터 언어가 동적 타입을 사용하는 이유 
    - 코드 컴파일 없이 바로 코드를 실행이 필요
    - JS와 같은 일부 언어의 경우 인터프리터 + 옵티마이징 컴파일러를 같이 사용하여 성능을 향상
- 주로 인터프리터 / 스크립터 언어가 동적 타입 방식을 사용
    - Javascript, Python, Ruby

## 정적 타입(Static Typing / Compile-time)
- 타입을 코드에 명시적으로 표현하는 방식
- 코드가 실행되기 전에 타입을 정의
- 언어의 전용 컴파일러가 컴파일 단계에서 코드 내에 존재하는 변수들의 타입을 분석함으로써 코드를 실행하기 전 기초적인 결함을 발견 가능
- 코드 내의 변수 타입이 실행 전 정해져 있으므로 정적이라는 키워드를 사용
- 장단점
    - 장점 : 기본 결함이 없는 상태의 결과물을 얻는 것이 가능
    - 단점 : 컴파일 과정을 반드시 수행
- 컴파일러의 코드 리팩터링과 같은 최적화가 가능하여 작성한 코드의 성능을 향상
