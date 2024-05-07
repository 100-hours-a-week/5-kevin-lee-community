import '../../Styles/Components/Profile_input.css'

function Profile_input (){
    return (
        <div className="profile">
                <p className="profile_text">프로필 사진</p>
                <p id="porfileImg_helper" className="helper_text">*helper text</p>
                <input type="file" id="file_input" accept="image/*" style={{display: 'none'}} />
                <label htmlFor="file_input">
                    <img id="insert_img" src="/img/insert_img.png" />
                </label>
        </div>
    )
}

export default Profile_input