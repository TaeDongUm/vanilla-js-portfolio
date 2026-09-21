// ========================================
// DOM 요소 선택
// - 미션 요구사항: querySelector, querySelectorAll
// ========================================

const header = document.querySelector('.site-header');

const menuButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

const navLinks = document.querySelectorAll(
    '.nav-menu a, .logo, .hero-actions a'
);

const themeButton = document.querySelector('.theme-toggle');

const scrollTopButton = document.querySelector('#scroll-top-button');

const sections = document.querySelectorAll('.section');


// ========================================
// 1. 햄버거 메뉴
//
// 사용자 클릭
// -> active 클래스 상태 변경
// -> 메뉴 표시/숨김
//
// 미션 요구사항:
// click 이벤트
// classList.toggle('active')
// ========================================

menuButton.addEventListener('click', () => {

    navMenu.classList.toggle('active');

    const isOpen =
        navMenu.classList.contains('active');

    menuButton.setAttribute(
        'aria-expanded',
        String(isOpen)
    );

    menuButton.setAttribute(
        'aria-label',
        isOpen ? '메뉴 닫기' : '메뉴 열기'
    );
});


// ========================================
// 2. 부드러운 스크롤
//
// Navigation 링크 클릭
// -> 기본 앵커 동작 방지
// -> 해당 Section으로 부드럽게 이동
//
// 미션 요구사항:
// click
// addEventListener
// preventDefault
// ========================================

navLinks.forEach((link) => {

    link.addEventListener('click', (event) => {

        const targetId =
            link.getAttribute('href');

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });


        // 모바일 메뉴가 열려 있었다면 닫기
        navMenu.classList.remove('active');

        menuButton.setAttribute(
            'aria-expanded',
            'false'
        );

        menuButton.setAttribute(
            'aria-label',
            '메뉴 열기'
        );
    });
});


// ========================================
// 3. Scroll 이벤트
//
// 스크롤 위치에 따라
//
// 60px 이상:
// Header 스타일 변경
//
// 300px 이상:
// Scroll Top 버튼 표시
//
// 미션 요구사항:
// scroll 이벤트
// classList.add / remove
// ========================================

const handleScroll = () => {

    const scrollPosition =
        window.scrollY;


    // -------------------------
    // Header 스타일 변경
    // 기준: 60px
    // -------------------------

    if (scrollPosition >= 60) {

        header.classList.add('scrolled');

    } else {

        header.classList.remove('scrolled');
    }


    // -------------------------
    // Scroll Top 버튼
    // 기준: 300px
    // -------------------------

    if (scrollPosition >= 300) {

        scrollTopButton.classList.add('visible');

    } else {

        scrollTopButton.classList.remove('visible');
    }
};


window.addEventListener(
    'scroll',
    handleScroll
);


// 페이지를 중간 위치에서 새로고침했을 수도 있으므로
// 처음 한 번 실행한다.
handleScroll();


// ========================================
// 4. Scroll Top 버튼
//
// 클릭
// -> 페이지 가장 위로 부드럽게 이동
// ========================================

scrollTopButton.addEventListener(
    'click',
    () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }
);


// ========================================
// 5. Dark Mode
//
// 클릭
// -> theme 상태 변경
// -> data-theme 변경
// -> CSS 변수 변경
// -> 화면 변경
//
// localStorage에 저장하여
// 새로고침 후에도 상태 유지
// ========================================


// 저장된 Theme 가져오기
const savedTheme =
    localStorage.getItem('theme');


// 저장된 값이 dark이면
// 페이지 시작부터 dark theme 적용
if (savedTheme === 'dark') {

    document.documentElement.setAttribute(
        'data-theme',
        'dark'
    );

    themeButton.textContent = '☀️';

} else {

    document.documentElement.setAttribute(
        'data-theme',
        'light'
    );

    themeButton.textContent = '🌙';
}


