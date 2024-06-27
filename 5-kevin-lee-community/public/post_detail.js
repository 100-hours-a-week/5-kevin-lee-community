// let comment_target = null;
// const commant_delete_modal = document.getElementById('commantDelete_container');

// //숫자 범위 벗어나면 짜르기
// function formatNum(num){
//     if (num >= 100000) {
//         return '100k';
//     } else if (num >= 10000) {
//         return '10k';
//     } else if (num >= 1000) {
//         return '1k';
//     } else {
//         return num;
//     }
// }


// document.addEventListener("DOMContentLoaded", () => {
//     const pathname = window.location.pathname;
//     const postId = pathname.split('/').pop(); // 마지막 부분이 postId
//     if (!postId) {
//         console.error('No post ID found in the URL');
//         return;
//     }

//     const postsContainer = document.getElementById('post');
//     if (!postsContainer) {
//         console.error('No element with id "post" found in the DOM');
//         return;
//     }

//     // 서버에서 postInfo 데이터를 가져옵니다.
//     fetch(`http://localhost:4000/posts/${postId}`)
//         .then(response => response.json())
//         .then(response => {
//             if ((response.status === 200 || response.status === 201)&& response.data) {
//                 const post = response.data;

//                 const postDiv = document.createElement('div');
//                 postDiv.classList.add('post');

//                 const createdAt = new Date(post.created_at);
//                 const date_yyyymmdd = createdAt.toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 변환
//                 const date_time = createdAt.toTimeString().slice(0, 8); // HH:MM:SS 형식으로 변환

//                 const comment_counts = formatNum(post.comment_counts);
//                 const hits = formatNum(post.hits);
//                 const likes = formatNum(post.likes);
//                 postDiv.innerHTML = `<div class="post_title_category">
//                     <p class="post_title_txt">${post.post_title}</p>
//                 </div>
//                 <div class="post_creator_category">
//                     <div class="post_creator_img"></div>
//                     <div class="post_creator_name">${post.nickname}</div>
//                     <div class="post_creator_date">${date_yyyymmdd} ${date_time}</div>
//                     <div class="post_creator_modifi">
//                         <button id="post_creator_correction">수정</button>
//                         <button id="post_creator_delete">삭제</button>
//                     </div>
//                 </div>
//                 <hr class="horizontal-rule2"/>
//                 <div class="post_body">
//                     <div class="post_body_img"></div>
//                     <div class="post_body_txt">${post.post_content}</div>
//                     <div class="post_body_cnt">
//                         <div class="post_body_hits">
//                             <p id="hits_cnt">${post.hits}</p>
//                             <p class="hits_intro">조회수</p>
//                         </div>
//                         <div class="post_body_commants">
//                             <p id="commants_cnt">${post.comment_counts}</p>
//                             <p class="commants_intro">댓글</p>
//                         </div>
//                     </div>
//                 </div>`;

//                 postsContainer.appendChild(postDiv);

//                 const post_delete_modal = document.getElementById('postDelete_container');
                
//                 //게시글 삭제 모달 버튼
//                 document.getElementById('post_creator_delete').addEventListener('click', function(){
//                     post_delete_modal.classList.remove('hidden');
//                     document.body.style.overflow = 'hidden';
//                 });

//                 //게시글 삭제 취소 버튼
//                 document.getElementById('postDelete_cancel').addEventListener('click', function(){
//                     post_delete_modal.classList.add('hidden');
//                     document.body.style.overflow = 'auto';
//                 })
//                 //게시글 수정 버튼 이벤트
//                 document.getElementById('post_creator_correction').addEventListener('click', function(){
//                     window.location.href = `/post/edit/${postId}`
//                 });
                
//                 document.getElementById('postDelete_confirm').addEventListener('click', function(){
//                     fetch(`http://localhost:4000/posts/${postId}`, {method : 'DELETE'})
//                     .then(response => {
//                         if (response.status === 200) {
//                             alert('게시글이 삭제되었습니다.');
//                             window.location.href = '/post';
//                         } else {
//                             alert('게시글 삭제에 실패했습니다.');
//                         }
//                     })
//                 })
               
