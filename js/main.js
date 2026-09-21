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