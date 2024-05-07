import '../../Styles/Components/Nick_input.css'

function Nick_input(){
    return (
        <div >
            <div className="nick_input_frame">
                <h3 className="nick_text">이메일</h3>
                <input className="nick_input" placeholder="닉네임을 입력하세요"></input>
            </div>
            
        </div>
    )
}

export default Nick_input