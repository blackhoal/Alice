# HTTP
- 웹상에서 클라이언트와 서버 간에 요청/응답으로 데이터를 주고 받을 수 있는 프로토콜
- 클라이언트가 HTTP 프로토콜을 통해 서버에게 요청을 전송하면 서버는 요청에 맞는 응답을 클라이언트에게 전송
- HTTP 요청에 포함되는 HTTP 메소드는 서버가 요청을 수행하기 위해 필요한 행동을 표시하는 용도로 사용
- HTTP 메소드의 방식으로 `GET 방식`과 `POST 방식`이 존재

# GET 방식
```
http://localhost:8888/board?name=제목&contents=내용
```
- 서버로부터 `정보를 조회`하기 위해 설계된 메소드
- 요청을 전송할 때 데이터를 Body에 담지 않고 쿼리스트링을 통해 전송
    - 쿼리스트링 : URL의 끝에 ?와 함께 key와 value로 쌍을 이루는 요청 파라미터
    - 요청 파라미터가 2개 이상일 경우 `&`로 연결
- 불필요한 요청을 제한하기 위해 요청에 대한 캐싱 가능
    - 캐싱 : 한번 접근한 상태에서 다시 같은 요청을 전송할 때 빠른 접근을 위해 레지스터에 데이터를 저장하는 것
- Idempotent하도록 설계되었기에 서버에 동일한 요청을 여러 번 전송해도 동일한 응답을 수신

# POST 방식
```
http://localhost:8888/addBoard
```
- `리소스를 생성/변경`하기 위해 설계된 메소드
- 전송할 데이터를 HTTP 메시지의 Body에 담아 전송
- HTTP 메시지의 Body는 길이의 제한이 없으므로 GET과 달리 대용량의 데이터를 전송 가능
- 데이터가 URL에서 확인되지 않기에 GET 방식보다는 보안적으로 우수하지만 크롬 개발자 도구, Fiddler와 같은 툴로 요청을 확인 가능하므로 보안이 필요한 데이터는 반드시 암호화하여 전송
- 요청 헤더의 Content-Type에 요청 데이터의 타입에 대한 표시 필요
    - 표시하지 않을 경우 서버는 `내용` 또는 URL에 포함된 `리소스의 확장자명` 등으로 데이터 타입을 유추
    - 알 수 없는 경우 `application/octet-stream` 타입으로 요청을 처리
- Non-Idempotent하도록 설계되었기에 서버에 동일한 요청을 여러 번 전송해도 응답은 항상 다를 수 있음

# GET VS POST
||GET|POST|
|:--:|:--:|:--:|
|URL에 데이터 노출 여부|O|X|
|URL 예시|http://localhost:8888/board?name=제목&contents=내용|http://localhost:8888/addBoard|
|데이터 위치|Header|Body|
|캐싱 가능 여부|O|X|
|Idempotent(멱등) 여부|Idempotent|Non-Idempotent|
|사용 목적|데이터에 대한 조회를 할 때 사용|서버의 상태나 데이터를 변경시킬 때 사용|
- 멱등 : 동일한 연산을 여러 번 수행하더라도 동일한 결과가 나타나는 것

# Reference
- [참조 1](https://mangkyu.tistory.com/17)  
- [참조 2](https://hongsii.github.io/2017/08/02/what-is-the-difference-get-and-post/)  
