var MIN_LENGTH = 1;
var inputValue;
var imageValue;
var companyName;
var stockPrice;
var tempChangeValue;
var tempChangePercent;
var jsonData;
var currentStock;
var tableresult ="";
var changeYTD;
var pageRender;
var tableSymbol;
var flag;
var tableData ="";
var counter =0;
var favResultArray =[];
 var dates=[];
var maxprice=0;
var maxvol=0;
var faa=0;

var date2=[];
var volume2=[];
var close2=[];
var chimage;
var inp="";

var progress='<div class="progress" class="col-md-6 col-xs-14" id="pgbar" style="width:200%;margin-top:90px;margin-left:30px;"> <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%;"></div></div>';

var progress1='<div class="progress" class="col-md-6 col-xs-14" id="pgbar" style="width:80%;margin-top:120px;margin-left:30px;"> <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%;"></div></div>';

var progress2='<div class="progress" class="col-md-6 col-xs-14" id="pgbar" style="width:100%;margin-top:120px;margin-left:30px;"> <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%;"></div></div>';


var fail='<div class="//alert //alert-danger col-md-6 col-xs-14" style="width:200%;margin-top:90px;margin-left:30px;"></div>';

var fail1='<div class="//alert //alert-danger col-md-6 col-xs-14" style="width:80%;margin-top:120px;margin-left:30px;"> </div>';

var fail2='<div class="//alert //alert-danger col-md-6 col-xs-14" id="pgbar" style="width:100%;margin-top:120px;margin-left:30px;"> <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%;"></div></div>';


var i="";
    var app = angular.module('myApp', ['ngMaterial']);
app.controller('myCtrl',function($scope, $http, $q, GetPersonService, $log){
$scope.searchText = "";
$scope.selectedItem=[];
$scope.message="";
$scope.disabled=true;
$scope.searchTextChange = function (str) {
return GetPersonService.getPerson(str);
}
$scope.selectedItemChange = function (item) {
    inp=item;
$scope.disabled=false;
$log.info('Item changed to ' + JSON.stringify(item));
}
$scope.submit=function(){
if(i==""){
    //alert("In i");
$scope.message="Please enter a Valid symbol";
}
else{
$scope.message=""; 
}

};
$scope.clr=function(){
$scope.searchText="";
};

});
app.factory('GetPersonService', function ($http, $q) {
return {
getPerson: function(str) {

return $http.get("http://apicall-env.us-east-2.elasticbeanstalk.com/index.php?sym="+str)
.then(function(response) {
if (true) {

return response.data;
} else {
    return $q.reject(response.data);
}
}, function(response) {
return $q.reject(response.data);
});
}
};
});
  

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function fbcall(data) {
 var obj = {},
        chart;
    
    chart = $(data).highcharts();
    obj.svg = chart.getSVG();
    obj.type = 'image/png';
    obj.width = 450; 
    obj.async = true;
    
    
    $.ajax({
        type: 'post',
        url: chart.options.exporting.url,        
        data: obj, 
        success: function (data) {            
            var exportUrl = this.url;
            chimage=exportUrl+data;
           //alert(exportUrl+data);
        
        }        
    });
   } 

 var fixDate = function(dateIn) {

        var f=[];
        f=dateIn.split("-");

        var year=parseInt(f[0]);
        var month=parseInt(f[1]);
        var day=parseInt(f[2]);

        ////alert("//Alerting Year Month and Date");
        ////alert(year);
        ////alert(month);
        ////alert(day);
        //var dat = new Date(parseInt(year),parseInt(month),parseInt(day));
        return Date.UTC(year, month, day);
    };

  $('#errorAlert').css("display","none");
//    $('#rightPanel-navigation').addClass("disabled");
    $('#rightPanel-navigation').css("background-color", "#E4E4E4");


    /* $('document').ready(function () {

      document.getElementById('nextButtton').setAttribute("disabled","disabled");
      //alert("In asdsad");
      ////alert("In script");


});
*/




    function star() {

        //alert("In starbat");

        if ($('#starElement').hasClass("starClass")) {
            
            $("#starElement").removeClass('starClass');
            $("#starElement").addClass('undostarClass');
            
            for (var i =0; i <localStorage.length; i++) {
                var localResult = localStorage.getItem(i.toString());

                //      var tableresult = jQuery.parseJSON(localResult);
                if (inputValue.toLowerCase() == localResult.toLowerCase()) {
                    localStorage.removeItem(i.toString());

                    if ($('#favouriteTable td:contains(localResult)')) {

                        $('#favouriteTable td:contains(localResult)').parent().remove();
                    }
                }
            }
            if (localStorage.length == 0) {
                var tempData = ('<table class="table table-striped" id="favouriteTable"> <tr> <th>Symbol</th> <th>Company Name</th> <th>Stock Price</th> <th class ="changeFavourite">Change(Change Percent)</th> <th class ="changeFavourite">Market Cap</th> <th class ="changeFavourite" id="deleteTh"></th> </tr></table>');

                $('#favouriteTable').text("");
                $('#favouriteTable').append(tempData);
            }
            else {
                var pointer =0;
                for(var i=0; i< localStorage.length+1;i++){
                    if(localStorage.getItem(i.toString())==null){
                        continue;
                    }
                    var tempValue = localStorage.getItem(i.toString());
                    localStorage.removeItem(i.toString());
                    localStorage.setItem(pointer.toString(),tempValue);
                    pointer++;
                }
                favResultArray = [];
                counter =0;
                refreshNow();


                var timeout = setInterval(function()
                { 
                    if(favResultArray.length == localStorage.length) { clearInterval(timeout); isFinished = true;print_Data(favResultArray);
                    favResultArray =[]; } }, 100);
            }
        }


        else {
            $("#starElement").removeClass('undostarClass');
            $("#starElement").addClass('starClass');
            if (localStorage) {


                //var tableresult = jQuery.parseJSON(jsonData);
                //var lastIndex = localStorage.length;*/

                //alert("Storing in local Storage");
                //alert(inputValue);

                localStorage.setItem(localStorage.length.toString(), inputValue);
                counter=0;
                refreshNow();
                var timeout = setInterval(function()
                { if(favResultArray.length == localStorage.length) { clearInterval(timeout); isFinished = true; print_Data(favResultArray);
                    favResultArray =[]; } }, 100);





                counter =0;


            }
        }
    }


    $('document').ready(function () {


            window.fbAsyncInit = function() {
            FB.init({appId: '1607943065932932', status: true, cookie: true,
            xfbml: true});
            };
            (function() {
            var e = document.createElement('script'); e.async = true;
            e.src = document.location.protocol +
            '//connect.facebook.net/en_US/all.js';
            document.getElementById('fb-root').appendChild(e);
            }());




            //alert("12121212");

            //alert("Before Sort");

            //if()
            //alert(faa);

            //alert($("#error1").text());

                if ($("#error1").text() == "1")
                {
                    // do something
                }
            if(inputValue === undefined && faa==1) {
                        // obj is a valid variable, do something here.
                        //alert("In Empty Cassdode");
                        $("#error1").html('Please Enter a Valid Symbol');
                
                }  

            //alert(localStorage.length);

    /*        if(localStorage.length==0){
               $('#sort').prop('disabled', 'true');
            }
            else{
               $('#sort').prop('disabled', 'false');
                
            }
            */

            $("#fbData .btn").prop('disabled',true);
            $("#fbimage").css("opacity", "0.5");


            $("#nextButtton .btn").prop('disabled',true);
            $("#nextButtton .btn").css("background-color", "#dddddd");


            $("#starBat").css("background-color", "#dddddd");
            


             $("#clearButton").on("click", function () {

                //alert("In clear Method");

                if($('#myCarousel').find('.active').index() ==1){
                    $('#myCarousel').carousel('next');
                }

                document.getElementById("input-0").style="border-color:none !important;";


                $('#auto').val("");
                $("#error1").text('');

                /*localStorage.clear();
                 refreshNow();*/
                $("#nextButtton .btn").prop("disabled",true);
               
                  $("#nextButtton .btn").css("background-color", "#dddddd");


                //$('#error//Alert').css("display","none");

                // $('#rightPanel-navigation').addClass("disabled");
                //$('#rightPanel-navigation').css("background-color", "#E4E4E4");
                
                
            });



            

            $('select').change(function(){
                $('table').tablesorter();
                //alert("In chsdsdange");

                var asc=parseInt($('#sort').val());

                //alert(asc);

                var column = parseInt($(this).val(), 10),
                    direction = asc, // 0 = descending, 1 = ascending
                    sort = [[ column, direction ]];
                if (column >= 0) {
                    $('table').trigger("sorton", [sort]);
                }
            });


            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                  var target = $(e.target).attr("href") // activated tab
                  //alert(target);

                  if(target == '#home'){
                    fbcall('#Pricedata');
                  }

                  if(target == '#menu1'){
                    fbcall('#SMAdata');
                  }

                  if(target == '#menu2'){
                    fbcall('#EMAdata');
                  }

                  if(target == '#menu3'){
                    fbcall('#STOCHdata');
                  }

                  if(target == '#menu4'){
                    fbcall('#RSIdata');
                  }

                  if(target == '#menu5'){
                    fbcall('#ADXdata');
                  }

                  if(target == '#menu6'){
                    fbcall('#CCIdata');
                  }

                  if(target == '#menu7'){
                    fbcall('#BBANDSdata');
                  }
                   if(target == '#menu8'){
                    fbcall('#MACDdata');
                  }
                


                });

        $('#refershButton').on("change",function () {
        if ($('#refershButton').prop('checked') === true) {
            autoRefreshVar  =   setInterval(function(){ favResultArray = [];
                counter =0; 
                autorefreshNow(); 
                 var timeout = setInterval(function()
                { if(favResultArray.length == localStorage.length)
                 { clearInterval(timeout); 
                    isFinished = true;
                    print_Data(favResultArray);
                    favResultArray =[]; } }, 100);
            }, 5000)






        }
        else if ($('#refershButton').prop('checked') === false){
            clearInterval(autoRefreshVar);
        }


    });

        $('#fbData').click(function(e){
e.preventDefault();

FB.ui(
{
method: 'feed',
name: 'This is the content of the "name" field.',
link: chimage,
caption: 'Top 3 reasons why you should care about your finance',
description: 'What happens when you dont take care of your finances? Just look at our country -- you spend irresponsibly, get in debt up to your eyeballs, and stress about how youre going to make ends meet. The difference is that you dont have a glut of taxpayers…',
message: 'Nothing'
});
});


