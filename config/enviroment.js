module.exports = {
    PORT: 3000, //포트번호
    DATABASE: "mongodb://localhost:27017/userDB", //Database 주소
    SERVICEKEY: '0OcOCTpyrFQOIDLX0DVGasPaRxrcM9ryOwYlMvpkIOvrppBtDhcHh44qOBdgv7NaF50zi9zIJ%2FrhZ6R%2FVTib7g%3D%3D', //오픈 API에서 발급받은 server key 값
    MONGO_SESSION_COLLECTION_NAME: "sessions",
    SESSION_SECRET: "your_secret", //세션 암호화에 사용할 값
    API_URL: "http://apis.data.go.kr/1470000/DURPrdlstInfoService/getDurPrdlstInfoList",
    PAGINATION: {
        PAGE_SIZE: 10
    }
};