// Theme 버튼 클릭
themeButton.addEventListener(
    'click',
    () => {

        const currentTheme =
            document.documentElement.getAttribute(
                'data-theme'
            );


        const newTheme =
            currentTheme === 'dark'
                ? 'light'
                : 'dark';


        // 상태 변경
        document.documentElement.setAttribute(
            'data-theme',
            newTheme
        );


        // 브라우저에 현재 상태 저장
        localStorage.setItem(
            'theme',
            newTheme
        );


        // 화면에 표시되는 버튼 변경
        themeButton.textContent =
            newTheme === 'dark'
                ? '☀️'
                : '🌙';


        themeButton.setAttribute(
            'aria-label',
            newTheme === 'dark'
                ? '라이트 모드 전환'
                : '다크 모드 전환'
        );
    }
);


// ========================================
// 6. Scroll Animation
//
// Section이 화면에 20% 이상 들어오면
// visible 클래스 추가
//
// 미션 요구사항:
// Intersection Observer
// threshold: 0.2
// ========================================


// 애니메이션을 적용할 Section에
// reveal 클래스 추가
sections.forEach((section) => {

    section.classList.add('reveal');

});


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target
                        .classList
                        .add('visible');


                    // 한 번 나타난 뒤에는
                    // 더 이상 관찰하지 않는다.
                    observer.unobserve(
                        entry.target
                    );
                }
            });

        },

        {
            threshold: 0.2
        }

    );


// 모든 Section 관찰 시작
sections.forEach((section) => {

    observer.observe(section);

});

// ========================================
// 7. GitHub API Projects
//
// GitHub API
// → 전체 Repository 가져오기
// → 원하는 Repository만 filter()
// → map()으로 HTML 생성
// → Projects 영역에 렌더링
//
// 미션 요구사항:
// fetch
// async / await
// try / catch
// 구조분해 할당
// filter()
// map()
// Template Literal
// innerHTML
// Loading / Success / Error / Empty
// ========================================


// GitHub 사용자 이름
const GITHUB_USERNAME = 'TaeDongUm';


// 포트폴리오에 보여줄 Repository
//
// GitHub의 프로젝트 정보 자체를 하드코딩하는 것이 아니라
// "어떤 프로젝트를 보여줄 것인지"만 설정한다.
const SELECTED_PROJECTS = [
    'vanilla-js-portfolio',
    'python-mini-npu-simulator',
    'python-quiz-manager'
];


// HTML에서 만들어 둔 Projects 영역 선택
const projectsStatus =
    document.querySelector('#projects-status');

const projectsGrid =
    document.querySelector('#projects-grid');


// ========================================
// 프로젝트 카드 렌더링
// ========================================

const renderProjects = (repositories) => {

    // 프로젝트가 하나도 없는 경우
    if (repositories.length === 0) {

        projectsStatus.textContent =
            '표시할 프로젝트가 없습니다.';

        projectsGrid.innerHTML = '';

        return;
    }


    // 정상적으로 프로젝트가 있는 경우
    projectsStatus.textContent = '';


    /*
        map()

        Repository 배열

        ↓

        HTML 문자열 배열

        로 변환한다.
    */
    const projectCards =
        repositories.map((repository) => {

            /*
                구조분해 할당

                repository.name처럼 하나씩 꺼내지 않고
                필요한 값을 한 번에 꺼낸다.
            */
            const {
                name,
                description,
                html_url,
                language,
                stargazers_count
            } = repository;


            /*
                Template Literal

                ${변수}를 이용하여
                GitHub 데이터를 HTML 안에 넣는다.
            */
            return `
                <article class="project-card">

                    <h3>
                        ${name}
                    </h3>

                    <p class="project-description">
                        ${description || '프로젝트 설명이 없습니다.'}
                    </p>

                    <div class="project-meta">

                        <span>
                            ${language || '언어 정보 없음'}
                        </span>

                        <span>
                            ⭐ ${stargazers_count}
                        </span>

                    </div>

                    <a
                        class="project-link"
                        href="${html_url}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub →
                    </a>

                </article>
            `;
        });


    /*
        map()의 결과는 배열이므로

        [
            "<article>...</article>",
            "<article>...</article>"
        ]

        join('')을 사용하여 하나의 문자열로 만든다.
    */
    projectsGrid.innerHTML =
        projectCards.join('');
};


