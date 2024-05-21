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
    loginAuth(email, password) {
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
    }

  signinAuth(email, password, nickname, img_file){
    if(!email){
        return [400, "email"];
    }else if(!password){
        return [400, "password"];
    }else if(!nickname){
        return [400, "nickname"];
    }

    const user = this.users.find(user => user.email === email);
    const nick = this.users.find(user => user.nickname === nickname);

    if(!user){
        if(!nick){
            //json에 등록
            const newUser = {
                userId: this.users.length + 1,
                email: email,
                password: password,
                nickname: nickname,
                profileImagePath: img_file || null,
                created_at: new Date(),
                updated_at: new Date(),
                deleted_at: null
            };
            
            this.users.push(newUser);
            this.saveUsers();

            return [201, "register_success", newUser];
        }else{
            //return 닉네임 중복
            return [400, "nickname"];
        }
    }else{
        //return 이름 중복
        return [400, "email"];
    }

    //html과 js에 포커스 아웃될 때, 아이다와 닉네임은 중복 검사를 보내야 함.
  }
  saveUsers(){
    const userInfoPath = path.join(__dirname, "..", "data", 'userInfo.json');
    const data = { users: this.users };
    fs.writeFileSync(userInfoPath, JSON.stringify(data, null, 2), 'utf8');
  }


  getUserById(userId) {
    return this.users.find(user => user.userId === parseInt(userId, 10));
  }

   updateUser(userId, updatedData) {
        const userIndex = this.users.findIndex(user => user.userId === parseInt(userId, 10));
        if (userIndex === -1) {
            return null;
        }
        this.users[userIndex] = { ...this.users[userIndex], ...updatedData, updated_at: new Date() };
        this.saveUsers();
        return this.users[userIndex];
    }

    changePassword(userId, newPassword) {
        const userIndex = this.users.findIndex(user => user.userId === parseInt(userId, 10));
        if (userIndex === -1) {
            return null;
        }
        this.users[userIndex].password = newPassword;
        this.users[userIndex].updated_at = new Date();
        this.saveUsers();
        return this.users[userIndex];
    }
    deleteUser(userId) {
        const userIndex = this.users.findIndex(user => user.userId === parseInt(userId, 10));
        if (userIndex === -1) {
            return null;
        }
        const deletedUser = this.users.splice(userIndex, 1)[0];
        this.saveUsers();
        return deletedUser;
    }

}


module.exports = UserModel;
