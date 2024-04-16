document.getElementById('navbar_logo').addEventListener('click', function(){
    go_login();
});
document.getElementById('login_btn').addEventListener('click', function(){
    go_login();
})
document.getElementById('file_input').addEventListener('change', function(event){
    const file = event.target.files[0];

    if(file){
        const reader = new FileReader();

        reader.onload = function(){
            const imageDataUrl = reader.result;
            document.getElementById('insert_img').src = imageDataUrl;
        };

        reader.readAsDataURL(file);
    }
    else {
        document.getElementById('insert_img').src="/public/img/insert_img.png" ;
    }
})
function go_login(){
    window.location.href = '/login';
}
