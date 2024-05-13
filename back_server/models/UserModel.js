import fs from "fs"

class UserModel {
  constructor() {
    /**
     *  <code>this.loadUsersPromise = this.loadUsers();</code>
     *    - loadUsersPromise 변수는 loadUsers 함수를 실행한 결과를 가지고 있게 됩니다.
     *    - fs 모듈의 readFile() 함수의 첫 번째 인자 값은 파일의 절대 경로 혹은 상대 경로를 써야 합니다.
     *       - 지금 적시해둔`/models/userInfo.json` 경로의 파일을 호출하려면 우선 해당 파일이 존재 하는지 여부를 확인하는 로직이 선행 되어야 합니다.
     *       - 또한 파일 경로 시작하는 부분을 보면 `/models` 로 시작하고 있습니다. 이 경우 시스템의 최상위 경로인 "/" (루트) 위치에서부터 "model" 경로를 찾게 됩니다.
     *       - 당연히 파일은 없을 것이고 서버는 이 시점에서 폭파 되야 합니다. 그러나 catch 로 인해 터지지 않게 되고 결국 fs 모듈 내부에서 파일을 읽어오려는 시도를 하는 것으로 보입니다.
     *
     */
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

  }

  // 사용자 인증 메소드
  async authenticate(username, password) {
    /*
    이 코드에서 무한 호출이 발생하고 있습니다.
    authenticate 함수가 autheticate 함수를 비동기적으로 무한하게 호출하고 있습니다.
    이로 인해 리크가 발생합니다.

    */
    if (!this.loaded) {
      return this.loadUsersPromise.then(() => this.authenticate(username, password));
    }

    if (!username) {
      return ([400, "email", null]);
    } else if (!password) {
      return ([400, "password", null]);
    }

    const rstEmail = this.users.find(user => user.username === username);
    const rstPw = this.users.find(user => user.password === password);

    // GPT 프롬프팅 -> "rstEmail ? true : false" 이 코드와 "!!rstEmail" 이 같은 이유를 설명해라.
    const isEmail = rstEmail ? true : false;  // 이 부분은 !!rstEmail 로 작성해도 결과가 동일 합니다.
    const isPw = rstPw ? true : false;

    const rst = users;

    if (isEmail && isPw) {
      /*
      연속성과 관련 없는 데이터를 배열로 리턴하면 유지보수에 문제가 생길 수 있습니다.
      이 경우는 아래와 같이 하는게 좋을 것으로 판단됩니다.

      return {
        state: 200,
        message: "login_success",
        obj_user : users
      }
       */
      return ([200, "login_success", users]);
    } else if (isEmail && !isPw) {
      return ([401, "password", null])
    } else if (!isEmail && isPw) {
      return ([401, "email", null]);
    }
  }
}

export default UserModel;