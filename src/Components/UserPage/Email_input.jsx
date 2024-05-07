import "../../Styles/Components/Email_input.css"

function Email_input(){
    return (
        <div >
            <div className="email_input_frame">
                <h3 className="email_text">이메일</h3>
                <input className="email_input" placeholder="이메일 입력하세요"></input>
            </div>
            
        </div>
    )
}

export default Email_input;