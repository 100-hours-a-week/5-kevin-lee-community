// 세션 ID를 유저 ID로 변환하는 함수
const getUserIdFromSession = (req) => {
    if (req.session && req.session.user_id) {
        return req.session.user_id;
    }
    console.log("null");
    return null;
};

module.exports = {
    getUserIdFromSession
};
