# Node.js 생태계
- Runtime
- Package Manager → 우체국 배송 접수 담당자
- npm Registry → 물류 센터

## Package Manager
- Package
    - 사용자가 작성한 다른 코드를 포장하여 다른 프로젝트에서도 재사용할 수 있도록 만드는 기능
    - 프론트엔드에서 <script></script> 태그로 가져왔던 라이브러리와 유사한 개념
    - 패키지 정보는 package.json 파일에 명시
- Node.js 프로젝트의 의존성 관리, 테스크 실행, package registry 배포, 프로젝트와 관련된 메타데이터 작성 등을 담당
- 서드 파티 패키지를 package registry(NPM, GitHub Package Registry, JFrog, GitLab Package Registry)로부터 다운을 받고 개발중인 프로젝트에 적용 가능
- 개발중인 패키지를 npm Registry로 업로드
- 프로젝트 명세 파일인 package.json에 따라 기능을 수행
- 종류 : npm, yarn, pnpm

## package.json
- Node.js 프로젝트의 명세서
    - 현재 프로젝트에 대한 메타데이터(프로젝트명, 개발자 목록, git repository 주소, 라이센스) / npm script / 사용(의존)하고 있는 외부(서드 파티) 모듈을 정리한 파일
- 프로젝트에 사용하는 서드 파티 패키지에 대한 모든 정보
    - 해당 프로젝트에서 무슨 버전을 사용하는지 등
- package.json 파일이 없어도 Node.js를 사용하여 JS 파일을 실행은 가능하지만 서드 파티 패키지(라이브러리)를 JS에서 import / require로 사용 불가
- git repository에 올린 프로젝트를 다른 컴퓨터 환경에서 개발할 때 원래 환경과 같은 프로젝트 상태로 구성 가능
- dependencies : 애플리케이션 코드에 직접 사용되는 모듈
- devDependencies : 애플리케이션 코드에는 사용이 안되나 테스트 / 프로세스 재시작 / 린팅 작업을 수행 시 사용되는 모듈(서포트 툴)
    - 공식 홈페이지에 기록된 프로퍼티 외의 특이한 프로퍼티는 devDependencies로 사용중인 모듈의 설정값일 가능성 多
- 우체국 배송 명세서
- package-lock.json
    - package.json에 기록된 내용을 새로운 npm install이 발생할 때마다 snapshot의 형태로 생성하는 파일
    - 사용중인 외부 모듈의 상세한 스펙이 명세
    - npm은 해당 파일을 통해 현재 프로젝트가 정확히 어떤 버전의 모듈을 사용하는지 판단하여 install 가능
    - 해당 파일이 없을 경우 npm install 수행 시 프로젝트 팀원과 다른 버전의 모듈을 설치할 가능성 존재

## npm Registry
- 패키지를 업로드하는 공간
- Public / Private
- 개발자는 registry로부터 필요한 서드파티 패키지를 받아서 자신의 코드에서 사용 가능
- 회사 내부 등 보안이 필요한 환경에서 사용하는 패키지는 private registry에 올려서 관리
- git repository와의 차이점
    - git repository : 소스 코드 자체를 관리
    - npm Registry : 완성된 코드를 저장하는 저장소
- 종류 : NPM(inc.) / GitHub Package Registry / JFrog / GitLab Package Registry

<br>

# 서버
## 커피로 보는 서버
```
커피를 요구하는 고객 → 클라이언트
커피를 제공하는 바리스타 → 서버
커피 → 데이터
고객이 바리스타에게 커피를 주문 → 요청(Request)
바리스타가 주문을 받고 커피를 제공 → 응답(Response)
```

## 서버의 장단점
- 장점
    - 다수의 사용자 데이터를 중앙에서 처리하므로 데이터의 일관성 유지에 용이
    - 데이터 관리가 용이
    - 빠른 연산이 필요한 작업은 성능이 우수한 중앙 서버에 위임 가능하므로 클라이언트 머신의 성능이 크게 중요 X
    - 비동기 작업 가능
    - 클라이언트로부터 중요한 비즈니스 로직 코드를 은닉 가능
- 단점
    - Single point of failure(SPOF) : 서버가 다운 시 클라이언트는 사실상 무의미
    - 요청이 많아질수록 서버에 과부하도 증가(수직 확장 or 수평 확장으로 해결)
    - 중앙에서 데이터를 관리하므로 공격자의 공격에 쉽게 노출
    - 서버 유지보수에 대한 비용이 발생

## 클라이언트-서버 구조
- 클라이언트와 서버는 주소가 있어야 통신 가능
    - 주소는 보통 IP or Domain을 사용
