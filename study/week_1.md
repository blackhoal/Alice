# JS 함수의 실행 과정
- JS 엔진은 코드가 없어도 실행 환경(실행 컨텍스트)을 초기화
- 스코프(Scope) : 코드가 현재 실행되는 환경, 맥락(context)
- 종류 : this 포인터, 스코프에 저장된 변수, 스코프 체인
    - 글로벌 스코프에서는 this 포인터가 window를 지칭
- 함수가 실행 시 함수 스코프에 따라 환경이 형성
    - this, 함수 스코프 내의 변수, 스코프 체인이 형성
    - 스코프 체인에 따라 글로벌 환경에 도달
- 객체의 메서드 환경에서의 this는 해당 객체를 지칭
    - 환경에 따라 변경 가능

# 실행 컨텍스트
- JS 코드가 실행되는 환경
- 코드에서 참조하는 변수, 객체(함수 포함), this 등에 대한 참조가 존재
- 전역에서 시작하여 함수가 호출 시 스택에 누적

# import / export

# 내장 객체 Date
- Date.getDay()
    - 0: 일, 1: 월, 2: 화, 3: 수, 4: 목, 5: 금, 6: 토

# Constructor
- 객체를 조금 더 유연하게 활용 가능

# Scope
- Local Scope
- Global Scope
- Dynamic Scope
- Static Scope
- Lexical Scope

# Closure

# Callback

# 동기 / 비동기

# promise
- callbackhell

# this

# map

# filter

# reduce
