# Selector
```css
/* 
    1. 단순 Selector 
*/

/* 요소형 Selector */
p {}
/* 전체 Selector */
* {}
/* 속성 Selector */
a[href="http://www.w3c.org/"] {}
/* 클래스 Selector */
.my-class {}
/* Id Selector */
#my-id {}
/* 의사 클래스(pseudo-class) */
a:visited {}

/* 
    2. 의사 요소(pseudo-element) 
*/
a::before {}

/* 
    3. 결합자(Combinator) 
*/

/* 손자 결합자 */
div p

/* 자녀 결합자 */
div > p

/* 형제 결합자 - 인접 */
div + p

/* 형제 결합자 - 일반 */
div ~ p
```

# Cascading
```css
/* 1. 중요도 */
p {
    font-size: 1rem !important;
}

.my-class {
    font-size: 2rem;
}

/* 2. 명시도 */
.my-class {
    font-size: 2rem;
}

p {
    font-size: 1rem;
}

/* 3. 코드 순서 */
.my-class {
    font-size: 2rem;
}

.my-class {
    font-size: 3rem;
}
```
## What is Cascading?
- 하나의 요소에 중복되는 여러 개의 스타일을 선언 가능 
- 중복되는 스타일 중 어떤 CSS를 채택할 것인지를 정하는 규칙
- `스타일 우선순위` / `스타일 상속`에 의해 어떤 요소에 스타일을 적용할지 결정 

## Cascading 스타일 우선순위
- 중요도(Importance)
    - `선택자`에 의한 Cascading
    - CSS가 선언된 위치에 따라 우선순위를 결정
- 명시도(Specificity)
    - `디테일`에 의한 Cascading
    - 대상을 명확하게 특정할수록 명시도가 높아져 우선순위 증가
- 코드 순서(Source Order)
    - `순서`에 의한 Cascading
    - 나중에 선언한 규칙일수록 우선순위 증가 

## 중요도(Importance)
```HTML
<body>
  <h2>CSS</h2>
</body>
```
```CSS
h2 {
    background-color: red;
}

h2 {
    background-color: blue;
}
```
- 분류
    - 사용자 도구 CSS(Browser Style)
        - 브라우저에 default로 내장된 CSS
    - 사용자 CSS(User Style)
        - 사용자가 브라우저 설정에서 적용한 다크모드나 폰트 크기 등
    - 작성자 외부 CSS(Author External Style)
        - 개발자가 HTML 외부에 작성한 CSS
    - 작성자 내부 CSS(Author Internal Style)
        - 개발자가 HTML 내부에 작성한 CSS
- 우선순위
    ```
    Internal Style > External Style > User Style > Browser Style
    ```
- `!important`
    - Cascading의 세 가지 규칙을 의도적으로 무시하고 중요도를 끌어올릴 때 사용
    - HTML, CSS 구조에 문제가 존재할 때 사용하므로 권장 X

## 명시도(Specificity)
```html
<h2>태그 셀렉터</h2>
<h2 class='cls'>클래스 셀렉터</h2>
<h2 id='i' class='cls'>아이디 셀렉터</h2>
<h2 class='cls' style='background-color: green'>인라인 셀렉터</h2>
```
```CSS
h2 {
    background-color: red;
}

.cls {
    background-color: blue;
}

#i {
    background-color: violet;
}
```
- Selector 간의 우선순위
    - Selector가 가리키는 것이 명확할수록 우선순위 증가
- 우선순위
    ```
    Inline Style > ID > Class > Type(Tag)
    ```

## 코드 순서(Source Order)
```HTML
<h2>CSS</h2>
```
```CSS
h2 {
    color: red;
}

h2 {
    color: green; 
}
```
- 코드에서 가장 마지막에 선언한 스타일을 최우선으로 적용

# Reference
- [참조 1](https://velog.io/@bami/CSS-Cascading)  
- [참조 2](https://velog.io/@marulloc/CSS-Cascading-Inheritance)