//             } else {
//                 console.error('Failed to fetch post details:', response);
//             }
//         })
        
//     // 서버에서 comments 데이터를 가져옵니다.
//     fetch(`http://localhost:4000/posts/${postId}/comments`)
//     .then(response => response.json())
//     .then(response => {
//         if (response.status === 200 && response.data) {
//             const comments = response.data;
//             const commentsContainer = document.getElementById('comments_container');
            
//             comments.forEach(comment => {
//                 const commentDiv = document.createElement('div');
//                 commentDiv.classList.add('comments_list1'); // Assuming a class for styling
            
//                 const createdAt = new Date(comment.created_at);
//                 const date_yyyymmdd = createdAt.toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 변환
            
//                 commentDiv.innerHTML = `
//                     <div class="comments_list1_top">
//                         <p class="comments_list1_creator_name">${comment.nickname}</p>
//                         <p class="comments_list1_date">${date_yyyymmdd}</p>
//                         <div class="comments_list1_modifi">
//                             <button class="comment_correctBtn" id="comments_list1_correctBtn_${comment.comment_id}">수정</button>
//                             <button class="comment_deleteBtn" id="comments_list1_deleteBtn_${comment.comment_id}">삭제</button>
//                         </div>
//                     </div>
//                     <div class="comments_list1_content" id="comments_list1_creator_content_${comment.comment_id}">
//                         ${comment.comment_content}
//                     </div>`;
            
//                 commentsContainer.appendChild(commentDiv);
            
//                 // Add event listeners for edit and delete buttons
//                 document.getElementById(`comments_list1_correctBtn_${comment.comment_id}`).addEventListener('click', function() {
//                     correct_comment(comment.comment_id, comment.comment_content);
//                 });
            
//                 document.getElementById(`comments_list1_deleteBtn_${comment.comment_id}`).addEventListener('click', function() {
//                     delete_comment(comment.comment_id);
//                 });

                
//             });


//             // document.getElementById('commantDelete_cancel').addEventListener('click', function(){
//             //     comment_delete_modal.classList.add('hidden');
//             //     document.body.style.overflow = 'auto';
//             // })

            
//             document.getElementById('commantDelete_cancel').addEventListener('click', function(){
//                 comment_delete_modal.classList.add('hidden');
//                 document.body.style.overflow = 'auto';
//             })

//             document.getElementById('comments_btn').addEventListener('click', function(){
//                 if(comment_target == null){
//                     add_comment(postId);
//                 }else{
//                     update_comment(comment_target);
//                 }
//             });
            
//     } else {
//         console.error('Failed to fetch comments:', response);
//     }
// });

// });

// function add_comment(postId) {
//     const content = document.getElementById('comments_input').value;
//     const userId = "1"; // Replace with actual user ID
//     fetch(`http://localhost:4000/posts/${postId}/comments`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId, content }),
//     })
//     .then(response => response.json())
//     .then(response => {
//         if (response.status === 201 && response.data) {
//             alert('댓글이 등록되었습니다.');
//             //location.reload(); // Reload to fetch the new comment
//         } else {
//             alert('댓글 등록에 실패했습니다.');
//         }
//     });
// }

// function correct_comment(commentId, content){
//     //댓글창에 내용 넣기
//     let comment_output= document.getElementById('comments_input');
//     comment_output.value = content;

//     //target id 지정
//     comment_target = commentId;

//     //버튼 댓글 수정으로 변경
//     document.getElementById('comments_btn').innerText ="댓글 수정";
// }


// function update_comment(commentId) {
//     const content = document.getElementById('comments_input').value;
//     fetch(`http://localhost:4000/posts/comments/${commentId}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ content }),
//     })
//     .then(response => response.json())
//     .then(response => {
//         if (response.status === 200 && response.data) {
//             alert('댓글이 수정되었습니다.');
//             location.reload(); // Reload to reflect the changes
//         } else {
//             alert('댓글 수정에 실패했습니다.');
//         }
//     });
// }