// ========================================
// Error 화면
// ========================================

const renderProjectsError = (message) => {

    projectsGrid.innerHTML = '';


    /*
        에러 메시지 + 다시 시도 버튼

        미션 요구사항:
        "프로젝트를 불러올 수 없습니다"
        + 재시도 버튼
    */
    projectsStatus.innerHTML = `
        <p>${message}</p>

        <button
            id="retry-button"
            class="button primary-button"
            type="button"
        >
            다시 시도
        </button>
    `;


    // innerHTML로 버튼을 만든 뒤
    // 새로 생성된 버튼을 선택한다.
    const retryButton =
        document.querySelector('#retry-button');


    retryButton.addEventListener(
        'click',
        fetchRepositories
    );
};


// ========================================
// GitHub Repository 가져오기
// ========================================

const fetchRepositories =
    async () => {

        /*
            1. Loading 상태

            API 요청을 보내기 전에
            사용자에게 현재 상태를 보여준다.
        */
        projectsStatus.textContent =
            '프로젝트를 불러오는 중입니다...';

        projectsGrid.innerHTML = '';


        try {

            /*
                fetch()

                GitHub 서버에 Repository 목록을 요청한다.

                await:
                응답이 올 때까지 기다린다.
            */
            const response =
                await fetch(
                    `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&per_page=100`
                );


            /*
                HTTP 응답이 성공이 아닌 경우
            */
            if (!response.ok) {

                /*
                    GitHub API Rate Limit

                    인증하지 않은 요청은
                    시간당 호출 횟수 제한이 있다.

                    제한에 도달하면 403이 발생할 수 있다.
                */
                if (response.status === 403) {

                    throw new Error(
                        'GitHub API 요청 제한에 도달했습니다. 잠시 후 다시 시도해주세요.'
                    );
                }


                throw new Error(
                    '프로젝트를 불러올 수 없습니다.'
                );
            }


            /*
                JSON 응답

                GitHub 서버에서 받은 데이터를
                JavaScript 배열로 변환한다.
            */
            const repositories =
                await response.json();


            /*
                filter()

                GitHub Repository 전체 중에서

                SELECTED_PROJECTS에 이름이 들어있는
                Repository만 남긴다.
            */
            const selectedRepositories =
                repositories.filter(
                    (repository) =>
                        SELECTED_PROJECTS.includes(
                            repository.name
                        )
                );


            /*
                SELECTED_PROJECTS에 적어둔 순서대로
                프로젝트를 보여준다.
            */
            selectedRepositories.sort(
                (first, second) =>
                    SELECTED_PROJECTS.indexOf(
                        first.name
                    )
                    -
                    SELECTED_PROJECTS.indexOf(
                        second.name
                    )
            );


            /*
                API 호출 성공

                선택한 프로젝트를 화면에 렌더링
            */
            renderProjects(
                selectedRepositories
            );


        } catch (error) {

            /*
                API 호출 실패

                Error 상태 UI 렌더링
            */
            renderProjectsError(
                error.message
            );
        }
    };


// 페이지가 처음 실행될 때
// GitHub Repository 가져오기
fetchRepositories();

// ========================================
// 8. Contact Form Validation
//
// 사용자 입력
// → 유효성 검사
// → 상태 변경
// → 에러/성공 메시지 렌더링
//
// 미션 요구사항:
// input 이벤트
// submit 이벤트
// event.preventDefault()
// 빈 값 검사
// 이메일 형식 검사
// ========================================


// HTML Form 요소 선택
const contactForm =
    document.querySelector('#contact-form');

const nameInput =
    document.querySelector('#name');

const emailInput =
    document.querySelector('#email');

const messageInput =
    document.querySelector('#message');


// 각 입력값의 에러 메시지 영역
const nameError =
    document.querySelector('#name-error');

