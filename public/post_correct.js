document.getElementById('post_correct_img_btn').addEventListener('change', function(event){
    const file = event.target.files[0];
    //첫 선택만 가져오기

    if(file){
        const reader = new FileReader();

        reader.onload = function(){
            const imageDataUrl = reader.result;
            //위가 선택된 파일
        };

        reader.readAsDataURL(file);
    }
})

document.getElementById('post_correct_img_correctBtn').addEventListener('click', function(){
    //게시글 수정 기능 추가필요

    window.location.href = '/post_detail';
})