# 1XX - Informational responses 
|코드|상수|설명|
|:---:|:---:|:------:|
|100|CONTINUE|요청의 시작 부분이 수신되었으며 클라이언트는 계속해서 요청하거나 요청이 완료된 경우에는 무시 가능|
|101|SWITCHING_PROTOCOL|클라이언트가 보낸 UPGRADE 요청 헤더에 대한 응답 / 서버에서 프로토콜을 변경할 것임을 알림|
- 요청을 수신하였으며 프로세스를 계속해서 수행
    - the request was received, continuing process

<br>

# 2XX - Successful
|코드|상수|설명|
|:--:|:--:|:--:|
|200|OK|요청이 정상적으로 처리|
|201|CREATED|생성에 대한 요청을 성공적으로 수신하였으며 서버가 새 리소스를 작성|
|202|ACCEPTED|요청은 적절하였으나, 이에 대한 응답이 불가|
- 요청이 성공적으로 수신되었으며 수락까지 완료
    - the request was received successfully and accepted

<br>

# 3XX - Redirection
|코드|상수|설명|
|:--:|:--:|:--:|
|300|MULTIPLE_CHOICE|요청에 대해 하나 이상의 응답이 가능|
|301|MOVED_PERMANENTLY|요청한 리소스의 URI가 변경되었음을 알림|
|302|FOUND|요청한 리소스의 URI가 일시적으로 변경되었음을 알림|
|303|SEE_OTHER|클라이언트가 요청한 리소스를 다른 URI에서 얻어야 할 때 서버가 클라이언트로 직접 보내는 응답|
- 클라이언트의 요청을 완료하기 위해 적절한 위치 제공 등 추가 조치가 필요
    - further action needs to be taken to complete the request

<br>

# 4XX - Client Error
|코드|상수|설명|
|:--:|:--:|:--:|
|400|BAD_REQUEST|잘못된 문법으로 인해 서버가 요청을 이해 불가|
|401|UNAUTHORIZED|요청을 위해 권한 인증이 필요|
|403|FORBIDDEN|클라이언트가 컨텐츠에 접근할 권리 X|
|404|NOT_FOUND|요청한 URI를 탐색 불가|
- 클라이언트의 잘못된 요청
    - request contains bad syntax or cannot be fulfilled

<br>

# 5XX - Server Error
|코드|상수|설명|
|:--:|:--:|:--:|
|500|INTERNAL_SERVER_ERROR|서버에서 처리할 수 없는 내부 오류가 발생하여 응답 불가|
|501|NOT_IMPLEMENTED|요청한 메소드가 서버에서 지원하지 않거나 처리 불가|
|502|BAD_GATEWAY|서버 위의 서버에서 오류가 발생|
|503|SERVICE_UNAVAILABLE|현재 서버가 유지보수로 인한 중단, 과부하 등의 사유로 인해 일시적으로 사용 불가|
- 정상적인 클라이언트의 요청에 대해 서버의 문제로 응답 불가
    - the server failed to fulfill an apparently valid request

<br>

# Reference
- [참조 1](https://hocheon.tistory.com/68)  
