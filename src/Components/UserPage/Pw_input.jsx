import "../../Styles/Components/Pw_input.css"

function Pw_input(){
    return (
        <div >
            <div className="pw_input_frame">
                <h3 className="pw_text">비밀번호</h3>
                <input className="pw_input" placeholder="비밀번호를 입력하세요"></input>
            </div>
            
        </div>
    )
}

export default Pw_input;