var curTime = new Date();
var day = curTime.getDay();
curTime = parseInt(curTime.getHours() + "" + ("0" + curTime.getMinutes()).substr(-2) + "" + ("0" + curTime.getSeconds()).substr(-2));

if ((curTime > 173000 && day > 0 && day < 6) || (curTime > 153000 && day <= 0 && day >= 6))
  console.log("It's a good time!");
else
  console.log("It's not a good time!");