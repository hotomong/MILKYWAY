// 팝업
$(function(){
    $(".home_popup_wrap").show();
    $("body").addClass("scroll_none");

    $(".close").click(function(){
        $(".home_popup_wrap").fadeOut(1000);
        $("body").removeClass("scroll_none");
    });
});



// AOS 초기화
AOS.init();

// 모든 스크립트를 하나의 DOMContentLoaded 이벤트 리스너에 통합
document.addEventListener("DOMContentLoaded", () => {
  // GNB 메뉴, 페이지 이동 기능
  const pages = document.querySelectorAll(".page");
  const footer = document.querySelector("footer");
  const navDots = document.querySelectorAll(".nav-dot");
  let currentPage = parseInt(sessionStorage.getItem("currentPage")) || 0;
  let isScrolling = false;

  function goToPage(index, smooth = true) {
    if (index < 0) index = 0;
    if (index >= pages.length) index = pages.length - 1;
    currentPage = index;
    sessionStorage.setItem("currentPage", currentPage);
    pages[currentPage].scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
    navDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentPage);
    });

    // AOS 강제 업데이트 로직 추가
    // 페이지 이동 후, AOS 애니메이션을 감지하여 실행시킴
    setTimeout(() => {
      AOS.refresh();
      const currentSection = pages[currentPage];
      currentSection.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.add('aos-animate');
      });
    }, smooth ? 500 : 0); // 부드러운 스크롤 후 애니메이션 실행을 위해 딜레이 추가
  }

  goToPage(currentPage, false);

  window.addEventListener("wheel", (e) => {
    if (isScrolling) return;
    isScrolling = true;
    if (e.deltaY > 0) {
      if (currentPage < pages.length - 1) {
        goToPage(currentPage + 1);
      }
    } else {
      if (currentPage > 0) {
        goToPage(currentPage - 1);
      }
    }
    setTimeout(() => {
      isScrolling = false;
    }, 500);
  });








  // 고객문의 팝업
  const helpButton = document.querySelector('.help_button');
  const popup = document.querySelector('.popup_wrap');
  const closeButton = document.querySelector('.popup_wrap .close');

  if (helpButton && popup && closeButton) {
    helpButton.addEventListener('click', () => {
      popup.style.display = 'block';
    });
    closeButton.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  }

  
  // top 버튼 클릭 이벤트 (수정된 부분)
  const topButton = document.querySelector(".top_button");
  if (topButton) {
    topButton.addEventListener("click", (e) => {
      e.preventDefault();
      goToPage(0);
    });
  }








  // GNB 메뉴 클릭
  document.querySelectorAll(".gnb_menu a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = parseInt(link.getAttribute("data-slide"), 10) - 1;
      goToPage(target);
    });
  });









  // GNB 로고 클릭 이벤트 (수정된 부분)
  const gnbLogo = document.querySelector("#gnb h1 a");
  if (gnbLogo) {
    gnbLogo.addEventListener("click", (e) => {
      e.preventDefault();
      goToPage(0);
    });
  }










  // 우유, 치즈 등 제품 탭
  let activeSwiper = null;

  function initSwiper(tabElement) {
    if (activeSwiper) {
      activeSwiper.destroy(true, true);
      activeSwiper = null;
    }
    const swiperElement = tabElement.querySelector('.products2_swiper');
    if (swiperElement) {
      const prevButton = tabElement.querySelector('.custom-arrow .swiper-button-prev');
      const nextButton = tabElement.querySelector('.custom-arrow .swiper-button-next');
      const paginationElement = tabElement.querySelector('.swiper-pagination');
      activeSwiper = new Swiper(swiperElement, {
        slidesPerView: 2,
        spaceBetween: 15,
        loop: true,
        centeredSlides: false,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        pagination: {
          el: paginationElement,
          clickable: true,
        },
        navigation: {
          nextEl: nextButton,
          prevEl: prevButton,
        },
      });
    }
  }

  document.querySelectorAll('.products2_menu button').forEach(button => {
    button.addEventListener('click', function () {
      document.querySelectorAll('.products2_menu button').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.products2_tab-content .tab-pane').forEach(pane => pane.classList.remove('active'));
      this.classList.add('active');
      const targetId = this.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      targetPane.classList.add('active');
      initSwiper(targetPane);
    });
  });

  const firstTab = document.querySelector('.products2_tab-content .tab-pane.active');
  if (firstTab) {
    initSwiper(firstTab);
  }




