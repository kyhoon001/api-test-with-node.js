const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

/**
 * 입력받은 값으로 User의 아이디와 비밀번호를 체크
 */

/* Form Data에서 name으로 설정한값과 서버내에서 사용할 값을 맵핑시켜줍니다.*/
/* <input name="user_email" class="form-control" type="email"/> */
/* 위와 같은 소스를 사용하였으므로 user_email로 설정한 아이디필드를 usernameField로 정해줍니다.*/
module.exports = new LocalStrategy({
        usernameField: 'user_email',
        passwordField: 'user_password',
    },
    async function (email, password, done) {

        /* 우선 이메일을 기준으로 검색합니다. */
        const user = await User.findOne({
            "email":email,
        }).exec();

        if (user) {
            /* 이메일로 검색된 유저가 있다면 패스워드가 맞는지 확인합니다.*/

            const temp = user.authenticate(password);
            if (user.authenticate(password)) {
                /* 유저가 있다면 */
                return done(null, user)
            } else {
                /* 패스워드가 틀리다면 */
                return done(null, false,"패스워드가 틀립니다."); //설정된값은 req.flash()에서 받은 값에서 error object로 받습니다.
            }
        } else {
            /*이메일로도 없는경우 */
            return done(null, false,"매칭되는 아이디가 없습니다."); //설정된값은 req.flash()에서 받은 값에서 error object로 받습니다.
        }
    },
);