const emailError =
    document.querySelector('#email-error');

const messageError =
    document.querySelector('#message-error');


// 제출 성공 메시지 영역
const formSuccess =
    document.querySelector('#form-success');


// ========================================
// Form 상태
//
// 각 입력값이 현재 유효한지 저장한다.
// ========================================

const formState = {
    nameValid: false,
    emailValid: false,
    messageValid: false
};


// ========================================
// 이름 검사
// ========================================

const validateName = () => {

    /*
        trim()

        입력값 앞뒤의 공백을 제거한다.

        예:
        "   " → ""
    */
    const value =
        nameInput.value.trim();


    if (value === '') {

        formState.nameValid = false;

        nameError.textContent =
            '이름을 입력해주세요.';

        nameInput.classList.add(
            'invalid'
        );

        return false;
    }


    formState.nameValid = true;

    nameError.textContent = '';

    nameInput.classList.remove(
        'invalid'
    );

    return true;
};


// ========================================
// 이메일 형식 검사
// ========================================

const isValidEmail = (email) => {

    /*
        이메일의 기본적인 형식을 검사한다.

        example@email.com
    */
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
};


const validateEmail = () => {

    const value =
        emailInput.value.trim();


    // 이메일이 비어 있는 경우
    if (value === '') {

        formState.emailValid = false;

        emailError.textContent =
            '이메일을 입력해주세요.';

        emailInput.classList.add(
            'invalid'
        );

        return false;
    }


    // 이메일 형식이 잘못된 경우
    if (!isValidEmail(value)) {

        formState.emailValid = false;

        emailError.textContent =
            '올바른 이메일 형식을 입력해주세요.';

        emailInput.classList.add(
            'invalid'
        );

        return false;
    }


    formState.emailValid = true;

    emailError.textContent = '';

    emailInput.classList.remove(
        'invalid'
    );

    return true;
};


// ========================================
// 메시지 검사
// ========================================

const validateMessage = () => {

    const value =
        messageInput.value.trim();


    if (value === '') {

        formState.messageValid = false;

        messageError.textContent =
            '메시지를 입력해주세요.';

        messageInput.classList.add(
            'invalid'
        );

        return false;
    }


    formState.messageValid = true;

    messageError.textContent = '';

    messageInput.classList.remove(
        'invalid'
    );

    return true;
};


// ========================================
// Input Event
//
// 사용자가 입력할 때마다
// 해당 필드의 상태를 다시 검사한다.
// ========================================

nameInput.addEventListener(
    'input',
    () => {

        validateName();

        formSuccess.textContent = '';
    }
);


emailInput.addEventListener(
    'input',
    () => {

        validateEmail();

        formSuccess.textContent = '';
    }
);


messageInput.addEventListener(
    'input',
    () => {

        validateMessage();

        formSuccess.textContent = '';
    }
);


// ========================================
// Submit Event
// ========================================

contactForm.addEventListener(
    'submit',
    (event) => {

        /*
            기본 Form 제출을 막는다.

            페이지가 새로고침되거나
            다른 페이지로 이동하는 것을 방지한다.
        */
        event.preventDefault();


        /*
            제출 시 모든 입력값을 한 번 더 검사한다.
        */
        const nameValid =
            validateName();

        const emailValid =
            validateEmail();

        const messageValid =
            validateMessage();


        /*
            하나라도 잘못된 값이 있으면
            제출을 중단한다.
        */
        if (
            !nameValid ||
            !emailValid ||
            !messageValid
        ) {

            formSuccess.textContent = '';

            return;
        }


        /*
            모든 입력값이 정상인 경우
        */
        formSuccess.textContent =
            '메시지가 정상적으로 작성되었습니다.';


        /*
            실제 서버 전송 기능은 없으므로
            Form 입력값만 초기화한다.
        */
        contactForm.reset();


        // 상태도 초기화
        formState.nameValid = false;
        formState.emailValid = false;
        formState.messageValid = false;
    }
);