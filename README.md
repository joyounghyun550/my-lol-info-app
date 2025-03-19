# LoL Info App

![Image](https://github.com/user-attachments/assets/de1e2fa3-2ad7-4c3b-8078-a296ef974ddf)

개요

이 애플리케이션은 League of Legends 게임 정보를 조회할 수 있는 웹 서비스입니다.

## 기능

챔피언 정보: 모든 챔피언의 정보와 스킬을 제공합니다.
게임 아이템 정보: 현재 게임에서 사용되는 아이템을 제공합니다.
로테이션 정보: 매주 화요일 변경되는 로테이션 챔피언 정보를 제공합니다.

## 배포
```
https://my-lol-info-app.vercel.app/
```


## 설치
```
# 저장소 클론
git clone https://github.com/yourusername/my-lol-info-app.git
cd my-lol-info-app

# 의존성 설치
yarn install
```

## 환경 설정
.env 파일을 프로젝트 루트에 생성하고 Riot Games API 키를 설정합니다:
```
RIOT_API_KEY=your-api-key-here
```

## 개발 서버 실행
```
yarn dev
개발 서버는 기본적으로 http://localhost:3000에서 실행됩니다.
```

## 빌드
```
yarn build
```

## 프로덕션 서버 실행
```
yarn start
```

## 기술 스택

```
Frontend: React.js, Next.js, Tailwind CSS
Backend: Next.js API Routes
API: Riot Games API
배포: Vercel
```

## API 키 발급 방법

Riot Developer Portal에 가입합니다.
개발자 계정으로 로그인 후 API 키를 발급받습니다.
개발 단계에서는 Development API Key를 사용하고, 프로덕션에는 Production API Key를 신청해야 합니다.