- 트랜잭션 : 요청과 요청 처리 응답까지의 과정
- 백엔드 프로그래밍(서버 개발) : 요청과 응답 사이에 비즈니스 로직을 추가하는 프로그래밍
- 프로토콜 : 데이터 교환을 위한 규약
- 데이터는 지원하는 포맷에 따라 다양하게 제공 가능
    - JSON, XML, TEXT 등
- 클라이언트는 무조건 브라우저와 동일 X
    - 클라이언트가 또다른 서버인 경우가 존재
- 하나의 서버 머신 내에 여러 개의 서버 프로세스(Web Server & WAS)가 존재 가능
    - 각 서버 프로세스가 자신만의 요청을 수신하기 위해 Port를 사용
    - IP + Port의 조합을 통해 서버 프로세스를 구분
    - XX 아파트의 108동(IP) / XX 아파트의 203호(Port)

## Web Server
- 정적 컨텐츠를 제공하기 위한 서버 프로그램
    - HTML, JS, CSS, 이미지, 비디오 등
- 주로 HTTP 요청을 다루도록 설계
- 주요 클라이언트 : 웹 브라우저
- 고정된(정적) 데이터를 제공하므로 사용자에 따라 해당 데이터를 변경하여 제공하는 것이 불가
- 마케팅 페이지, 회사 소개 페이지 등 변경이 적은 정적 페이지에 적합
- 정적 컨텐츠 제공뿐만 아니라 reverse proxy, load balancing 등의 기능을 지원하여 Web Application Server를 보조하는 역할도 수행
    - FastCGI와 같은 기술을 통해 웹 애플리케이션 역할도 수행 가능
- 종류 : NGINX, Apache HTTP Server 등
    - Node.js도 빌트인 HTTP Server 모듈이 존재하여 웹 서버의 역할을 수행 가능

## Web Application Server
- 클라이언트에게 정적 컨텐츠가 아닌 서비스(비즈니스 로직)를 제공 가능한 서버
- 고정된 컨텐츠를 제공하는 웹 서버와 다르게 복잡한 로직을 수행하여 다양한 동적 데이터를 제공 가능
    - 예시 : 사용자에 따라 다르게 표시되는 페이지 / 단순 JSON 형식의 데이터 등
- 템플릿 형식의 페이지에 데이터를 주입하여 완성된 페이지를 생성 가능
- 종류 : Node.js Web Frameworks / J2EE Services(Tomcat) / Python Web Frameworks(WSGI) 등
- 웹 개발 분야에서의 백엔드 개발은 주로 Web Application Server(WAS) 개발을 지칭

## Protocol
```
- HTTP / HTTPS
- SSH
- FTP / SFTP
- WebSocket
- DNS
- SMTP & IMAP / POP3
- DHCP
- MQTT
```
- 컴퓨터와 컴퓨터 간 통신할 때 사용되는 규약
- HTTP
    - 현재 사용하는 인터넷을 가능하게한 프로토콜
    - 가장 많이 사용하며 브라우저의 기본 프로토콜
    - 사용자가 주소 입력창에 주소를 입력 후 엔터를 누르면 브라우저는 HTTP 프로토콜을 사용하여 요청을 주소에 맞는 서버로 전송
    - 현재 세계적으로 보편화된 버전은 HTTP/1.1이지만 3까지 출시되었으며 1.1, 2, 3의 차이를 파악하기
    - GET / POST / PUT / DELETE 등의 메소드를 CRUD 작업과 연관지어 직관적으로 URL을 사용하여 서버에서 작업 가능(RESTful)
    - OSI 7 Layers의 최상위(L7)

# HTTP 통신
## Stream
- 데이터의 흐름(연속성)을 추상화
- 배열, 문자열과 비슷한 데이터의 집합
    - 배열, 문자열과 달리 담고자 하는 데이터가 개발자가 원하는 시점에 반드시 담기지 않을 수 있으며 매우 큰 규모의 데이터를 다루는 것이 가능
- 작은 파편으로 나눠진 데이터를 정해진 사이즈의 버퍼 단위로 모아서 읽고, 읽은 버퍼에 대해 작업을 수행 가능(ReadableStream)
- 데이터를 단위(버퍼)로 나누서 데이터를 전송하려는 장소(파일, 메모리, 네트워크 등)에 하나씩 연속으로 사용 가능(WritableStream)
- 다루는 데이터가 Node.js 상에서 바로 준비가 힘들 때 많이 사용
    - 데이터가 너무 커서 다룰 수 없거나 완성된 데이터가 준비되기까지 시간이 걸리는 경우 등
- Web Stream과 다른 개념

# Express.js

# API(Application Programming Interface)
- 두 애플리케이션 간의 서비스 계약