// function delete_comment(commentId) {
//     commant_delete_modal.classList.remove('hidden');
//     document.body.style.overflow = 'hidden';
//     document.getElementById('commantDelete_confirm').addEventListener('click', function() {
//         fetch(`http://localhost:4000/posts/comments/${commentId}`, { method: 'DELETE' })
//         .then(response => {
//             if (response.status === 200) {
//                 alert('댓글이 삭제되었습니다.');
//                 location.reload(); // Reload to remove the deleted comment
//             } else {
//                 alert('댓글 삭제에 실패했습니다.');
//             }
//         });
//     });
// }

// //댓글 입력시 검사 기능
// document.getElementById('comments_input').addEventListener('change', function(){
//     check_comment();
// })







// // //댓글 등록 기능 전역 변수 comment_target에 id를 저장해서, 해당 내용 변경 혹은 입력으로 변경
// // document.getElementById('comments_btn').addEventListener('click', function(){
// //     if(comment_target == null){
// //         //아직 미구현
// //     }else{
// //         //댓글 수정 기능. 
// //         //target 본문에 comments_input에 입력한 내용 대입
// //         //애는 DOM트리만 변경. 파일 내용은 변경되지 않음.
// //         //3번 과제 진행시, 수정.
// //         document.getElementById(comment_target).innerText = document.getElementById('comments_input').value;
// //         document.getElementById('comments_input').value = "";

// //         //버튼 원상복귀
// //         document.getElementById('comments_btn').innerText ="댓글 수정";
// //         comment_target = null;
// //     }
// // })





// // //5번 댓글 수정 
// // function correct_comment(){
// //     //타겟 아이디
// //     target_id = "comments_list1_creator_content";
// //     //내용 가져오기
// //     let content =  document.getElementById(target_id).innerText;

// //     //댓글창에 내용 넣기
// //     let comment_output= document.getElementById('comments_input');
// //     comment_output.value = content;

// //     //target id 지정
// //     comment_target = target_id;

// //     //버튼 댓글 수정으로 변경
// //     document.getElementById('comments_btn').innerText ="댓글 수정";

// // }

// //댓글 삭제 기능, 확인 버튼 미구현
// //3번 과제 진행시 수정
// // function delete_comment(){
// //     comment_delete_modal.classList.remove('hidden');
// //     document.body.style.overflow = 'hidden';
// // }


// //뒤로가기 이벤트
// document.getElementById('navigate_icon').addEventListener('click', function(){
//     window.location.href = "/post/"
// }); 

// document.getElementById('comments_input').addEventListener('change', function(){
//     check_comment();
// });

// function check_comment(){
//     let comment_input = document.getElementById('comments_input');
//     let comment_value = comment_input.value;
//     let comment_btn = document.getElementById('comments_btn');

