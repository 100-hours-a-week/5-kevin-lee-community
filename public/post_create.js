
document.getElementById('backward').addEventListener('click', function(){
    window.location.href = "/txt_list"
})
//받기만 하고, 전송 기능 없음
document.getElementById('image_input').addEventListener('change', function(event){
    const file = event.target.files[0];

    if(file){
        const reader = new FileReader();

        reader.readAsDataURL(file);
    }
})

document.getElementById('complete').addEventListener('click', function(event){
    event.preventDefault();

    let title_input = document.getElementById('title_input');
    let content_input = document.getElementById('content_input');    
    let title_value = title_input.value;
    let content_value = content_input.value;

    console.log(content_value);
    console.log(title_value);

    if(title_value == '' || content_value == ''){
        document.getElementById('helper_text').innerHTML = "제목, 내용을 모두 작성해주세요";
    }else{
        document.getElementById('helper_text').innerHTML = "helper text";
    }
});

document.getElementById('title_input').addEventListener('change', function(event){
    let title_input = document.getElementById('title_input');
    let content_input = document.getElementById('content_input');  
    let title_value = title_input.value;
    let content_value = content_input.value;

    if (title_value.length !=0 && content_value.length != 0){
        document.getElementById('complete').style.backgroundColor = "#7f6aee";
    }else{
        document.getElementById('complete').style.backgroundColor = "#ACADEB";
    }
});
document.getElementById('content_input').addEventListener('change', function(event){
    let title_input = document.getElementById('title_input');
    let content_input = document.getElementById('content_input');  
    let title_value = title_input.value;
    let content_value = content_input.value;

    if (title_value.length !=0 && content_value.length != 0){
        document.getElementById('complete').style.backgroundColor = "#7f6aee";
    }else{
        document.getElementById('complete').style.backgroundColor = "#ACADEB";
    }
});

