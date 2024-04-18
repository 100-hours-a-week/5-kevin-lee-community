let title_input = document.getElementById('title_input');
let content_input = document.getElementById('content_input');

document.getElementById('image_input').addEventListener('change', function(event){
    const file = event.target.files[0];

    if(file){
        const reader = new FileReader();

        reader.readAsDataURL(file);
    }
})

document.getElementById('complete').addEventListener('click', function(event){
    if(title_input.innerText.length == 0 ^ content_input.innerText.length == 0){
        document.getElementById('helper_text').innerHTML = "제목, 내용을 모두 작성해주세요";
    }else{
        document.getElementById('helper_text').innerHTML = "helper text";
    }
})

window.addEventListener('DOMContentLoaded', (event) => {
    if (title_input.innerText.length !=0 && content_input.innerText.length != 0){
        document.getElementById('complete').style.background = "#7f6aee";
    }
});