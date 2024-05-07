import '../Styles/Pages/Login.css';
import Eamil_input from '../Components/UserPage/Email_input.jsx'
import Pw_input from '../Components/UserPage/Pw_input.jsx'
import Header from '../Components/Common/Header.jsx'

function Login(){

    return(
        <div className='section'>
            <Header nav = "hidden" title ="visible" profile = "hidden"/>
            <h1 className='login_title'>로그인</h1>

            <form className='login_form'>
                <Eamil_input className='email_input'></Eamil_input>
                <Pw_input className='pw_input'></Pw_input>
                <p id='helper_text'>*helper text</p>
                <input className='login_btn' type='submit' placeholder='로그인'></input>
            </form>
            <div><button className='signin_btn'>회원가입</button></div>
        </div>
    )
}

export default Login;