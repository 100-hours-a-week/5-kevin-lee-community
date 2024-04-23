let dropdown = document.querySelector('.dropdown');

dropdown.addEventListener('mouseenter', function(event) {
    let target = event.target;
    if (target.classList.contains('dropdown_dc')) {
        target.style.backgroundColor = '#e9e9e9'; // 호버 시 배경색 변경
    }
});

dropdown.addEventListener('mouseleave', function(event) {
    let target = event.target;
    if (target.classList.contains('dropdown_dc')) {
        target.style.backgroundColor = '#gainsboro'; // 마우스 나갈 때 배경색 원래대로 복구
    }
});
