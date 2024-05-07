import Header from "../Components/Common/Header"
import Email_input from "../Components/UserPage/Email_input"
import Profile_input from "../Components/UserPage/Profile_input"
import Pw_input from "../Components/UserPage/Pw_input"
import RePw_input from "../Components/UserPage/RePw_input"
import Nick_input from "../Components/UserPage/Nick_input"
import '../Styles/Pages/Signin.css'
function Signin(){
    return (
        <div className="section">
            <Header nav='visible' title = 'visible' profile= 'hidden' ></Header>
            <h1 className="signin_title">회원가입</h1>
            <form className="signin_form">
                <Profile_input className='profile_input'/>
                <Email_input/>
                <p className="helper_text" id="eHelper_text">*Helper text</p>
                <Pw_input/>
                <p className="helper_text" id="pHelper_text">*Helper text</p>
                <RePw_input/>
                <p className="helper_text" id="RpHelper_text">*Helper text</p>
                <Nick_input/>
                <p className="helper_text" id="nHelper_text">*Helper text</p>
                <input type="submit" id="signin_btn" placeholder="회원가입"></input>
            </form>
            <button id="login_btn">로그인하러 가기</button>
        </div>
    )
}

export default Signin