// Refresh now code is here
         $("#refButtonWrapper").click(function(){
        counter =0;

        refreshNow();

        var timeout = setInterval(function()
        { 
            if(favResultArray.length == localStorage.length) { 
                clearInterval(timeout); 
                isFinished = true;print_Data(favResultArray);
            favResultArray =[]; } }, 100);

            counter =0;
    });
         //Refresh now code ends here.

        $("#nextButtton").click(function(){
        if($("#nextButtton .btn").prop("disabled") == false) {
            $('#myCarousel').carousel('next');
        }
    });
        ////alert("I'm Here");

 $('#favouriteTable').on('click', '.deleteButton', function () {

        //alert("In Deletsdse Now");

        var tdValue = $(this).closest('tr').children('td:first').children('a').text();
        //alert("TdValue is")
        //alert(tdValue);

        tdValue = tdValue.trim();



        ////alert(tdvalue);
        for(var i =0; i<localStorage.length;i++){
            if (localStorage.getItem(i.toString()).toLowerCase() == tdValue.toLowerCase()) {

                localStorage.removeItem(i.toString());
                $(this).parent().parent().remove();
            }
        }
        var pointer =0;
        for(var i=0; i< localStorage.length+1;i++){
            if(localStorage.getItem(i.toString())==null){
                continue;
            }
            var tempValue = localStorage.getItem(i.toString());
            localStorage.removeItem(i.toString());
            localStorage.setItem(pointer.toString(),tempValue);
            pointer++;
        }
        favResultArray = [];
        counter =0;
        refreshNow();


        var timeout = setInterval(function()
        { if(favResultArray.length == localStorage.length) { clearInterval(timeout); isFinished = true;print_Data(favResultArray);
            favResultArray =[]; } }, 100);


        //alert("Before Sort");


        //alert(localStorage.length);
        if(localStorage.length==0){
         //$('#sort').prop('disabled', 'true');
        }
        else{
           // $('#sort').prop('disabled', 'false');

        }


    });


        $('#stockForm').submit(function () {
            //alert("Input is sdsd");
            //alert(inp);
            inputValue=inp;
            if(inputValue === undefined) {
                        // obj is a valid variable, do something here.
                        //alert("In Empty Coduyyuyuyue");

                        $("#error1").text('Please Enter a Valid Symbol');
                        document.getElementById("input-0").style="border-color:red !important;";

                        faa=1;
                }
        else{
            pageRender(inp);
        }
        
            return false;
        });
        PageRender:
            pageRender = function getQuoteFunction(input) {


                     $("#error1").text('');


                        var date2=[];
                        var volume2=[];
                        var close2=[];


                            var chartSeries=[];

                            var limit=0;

                            var open=[];

                            var high=[];
                            var low=[];
                            var close=[];
                            var volume=[];

                flag ="";
                //alert("Input is");
                //alert(input);
                //$('#error//Alert').css("display","none");
                //$("#nextButtton .btn").prop('disabled',false);
                //   $("#nextButtton").enabled;



                /*
                if($("#autoComplete").val() == input){
                    if (input.indexOf("-") > -1) {
                        inputValue = input;
                        companyName = (inputValue.split("("));
                        companyName = (companyName[0].split("-"));
                        inputValue = (inputValue.split("-"));

                        companyName = companyName[1].trim();

                        inputValue = inputValue[0].trim();
                    }
                    else {
                        inputValue = $("#autoComplete").val();
                    }
                }

                else {
                    inputValue = input;
                }
                ////alert(inputValue);
                */

                inputValue = input;

                if(inputValue === undefined) {
                        // obj is a valid variable, do something here.
                        //alert("In Empty Coasdsdsde");
                        $("#error1").html('Please Enter a Valid Symbol');
                        faa=1;
                }                
                
                if (inputValue.length >= MIN_LENGTH) {

                    document.getElementById("input-0").style="border-color:none !important;";



                    $("#fbData .btn").prop('disabled',true);
                    $("#fbData .btn").css("background-color", "#dddddd");

                    $("#starBat .btn").prop('disabled',true);
                    $("#starBat .btn").css("background-color", "#dddddd");


                    
                    $("#resultTable").empty();

                    $("#Pricedata").html('');
                    $("#SMAdata").html('');
                    $("#EMAdata").html('');
                    $("#STOCHdata").html('');
                    $("#RSIdata").html('');
                    $("#ADXdata").html('');
                    $("#CCIdata").html('');
                    $('#BBANDSdata').html('');
                    $('#MACDdata').html('');

                    $('#chartData').html('');
                    
                        


                    $("#Pricedata").empty();
                    $("#SMAdata").empty();
                    $("#EMAdata").empty();
                    $("#STOCHdata").empty();
                    $("#RSIdata").empty();
                    $("#ADXdata").empty();
                    $("#CCIdata").empty();
                    $('#BBANDSdata').empty();
                     $('#MACDdata').empty();
                   
                    $('#chartData').empty();
                    

                






                    $('#resultTable').append(progress1);

                    $('#Pricedata').append(progress);
                    $('#SMAdata').append(progress);
                    $('#EMAdata').append(progress);
                    $('#STOCHdata').append(progress);
                    $('#RSIdata').append(progress);
                    $('#ADXdata').append(progress);
                    $('#CCIdata').append(progress);
                    $('#BBANDSdata').append(progress);
                    $('#MACDdata').append(progress);


                    $('#chartData').append(progress2);


            $("#nextButtton .btn").prop('disabled',false);
            $("#nextButtton .btn").css("background-color", "");

            if($('#myCarousel').find('.active').index() ==0){
                    $('#myCarousel').carousel('next');
                }


                     $.get("http://apicall-env.us-east-2.elasticbeanstalk.com/index.php", {feedInput: inputValue})

                    .done(function (data) {
                        $('#newsFeeds').html('');
                        tableresult = "";

                        var ndata=[];
                        
                        var link;
                        var pub;
                        var title;
                        var author;


                        console.log("News Data is:");
                        console.log(data);

                        ndata=data.split("+");
                        link=JSON.parse(ndata[1]);
                        pub=JSON.parse(ndata[2]);
                        title=JSON.parse(ndata[0]);
                        author=JSON.parse(ndata[3]);



                        console.log("\n\Author is \n");
                        console.log(author);

                        for (var i = 0; i < 5; i++) {
                            tableresult = "";
                            tableresult += ('<div class ="well feedResult" style="width:95% ;background-color: #E9E9E9">');
                            tableresult += ('<div style="margin-bottom:2%"><a href=' + link[i]["0"] + ' target="_blank ">' + title[i]["0"] + '</a></div>');
                            //tableresult += ('<div class="FeedContent" style="margin-bottom:2%">' + title[i]["0"] + '</div>');
                            tableresult += ('<div  style="margin-bottom:2%;font-weight:bolder">Author: ' + author[i]["0"] + '</div>');
                            tableresult += ('<div  style="font-weight: bolder">Date: ' + pub[i] + '</div></div>');
                            $('#newsFeeds').append(tableresult);

                                }                        

                    })
                .fail(function (data) {

                $('#resultTable').append(fail1);

                    $('#newsFeeds').append(fail);
                   
            })


                    




                    $.get("http://apicall-env.us-east-2.elasticbeanstalk.com/index.php", {inputValue: inputValue})
                        .done(function (data) 
                        {

                            var fdata=data.split("+");
                            jsonData = fdata[0];
                            data=fdata[0];

                            ////alert(jsonData);


                            if(JSON.parse(data).hasOwnProperty("Error Message")){
                                flag = "exitFunction";
                                $('#error//Alert').text("Select a valid Entry");
                                $('#error//Alert').css("display","block");
                                $("#nextButtton .btn").prop("disabled",true);
                                //   $('#rightPanel-navigation').addClass("disabled");
                                $('#rightPanel-navigation').css("background-color", "#E4E4E4");

                                return;
                            }

                            var results = jQuery.parseJSON(data);
                            var count=0;
                            var LPrice;
                            var day1price;
                            var day1close;
                            var day1range;
                            var day2close;
                            var day1open;
                            var day1low;
                            var day1high;
                            var day1volume;
                            var tstamp;
                            var pvolchart=[];
                            var volsum=0;
                            var content = '<table class=" table table-striped table-responsive" id ="stockInfoTable" style ="width:100%">';
                            var pcount=0;
                           
                            

                            content += '<tr><td style="font-weight: bold;">Stock Ticker Symbol</td><td>' + inputValue + '</td></tr>';
                                

                            $.each(results, function (key, value) {

                                if(key === "Time Series (Daily)"){
                                    $.each(results[key], function (key1, value1) {
                                        ////alert("Displaying date and values");
                                        ////alert(key1);

                                        ////alert(value1);

                                        if(count==0){
                                            LPrice=results[key][key1]["4. close"];
                                            day1close=LPrice;
                                            day1open=results[key][key1]["1. open"];
                                            day1range=results[key][key1]["2. high"]-results[key][key1]["3. low"];
                                            day1volume=results[key][key1]["5. volume"];
                                            tstamp=key1;
                                            day1low=results[key][key1]["3. low"];
                                            day1high=results[key][key1]["2. high"];
                                            ////alert("//Alerting LPrice");
                                            ////alert(LPrice);
                                         //var v = (Math.round(LPrice).toFixed(2));
                                        }

                                        if(count==1){
                                            day2close=results[key][key1]["4. close"];
                                        }


                                        var dat=fixDate(key1);
                                        ////alert(dat);
                                        dates.push(dat);

                                        open.push(parseFloat(results[key][key1]["1. open"]));
                                        high.push(parseFloat(results[key][key1]["2. high"]));
                                        low.push(parseFloat(results[key][key1]["3. low"]));
                                        close.push(parseFloat(results[key][key1]["4. close"]));
                                        
                                        var billionValue = parseFloat(results[key][key1]["5. volume"]) / 1000000;
                                        var millionValue = parseFloat(results[key][key1]["5. volume"]) / 1000;


                                    if (billionValue > 0.005) {
                                        //content += ('<tr><td style="font-weight: bold;">' + 'Market Cap' + '</td>' + '<td>' + billionValue.toFixed(2) + ' Billion</td></tr>');
                                        volsum+=billionValue;

                                        volume.push(parseInt(billionValue));

                                        if(parseInt(billionValue)>maxvol)
                                            maxvol=parseInt(billionValue);

                                    }
                                    else {
                                       // content += ('<tr><td style="font-weight: bold;">' + 'Market Cap' + '</td>' + '<td>' + millionValue.toFixed(2) + ' Million</td></tr>');
                                      // volsum+=millionValue.toFixed(2);
                                        volsum+=millionValue;
                                        volume.push(parseInt(millionValue));

                                        if(parseInt(billionValue)>maxvol)
                                            maxvol=parseInt(millionValue);
                                    }
                                    ////alert("VOlume Sum");
                                    ////alert(volsum);

                                        //chartSeries.push(pointData);
                                        if(maxprice<parseFloat(results[key][key1]["4. close"]))
                                            maxprice=parseFloat(results[key][key1]["4. close"]);





                                        count++;

                                        limit++;
                                        
                                        if(limit==220)
                                            return false;

                                    });

                                    
                                    for(i=dates.length-1;i>=0;i--){
                                        var point=[dates[i],close[i]];
                                        chartSeries.push(point);

                                        var pf=[dates[i],close[i],volume[i]];
                                        pvolchart.push(pf);
                                    }


                                    var change=day2close-day1close;
                                    var percent=(change/day1close)*100;
                                  

                                    for(i=154;i>=0;i--){
                                        //var point=[dates[i],close[i]];
                                        //chartSeries.push(point);

                                        //var pf=[dates[i],close[i],volume[i]];
                                        //pvolchart.push(pf);
                                        date2.push(dates[i]);
                                        volume2.push(volume[i]);
                                        close2.push(close[i]);
                                    }

                                    dates.reverse();
                                    close.reverse();
                                    

                                    ////alert("Dates Array is:");
                                    ////alert(dates);

                                    ////alert("chartSeries is:");
                                    ////alert(chartSeries);

                                    value = (Math.round(day1close).toFixed(2));
                                    content += '<tr><td style="font-weight: bold;">Last Price</td>' + '<td>' + value + '</td></tr>';
                                
                                    value=percent;
                                    tempChangeValue=change;
                                    if (tempChangeValue < 0 && value < 0) {
                                        value = (Math.abs(tempChangeValue)).toFixed(2) + " ( " + (Math.abs(value)).toFixed(2) + "% ) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/Down.png' style='width: 20px;'>";
                                        content += ('<tr><td style="font-weight: bold;">Change (Change Perecent) </td> <td style="color: red"> -' + value + '</td></tr>');
                                    }
                                    else if (tempChangeValue > 0 && value > 0) {
                                        value = (Math.abs(tempChangeValue)).toFixed(2) + " ( " + (Math.abs(value)).toFixed(2) + "% ) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/Up.png ' style='width: 20px;'>";
                                        content += ('<tr><td style="font-weight: bold;">' + 'Change (Change Perecent)' + '</td>' + '<td style="color: green">' + value + '</td></tr>');

                                    }
                                    else {
                                        value = Math.round(Math.abs(tempChangeValue)).toFixed(2) + " ( " + Math.round(Math.abs(value)).toFixed(2) + "% ) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/up.png' style='width: 20px;'>";
                                        content += ('<tr><td style="font-weight: bold;">' + 'Change (Change Perecent)' + '</td>' + '<td>' + value + '</td>');

                                    }

                                    console.log("Moment Time stamp");
                                    console.log(tstamp);

                                    var time = new Date();
                                    //console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());

                                    var now = new Date();
                                      var hour = now.getHours();
                                      var day = now.getDay();
                                      ////alert(day);
                                      ////alert(hour);
                                      var minutes = now.getMinutes();
                                      var tt=String(tstamp);

                                      if(now.getHours()>16){
                                        tt+=" "+"16:30:00";
                                    }
                                    else{
                                    tt+=" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
                                }
                                      //alert(moment(tt));




                                    //tt+=' '+time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
                                    value = moment(tt).format((' DD MMM  YYYY, hh:mm:ss a'));
                                    content += '<tr><td style="font-weight: bold;">' + 'TimeStamp' + '</td>' + '<td>' + value + ' EST</td></tr>';
                                    
                                    value = Math.round(day1open).toFixed(2);
                                    content += '<tr><td style="font-weight: bold;">Open</td>' + '<td>' + value + '</td></tr>';

                                    value = Math.round(day1close).toFixed(2);
                                    content += '<tr><td style="font-weight: bold;">Previous Close</td>' + '<td>' + value + '</td></tr>';
                                
                                    //value = Math.round(day1range).toFixed(2);
                                    content += '<tr><td style="font-weight: bold;">Day\'s Range</td>' + '<td>' + Math.round(day1low).toFixed(2); +'-'+ Math.round(day1high).toFixed(2); +'</td></tr>';
                                
                                    value = (day1volume);
                                    content += '<tr><td style="font-weight: bold;">Volume</td>' + '<td>' + numberWithCommas(value) + '</td></tr>';
                                    
                                }


                                /*
                                if (key === "Status" || key === "MSDate") {

                                    return true;
                                }
                                else if (key === "Change") {
                                    tempChangeValue = value;
                                    return true;
                                }
                                else if (key === "LastPrice") {
                                    stockPrice = value;
                                    value = "$" + (Math.round(value).toFixed(2));
                                    content += ('<tr><td style="font-weight: bold;">' + key + '</td>' + '<td>' + value + '</td></tr>');
                                }
                                else if (key === "ChangePercent") {
                                    tempChangePercent = value;
                                    if (tempChangeValue < 0 && value < 0) {
                                        value = (Math.abs(tempChangeValue)).toFixed(2) + " ( " + (Math.abs(value)).toFixed(2) + "% ) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/down.png' style='width: 20px;'>";
                                        content += ('<tr><td style="font-weight: bold;">Change (Change Perecent) </td> <td style="color: red">' + value + '</td></tr>');
                                    }
                                    else if (tempChangeValue > 0 && value > 0) {
                                        value = (Math.abs(tempChangeValue)).toFixed(2) + " ( " + (Math.abs(value)).toFixed(2) + "% ) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/up.png' style='width: 20px;'>";
                                        content += ('<tr><td style="font-weight: bold;">' + 'Change (Change Perecent)' + '</td>' + '<td style="color: green">' + value + '</td></tr>');

                                    }
                                    else {
                                        value = Math.round(Math.abs(tempChangeValue)).toFixed(2) + " ( " + Math.round(Math.abs(value)).toFixed(2) + "% ) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/up.png' style='width: 20px;'>";
                                        content += ('<tr><td style="font-weight: bold;">' + 'Change (Change Perecent)' + '</td>' + '<td>' + value + '</td></tr>');

                                    }
                                }
                                else if (key === "Timestamp") {
                                    value = moment(value).format((' DD MMM  YYYY, hh:mm:ss a'));
                                    content += ('<tr><td style="font-weight: bold;">' + 'Time and Date' + '</td>' + '<td>' + value + '</td></tr>');
                                }
                                else if (key == "MarketCap") {
                                    var billionValue = value / (1000000000);
                                    var millionValue = value / (1000000);


                                    if (billionValue > 0.005) {
                                        content += ('<tr><td style="font-weight: bold;">' + 'Market Cap' + '</td>' + '<td>' + billionValue.toFixed(2) + ' Billion</td></tr>');
                                    }
                                    else {
                                        content += ('<tr><td style="font-weight: bold;">' + 'Market Cap' + '</td>' + '<td>' + millionValue.toFixed(2) + ' Million</td></tr>');

                                    }
                                }


                                else if (key == "High" ) {
                                    content += ('<tr><td style="font-weight: bold;">' + 'High Price' + '</td>' + '<td>$' + value.toFixed(2) + '</td></tr>');
                                }
                                else if (key == "Low" ) {
                                    content += ('<tr><td style="font-weight: bold;">' + 'Low Price' + '</td>' + '<td>$' + value.toFixed(2) + '</td></tr>');
                                }
                                else if (key == "Open" ) {
                                    content += ('<tr><td style="font-weight: bold;">' + 'Opening  Price' + '</td>' + '<td>$' + value.toFixed(2) + '</td></tr>');
                                }
                                else if (key == "ChangeYTD") {
                                    changeYTD = value;
                                }
                                else if (key == "ChangePercentYTD") {
                                    if (tempChangeValue > 0 && value > 0) {
                                        value = (Math.abs(changeYTD)).toFixed(2) + " ( " + (Math.abs(value)).toFixed(2) + " %) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/up.png' style='width: 20px;'>";
                                        content += ('<tr><td style="font-weight: bold;">' + 'Change YTD (Change Percent YTD)' + '</td>' + '<td style="color: green">' + value + '</td></tr>');

                                    }
                                    else {
                                        value = Math.round(Math.abs(changeYTD)).toFixed(2) + " ( " + Math.round(Math.abs(value)).toFixed(2) + " %) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/up.png' style='width: 20px;'>";
                                        content += ('<tr><td style="font-weight: bold;">' + 'Change YTD (Change Percent YTD)' + '</td>' + '<td>' + value + '</td></tr>');

                                    }
                                }
                                else if(key =="Name"){
                                    companyName =value;
                                    content += ('<tr><td style="font-weight: bold;">' + key + '</td>' + '<td>' + value + '</td></tr>');
                                }
                                else {
                                    content += ('<tr><td style="font-weight: bold;">' + key + '</td>' + '<td>' + value + '</td></tr>');
                                }
                            */

                            }); // second each ends here

                            content += '</table>';


                            $("#pgbar").remove();
    


                            $("#resultTable").append(content);

                            //Historical Charts Comes here

                            ////alert(dates);
                            ////alert(close);

                            ////alert(chartSeries);
/*
                            chartSeries=[
[Date.UTC(2013,5,2),0.7695],
[Date.UTC(2013,5,3),0.7648],
[Date.UTC(2013,5,4),0.7645],
[Date.UTC(2013,5,5),0.7638],
[Date.UTC(2013,5,6),0.7549],
[Date.UTC(2013,5,7),0.7562],
[Date.UTC(2013,5,9),0.7574],
[Date.UTC(2013,5,10),0.7543],
[Date.UTC(2013,5,11),0.7510],
[Date.UTC(2013,5,12),0.7498],
[Date.UTC(2013,5,13),0.7477],
[Date.UTC(2013,5,14),0.7492],
[Date.UTC(2013,5,16),0.7487],
[Date.UTC(2013,5,17),0.7480],
[Date.UTC(2013,5,18),0.7466],
[Date.UTC(2013,5,19),0.7521],
[Date.UTC(2013,5,20),0.7564],
[Date.UTC(2013,5,21),0.7621],
[Date.UTC(2013,5,23),0.7630],
[Date.UTC(2013,5,24),0.7623],
[Date.UTC(2013,5,25),0.7644],
[Date.UTC(2013,5,26),0.7685],
[Date.UTC(2013,5,27),0.7671],
[Date.UTC(2013,5,28),0.7687],
[Date.UTC(2013,5,30),0.7687],
[Date.UTC(2013,6,1),0.7654],
[Date.UTC(2013,6,2),0.7705],
[Date.UTC(2013,6,3),0.7687],
[Date.UTC(2013,6,4),0.7744],
[Date.UTC(2013,6,5),0.7793],
[Date.UTC(2013,6,7),0.7804],
[Date.UTC(2013,6,8),0.7770],
[Date.UTC(2013,6,9),0.7824],
[Date.UTC(2013,6,10),0.7705],
[Date.UTC(2013,6,11),0.7635],
[Date.UTC(2013,6,12),0.7652]];
*/




                        $('#chartData').highcharts('StockChart', {


                            chart: {
                                zoomType: 'x',
                                width:1100
                            },
                            title: {
                                text: inputValue+'Stock Value'
                            },
                            subtitle: {
                                text: document.ontouchstart === undefined ?
                                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                title: {
                                    text: 'Stock Value'
                                }
                            },
                            legend: {
                                enabled: false
                            },
                            

                            series: [{
                                type: 'area',
                                name: inputValue,
                                data: chartSeries
                            }]
                        });




    
                    //SMA Chart Starts here

                            jsonData = fdata[1];
                            data=fdata[1];

                            //////alert(jsonData);


                            if(JSON.parse(data).hasOwnProperty("Error Message")){
                                flag = "exitFunction";
                                $('#error//Alert').text("Select a valid Entry");
                                $('#error//Alert').css("display","block");
                                $("#nextButtton .btn").prop("disabled",true);
                                //   $('#rightPanel-navigation').addClass("disabled");
                                $('#rightPanel-navigation').css("background-color", "#E4E4E4");

                                return;
                            }

                            var smadata = jQuery.parseJSON(data);

                               var sma=[];
                               var count=0;
                               var df=[];
                               var date1=[];
                               for(var key in smadata){
                                //////////alert(key);
                                if(key=="Technical Analysis: SMA"){
                                    for(var dat in smadata[key]){
                                        //////////alert(smadata[key][dat]["SMA"]);
                                        

                                        df=dat.split("-");

                                        if(count==155){
                                            break;
                                        }
                                        date1.push(df[1]+"/"+df[2]);
     
                                        sma.push(parseFloat(smadata[key][dat]["SMA"]));
                                        count++;
                                    }
                                    break;
                                }

                               }

                               sma.reverse();
                               date1.reverse();

                               ////alert(date1);
                               ////alert(sma);

                               ////////alert("Displaying SMA Length");
                               ////////alert(sma.length);

                            Highcharts.chart('SMAdata', {

                             chart: {
                                        zoomType: 'x',
                                         width:510,
                                        height:370
                                    },

                                 subtitle: {
                                    useHTML: true,
                                            text: '<a style="color:blue;text-decoration:none;" target="_blank" href="https://www.alphavantage.co/">Source : Alpha Vantage </a>'
                                        },
                                xAxis: {
                                categories: date1,
                                labels: {
                                                rotation: -45
                                            },
                                tickInterval: 5
                                },
                                legend: {
                                layout: 'vertical',
                               verticalAlign: 'bottom',
                                 align:'center'
                                },
                                yAxis: {
                                minTickInterval: 3,
                                title: {
                                    text: 'SMA'
                                }
                            },
                                plotOptions: {
                                series: {
                                    marker: {
                                        enabled: false
                                    }
                                }
                            },
                                title: {
                                    text: 'Simple Moving Average (SMA)'
                                },
                                series: [{
                                    name: inputValue,
                                    data: sma,
                                    type: 'spline',
                                    color: '#FF0000',
                                    tooltip: {
                                        valueDecimals: 2
                                    }
                                }]
                            });






                    //SMA Chart Ends Here


                    //Price Volume Chart Starts here

                    ////alert("Volume SUM");
                    ////alert(volsum);
                    var volavg=parseInt((volsum/volume.length)*2);

                    //alert("Volume Averageasdsdsd");
                    //alert(volavg);

                    //volume.reverse();

                    ////alert("Max Volume is");
                    ////alert(maxvol);

            Highcharts.chart('Pricedata', {

                chart: {
                    zoomType: 'xy',
                    borderColor: 'rgb(223,223,223)',
                    width:510,
                    height:370
                },

                title: {
                    text: 'Stock Price'
                },

                subtitle: {
                    useHTML: true,
                    text: '<a style="color:blue;text-decoration:none;" target="_blank" href="https://www.alphavantage.co/">Source : Alpha Vantage </a>'
                },

                xAxis: {
                    categories: date1,
                    minPadding: 2,
                    tickInterval: 5,
                    labels: {
                        rotation: -45
                    },
                    endOnTick: false
                },
                legend: {
                    layout: 'vertical',
                    verticalAlign: 'bottom',
                    align:'center'
                },
                 yAxis: [{ // Primary yAxis
                    title: {
                        text: 'Stock Price'
                    }
                   },
                    { // Secondary yAxis
                    title: {
                        text: 'Volume'
                    },
                    labels: {
                        format: '{value} M'
                    },
                    allowDecimals: false,
                    opposite: true,
                    type: 'linear',
                    tickInterval: volavg
                }],
                series: [ 
                {
                    name: inputValue,
                    type: 'area',
                    marker:{
                        enabled: false
                    },
                    zIndex: 2,
                    color: 'rgb(208,209,250)',
                    data: close2
                },{
                    name: inputValue,
                    type: 'column',
                    pointWidth: 1,
                    minPadding: 2,
                    yAxis: 1,
                    color: '#FFFFFF',
                    zIndex: 10,
                    color: 'rgb(227,90,92)',
                    data: volume2
                },
               ]

            });

            fbcall('#Pricedata');







                    //Price Volume Chart Ends here





                    //EMA Chart Starts Here

                    jsonData = fdata[2];
                            data=fdata[2];

                            //alert(jsonData);


                            if(JSON.parse(data).hasOwnProperty("Error Message")){
                                flag = "exitFunction";
                                $('#error//Alert').text("Select a valid Entry");
                                $('#error//Alert').css("display","block");
                                $("#nextButtton .btn").prop("disabled",true);
                                //   $('#rightPanel-navigation').addClass("disabled");
                                $('#rightPanel-navigation').css("background-color", "#E4E4E4");

                                return;
                            }

                            var smadata = jQuery.parseJSON(data);

                               var ema=[];
                               var count=0;
                               var df=[];
                               var date1=[];
                               for(var key in smadata){
                                //////////alert(key);
                                if(key=="Technical Analysis: EMA"){
                                    for(var dat in smadata[key]){
                                        //////////alert(smadata[key][dat]["SMA"]);
                                        

                                        df=dat.split("-");

                                        if(count==155){
                                            break;
                                        }
                                        date1.push(df[1]+"/"+df[2]);
     
                                        ema.push(parseFloat(smadata[key][dat]["EMA"]));
                                        count++;
                                    }
                                    break;
                                }

                               }

                               ema.reverse();
                               date1.reverse();

                              // //alert(date1);
                               ////alert(sma);

                               ////////alert("Displaying SMA Length");
                               ////////alert(sma.length);

                            Highcharts.chart('EMAdata', {

                             chart: {
                                        zoomType: 'x',
                                        borderColor: 'rgb(223,223,223)',
                                         width:510,
                                        height:360
                                    },

                                 subtitle: {
                                    useHTML: true,
                                            text: '<a style="color:blue;text-decoration:none;" target="_blank" href="https://www.alphavantage.co/">Source : Alpha Vantage </a>'
                                        },
                                xAxis: {
                                categories: date1,
                                labels: {
                                                rotation: -45
                                            },
                                tickInterval: 5
                                },
                                legend: {
                                layout: 'vertical',
                                verticalAlign: 'bottom',
                                align:'center'
                                },
                                yAxis: {
                                minTickInterval: 3,
                                title: {
                                    text: 'EMA'
                                }
                            },
                                plotOptions: {
                                series: {
                                    marker: {
                                        enabled: false
                                    }
                                }
                            },
                                title: {
                                    text: 'Exponenetial Moving Average (EMA)'
                                },
                                series: [{
                                    name: inputValue,
                                    data: ema,
                                    type: 'spline',
                                    color: '#FF0000',
                                    tooltip: {
                                        valueDecimals: 2
                                    }
                                }]
                            });

                    //EMA Chart Ends here

                    //STOCH starts here


        //URL="https://www.alphavantage.co/query?function=STOCH&symbol="+symbol+"&interval=daily&time_period=10&series_type=close&apikey=751C927HQCVHWWD0&slowkmatype=1&slowdmatype=1";

                           jsonData = fdata[3];
                            data=fdata[3];

       var smadata = jQuery.parseJSON(data);   

       //////////alert(smadata);
       var stoch1=[];
       var stoch2=[];
       
       if(JSON.parse(data).hasOwnProperty("Error Message")){
                                flag = "exitFunction";
                                $('#error//Alert').text("Select a valid Entry");
                                $('#error//Alert').css("display","block");
                                $("#nextButtton .btn").prop("disabled",true);
                                //   $('#rightPanel-navigation').addClass("disabled");
                                $('#rightPanel-navigation').css("background-color", "#E4E4E4");

                                return;
                            }

       var countk=0;
       for(var key in smadata){
        //////////alert(key);
        if(key=="Technical Analysis: STOCH"){
            for(var dat in smadata[key]){
                //////////alert(smadata[key][dat]["SMA"]);
                
                if(countk==date1.length){
                    break;
                }
                stoch1.push(parseFloat(smadata[key][dat]["SlowK"]));
                stoch2.push(parseFloat(smadata[key][dat]["SlowD"]));
                
                countk++;
            }
            break;
        }

       }
       stoch1.reverse();
       stoch2.reverse();

       ////////alert("Displaying Stoch1 and 2");
       //alert(stoch1);

       ////////alert(stoch2);
    
    console.log(stoch1);

    console.log(stoch2);
    
    Highcharts.chart('STOCHdata', {
         chart: {
                    zoomType: 'x',
                      width:490,
                      height:340
                                    },
        subtitle: {
            useHTML: true,
             text: '<a style="color:blue;text-decoration:none;" target="_blank" href="https://www.alphavantage.co/">Source : Alpha Vantage </a>'
        },
        xAxis: {
        categories: date1,
        labels: {
                rotation: -45
        },
        tickInterval: 5
        },
        legend: {
        layout: 'vertical',
        align: 'center',
        verticalAlign: 'bottom'
        },
        yAxis: {
        minTickInterval: 3,
        title: {
            text: 'STOCH'
        }
    },
        plotOptions: {
        series: {
            marker: {
                enabled: false
            }
        }
    },
        title: {
            text: 'Stochastic Oscillator (STOCH)'
        },
        series: [{
            name: inputValue+'SLOWK',
            data: stoch1,
            type: 'spline',
            color: '#0000FF',
            tooltip: {
                valueDecimals: 2
            }},
            {
            name: inputValue+'SLOWD',
            data: stoch2,
            type: 'spline',
            color: '#FF0000',
            tooltip: {
                valueDecimals: 2
            }
        }]
    });

                    //STOCH ends here



                //RSI Starts Here

          jsonData = fdata[4];
                            data=fdata[4];

       var smadata = jQuery.parseJSON(data);   

       //////////alert(smadata);
       var stoch1=[];
       var stoch2=[];
       
       if(JSON.parse(data).hasOwnProperty("Error Message")){
                                flag = "exitFunction";
                                $('#error//Alert').text("Select a valid Entry");
                                $('#error//Alert').css("display","block");
                                $("#nextButtton .btn").prop("disabled",true);
                                //   $('#rightPanel-navigation').addClass("disabled");
                                $('#rightPanel-navigation').css("background-color", "#E4E4E4");

                                return;
                            }

       var countk=0;
       for(var key in smadata){
        //////////alert(key);
        if(key=="Technical Analysis: RSI"){
            for(var dat in smadata[key]){
                //////////alert(smadata[key][dat]["SMA"]);
                
                if(countk==date1.length){
                    break;
                }
                stoch1.push(parseFloat(smadata[key][dat]["RSI"]));
                //stoch2.push(parseFloat(smadata[key][dat]["SlowD"]));
                
                countk++;
            }
            break;
        }

       }
       stoch1.reverse();
       //stoch2.reverse();

       ////////alert("Displaying Stoch1 and 2");
       //alert("RSI is");
       //alert(stoch1);

       ////////alert(stoch2);
    
    //console.log(stoch1);

    //console.log(stoch2);

                Highcharts.chart('RSIdata', {
         chart: {
                    zoomType: 'x',
                     width:490,
                      height:340
                },
        subtitle: {
            useHTML: true,
             text: '<a style="color:blue;text-decoration:none;" target="_blank" href="https://www.alphavantage.co/">Source : Alpha Vantage </a>'
        },
        xAxis: {
        categories: date1,
        labels: {
                        rotation: -45
                    },
        tickInterval: 5
        },
        legend: {
        layout: 'vertical',
       align: 'center',
        verticalAlign: 'bottom'
    },
        yAxis: {
        minTickInterval: 3,
        title: {
            text: 'RSI'
        }
    },
        plotOptions: {
        series: {
            marker: {
                enabled: false
            }
        }
    },
        title: {
            text: 'Relative Strength Index (RSI)'
        },
        series: [{
            name: inputValue,
            data: stoch1,
            type: 'spline',
            color: '#FF0000',
            tooltip: {
                valueDecimals: 2
            }
        }]
    });









                //RSI Ends Here

                //ADX Starts Here

                 jsonData = fdata[5];
                            data=fdata[5];

       var smadata = jQuery.parseJSON(data);   

       //////////alert(smadata);
       var stoch1=[];
       var stoch2=[];
       
       if(JSON.parse(data).hasOwnProperty("Error Message")){
                                flag = "exitFunction";
                                $('#error//Alert').text("Select a valid Entry");
                                $('#error//Alert').css("display","block");
                                $("#nextButtton .btn").prop("disabled",true);
                                //   $('#rightPanel-navigation').addClass("disabled");
                                $('#rightPanel-navigation').css("background-color", "#E4E4E4");

                                return;
                            }

       var countk=0;
       for(var key in smadata){
        //////////alert(key);
        if(key=="Technical Analysis: ADX"){
            for(var dat in smadata[key]){
                //////////alert(smadata[key][dat]["SMA"]);
                
                if(countk==date1.length){
                    break;
                }
                stoch1.push(parseFloat(smadata[key][dat]["ADX"]));
                //stoch2.push(parseFloat(smadata[key][dat]["SlowD"]));
                
                countk++;
            }
            break;
        }

       }
       stoch1.reverse();
       //stoch2.reverse();

       ////////alert("Displaying Stoch1 and 2");
       //alert("ADX is");
       //alert(stoch1);

       ////////alert(stoch2);
    
    //console.log(stoch1);

    //console.log(stoch2);

                Highcharts.chart('ADXdata', {
         chart: {
                    zoomType: 'x',
                     width:490,
                      height:340
                },

        subtitle: {
            useHTML: true,
             text: '<a style="color:blue;text-decoration:none;" target="_blank" href="https://www.alphavantage.co/">Source : Alpha Vantage </a>'
        },
        xAxis: {
        categories: date1,
        labels: {
                        rotation: -45
                    },
        tickInterval: 5
        },
        legend: {
        layout: 'vertical',
        align: 'center',
        verticalAlign: 'bottom'
    },
        yAxis: {
        minTickInterval: 3,
        title: {
            text: 'ADX'
        }
    },
        plotOptions: {
        series: {
            marker: {
                enabled: false
            }
        }
    },
        title: {
            text: 'Average Directional Movement Index (ADX)'
        },
        series: [{
            name: inputValue,
            data: stoch1,
            type: 'spline',
            color: '#FF0000',
            tooltip: {
                valueDecimals: 2
            }
        }]
    });



                //ADX Ends Here


            //CCI Starts Here

         jsonData = fdata[6];
                            data=fdata[6];

       var smadata = jQuery.parseJSON(data);   

       //////////alert(smadata);
       var stoch1=[];
       var stoch2=[];
       
       if(JSON.parse(data).hasOwnProperty("Error Message")){
                                flag = "exitFunction";
                                $('#error//Alert').text("Select a valid Entry");
                                $('#error//Alert').css("display","block");
                                $("#nextButtton .btn").prop("disabled",true);
                                //   $('#rightPanel-navigation').addClass("disabled");
                                $('#rightPanel-navigation').css("background-color", "#E4E4E4");

                                return;
                            }

       var countk=0;
       for(var key in smadata){
        //////////alert(key);
        if(key=="Technical Analysis: CCI"){
            for(var dat in smadata[key]){
                //////////alert(smadata[key][dat]["SMA"]);
                
                if(countk==date1.length){
                    break;
                }
                stoch1.push(parseFloat(smadata[key][dat]["CCI"]));
                //stoch2.push(parseFloat(smadata[key][dat]["SlowD"]));
                
                countk++;
            }
            break;
        }

       }
       stoch1.reverse();
       //stoch2.reverse();

       ////////alert("Displaying Stoch1 and 2");
       //alert("CCI is");
       //alert(stoch1);

       ////////alert(stoch2);
    
    //console.log(stoch1);

    //console.log(stoch2);

                Highcharts.chart('CCIdata', {
         chart: {
                    zoomType: 'x',
                     width:490,
                      height:340
                },
        subtitle: {
            useHTML: true,
             text: '<a style="color:blue;text-decoration:none;" target="_blank" href="https://www.alphavantage.co/">Source : Alpha Vantage </a>'
        },
        xAxis: {
        categories: date1,
        labels: {
                        rotation: -45
                    },
        tickInterval: 5
        },
        legend: {
        layout: 'vertical',
        align: 'center',
        verticalAlign: 'bottom'
    },
        yAxis: {
        minTickInterval: 3,
        title: {
            text: 'CCI'
        }
    },
        plotOptions: {
        series: {
            marker: {
                enabled: false
            }
        }
    },
        title: {
            text: 'Commodity Channel Index (CCI)'
        },
        series: [{
            name: inputValue,
            data: stoch1,
            type: 'spline',
            color: '#FF0000',
            tooltip: {
                valueDecimals: 2
            }
        }]
    });








            //CCI Ends Here

            //BBANDS Starts Here


         jsonData = fdata[7];
         data=fdata[7];

       var smadata = jQuery.parseJSON(data);   

       //////////alert(smadata);
       var stoch1=[];
       var stoch2=[];
       var stoch3=[];
       
       if(JSON.parse(data).hasOwnProperty("Error Message")){
                                flag = "exitFunction";
                                $('#error//Alert').text("Select a valid Entry");
                                $('#error//Alert').css("display","block");
                                $("#nextButtton .btn").prop("disabled",true);
                                //   $('#rightPanel-navigation').addClass("disabled");
                                $('#rightPanel-navigation').css("background-color", "#E4E4E4");

                                return;
                            }

       var countk=0;
       for(var key in smadata){
        //////////alert(key);
        if(key=="Technical Analysis: BBANDS"){
            for(var dat in smadata[key]){
                //////////alert(smadata[key][dat]["SMA"]);
                
                if(countk==date1.length){
                    break;
                }
                stoch1.push(parseFloat(smadata[key][dat]["Real Lower Band"]));
                stoch2.push(parseFloat(smadata[key][dat]["Real Upper Band"]));
                stoch3.push(parseFloat(smadata[key][dat]["Real Middle Band"]));
                //stoch2.push(parseFloat(smadata[key][dat]["SlowD"]));
                
                countk++;
            }
            break;
        }

       }
       stoch1.reverse();
       stoch2.reverse();
       stoch3.reverse();

       ////////alert("Displaying Stoch1 and 2");
       //alert("BBANDS is");
       //alert(stoch1);

       ////////alert(stoch2);
    
    //console.log(stoch1);

    //console.log(stoch2);

        
        Highcharts.chart('BBANDSdata', {
         chart: {
                    zoomType: 'x',
                     width:490,
                      height:340
                },
        rangeSelector: {
            borderColor: 'rgb(223,223,223)',
            selected: 1
        },
        subtitle: {
            useHTML: true,
             text: '<a style="color:blue;text-decoration:none;" target="_blank" href="https://www.alphavantage.co/">Source : Alpha Vantage </a>'
        },
        xAxis: {
        categories: date1,
        labels: {
                        rotation: -45
                    },
        tickInterval: 5
        },
        yAxis: {
        minTickInterval: 3,
        title: {
            text: 'BBAND'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'center',
        verticalAlign: 'bottom'
        },
        title: {
            text: 'Bollinger Bands(BBANDS)'
        },
        series: [{
            name: inputValue+'Real Middle Band',
            data: stoch1,
            type: 'spline',
            color: '#00FF00',
            marker: {
                enabled: false
                            },
            tooltip: {
                valueDecimals: 2
            }
        },
        {
            name: inputValue+'Real Upper Band',
            data: stoch2,
            type: 'spline',
            color: '#000000',
            marker: {
                enabled: false
            },
            tooltip: {
                valueDecimals: 2
            }
        },
        {
            name: inputValue+'Real Lower Band',
            data: stoch3,
            type: 'spline',
            color: '#FF0000',
            marker: {
                enabled: false
            },
            tooltip: {
                valueDecimals: 2
            }
        }]
    });

     //BBANDS Ends here

    //MACD Starts Here

   jsonData = fdata[8];
         data=fdata[8];

       var smadata = jQuery.parseJSON(data);   

       //////////alert(smadata);
       var stoch1=[];
       var stoch2=[];
       var stoch3=[];
       
       if(JSON.parse(data).hasOwnProperty("Error Message")){
                                flag = "exitFunction";
                                $('#error//Alert').text("Select a valid Entry");
                                $('#error//Alert').css("display","block");
                                $("#nextButtton .btn").prop("disabled",true);
                                //   $('#rightPanel-navigation').addClass("disabled");
                                $('#rightPanel-navigation').css("background-color", "#E4E4E4");

                                return;
                            }

       var countk=0;
       for(var key in smadata){
        //////////alert(key);
        if(key=="Technical Analysis: MACD"){
            for(var dat in smadata[key]){
                //////////alert(smadata[key][dat]["SMA"]);
                
                if(countk==date1.length){
                    break;
                }
                stoch1.push(parseFloat(smadata[key][dat]["MACD"]));
                stoch2.push(parseFloat(smadata[key][dat]["MACD_Hist"]));
                stoch3.push(parseFloat(smadata[key][dat]["MACD_Signal"]));
                //stoch2.push(parseFloat(smadata[key][dat]["SlowD"]));
                
                countk++;
            }
            break;
        }

       }
       stoch1.reverse();
       stoch2.reverse();
       stoch3.reverse();

       ////////alert("Displaying Stoch1 and 2");
       //alert("BBANDS is");
       //alert(stoch1);

       ////////alert(stoch2);
    
    //console.log(stoch1);

    //console.log(stoch2);

        
        Highcharts.chart('MACDdata', {
         chart: {
                    zoomType: 'x',
                     width:490,
                      height:340
                },
        rangeSelector: {
            borderColor: 'rgb(223,223,223)',
            selected: 1
        },
        subtitle: {
            useHTML: true,
             text: '<a style="color:blue;text-decoration:none;" target="_blank" href="https://www.alphavantage.co/">Source : Alpha Vantage </a>'
        },
        xAxis: {
        categories: date1,
        labels: {
                        rotation: -45
                    },
        tickInterval: 5
        },
        yAxis: {
        minTickInterval: 3,
        title: {
            text: 'MACD'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'center',
        verticalAlign: 'bottom'
        },
        title: {
            text: 'Moving Average Convergence/Divergence (MACD)'
        },
        series: [{
            name: inputValue+'MACD',
            data: stoch1,
            type: 'spline',
            color: '#00FF00',
            marker: {
                enabled: false
                            },
            tooltip: {
                valueDecimals: 2
            }
        },
        {
            name: inputValue+'MACD_Hist',
            data: stoch2,
            type: 'spline',
            color: '#000000',
            marker: {
                enabled: false
            },
            tooltip: {
                valueDecimals: 2
            }
        },
        {
            name: inputValue+'MACD_Signal',
            data: stoch3,
            type: 'spline',
            color: '#FF0000',
            marker: {
                enabled: false
            },
            tooltip: {
                valueDecimals: 2
            }
        }]
    });










    //MACD Ends Here

                $("#fbData").prop('disabled',false);
                $("#fbimage").css("opacity", "1");


                    //$("#fbData .btn").prop('disabled',false);
                    //$("#fbData .btn").css("background-color", "");

                    //$("#starBat .btn").prop('disabled',false);
                    //$("#starBat .btn").css("background-color", "");

                    $("#starBat").prop('disabled',false);
                    $("#starBat").css("background-color", "");
              

            }) // I GUess this is where the get .done request ends
            
            .fail(function (data) {

                $('#resultTable').append(fail1);

                    $('#Pricedata').append(fail);
                    $('#SMAdata').append(fail);
                    $('#EMAdata').append(fail);
                    $('#STOCHdata').append(fail);
                    $('#RSIdata').append(fail);
                    $('#ADXdata').append(fail);
                    $('#CCIdata').append(fail);
                    $('#BBANDSdata').append(fail);
                    $('#MACDdata').append(fail);


                    $('#chartData').append(fail2);


            //.done(function (data)

            })
            } // This is the if for Min_Length Checking Condition

             else {
                    $('#results').html('');

                }
                if(flag =="exitFunction"){
                    return;
                }

               
                $("#starElement").removeClass('starClass');
                $("#starElement").addClass('undostarClass');

                for (var i = 0; i < localStorage.length; i++) {
                    var localResult = localStorage.getItem(localStorage.key(i));

                    var tableresult = (localResult);
                    if (inputValue.toLowerCase() == tableresult.toLowerCase()) {
                        $("#starElement").removeClass('undostarClass');
                        $("#starElement").addClass('starClass');

                    }

                }
           
            }

            });

