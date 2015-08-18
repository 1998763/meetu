var zeroize = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
};
//比较日期大小    
    function dateCompare(startdate,enddate)   
    {   
        var arr=startdate.split("-");    
        var starttime=new Date(arr[0],arr[1],arr[2]);    
        var starttimes=starttime.getTime();   
          
        var arrs=enddate.split("-");    
        var lktime=new Date(arrs[0],arrs[1],arrs[2]);    
        var lktimes=lktime.getTime();   
          
        if(starttimes>=lktimes)    
        {   
        return true;   
        }   
        else  
        return false;   
    }
    
    function dateCompare2(startdate,enddate)   
    {   
        var arr=startdate.split("-");    
        var starttime=new Date(arr[0],arr[1],arr[2]);    
        var starttimes=starttime.getTime();   
          
        var arrs=enddate.split("-");    
        var lktime=new Date(arrs[0],arrs[1],arrs[2]);    
        var lktimes=lktime.getTime();   
          
        if(starttimes>lktimes)    
        {   
        return true;   
        }   
        else  
        return false;   
    }
    //比较日期和时间的大小
    function timeCompare(startDate, endDate) {   
         if (startDate.length > 0 && endDate.length > 0) {   
            var startDateTemp = startDate.split(" ");   
            var endDateTemp = endDate.split(" ");   
                           
            var arrStartDate = startDateTemp[0].split("-");   
            var arrEndDate = endDateTemp[0].split("-");   
          
            var arrStartTime = startDateTemp[1].split(":");   
            var arrEndTime = endDateTemp[1].split(":");   
          
        var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);   
        var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);   
                           
        if (allStartDate.getTime() >= allEndDate.getTime()) {      
                return true;   
        } else {     
            return false;   
               }   
        }  
    }
    
    //日期补零
    function pad(num, n) {  
        var len = num.toString().length;  
        while(len < n) {  
            num = "0" + num;  
            len++;  
        }  
        return num;  
    }  
    
    //获取每个日期的票的价格
    var mm = 0;
    function getPrice(dateString){
        if(tickets_num != 0){
            var price = "无票";
            for(var m=0;m<tickets_num;m++){
                if(dateString >= ticket_arr[m]['start_date']){
                    if(ticket_arr[m]['stop_date'] >= dateString){
                        price = ticket_arr[m]['price'];
                        break;
                    }
                }
            }
        }else{
            var price = product_price;
            if(dateString >= available_date.substr(0, 10) && expire_date.substr(0, 10) >= dateString){
                date = dateString.split(" ");
                date = date[0].split("-");
                for(var r=0;r<weeks_day;r++){
                    //alert(weeks_agree[r]);
                    if(new Date(date[0],date[1]-1,date[2]).getDay() == weeks_agree[r]){
                        price = product_price;
                        break;
                    }else {
                        price = "无票";
                    }
                }
                for(var n=0;n<rejects_num;n++){
                    if(dateString >= reject_arr[n]['reject_start'].substr(0, 10) && reject_arr[n]['reject_stop'].substr(0, 10) >= dateString){
                        price = "无票";
                        break;
                    }
                }
            }else{
                price = "无票";
            }
        }
        return price;
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
        //style +="body{width:320px;margin:0 auto;}";
        style +=".order{width:100%;margin:0 auto;background-color: #808080;filter:alpha(opacity=90);-moz-opacity:0.9;opacity:0.9;position:absolute;z-index:1;}";
        // style +=".calendar {width:300px; height:auto; font-family:'微软雅黑',Arial; font-size:12px; margin:10px 0px 0 3px;background:#fff;position:absolute;top:55px;z-index:99;}";
        style +=".calendar ul {list-style-type:none; margin:0; padding:0;}";
        style +=".calendar .day {display:box; display:-webkit-box; background-color:#FFFFFF; height:20px; line-height:20px}";
        style +=".calendar .date {display:box; display:-webkit-box; border-right:#AAABB0 1px solid;}";
        style +=".calendar .day li{box-flex: 1; -webkit-box-flex: 1; width: 38px; font-size: 12px; color: #fff; background: #5d9cec; text-align: center}";
        style +=".calendar .date li{box-flex: 1; -webkit-box-flex: 1; background:#f8f8f8; width:38px; height:48px; line-height:48px; text-align:center;}";
        // style +=".calendar .day li{display:block;height:25px;color:#333333;}";
        style +=".calendar .date li span{display:block;height:20px;color:#333333;}";
        style +=".calendar li a {display:block; height:100%; background:#f8f8f8;text-decoration:none; font-size:16px; color:#333333}";
        style +=".calendar li a span{font-size:12px;color:#666666 !important;}";
        style +=".calendar li a:active{background:#e6e6e6; text-decoration:none;color:#666666;}";
        //style +=".calendar li a.hasArticle {width:38px; height:40px;font-weight:bold; color:#f60 !important}";
        // style +=".calendar .date .lastMonthDate, .calendar .date .nextMonthDate {background:#FFFFFF;color:#bbb;font-size:11px}";
        style +=".selectThisYear a, .selectThisMonth a{text-decoration:none; margin:0 2px; color:#000; font-weight:bold}";
        style +=".calendar .LastMonth, .calendar .NextMonth{ text-decoration:none; color:#000; font-size:18px; font-weight:bold; line-height:16px;}";
        style +=".calendar .LastMonth { float:left;margin-left:60px;}";
        style +=".calendar .NextMonth { float:right;margin-right:60px;}";
        // style +=".calendarBody {width:275px;clear:both;margin:10px 0px 10px 12px;}";
        // style +=".calendarTitle {margin-bottom:10px;color:#fff;padding:10px;background:#81B835;text-align:center;height:25px; line-height:20px;font-size:17px; clear:both}";
        // style +=".calendarTitle span a{color:#fff;font-size:17px;font-weight:normal;}";
        // style +=".calendarBottom {clear:both;  padding: 5px 0; text-align:left}";
        // style +=".calendarBottom a {text-decoration:none; margin:2px !important; font-weight:bold; color:#000}";
        // style +=".calendarBottom a.closeCalendar{float:right}";
        style +=".closeCalendarBox {float:right; border:1px solid #000; background:#fff; font-size:9px; width:11px; height:11px; line-height:11px; text-align:center;overflow:hidden; font-weight:normal !important}";
        // style +=".cancel{float:left;background:#81B835;border-right:1px solid #AAABB0;width:149px;height:30px;text-align:center;font-size:16px;color:#fff;padding-top:10px;}";
        // style +=".cancel a{text-decoration:none;color:#fff;}";
        style +=".submit{float:left;background:#81B835;width:150px;height:30px;text-align:center;font-size:16px;color:#fff;padding-top:10px;}";
        style +=".submit a{text-decoration:none;color:#fff;}";
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
            // if(i == (lastMonthDate-1)){
                // lis = "<li class='lastMonthDate'></li>" + lis;
            // }else{
                if (i == 0) lis += "<ul class='date'>";
                lis += "<li class='lastMonthDate'></li>";
            // }
            lastMonthEndDate--;
        }
        
        for (i=1; i<=thisMonthEndDate; i++){ // Current Month's Date
            var timeArr = today.split("-");
            var date = [now.getFullYear(), zeroize((parseInt(now.getMonth())+1).toString()), zeroize(i)];
            // 周日
            if (new Date(date[0],date[1]-1,date[2]).getDay() == "0") {
                lis += "<ul class='date'>";
            };
            // 今天
            if (today == now.getFullYear() + "-" + now.getMonth() + "-" + i) {
                lis += "<li><a style='background:#5d9cec;color:#fff' id='date_select' href='javascript:void(0)' class='today' onclick='selectday_title(this)' title='"+now.getFullYear()+"-"+pad((parseInt(now.getMonth())+1),2)+"-"+pad(i,2)+"'>今日</a></li>";
            // 明天
            } else if (today == now.getFullYear() + "-" + now.getMonth() + "-" + (i - 1)) {
                lis += "<li><a id='date_select' href='javascript:void(0)' onclick='selectday_title(this)' title='"+now.getFullYear()+"-"+pad((parseInt(now.getMonth())+1),2)+"-"+pad(i,2)+"'>明日</a></li>";
            }
            // 今明 以后
            else if (timeArr[0] < now.getFullYear() || (timeArr[0] == now.getFullYear() && timeArr[1] < now.getMonth()) || (timeArr[0] == now.getFullYear() && timeArr[1] == now.getMonth() && parseInt(timeArr[2]) + 1 < i)) {
                lis += "<li><a id='date_select' href='javascript:void(0)' onclick='selectday_title(this)' title='"+now.getFullYear()+"-"+pad((parseInt(now.getMonth())+1),2)+"-"+pad(i,2)+"'>"+i+"</a></li>";
            // 以前
            } else {
                lis +="<li><a id='not_click' style='color:#ccc;' title=''>"+i+"</a></li>";
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
        // lis += style;
        var CalendarTitle = "<a href='javascript:void(0)' class='NextMonth' onclick=HS_calendar(HS_DateAdd('m',1,'"+now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate()+"'),this) title='Next Month'><img style='margin-top:0px;height:20px;width:10px;' src='http://m.yikuaiqu.com/images/order/right_arrow.png' /></a>";
        var CalendarTitle = "<a href='javascript:void(0)' class='NextMonth' onclick=HS_calendar(HS_DateAdd('m',1,'"+now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate()+"'),this) title='Next Month'><img style='margin-top:0px;height:20px;width:10px;' src='http://m.yikuaiqu.com/images/order/right_arrow.png' /></a>";
        CalendarTitle += "<a href='javascript:void(0)' class='LastMonth' onclick=HS_calendar(HS_DateAdd('m',-1,'"+now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate()+"'),this) title='Previous Month'><img style='margin-top:0px;height:20px;width:10px;' src='http://m.yikuaiqu.com/images/order/left_arrow.png' /></a>";
        CalendarTitle += "<span class='selectThisYear'><a href='javascript:void(0)'  title='Click here to select other year' >"+now.getFullYear()+"</a></span>年<span class='selectThisMonth'><a href='javascript:void(0)' title='Click here to select other month'>"+(parseInt(now.getMonth())+1).toString()+"</a></span>月";
        
        if (arguments.length>1){
            document.getElementById("thisMonthDate").innerHTML = lis;
            arguments[1].parentNode.innerHTML = CalendarTitle;
        }else{
            var CalendarBox = style+"<div class='calendar' id='calendar' ><div class='calendarTitle'>"+CalendarTitle+"</div><div class='calendarBody'><ul class='day'><li>周日</li><li>周一</li><li>周二</li><li>周三</li><li>周四</li><li>周五</li><li>周六</li></ul><div id='thisMonthDate'>"+lis+"</div></div></div>";
            // var CalendarBox = style+"<div class='calendar' id='calendar' ><div class='calendarTitle'>"+CalendarTitle+"</div><div class='calendarBody'><ul class='day'><li>周日</li><li>周一</li><li>周二</li><li>周三</li><li>周四</li><li>周五</li><li>周六</li></ul><div id='thisMonthDate'>"+lis+"</div></div><div class='calendarBottom'></div><a href='javascript:void(0)' onclick='closeCalendar(this)'><div class='cancel'>取消</div></a><a href='javascript:void(0)' onclick='_selectThisDay(this)'><div class='submit'>确定</div></a></div>";
            return CalendarBox;
        }
    }
    
    function exist(s){
        var s = document.getElementById('date_select');
        if(s){return true;}
        else {return false;}
    }
        
    var last_id = "";
    var title = play_date;
    var week_day = "";
    
    function selectday_title(d){
        // if(exist('date_select')){
        //     document.getElementById('date_select').id = "";
        // }
        if(last_id>""){
            last_id.id = "";
            last_id.style.background = "";
            last_id.style.color = "";
        };
            d.style.background = "#48cfad";
            d.style.color = "#fff";
            title = d.title;
            var arr = title.split("-");
            arr[1]--;
            var judge = WeekDay(arr.join("-"));
            if (judge == 0) {week_day = "星期日"};
            if (judge == 1) {week_day = "星期一"};
            if (judge == 2) {week_day = "星期二"};
            if (judge == 3) {week_day = "星期三"};
            if (judge == 4) {week_day = "星期四"};
            if (judge == 5) {week_day = "星期五"};
            if (judge == 6) {week_day = "星期六"};
            last_id = d;
            calendar.appendDate();
    }

    // function selectday_title(d){
    //     if(exist('date_select')){
    //         document.getElementById('date_select').style.background = "#FFF4C3";
    //     }
    //     if(last_id>""){
    //         last_id.style.background = "#FFF4C3";
    //     }
    //         title = d.title;
    //         d.style.background = "#FF7440";
    //         last_id = d;
    // }
    
    //选择今天
    function _selectThisDay(d){
        var boxObj = d.parentNode.parentNode;
        boxObj.targetObj.value = title;
        boxObj.parentNode.removeChild(boxObj);
        var order_height = document.getElementById('order');
        order_height.style.height="0px";
        updatePrice(title);
    }
    //关闭日历控件
    function closeCalendar(d){
        var boxObj = d.parentNode.parentNode;
        boxObj.parentNode.removeChild(boxObj);
        var order_height = document.getElementById('order');
        order_height.style.height="0px";
    }
    //选择年份
    function CalendarselectYear(obj){
        var opt = "";
        var thisYear = obj.innerHTML;
        for (i=1970; i<=2020; i++){
            if (i==thisYear){
                opt += "<option value="+i+" selected>"+i+"</option>";
            }else{
                opt += "<option value="+i+">"+i+"</option>";
            }
        }
        opt = "<select onblur='selectThisYear(this)' onchange='selectThisYear(this)' style='font-size:11px'>"+opt+"</select>";
        obj.parentNode.innerHTML = opt;
    }
    //选择此年份
    function selectThisYear(obj){
        HS_calendar(obj.value+"-"+obj.parentNode.parentNode.getElementsByTagName("span")[1].getElementsByTagName("a")[0].innerHTML+"-1",obj.parentNode);
    }
    //选择月份
    function CalendarselectMonth(obj){
        var opt = "";
        var thisMonth = obj.innerHTML;
        for (i=1; i<=12; i++){
            if (i==thisMonth){
                opt += "<option value="+i+" selected>"+i+"</option>";
            }else{
                opt += "<option value="+i+">"+i+"</option>";
            }
        }
        opt = "<select onblur='selectThisMonth(this)' onchange='selectThisMonth(this)' style='font-size:11px'>"+opt+"</select>";
        obj.parentNode.innerHTML = opt;
    }
    //选择此月份
    function selectThisMonth(obj){
        HS_calendar(obj.parentNode.parentNode.getElementsByTagName("span")[0].getElementsByTagName("a")[0].innerHTML+"-"+obj.value+"-1",obj.parentNode);
    }

    //主函数
    function HS_setDate(inputObj,paNode){
        if (document.getElementById('calendar')) {
            calendar.show();
            return false;
        };
        var calendarObj = document.createElement("span");
        calendarObj.innerHTML = HS_calendar(new Date());
        calendarObj.targetObj = inputObj;
        paNode.parentNode.insertBefore(calendarObj,paNode);
        var order_height = document.getElementById('order');
        high = document.body.scrollHeight+'px';
        order_height.style.height=high;
        // document.getElementById('date_select').style.background = "#FF7440";
    }