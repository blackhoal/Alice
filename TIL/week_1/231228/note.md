- vh(viewport height)
- content vs items 차이
- 미디어쿼리
```css
/* Mobile Devices */
@media (min-width:) and (max-width:){}

@media (max-width: 768px) {}
```
- 그라디언트
```css
body {
    background: linear-gradient(blue, red); 
}
```
- mix-blend-mode
    - 이미지 등의 요소가 겹칠 때 중첩된 상태를 표시하는 방식

- Flex vs Grid
    ```
    justify-content: center;
    align-items: center;
    flex-direction: row;
    x축, y축 중앙

    justify-content: center;
    flex-direction: row;
    x축 중앙

    align-items: center;
    flex-direction: row;
    y축 중앙

    justify-content: center;
    flex-direction: column;
    y축 중앙

    align-items: center;
    flex-direction: column;
    x축 중앙
    ```
    - Flex는 1차원 / Grid는 2차원