// 굿즈
    var swiper = new Swiper(".goods_swiper", {
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
        
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    












  // 맵 가이드
  const zones = document.querySelectorAll(".map_zone");
  const contents = document.querySelectorAll(".map_content");
  zones.forEach(zone => {
    zone.addEventListener("click", () => {
      zones.forEach(z => z.classList.remove("active"));
      zone.classList.add("active");
      contents.forEach(c => c.classList.remove("active"));
      document.getElementById(zone.dataset.target).classList.add("active");
    });
  });











  // 이벤트 탭 (jQuery)
  if (typeof $ !== 'undefined') {
    $(".event_tab_content").hide();
    $("ul.event_tabs li:first").addClass("active");
    $(".event_tab_content:first").show();
    $("ul.event_tabs li").click(function (e) {
      e.preventDefault();
      $("ul.event_tabs li").removeClass("active");
      $(this).addClass("active");
      $(".event_tab_content").hide();
      var activeTab = $(this).find("a").attr("href");
      $(activeTab).show();
    });









    // 문의하기, Q&A 탭 (jQuery)
    $(".service_tab_content").hide();
    $("ul.service_tabs li:first").addClass("active").show();
    $(".service_tab_content:first").show();
    $("ul.service_tabs li").click(function (e) {
      e.preventDefault();
      $("ul.service_tabs li").removeClass("active");
      $(this).addClass("active");
      $(".service_tab_content").hide();
      var activeTab = $(this).find("a").attr("href");
      $(activeTab).fadeIn();
    });









    // Q&A (jQuery)
    $(".notice > ul > li").click(function () {
      $(this).children(".text_info").slideToggle();
      $(this).siblings().children(".text_info").slideUp();
      $(this).toggleClass("turn");
      $(this).siblings().removeClass("turn");
    });
  }









  // 오른쪽 네비 클릭
  navDots.forEach((dot, i) => {
    dot.addEventListener("click", () => goToPage(i));
  });





  // 푸터 버튼 클릭
  const footerBtn = document.querySelector(".footer_btn");
  if (footerBtn) {
    footerBtn.addEventListener("click", () => {
      if (footer.style.transform === "translateY(0px)") {
        footer.style.transform = "translateY(96%)";
      } else {
        footer.style.transform = "translateY(0)";
      }
    });
  }
});

// 네비게이션 배경 자동 감지 및 스타일 변경
function updateNavStyle() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const navRect = nav.getBoundingClientRect();
  const centerY = navRect.top + navRect.height / 2;
  const elementBehind = document.elementFromPoint(window.innerWidth - 100, centerY);

  if (elementBehind) {
    const computedStyle = window.getComputedStyle(elementBehind);
    const bgColor = computedStyle.backgroundColor;
    const rgb = bgColor.match(/\d+/g);
    if (rgb) {
      const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
      if (brightness < 128) {
        nav.classList.add('dark-bg');
      } else {
        nav.classList.remove('dark-bg');
      }
    }
  }
}



function setupNavThemeDetection() {
  const sections = document.querySelectorAll('section, .section');
  if (sections.length === 0) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const theme = entry.target.dataset.theme || 'light';
        document.documentElement.setAttribute('data-current-theme', theme);
      }
    });
  }, {
    threshold: 0.5
  });
  sections.forEach(section => observer.observe(section));
}

// 이벤트 리스너 바깥에서 함수 호출
window.addEventListener('scroll', updateNavStyle);
window.addEventListener('load', updateNavStyle);
document.addEventListener('DOMContentLoaded', setupNavThemeDetection);
