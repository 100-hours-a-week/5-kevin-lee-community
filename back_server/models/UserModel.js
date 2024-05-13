import fs from "fs"
class UserModel {
    constructor() {
        this.users = [];
        this.loaded = false;
        this.loadUsersPromise = this.loadUsers();
        this.loadUsers();
    }

    // 사용자 데이터를 비동기적으로 로드
    async loadUsers() {
        return fs.promises.readFile('/models/userinfo.json', 'utf-8')
        .then(data => {
            this.users = JSON.parse(data);
            this.loaded = true;
        })
        .catch(error => {
            console.log("loadUsers error");
        })
    }

    // 사용자 인증 메소드
    async authenticate(username, password) {
        if(!this.loaded){
            return this.loadUsersPromise.then(() => this.authenticate(username, password));
        }
        
        if(!username){
            return ([400, "email", null]);
        }else if(!password){
            return ([400, "password", null]);
        }

        const rstEmail = this.users.find(user => user.username === username);
        const rstPw = this.users.find(user => user.password === password);

        const isEmail = rstEmail ? true : false;
        const isPw = rstPw ? true : false;
        
        const rst = users;

        if(isEmail && isPw){
            return([200,"login_success" ,users]);
        }else if(isEmail && !isPw){
            return([401, "password", null])
        }else if(!isEmail && isPw){
            return([401,"email" ,null]);
        }
    }
}

export default UserModel;