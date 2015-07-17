var http = require('http');
var express = require('express');
var path  = require('path');
var stringify = require("json-stringify-pretty-compact");
var jade = require('jade');

var app = express();
app.set('port',process.env.PORT || 3038);
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'src'), {
maxAge: 31557600000
}));

app.engine('html', require('jade').renderFile);
app.set('views', __dirname);
app.set('view engine', 'jade');

function parseCookies(request){
	var list = {},
	rc = request.headers.cookie;
	return rc;
}

app.get('/', function(req, res){
 /*  var html = '<form action="/" method="post">' +
               'Email:' +
               '<input type="text" name="userName" placeholder="..." />' +
               '<br>' +
               '<br>' +
               'Width:' +
               '<input type="text" name="width1" placeholder="..." />' +
               '<br>' +
               '<br>' +
               'Height:' +
               '<input type="text" name="height1" placeholder="..." />' +
               '<br>' +
               '<br>' +
                '<button type="submit">Submit</button>' +
            '</form>';
               
   res.send(html);*/
   res.render("home.jade", {
     width: req.query.width || 1300,
     height: req.query.height || 640
   });
 
});

app.post('/', function(req, res){
  var userName = req.body.userName;
  /*var width = 100;
  var height = 50;*/
  var width = req.body.width1;
  var height = req.body.height1;
  /*if(width === '' && height === ''){
    width = 500;
    height = 500;
  }*/
  var cookies = parseCookies(req);
  console.log(cookies);

  var options = {
        hostname : "localhost",
        //port: "8080",
        //path : '/userservice/data/v1/entity/user/who-am-i',
        // path : '/app/v1/user/journey?email=siddharthgupta25@gmail.com',
        path : '/app/v1/user/journey?email='+ userName,
   	    mathod :'Get',
        headers : {
       		'Cookie' : cookies
       	}
  };
       
  http.get(options,function(resp){
    console.log("statusCode: ",resp.statusCode);
    console.log("headers :" , resp.headers);
    var s = '';
      
    resp.on('data',function(d){
          // res.write(d);
      // console.log("orginal string-------------->"+ "  " + d);
      s += d;
    });
        
    resp.on('end',function(){
        s = JSON.parse(s);
        console.log(s);
        /*console.log("d--->1" + "  " +  s.statusCode);
      	console.log("d--->2" + "  " +  s.version);
      	console.log("d--->3" + "  " +  s.data[0].id);
      	console.log("d--->4" + "  " +  s.data[0].userId);
      	console.log("d--->5" + "  " +  s.data[0].eventTypeId);  
      	console.log("d--->6" + "  " +  s.data[0].eventType.id);
      	console.log("d--->7" + "  " +  s.data[0].eventType.event);
      	console.log("d--->8" + "  " +  s.data[0].eventType.displayName);
      	console.log("d--->9" + "  " +  s.data[0].occurrenceDate);
      	console.log("d--->10" + "  " +  s.data[0].attributeDetail);
      	console.log("d--->11" + "  " +  s.data[0].attributeSecondaryDetail);
      	console.log("d--->12" + "  " +  s.data[0].eventAttributes);
        console.log("lenghth" + " " + s.data.length);
        y = new Date(s.data[0].occurrenceDate ).getFullYear();
      	m = new Date(s.data[0].occurrenceDate ).getMonth();
      	d = new Date(s.data[0].occurrenceDate).getDate();
        var array = new Array(s.data.length);
        for (var i = 0; i < s.data.length; i++) {
            array[i] = [s.data[i].eventType.displayName,
                        s.data[i].attributeDetail,
                        s.data[i].occurrenceDate,
                        s.data[i].attributeSecondaryDetail,
                        new Date(s.data[i].occurrenceDate ).getFullYear(),
                        new  Date(s.data[i].occurrenceDate ).getMonth(),
                        new  Date(s.data[i].occurrenceDate).getDate(),
                        s.data.length];
          }
        var t = new Date(( new Date( s.data[0]. ).getFullYear(),
                new Date(s.data[0].occurrenceDate ).getMonth(),
                new Date(s.data[0].occurrenceDate ).getDate()));
        var array = new Array(s.data.length);
        
        /*var t = s.data[0].occurrenceDate;
        console.log(t);

       /for(var i = 0; i < s.data.length; i++){
            array[i] = [s.data[i].occurrenceDate,
                        null , 
                        s.data[i].eventType.displayName,
                        s.data.length,
                        s.data[i].attributeSecondaryDetail,
                        new Date(s.data[i].occurrenceDate).getFullYear(),
                        new Date(s.data[i].occurrenceDate ).getMonth(),
                        new Date(s.data[i].occurrenceDate ).getDate()
                        ];
          }*/
        var array = [];
        if( s.statusCode === "404" ){
          res.render('authantication',{
            wt : width,
            ht : height
          })
        } 
        else if(s.statusCode === "401"){
          res.render('authanticationError',{
          wt: width,
          ht: height,
          email : userName
          })
        }

       else if(s.statusCode != "404" && s.data === null){
          res.render('invalid',{
            wt : width,
            ht : height,
            email: userName
          })
        }

          

        else if(s.status_Code != "404" && s.data.length !== 0){
          for (var i = 0; i < s.data.length; i++){
                array.push({ 
                    "date" : s.data[i].occurrenceDate ,
                    "nullvalue"  : null,
                    "displayName" : s.data[i].eventType.displayName,
                    "length1" : s.data.length,
                    "SecondaryDetail" : s.data[i].attributeSecondaryDetail,
                    "year" : new Date(s.data[i].occurrenceDate).getFullYear(),
                    "month" : new Date(s.data[i].occurrenceDate ).getMonth(),
                    "dt" : new Date(s.data[i].occurrenceDate ).getDate(),
                    "email": userName,
                    "Width" : width,
                    "Height" : height,
                    "atr" : s.data[i].attributeDetail
                });
          }       
         
          console.log("username--->"+ userName);
          console.log("########3after render######################");          

          for (var i = 0; i < s.data.length; i++) {
               console.log(array[i].date + " " +
                           array[i].nullvalue + " " + 
                           array[i].displayName + " " +
                           array[i].length1 + " " +
                           array[i].SecondaryDetail + " " + 
                           array[i].year + " " +
                           array[i].year +  " " + 
                           array[i].month + " " + 
                           array[i].dt + " " + 
                           array[i].email + " " +
                           array[i].Width + " " +
                           array[i].Height + " " +
                           array[i].atr);
          }
          //console.log("########3after render######################");
          res.render('timelineDemo', {
            /*displayName: s.data[0].eventType.displayName
            journeyData1  : {"displayName": s.data[0].eventType.displayName, "journeyDate": s.data[0].occurrenceDate, "y": y, "m": m, "d":d,"hover":  s.data[0].attributeSecondaryDetail}*/
            journeyData : array
          })
          console.log('after render');
        }
          else {
            res.render('noHistory',{
              wt : width,
              ht : height,
              email: userName
            })
          }
    });
  });
});




http.createServer(app).listen(app.get('port'),function(){
		console.log('Express server listening on port' + app.get('port'))
});

