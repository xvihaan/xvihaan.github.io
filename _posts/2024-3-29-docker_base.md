---
layout: single
title:  "Docker 기초 실습"
categories: Study
tags: [Docker, Kurbernets, DevOps, MLOps]
toc: true
author_profile: false
sidebar:
    nav: "counts"
---

# Docker 기초 실습하기

**[공지사항]** [민혁 블로그 신규 포스팅 안내 드립니다.](https://xvihaan.github.io/event/first/)
{: .notice--danger}


![dk_logo]({{site.url}}/assets/images/2024-3-devstu/dk_logo.png)

# Docker 생성

## Docker를 이용한 리눅스 배포판 실행
```
docker run -it ubuntu /bin/bash
```
- run: 이미지를 이용하여 새 컨테이너 만든 후 실행
- -i --interactive:  연결되지 않은 상태에서도 표준입출력(STDIN)을 열어두기
- -t --tty: 가상 터미널(pseudo-TTY) 허용
- ubuntu: 이미지 이름
- /bin/bash: 리눅스 bash 셸 

## Docker 나가기
```
exit
```

## Docker list 보기
```
docker container list -a

docker container list
```

## Docker 삭제하기
```
docker container rm [Docker 고유번호]
```

## 이미지 삭제 명령어
```
docker image rm [image name or id]
```

## 커스텀 이미지 이용하여 이미지 생성
```
docker build . -t [file name]
```

## 커스텀 이미지 확인
```
docker inspect [file name]
```

# Docker Network 실습

## www 컨테이너 통신
```
docker run -d -p 3000:3000 [file name]
```
- -d: background 에서 실행
- -p: port 를 연결시킴

## 포트 포워딩(:3000)
```
http://127.0.0.1:3000/
입력
```

# Docker Compose 웹서버 실습

##  멀티 컨테이너 애플리케이션 구성
```
compose.yaml 파일 확인
Dockerfile 파일 확인- flask 자체에서 실행시키는 명령어 
```
```
docker-compose up
```

## 웹 서버 접속(:8000)
```
http://127.0.0.1:8000/
접속
```

## flask stop 후 로드 밸런싱

![dk_lb]({{site.url}}/assets/images/2024-3-devstu/dk_lb.png)

## Docker Compose NGINX
```
docker-compose.yaml 파일 확인
nginx/Dockerfile 확인
nginx/nginx.conf 확인
```
```
docker-compose up
```

## 웹 서버 접속(:8080)
```
http://127.0.0.1:8080/
접속
```

