const UserModel = require('../models/UserModel');
const userModel = new UserModel();

exports.checkEmail = (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ status: 400, message: 'invalid_email' });
    }

    const user = userModel.users.find(user => user.email === email);
    if (user) {
        return res.status(400).json({ status: 400, message: 'already_exist_email' });
    } else {
        return res.status(200).json({ status: 200, message: 'available_email' });
    }
};

exports.checkNickname = (req, res) => {
    const nickname = req.query.nickname;
    if (!nickname) {
        return res.status(400).json({ status: 400, message: 'invalid_nickname' });
    }

    const user = userModel.users.find(user => user.nickname === nickname);
    if (user) {
        return res.status(400).json({ status: 400, message: 'already_exist_nickname' });
    } else {
        return res.status(200).json({ status: 200, message: 'available_nickname' });
    }
};
exports.getUserById = (req, res) => {
    const userId = req.params.user_id;

    if (!userId) {
        return res.status(400).json({ status: 400, message: 'invalid_user_id' });
    }

    const user = userModel.getUserById(userId);

    if (user) {
        return res.status(200).json({ status: 200, message: 'success', data: user });
    } else {
        return res.status(404).json({ status: 404, message: 'user_not_found' });
    }
};

exports.signup = (req, res) => {
    try {
        const { email, password, nickname, profileImagePath } = req.body;

        // 유효성 검사
        if (!email || !password || !nickname) {
            return res.status(400).json({ status: 400, message: 'missing_required_fields', data: null });
        }

        // 이메일 중복 확인
        const existingUser = userModel.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ status: 400, message: 'email_already_exists', data: null });
        }

        // 새로운 사용자 생성
        const newUser = {
            email,
            password,
            nickname,
            profile_image_path: profileImagePath || '/default/path/to/profile.jpg'
        };

        const createdUser = userModel.addUser(newUser);

        // userId가 null인 경우 확인
        if (!createdUser.userId) {
            throw new Error('User ID is null');
        }

        return res.status(201).json({ status: 201, message: 'register_success', data: { userId: createdUser.userId } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
};


exports.updateUser = (req, res) => {
    const userId = req.params.user_id;
    const { nickname, profileImagePath } = req.body;

    if (!nickname) {
        return res.status(400).json({ status: 400, message: 'invalid_nickname' });
    }

    const updatedData = { nickname };
    if (profileImagePath) {
        updatedData.profileImagePath = profileImagePath;
    }

    const updatedUser = userModel.updateUser(userId, updatedData);

    if (updatedUser) {
        return res.status(200).json({ status: 200, message: 'update_user_data_success', data: updatedUser });
    } else {
        return res.status(404).json({ status: 404, message: 'user_not_found' });
    }
};

exports.changePassword = (req, res) => {
    const userId = req.params.user_id;
    const { password: newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ status: 400, message: 'invalid_new_password' });
    }

    const user = userModel.getUserById(userId);
    if (!user) {
        return res.status(404).json({ status: 404, message: 'not_found_user' });
    }

    const updatedUser = userModel.changePassword(userId, newPassword);
    if (updatedUser) {
        return res.status(201).json({ status: 201, message: 'change_user_password_success', data: updatedUser });
    } else {
        return res.status(500).json({ status: 500, message: 'internal_server_error' });
    }
};

exports.deleteUser = (req, res) => {
    const userId = req.params.user_id;

    if (!userId) {
        return res.status(400).json({ status: 400, message: 'invalid_user_id' });
    }

    const user = userModel.getUserById(userId);
    if (!user) {
        return res.status(404).json({ status: 404, message: 'not_found_user' });
    }

    const deletedUser = userModel.deleteUser(userId);
    if (deletedUser) {
        return res.status(200).json({ status: 200, message: 'delete_user_data_success', data: null });
    } else {
        return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
};

