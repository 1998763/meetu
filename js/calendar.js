    var zeroize = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };
    
    //日期补零
    function pad(num, n) {  
        var len = num.toString().length;  
        while(len < n) {  
            num = "0" + num;  
            len++;  
        }  
        return num;  
    }  
    
    //日期增加
    function HS_DateAdd(interval,number,date){
        number = parseInt(number);
        if (typeof(date)=="string"){var date = new Date(date.split("-")[0],date.split("-")[1],date.split("-")[2])}
        if (typeof(date)=="object"){var date = date}
        switch(interval){
            case "y":return new Date(date.getFullYear()+number,date.getMonth(),date.getDate()); break;
            case "m":return new Date(date.getFullYear(),date.getMonth()+number,checkDate(date.getFullYear(),date.getMonth()+number,date.getDate())); break;
            case "d":return new Date(date.getFullYear(),date.getMonth(),date.getDate()+number); break;
            case "w":return new Date(date.getFullYear(),date.getMonth(),7*number+date.getDate()); break;
        }
    }
    //检查日期
    function checkDate(year,month,date){
        var enddate = ["31","28","31","30","31","30","31","31","30","31","30","31"];
        var returnDate = "";
        if (year%4==0){enddate[1]="29"}
        if (date>enddate[month]){returnDate = enddate[month]}else{returnDate = date}
        return returnDate;
    }
    //每个星期的天数
    function WeekDay(date){
        var theDate;
        if (typeof(date)=="string"){theDate = new Date(date.split("-")[0],date.split("-")[1],date.split("-")[2]);}
        if (typeof(date)=="object"){theDate = date}
        return theDate.getDay();
    }
    
    //日期选择器
    function HS_calendar(){
        var lis = "";
        var style = "";
        style +="<style type='text/css'>";
        style +=".order{width:100%;margin:0 auto;background-color: #808080;filter:alpha(opacity=90);-moz-opacity:0.9;opacity:0.9;position:absolute;z-index:1;}";
        style +=".calendar ul {list-style-type:none; margin:0; padding:0;}";
        style +=".calendar .day {display:box; display:-webkit-box; background-color:#FFFFFF; height:20px; line-height:20px}";
        style +=".calendar .date {display:box; display:-webkit-box;}";
        style +=".calendar .day li{box-flex: 1; -webkit-box-flex: 1; width: 38px; font-size: 12px; color: #fff; background: #5d9cec; text-align: center}";
        style +=".calendar .date li{box-flex: 1; -webkit-box-flex: 1; background:#f8f8f8; width:38px; height:48px; line-height:48px; text-align:center;}";
        style +=".calendar .date .today{background:#5d9cec;color:#fff}";
        style +=".calendar .date li span{display:block;height:20px;color:#333333;}";
        style +=".calendar li a {display:block; height:100%; background:#f8f8f8;text-decoration:none; font-size:16px; color:#333333}";
        style +=".calendar li a span{font-size:12px;color:#666666 !important;}";
        style +=".calendar li a:active{background:#e6e6e6; text-decoration:none;color:#666666;}";
        style +=".selectThisYear a, .selectThisMonth a{text-decoration:none; margin:0 2px; color:#000; font-weight:bold}";
        style +=".calendar .LastMonth, .calendar .NextMonth{ text-decoration:none; color:#000; font-size:18px; font-weight:bold; line-height:16px;}";
        style +=".calendar .LastMonth { float:left;margin-left:60px;}";
        style +=".calendar .NextMonth { float:right;margin-right:60px;}";
        style +="</style>";
        
        var now;
        if (typeof(arguments[0])=="string"){
            selectDate = arguments[0].split("-");
            var year = selectDate[0];
            var month = parseInt(selectDate[1])-1+"";
            var date = selectDate[2];
            now = new Date(year,month,date);
        }else if (typeof(arguments[0])=="object"){
            now = arguments[0];
        }
        var lastMonthEndDate = HS_DateAdd("d","-1",now.getFullYear()+"-"+now.getMonth()+"-01").getDate();
        var lastMonthDate = WeekDay(now.getFullYear()+"-"+now.getMonth()+"-01");
        var thisMonthLastDate = HS_DateAdd("d","-1",now.getFullYear()+"-"+(parseInt(now.getMonth())+1).toString()+"-01");
        var thisMonthEndDate = thisMonthLastDate.getDate();
        var thisMonthEndDay = thisMonthLastDate.getDay();
        var todayObj = new Date();
        today = todayObj.getFullYear()+"-"+todayObj.getMonth()+"-"+todayObj.getDate();
        for (i=0; i<lastMonthDate; i++){  // Last Month's Date
            if (i == 0) lis += "<ul class='date'>";
            lis += "<li class='lastMonthDate'></li>";
            lastMonthEndDate--;
        }
        
        for (i=1; i<=thisMonthEndDate; i++){ // Current Month's Date
            var thisStr = now.getFullYear()+"-"+pad((parseInt(now.getMonth())+1),2)+"-"+pad(i,2);
            var timeArr = today.split("-");
            var date = [now.getFullYear(), zeroize((parseInt(now.getMonth())+1).toString()), zeroize(i)];
            // 周日
            if (new Date(date[0],date[1]-1,date[2]).getDay() == "0") {
                lis += "<ul class='date'>";
            };
            // 判断无空
            var busyBool = false;
            if (typeof(busyDays)!=='undefined') {
                $.each(busyDays, function(index, data) {
                    if (data == thisStr) {
                        busyBool = true;
                        return false;
                    };
                })
            };
            // 无空
            if (busyBool) {
                lis += "<li><a id='not_click' style='color:#fff; background:#ed5565' title=''>"+i+"</a></li>";
            // 限制这个月
            } else if (typeof(limitMonth) !== 'undefined' && (timeArr[0] != now.getFullYear() || timeArr[1] != now.getMonth())) {
                lis += "<li><a id='not_click' style='color:#ccc;' title=''>"+i+"</a></li>";
            // 今天
            } else if (today == now.getFullYear() + "-" + now.getMonth() + "-" + i) {
                lis += "<li><a href='javascript:void(0)' class='today' onclick='selectday_title(this)' title='"+ thisStr +"'>今日</a></li>";
            // 明天
            } else if (today == now.getFullYear() + "-" + now.getMonth() + "-" + (i - 1)) {
                lis += "<li><a href='javascript:void(0)' onclick='selectday_title(this)' title='"+ thisStr +"'>明日</a></li>";
            // 限制4天
            } else if (typeof(limitDay) !== 'undefined') {
                var day1 = new Date(date[0],date[1]-1,date[2]);
                var day2 = new Date(timeArr[0],timeArr[1],timeArr[2]);
                var differ = parseInt(Math.abs(day2 - day1) / 1000 / 60 / 60 /24);
                if (differ>0 && differ < limitDay) {
                    lis += "<li><a href='javascript:void(0)' onclick='selectday_title(this)' title='"+ thisStr +"'>"+i+"</a></li>";
                } else {
                    lis += "<li><a id='not_click' style='color:#ccc;' title=''>"+i+"</a></li>";
                }
            }
            // 今明 以后
            else if (timeArr[0] < now.getFullYear() || (timeArr[0] == now.getFullYear() && timeArr[1] < now.getMonth()) || (timeArr[0] == now.getFullYear() && timeArr[1] == now.getMonth() && parseInt(timeArr[2]) + 1 < i)) {
                lis += "<li><a href='javascript:void(0)' onclick='selectday_title(this)' title='"+ thisStr +"'>"+i+"</a></li>";
            // 以前
            } else {
                lis += "<li><a id='not_click' style='color:#ccc;' title=''>"+i+"</a></li>";
            }

            // 周六
            if (new Date(date[0],date[1]-1,date[2]).getDay() == "6") {
                lis += "</ul>";
            };
        }
        var j=1;
        for (i=thisMonthEndDay; i<6; i++){  // Next Month's Date
            lis += "<li class='nextMonthDate'></li>";
            if (i == 5) lis += '</ul>';
            j++;
        }
        
        var CalendarTitle = "<a href='javascript:void(0)' class='NextMonth' onclick=HS_calendar(HS_DateAdd('m',1,'"+now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate()+"'),this) title='Next Month'><img style='margin-top:0px;height:20px;width:10px;' src='images/icon-right.png' /></a>";
        CalendarTitle += "<a href='javascript:void(0)' class='LastMonth' onclick=HS_calendar(HS_DateAdd('m',-1,'"+now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate()+"'),this) title='Previous Month'><img style='margin-top:0px;height:20px;width:10px;' src='images/icon-left.png' /></a>";
        CalendarTitle += "<span class='selectThisYear'><a href='javascript:void(0)'  title='Click here to select other year' >"+now.getFullYear()+"</a></span>年<span class='selectThisMonth'><a href='javascript:void(0)' title='Click here to select other month'>"+(parseInt(now.getMonth())+1).toString()+"</a></span>月";
        
        if (arguments.length>1){
            document.getElementById("thisMonthDate").innerHTML = lis;
            arguments[1].parentNode.innerHTML = CalendarTitle;
        }else{
            var CalendarBox = style+"<div class='calendar' ><div class='calendarTitle'>"+CalendarTitle+"</div><div class='calendarBody'><ul class='day'><li>周日</li><li>周一</li><li>周二</li><li>周三</li><li>周四</li><li>周五</li><li>周六</li></ul><div id='thisMonthDate'>"+lis+"</div></div></div>";
            return CalendarBox;
        }
    }
    
    function exist(s){
        var s = document.getElementById('date_select');
        if(s){return true;}
        else {return false;}
    }

    //选择此年份
    function selectThisYear(obj){
        HS_calendar(obj.value+"-"+obj.parentNode.parentNode.getElementsByTagName("span")[1].getElementsByTagName("a")[0].innerHTML+"-1",obj.parentNode);
    }

    //主函数
    function HS_setDate(paNode){
        if (document.getElementById('calendar')) {
            calendar.show();
            return false;
        };
        var calendarObj = document.createElement("div");
        calendarObj.id = "calendar";
        calendarObj.innerHTML = HS_calendar(new Date());
        paNode.parentNode.insertBefore(calendarObj,paNode);
        var order_height = document.getElementById('order');
        high = document.body.scrollHeight+'px';
    }
