import "../../Styles/Components/Header.css"

function Header(props){
    const nav = props.nav;
    const title = props.title;
    const profile = props.profile;
    
    const nav_style = {
        visibility: nav
    }
    const title_style = {
        visibility :title
    }
    const profile_style = {
        visibility : profile
    }

    return(
        <div >
            <div className="header">
                <img id="backward" style={nav_style} className="nav_icon" src="img/navigate_before.svg"/>
                <h1 className="header_title" style={title_style}>아무 말 대잔치</h1>
                <img className="header_profile" src="img/profile_img.jpg" style={profile_style}/>
            </div>
           <hr></hr>
        </div>
    );
}

export default Header;
