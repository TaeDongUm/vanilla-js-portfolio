# 체크리스트 

- [ ] 프로젝트 기본 파일 구성 만들기
- [ ] HTML 전체 구조 작성하기
- [ ] CSS 기본 스타일 + 반응형 레이아웃 구현하기
- [ ] 햄버거 메뉴 / 스크롤 / 다크모드 기능 구현하기
- [ ] GitHub API 연동하고 선택한 프로젝트만 표시하기
- [ ] 로딩 / 에러 / 빈 상태 처리하기
- [ ] Contact 폼 유효성 검사 구현하기
- [ ] Intersection Observer 스크롤 애니메이션 구현하기
- [ ] 모바일 / 태블릿 / 데스크톱 화면 확인하기
- [ ] 다크모드와 새로고침 후 상태 유지 확인하기
- [ ] GitHub Pages로 배포하기
- [ ] 배포된 사이트에서 모든 기능 다시 테스트하기
- [ ] 데스크톱 / 모바일 / 다크모드 스크린샷 찍기
- [ ] README 작성 및 배포 URL 추가하기

# Vanilla JS Portfolio

순수 HTML, CSS, JavaScript로 구현한 반응형 개인 포트폴리오 웹사이트입니다.

React, Vue 등의 프레임워크 없이 DOM 조작, 이벤트 처리, 상태 변경, 비동기 API 호출을 직접 구현하는 것을 목표로 제작했습니다.

## 주요 기능

- 모바일 / 태블릿 / 데스크톱 반응형 레이아웃
- 모바일 햄버거 메뉴
- 부드러운 섹션 이동
- 스크롤 위치에 따른 Header 스타일 변경
- Scroll Top 버튼
- 다크 모드 전환 및 LocalStorage 상태 유지
- Intersection Observer 기반 스크롤 애니메이션
- GitHub API 기반 프로젝트 목록 렌더링
- 프로젝트 로딩 / 성공 / 에러 / 빈 상태 처리
- GitHub API 재시도 버튼 및 403 오류 처리
- Contact Form 필수값 및 이메일 형식 유효성 검사

## 기술 스택

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- GitHub REST API
- LocalStorage
- Intersection Observer
- GitHub Pages

## 프로젝트 구조

```text
vanilla-js-portfolio/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
```

## 반응형 디자인

모바일 퍼스트 방식으로 작성했습니다.

- Mobile: 기본 스타일
- Tablet: 768px 이상
- Desktop: 1024px 이상

Navigation은 Flexbox를 사용하고 Projects 카드 영역은 CSS Grid의 `auto-fit`, `minmax()`를 사용해 화면 크기에 따라 자동으로 배치되도록 구현했습니다.

## 주요 인터랙션

### 햄버거 메뉴

모바일에서 햄버거 버튼을 클릭하면 `classList.toggle('active')`를 이용해 메뉴를 열고 닫습니다.

### 스크롤 기능

- Header 스타일 변경 기준: 60px
- Scroll Top 버튼 표시 기준: 300px
- Intersection Observer threshold: 0.2

Navigation 링크는 `scrollIntoView()`를 이용해 해당 Section으로 부드럽게 이동합니다.

### 다크 모드

사용자가 테마 버튼을 클릭하면 `data-theme` 값을 변경합니다.

선택된 테마는 LocalStorage에 저장하여 새로고침 후에도 유지됩니다.

## GitHub API

GitHub REST API를 `fetch`와 `async/await`로 호출하여 Repository 데이터를 가져옵니다.

```text
https://api.github.com/users/TaeDongUm/repos
```

포트폴리오에 표시할 Repository 이름만 설정값으로 관리하고, 실제 Repository의 설명, 언어, Star, URL 등은 GitHub API 응답 데이터를 사용합니다.

API 호출 과정에서 다음 상태를 UI로 구분해 처리합니다.

- Loading: 프로젝트를 불러오는 중
- Success: 프로젝트 카드 렌더링
- Empty: 표시할 프로젝트가 없는 경우
- Error: 프로젝트를 불러오지 못한 경우
- Retry: 다시 시도 버튼 제공
- 403: GitHub API 요청 제한 안내

## ES6+ 사용

- `const`
- 화살표 함수
- 템플릿 리터럴
- 구조분해 할당
- `map()`
- `filter()`
- `forEach()`
- `async/await`

## Contact Form

Contact Form은 다음 항목을 검증합니다.

- 이름 필수 입력
- 이메일 필수 입력
- 이메일 형식 검사
- 메시지 필수 입력

`input` 이벤트를 이용해 입력 중 상태를 갱신하고, `submit` 이벤트에서는 `event.preventDefault()`로 기본 제출 동작을 막은 뒤 전체 값을 다시 검증합니다.

현재 필수 과제 범위에서는 실제 이메일 전송 기능은 구현하지 않았습니다.

## 이벤트 → 상태 → 렌더링

이 프로젝트에서는 다음과 같은 흐름을 구현했습니다.

### Theme

```text
Theme 버튼 클릭
→ theme 변경
→ data-theme 변경
→ CSS 변수 변경
→ 화면 변경
```

### GitHub API

```text
API 호출
→ Loading 표시
→ API 응답
→ Success / Empty / Error
→ Projects 영역 업데이트
```

### Form

```text
사용자 입력
→ 유효성 검사
→ Form 상태 변경
→ 에러 메시지 표시/제거
```

### Hamburger Menu

```text
버튼 클릭
→ active 클래스 변경
→ Navigation 표시 상태 변경
```

## 실행 방법

저장소를 Clone합니다.

```bash
git clone https://github.com/TaeDongUm/vanilla-js-portfolio.git
cd vanilla-js-portfolio
```

VS Code에서 `index.html`을 Live Server로 실행합니다.

## 배포

GitHub Pages를 사용합니다.

예상 배포 URL:

```text
https://taedongum.github.io/vanilla-js-portfolio/
```

GitHub Repository에서 다음과 같이 설정합니다.

```text
Settings
→ Pages
→ Build and deployment
→ Deploy from a branch
→ main
→ /root
```

## Screenshots

배포 후 다음 스크린샷을 추가하기

### Desktop

```text
images/desktop.png
```

### Mobile

```text
images/mobile.png
```

### Dark Mode

```text
images/dark-mode.png
```

```markdown
![Desktop](./images/desktop.png)
![Mobile](./images/mobile.png)
![Dark Mode](./images/dark-mode.png)
```
