var express = require('express');
var router = express.Router();

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}


router.post('/invest/chaogu/turntable/v1/activity/lottery', function(req, res) {

    sleep(500);

    var body = req.body;
    if (!lotteryResult) {
        lotteryResult = Math.random() > .5 ? '2000WLT' : '10000WLT';
        lotteryTime = new Date();
        res.json({
            err: 0,
            status: 1,
            msg: '',
            data: lotteryResult
        });
    } else {
        res.json({
            err: 8,
            status: 1,
            msg: '已经抽取过奖品',
            data: lotteryResult
        });
    }

});

module.exports = router;