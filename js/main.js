// 全站共用互動：導覽列切換、簡單無障礙處理
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.setAttribute('aria-expanded', String(!expanded));
      if (!expanded) mainNav.classList.add('open');
      else mainNav.classList.remove('open');
    });
  }

  // 簡單表單防呆（如有表單）
  const complaintForm = document.getElementById('complaint-form');
  if (complaintForm) {
    complaintForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('感謝您的申訴。這是範例行為，請將表單送出整合至後端或電子郵件。');
      complaintForm.reset();
    });
  }
});