//Refresh Code Starts Here

    function checkIfFinished() {
        return (favResultArray.length == localStorage.length);
    }

    //The Code that gets called on Page_Load to populate the Favorite List Table

     if((localStorage.length) >0) {
        refreshNow();
        var timeout = setInterval(function()
        { 
            if(favResultArray.length == localStorage.length) {
            clearInterval(timeout); 
            isFinished = true;
            print_Data(favResultArray);
            favResultArray =[]; 
        } 
          }, 100);



    }

    var autoRefreshVar;
    
    $('#refershButton').on("change",function () {
        if ($('#refershButton').prop('checked') === true) {
            autoRefreshVar  =   setInterval(function() { 
                favResultArray = [];
                counter =0; 
                autorefreshNow(); 
                 var timeout = setInterval(function()
                   { 
                    if(favResultArray.length == localStorage.length) {
                     clearInterval(timeout); 
                     isFinished = true;
                     print_Data(favResultArray);
                    favResultArray =[]; } 
                }, 100);
            }, 5000)






        }
        else if ($('#refershButton').prop('checked') === false){
            clearInterval(autoRefreshVar);
        }


    });


//Code for Star button when clicked




    function refreshNow()
    {
        tableData ="";
        //var tempData1 = ('<table class="table table-striped" id="favouriteTable"> <tr> <th>Symbol</th> <th>Company Name</th> <th>Stock Price</th> <th class ="changeFavourite">Change(Change Percent)</th> <th class ="changeFavourite">Market Cap</th> <th class ="changeFavourite" id="deleteTh"></th> </tr></table>');
        // $('#favouriteTable').text("");
        // $('#favouriteTable').append(tempData1);

        $.ajax({
            url:'http://apicall-env.us-east-2.elasticbeanstalk.com/index.php',
            data :{favtable :localStorage.getItem(counter.toString())},
            async: true,
            dataType: 'json',
            success:function(data){
                counter++;

                favResultArray.push(data);

                //alert("Fav Result Array");
                //alert(favResultArray);


                if (counter < localStorage.length) refreshNow();







            }
        });

        //alert("I'm Here");

        if(localStorage.length==0){
        $('#sort').prop('disabled', true);
        }




    }

    function print_Data(inputArr) {

        //alert("In Printaasdsdsd Data");





        //alert(inputArr.length);

        if(inputArr.length!=0){
             //$('#sort').prop('disabled', 'false');
            }


        //$('table#favouriteTable').remove();

        var tempData1 = '<table class="table table-striped" id="favouriteTable"> <thead><tr> <th>Symbol</th> <th>Stock Price</th> <th class ="changeFavourite">Change(Change Percent)</th> <th class ="changeFavourite">Volume</th> <th class ="changeFavourite" id="deleteTh"></th> </tr></thead>';
       
        //var tempData1="";
        tempData1 +="<tbody>";
            

        $('#favouriteTable').text("");
        //$('#favouriteTable').append(tempData1);

        for (i = 0; i < inputArr.length; i++) {

            tableresult = "";
            tableresult = (inputArr[i]);
            if(tableresult.hasOwnProperty("Error Message")){


                continue;
            }
            var symbol;

            var count=0;
            limit=0;

            symbol=tableresult["Meta Data"]["2. Symbol"];


             $.each(tableresult, function (key, value) {
                                

                                if(key === "Time Series (Daily)"){
                                    $.each(tableresult[key], function (key1, value1) {
                                        ////alert("Displaying date and values");
                                        ////alert(key1);

                                        ////alert(value1);

                                        if(count==0){
                                            LPrice=tableresult[key][key1]["4. close"];
                                            day1close=LPrice;
                                            day1open=tableresult[key][key1]["1. open"];
                                            day1range=tableresult[key][key1]["2. high"]-tableresult[key][key1]["3. low"];
                                            day1volume=tableresult[key][key1]["5. volume"];
                                            tstamp=key1;
                                            ////alert("//Alerting LPrice");
                                            ////alert(LPrice);
                                         //var v = (Math.round(LPrice).toFixed(2));
                                        }

                                        if(count==1){
                                            day2close=tableresult[key][key1]["4. close"];
                                        }

                                        //var dat=fixDate(key1);
                                        ////alert(dat);
                                        //dates.push(dat);

                                        //open.push(parseFloat(tableresult[key][key1]["1. open"]));
                                        //high.push(parseFloat(results[key][key1]["2. high"]));
                                        //low.push(parseFloat(results[key][key1]["3. low"]));
                                        //close.push(parseFloat(results[key][key1]["4. close"]));
                                        //volume.push(parseFloat(results[key][key1]["5. volume"]));

                                        //var billionValue = parseFloat(results[key][key1]["5. volume"] / (1000000000));
                                        //var millionValue = parseFloat(results[key][key1]["5. volume"] / (1000000));
                                         count++;

                                        limit++;
                                        
                                        if(limit==3)
                                            return false;

                                    });
                        }      
                    });


            var change=day2close-day1close;




            //tableSymbol = Symbol;

            //alert("Table Symbol is:");
            //alert(symbol);

            tempData1 += '<tr><td ><a href="javascript:void(0)"; onClick="pageRender($(this).text());" >' + symbol + '</a></td><td>' + Math.round(LPrice).toFixed(2) + '</td>';
            /* if (change < 0) {
                tempData1 += '<td style="color: red;" class ="changeFavourite">' + change.toFixed(2) + '</td>';
            }
            else if (change > 0) {
                tempData1 += '<td style="color: green;"class ="changeFavourite">' + change.toFixed(2) + '</td>';

            } */


                                    value=(change/day1close)*100;

                                    console.log("Change Percent is");
                                    console.log("Change"+change);
                                    console.log("Day 2 Close"+day2close);
                                    console.log("Percent"+value);

                                    tempChangeValue=change;
                                    if (tempChangeValue < 0 && value < 0) {
                                        value = (Math.abs(tempChangeValue)).toFixed(2) + " ( " + (Math.abs(value)).toFixed(2) + "% ) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/Down.png' style='width: 20px;'>";
                                        tempData1 += '<td style="color: red"> -' + value + '</td>';
                                    }
                                    else if (tempChangeValue > 0 && value > 0) {
                                        value = (Math.abs(tempChangeValue)).toFixed(2) + " ( " + (Math.abs(value)).toFixed(2) + "% ) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/Up.png ' style='width: 20px;'>";
                                        tempData1 += '<td style="color: green">' + value + '</td>';

                                    }
                                    else {
                                        value = Math.round(Math.abs(tempChangeValue)).toFixed(2) + " ( " + Math.round(Math.abs(value)).toFixed(2) + "% ) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/up.png' style='width: 20px;'>";
                                        tempData1 += '<td>' + value + '</td>';

                                    }
                                    var fg=numberWithCommas(day1volume);
            tempData1 += '<td class ="changeFavourite">' + fg + ' </td>';
            tempData1 += '<td class ="changeFavourite"><button class="deleteButton" id="delete"><i class ="glyphicon glyphicon-trash"></i></button></td>';
            tempData1 += '</tr>';


        }//for ends here

            tempData1+='</tbody></table>';

            //alert("Final Table Data");
            //alert(tempData1);


            $('#sort').prop('disabled', false);


           // $('#sort').prop('disabled', 'false');
            
    

            $("#favouriteTable").append(tempData1);

            




    }

    $("div:contains(inputValue  )").each(function(){
        var content = inputValue
        this.innerHTML = this.innerHTML.replace(content,"<span>"+content+"</span>")
    })
    function autorefreshNow()
    {
        refreshNow();
    }
/*
     function delete1()
     {
        //alert("In delete");

        var tdValue = $(this).closest('tr').children('td:first').text();

        //var tdValue = $(this).closest('tr').remove();

        tdValue = tdValue.trim();
        //alert("td values is");
        //alert(tdValue);

        for(var i =0; i<localStorage.length;i++){
            if (localStorage.getItem(i.toString()).toLowerCase() == tdValue.toLowerCase()) {

                //alert("//Alerting What I got");
                //alert(i.toString());
                //alert(tdValue.toLowerCase());

                localStorage.removeItem(i.toString());
                $(this).parent().parent().remove();
            }
        }
        var pointer =0;
        for(var i=0; i< localStorage.length+1;i++){
            if(localStorage.getItem(i.toString())==null){
                continue;
            }
            var tempValue = localStorage.getItem(i.toString());
            localStorage.removeItem(i.toString());
            localStorage.setItem(pointer.toString(),tempValue);
            pointer++;
        }
        favResultArray = [];
        counter =0;
        refreshNow();


        var timeout = setInterval(function()
        { if(favResultArray.length == localStorage.length) { clearInterval(timeout); isFinished = true;print_Data(favResultArray);
            favResultArray =[]; } }, 100);


    }

*/






    //Refresh and Favroite ends here







