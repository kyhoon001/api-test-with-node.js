const PAPI_URL = "http://apis.data.go.kr/1470000/MdcinGrnIdntfcInfoService/getMdcinGrnIdntfcInfoList";
const PSERVICEKEY = 'vD1R6%2F5GDy2VhZSs%2BpDXFJldyZE%2Fn9g8g00TnPQNoNrji8u4j%2BJVNwxNJwIWVffHEAGyM6W8veqUwsxLetRo7g%3D%3D';
//테스트
const {
    API_URL,
    SERVICEKEY
} = require('../../config/enviroment');
const request = require('request-promise');
const pageTitle = "외부 API 호출";
const xmlParser = require('xml2json');
const bodyParser = require('body-parser');
module.exports.index = async function (req, res) {
    res.render("external/mform", {
        pageTitle: pageTitle,
        //isUserLogedIn: req.isAuthenticated()
    });
};

module.exports.result = async function (req, res) {

            const Durresult = await request.get({
                headers: {
                    'Content-Type': 'application/json'
                },
                url: API_URL,
                timeout: 10000,
                qs: {
                    'ServiceKey': SERVICEKEY,
                    'itemName': encodeURI(req.query.itemName),
                    'pageNo': 1,
                    'numofrows': 3,


                    'type': "json",
                },
                qsStringifyOptions: {
                    encode: false,
                }
            }).then((result) => {

                const resultJson = JSON.parse(xmlParser.toJson(result))

                console.log("resultJson----")
                console.log(resultJson)

                return resultJson.response.body
            }).catch(e => {
                console.error("request Error :" + e)
            });
            //모양검색
            const PDurresult = await request.get({
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            url: PAPI_URL,
                            timeout: 10000,
                            qs: {
                                'ServiceKey': PSERVICEKEY,
                                'item_name': encodeURI(req.query.itemName),
                                'pageNo': 1,
                                'numofrows': 3,                          'type': "json",
                        },
                        qsStringifyOptions: {
                            encode: false,
                        }
                    }).then((result) => {

                    const presultJson = JSON.parse(xmlParser.toJson(result))


                    return presultJson.response.body 

                }).catch(e => {
                    console.error("request Error :" + e)
                });



                res.render("external/result", {
                    Search: req.query.itemName,
                    PDurresult: PDurresult, 
                    Durresult: Durresult,
                    query: req.query, 
                    pageTitle: pageTitle,
                    isUserLogedIn: req.isAuthenticated(),


                });

            };


            module.exports.index = async function (req, res) {
                res.render('external/form', {
                    pageTitle: "로그인",
                    alert: req.flash(),
                    isUserLogedIn: req.isAuthenticated()
                })
            };
