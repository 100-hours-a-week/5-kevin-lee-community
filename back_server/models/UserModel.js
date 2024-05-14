const fs = require("fs");
const path = require("path");

class UserModel {
    constructor() {
        this.users = [];
        const userInfoPath = path.join(__dirname,"..", "data",'userInfo.json');
        const data = fs.readFileSync(userInfoPath, 'utf8');
        this.users = JSON.parse(data).users;
        
    }
    // 사용자 인증 메소드
    authenticate(email, password) {
        if (!email) {
            return [400, "email"];
        } else if (!password) {
            return [400, "password"];
        }
        
        
        const user = this.users.find(user => user.email === email);
            

        if (user) {
            if (user.password === password) {
                return [200, "login_success", this.users];
            } else {
                return [401, "invalid_password"];
            }
        } else {
            return [401, "invalid_email"];
        }

 
    const rst = users;

  }
}

module.exports = UserModel;