//     if(comment_value.length == 0){
//         //버튼 비활성화 기능
//         comment_btn.disabled = true;
//         comment_btn.style.backgroundColor = "#aca0eb"
//     }else if(comment_value.length >0){
//         comment_btn.disabled = false;
//         comment_btn.style.backgroundColor = "#7f6aee"
//     }
// }
function getCookieID(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        if (name == cookiePair[0].trim()) {
            console.log(decodeURIComponent(cookiePair[1]));
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}


let comment_target = null;
const sessionID = getCookieID("sessionID");
const commant_delete_modal = document.getElementById('commantDelete_container');

// 숫자 범위 벗어나면 짜르기
function formatNum(num) {
    if (num >= 100000) {
        return '100k';
    } else if (num >= 10000) {
        return '10k';
    } else if (num >= 1000) {
        return '1k';
    } else {
        return num;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const pathname = window.location.pathname;
    const postId = pathname.split('/').pop(); // 마지막 부분이 postId
    if (!postId) {
        console.error('No post ID found in the URL');
        return;
    }

    const postsContainer = document.getElementById('post');
    if (!postsContainer) {
        console.error('No element with id "post" found in the DOM');
        return;
    }

    // 서버에서 postInfo 데이터를 가져옵니다.
    fetch(`http://localhost:4000/posts/${postId}`)
        .then(response => response.json())
        .then(response => {
            if ((response.status === 200 || response.status === 201) && response.data) {
                const post = response.data;

                const postDiv = document.createElement('div');
                postDiv.classList.add('post');

                const createdAt = new Date(post.created_at);
                const date_yyyymmdd = createdAt.toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 변환
                const date_time = createdAt.toTimeString().slice(0, 8); // HH:MM:SS 형식으로 변환

                const comment_counts = formatNum(post.comment_counts);
                const hits = formatNum(post.hits);
                const likes = formatNum(post.likes);
                postDiv.innerHTML = `<div class="post_title_category">
                    <p class="post_title_txt">${post.post_title}</p>
                </div>
                <div class="post_creator_category">
                    <div class="post_creator_img"></div>
                    <div class="post_creator_name">${post.nickname}</div>
                    <div class="post_creator_date">${date_yyyymmdd} ${date_time}</div>
                    <div class="post_creator_modifi">
                        <button id="post_creator_correction">수정</button>
                        <button id="post_creator_delete">삭제</button>
                    </div>
                </div>
                <hr class="horizontal-rule2"/>
                <div class="post_body">
                    <div class="post_body_img"></div>
                    <div class="post_body_txt">${post.post_content}</div>
                    <div class="post_body_cnt">
                        <div class="post_body_hits">
                            <p id="hits_cnt">${post.hits}</p>
                            <p class="hits_intro">조회수</p>
                        </div>
                        <div class="post_body_commants">
                            <p id="commants_cnt">${post.comment_counts}</p>
                            <p class="commants_intro">댓글</p>
                        </div>
                    </div>
                </div>`;

                postsContainer.appendChild(postDiv);

                const post_delete_modal = document.getElementById('postDelete_container');
                
                // 게시글 삭제 모달 버튼
                document.getElementById('post_creator_delete').addEventListener('click', function(){
                    post_delete_modal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                });

                // 게시글 삭제 취소 버튼
                document.getElementById('postDelete_cancel').addEventListener('click', function(){
                    post_delete_modal.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                });

                // 게시글 수정 버튼 이벤트
                document.getElementById('post_creator_correction').addEventListener('click', function(){
                    window.location.href = `/post/edit/${postId}`;
                });
                
                //게시글 삭제 이벤트
                document.getElementById('postDelete_confirm').addEventListener('click', function(){
                    fetch(`http://localhost:4000/posts/${postId}`, 
                        { 
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${sessionID}`
                            },
                            credentials: 'include'
                        })
                    .then(response => {
                        if (response.status === 200) {
                            alert('게시글이 삭제되었습니다.');
                            window.location.href = '/post';
                        } else {
                            alert('게시글 삭제에 실패했습니다.');
                        }
                    });
                });
            } else {
                console.error('Failed to fetch post details:', response);
            }
        });

    // 서버에서 comments 데이터를 가져옵니다.
    fetch(`http://localhost:4000/posts/${postId}/comments`)
        .then(response => response.json())
        .then(response => {
            if (response.status === 200 && response.data) {
                const comments = response.data;
                const commentsContainer = document.getElementById('comments_container');
                
                comments.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('comments_list1'); // Assuming a class for styling
                
                    const createdAt = new Date(comment.created_at);
                    const date_yyyymmdd = createdAt.toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 변환
                
                    commentDiv.innerHTML = `
                        <div class="comments_list1_top">
                            <p class="comments_list1_creator_name">${comment.nickname}</p>
                            <p class="comments_list1_date">${date_yyyymmdd}</p>
                            <div class="comments_list1_modifi">
                                <button class="comment_correctBtn" id="comments_list1_correctBtn_${comment.comment_id}">수정</button>
                                <button class="comment_deleteBtn" id="comments_list1_deleteBtn_${comment.comment_id}">삭제</button>
                            </div>
                        </div>
                        <div class="comments_list1_content" id="comments_list1_creator_content_${comment.comment_id}">
                            ${comment.comment_content}
                        </div>`;
                
                    commentsContainer.appendChild(commentDiv);
                
                    // Add event listeners for edit and delete buttons
                    document.getElementById(`comments_list1_correctBtn_${comment.comment_id}`).addEventListener('click', function() {
                        correct_comment(comment.comment_id, comment.comment_content);
                    });
                
                    document.getElementById(`comments_list1_deleteBtn_${comment.comment_id}`).addEventListener('click', function() {
                        delete_comment(postId,comment.comment_id);
                    });
                });

                document.getElementById('comments_btn').addEventListener('click', function(){
                    if(comment_target == null){
                        add_comment(postId);
                    } else {
                        update_comment(postId, comment_target);
                    }
                });

                document.getElementById('commantDelete_cancel').addEventListener('click', function(){
                    commant_delete_modal.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                });

                document.getElementById('comments_input').addEventListener('change', function(){
                    check_comment();
                });
            } else {
                console.error('Failed to fetch comments:', response);
            }
        });
});

//댓글 등록 이벤트
function add_comment(postId) {
    const content = document.getElementById('comments_input').value;
    const userId = "1"; // Replace with actual user ID
    fetch(`http://localhost:4000/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionID}`
        },
        credentials: 'include',
        body: JSON.stringify({ userId, content }),
    })
    .then(response => response.json())
    .then(response => {
        if (response.status === 201 && response.data) {
            alert('댓글이 등록되었습니다.');
            location.reload(); // Reload to fetch the new comment
        } else {
            alert('댓글 등록에 실패했습니다.');
        }
    });
}

function correct_comment(commentId, content){
    // 댓글창에 내용 넣기
    let comment_output = document.getElementById('comments_input');
    comment_output.value = content;

    // target id 지정
    comment_target = commentId;

    // 버튼 댓글 수정으로 변경
    document.getElementById('comments_btn').innerText = "댓글 수정";
}

//댓글 수정 이벤트
function update_comment(postId, commentId) {
    const content = document.getElementById('comments_input').value;
    fetch(`http://localhost:4000/posts/${postId}/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionID}`
        },
        credentials: 'include',
        body: JSON.stringify({ content }),
    })
    .then(response => response.json())
    .then(response => {
        if (response.status === 200 && response.data) {
            alert('댓글이 수정되었습니다.');
            location.reload(); // Reload to reflect the changes
        } else {
            alert('댓글 수정에 실패했습니다.');
        }
    });
}

//댓글 삭제 이벤트
function delete_comment(postId, commentId) {
    commant_delete_modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.getElementById('commantDelete_confirm').addEventListener('click', function() {
        fetch(`http://localhost:4000/posts/${postId}/comments/${commentId}`, { 
            method: 'DELETE' ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionID}`
            },
            credentials: 'include'
        })
        .then(response => {
            if (response.status === 200) {
                alert('댓글이 삭제되었습니다.');
                location.reload(); // Reload to remove the deleted comment
            } else {
                alert('댓글 삭제에 실패했습니다.');
            }
        });
    });
}

// 댓글 입력시 검사 기능
document.getElementById('comments_input').addEventListener('change', function(){
    check_comment();
});

function check_comment() {
    let comment_input = document.getElementById('comments_input');
    let comment_value = comment_input.value;
    let comment_btn = document.getElementById('comments_btn');

    if (comment_value.length === 0) {
        // 버튼 비활성화 기능
        comment_btn.disabled = true;
        comment_btn.style.backgroundColor = "#aca0eb";
    } else if (comment_value.length > 0) {
        comment_btn.disabled = false;
        comment_btn.style.backgroundColor = "#7f6aee";
    }
}

// 뒤로가기 이벤트
document.getElementById('navigate_icon').addEventListener('click', function(){
    window.location.href = "/post/";
});
