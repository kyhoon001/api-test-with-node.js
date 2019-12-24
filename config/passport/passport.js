const local = require('./local');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {


    /* 성공할경우 이쪽으로 데이터를 받습니다.*/
    /* 로그인에 성공하였다면 이쪽에서 어떤 사용자 정보를 세션에 저장할지 설정해줍니다.*/
    passport.serializeUser(function (user, done) {
        done(null, user.email)
    });


    /* 사용자로부터 받은 세션정보 실제 DB의 데이터와 비교하여줍니다.*/
    /* 세션값과 나의 값을 체크해줌으로써 보안을 위한 기능입니다. */
    passport.deserializeUser(function (email, done) {

        const profile = {email: email};
        done(null, profile);
    });

    // use these strategies
    passport.use(local)
};