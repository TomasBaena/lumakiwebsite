//script
$(document).ready(function () {
        // $('#datetimepicker1').datetimepicker();
$( "#datepicker" ).datepicker({
        showButtonPanel: true,
        // changeMonth: true,
    timeFormat:  "hh:mm:ss",
        changeYear: false,
        minDate: new Date(),
        maxDate: '+2Y',
        inline: true
    });
            });

var app = angular.module('coupzDashboard', []);
app.controller('coupzController', function($scope) {
  $scope.retireIndex;
  $scope.live=true;
   $scope.myDate = new Date();
  $(document).ready(function() {
            
  $scope.signedIn = false;
  function addDays(date, amount) {
      var tzOff = date.getTimezoneOffset() * 60 * 1000,
          t = date.getTime(),
          d = new Date(),
          tzOff2;

      t += (1000 * 60 * 60 * 24) * amount;
      d.setTime(t);

      tzOff2 = d.getTimezoneOffset() * 60 * 1000;
      if (tzOff != tzOff2) {
        var diff = tzOff2 - tzOff;
        t += diff;
        d.setTime(t);
      }

      return d;
  }
  $scope.push = function(){
      Parse.Cloud.run('sendPush', {message: $('#inputPush').val() ,userid:Parse.User.current().id}, {
          success: function(result) {
              alert(result);
              var d = new Date();
              Parse.User.current().set("lastPushSent",d);
              Parse.User.current().save();
              $scope.getPushData();
          },
          error: function(error) {
               alert('Failed to create new object, with error code: ' + error.message);
          }
      });

  }

  $scope.inputDate;
  $scope.inputRedeemLimit;
  $scope.inputSavings;
  $scope.inputTerms;
  $scope.inputRevenue;
  $scope.uploadFlag=1;
  $scope.uploadCoupon = function() {
    var fileUploadControl = $("#inputFile")[0];
    if($scope.uploadFlag == 1){
      if (fileUploadControl.files.length > 0 && $scope.inputDate && $scope.inputRedeemLimit && $scope.inputRevenue && $scope.inputSavings && $scope.inputTerms) {
        $scope.uploadFlag=0;
        var file = fileUploadControl.files[0];
        var name = "photo.png";
        var parseFile = new Parse.File(name, file);
        alert(parseFile.url());
          parseFile.save().then(function() {
          $scope.newRedeem = new Parse.Object("redemptions");
          $scope.newRedeem.set("businessId", Parse.User.current().id);
          $scope.newRedeem.set("redemptions", 0);
          $scope.newRedeem.set("revenue", 0);
          $scope.newRedeem.set("redemptionDates",[]);
          $scope.newRedeem.save().then(function(){
              $scope.newCoupon = new Parse.Object("coupons");
              $scope.newCoupon.set("retired", false);
              $scope.newCoupon.set("business", Parse.User.current().id);
              $scope.newCoupon.set("location", Parse.User.current().get("locationId").id);
              $scope.newCoupon.set("address", Parse.User.current().get("address"));
              $scope.newCoupon.set("website", Parse.User.current().get("website"));
              $scope.newCoupon.set("businessName", Parse.User.current().get("businessName"));
              $scope.newCoupon.set("phone", Parse.User.current().get("phone"));
              $scope.newCoupon.set("couponImg", parseFile);
              $scope.newCoupon.set("expires", $( "#datepicker" ).datepicker('getDate'));
              $scope.newCoupon.set("redeemLimit", $scope.inputRedeemLimit);
              $scope.newCoupon.set("revenue", $scope.inputRevenue);
              $scope.newCoupon.set("savings", $scope.inputSavings);
              $scope.newCoupon.set("terms", $scope.inputTerms);
              var custom_acl = new Parse.ACL();
              custom_acl.setWriteAccess( Parse.User.current(), true);
              custom_acl.setPublicReadAccess(true);
              $scope.newCoupon.setACL(custom_acl)
              $scope.newCoupon.save().then(function() {

                $scope.newRedeem.set("couponId",$scope.newCoupon.id);
                $scope.newRedeem.save().then(function(){
                  $scope.newCoupon.set("redemptions",$scope.newRedeem);
                  $scope.newCoupon.save().then(function(){
                      $scope.getCouponData();
                      $scope.uploadFlag=1;
                        $("#uploadModal").modal("hide");
                  },function(error){//clean up 
                        alert('Failed to create new object, with error code:e ' + error.message);
                        $scope.uploadFlag=1;
                  });
                  
                },function(error){//clean up
                    alert('Failed to create new object, with error code:d ' + error.message);
                    $scope.uploadFlag=1;
                });
                

              },function(error){//clean up
                    alert('Failed to create new object, with error code:c ' + error.message);
                    $scope.uploadFlag=1;

              });
            },function(error){

                alert('Failed to create new object, with error code:b ' + error.message);
                $scope.uploadFlag=1;

            });
        }, function(error) {
          alert('Failed to create new object, with error code:a ' + error);
          $scope.uploadFlag=1;
        });
      }else{
        alert("Fields Missing");
      }
    }

  }
  $scope.setRetire = function(index) {
    $scope.retireIdex=index;
    $('#retireModal').modal('show');
  }
  $scope.retireCoupon = function() {
    $scope.coupons[$scope.retireIdex].set("retired",true);
    $scope.coupons[$scope.retireIdex].save(null, {
      success: function(gameScore) {
        // Execute any logic that should take place after the object is saved.
        // alert('success');
        $('#retireModal').modal('hide');
        $scope.getCouponData();
      },
      error: function(gameScore, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  }
  
  $scope.getPushData = function() {
    var query = new Parse.Query(Parse.User);
          query.equalTo("objectId", Parse.User.current().id);  // find all the women
          query.find({
            success: function(result) {
                    var lastPush = result[0].get("lastPushSent");
                    var today = new Date();
                    var dif = ((today-lastPush)/(1000*60*60*24));
                    if (dif>=4){
                      $scope.$apply(function () {
                        $scope.allowPush = true;
                        $scope.lastPush = lastPush;
                      });
                    }else{
                      $scope.$apply(function () {
                        $scope.allowPush=false;
                        $scope.nextPush = addDays(lastPush,4);
                        $scope.lastPush = lastPush;
                      });
                    }
            }
          });
      Parse.Cloud.run('getNumPush', {id: Parse.User.current().id}, {
          success: function(result) {
            $scope.$apply(function () {
              $scope.numSubscribers = result;
            });
          },
          error: function(error) {
               alert('Failed to create new object, with error code: ' + error.message);
          }
      });

        

  }
  $scope.getCouponData = function() {
    $scope.couponsUsed = 0;
    var query = new Parse.Query(Parse.Object.extend("coupons"));
    query.equalTo("business", Parse.User.current().id);
    query.equalTo("retired", false);
    query.include("redemptions");
    query.find({//get coupons
      success: function(results) {
        $scope.$apply(function () {
            $scope.coupons = results;
            $scope.couponsUsed = results.length;
            $scope.couponsAllowed = Parse.User.current().get('couponsAllowed');
        });
        
        
        var usedPercent = ($scope.couponsUsed/$scope.couponsAllowed)*100;
        $('#progressUsed').css('width',usedPercent.toString()+"%");
        $('#progressLeft').css('width',(100-usedPercent).toString()+"%");

        
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
        }
    });
}
$scope.getAnalyticData = function() {
    $scope.todaysRedemptions=0;
    $scope.todaysRevenue=0;
    $scope.totalRedemptions=0;
    $scope.totalRevenue=0;
    var query = new Parse.Query(Parse.Object.extend("coupons"));
    query.equalTo("business", Parse.User.current().id);
    query.include("redemptions");
    query.find({//get coupons
      success: function(results) {
            var today = new Date();
            var todayAr = today.toUTCString().split(" ")
              var dataRedemption = [
                ['Date', 'Last', 'This']
                ];
              var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
              for (i=1;i<8;i++){
                dataRedemption.push([days[(addDays(today,i)).getDay()],0,0]);
              }
            for (i=0;i<results.length;i++){ 
              $scope.$apply(function () {
                $scope.totalRevenue = $scope.totalRevenue + results[i].get("redemptions").get("revenue");
              });
              // alert(results[i].get("redemptions").get("revenue"));
                var coupDates = results[i].get("redemptions").get("redemptionDates");
                $scope.totalRedemptions = $scope.totalRedemptions + coupDates.length;
                for (e=0;e<coupDates.length;e++){
                    var dif = ((today-new Date(coupDates[e]))/(1000*60*60*24));
                    if (dif<1){
                      $scope.todaysRevenue = $scope.todaysRevenue + results[i].get("savings");
                      $scope.todaysRedemptions = $scope.todaysRedemptions +1;
                      dataRedemption[7][2] = dataRedemption[7][2]+1;
                    }else if(dif<2){
                      dataRedemption[6][2] = dataRedemption[6][2]+1;
                    }
                    else if(dif<3){
                      dataRedemption[5][2] = dataRedemption[5][2]+1;
                    }
                    else if(dif<4){
                      dataRedemption[4][2] = dataRedemption[4][2]+1;
                    }
                    else if(dif<5){
                      dataRedemption[3][2] = dataRedemption[3][2]+1;
                    }
                    else if(dif<6){
                      dataRedemption[2][2] = dataRedemption[2][2]+1;
                    }
                    else if(dif<7){
                      dataRedemption[1][2] = dataRedemption[1][2]+1;
                    }
                    else if(dif<8){
                      dataRedemption[7][1] = dataRedemption[7][1]+1;
                    }
                    else if(dif<9){
                      dataRedemption[6][1] = dataRedemption[6][1]+1;
                    }
                    else if(dif<10){
                      dataRedemption[5][1] = dataRedemption[5][1]+1;
                    }
                    else if(dif<11){
                      dataRedemption[4][1] = dataRedemption[4][1]+1;
                    }
                    else if(dif<12){
                      dataRedemption[3][1] = dataRedemption[3][1]+1;
                    }
                    else if(dif<13){
                      dataRedemption[2][1] = dataRedemption[2][1]+1;
                    }
                    else if(dif<14){
                      dataRedemption[1][1] = dataRedemption[1][1]+1;
                    }
                }

            }
            drawChart(dataRedemption);
            $scope.lastWeekRedemptions=0;
            $scope.thisWeekRedemptions=0;
            for (i =1;i<dataRedemption.length;i++){
              $scope.lastWeekRedemptions=$scope.lastWeekRedemptions + dataRedemption[i][1];
              $scope.thisWeekRedemptions=$scope.thisWeekRedemptions + dataRedemption[i][2];
            }
            if($scope.lastWeekRedemptions==0){
                $('#redemptionPercent').css('color', '#aae2cd');
                $scope.redemptionPercent=($scope.thisWeekRedemptions*100);
            }else{
                $scope.redemptionPercent = ((($scope.thisWeekRedemptions-$scope.lastWeekRedemptions)/$scope.lastWeekRedemptions)*100).toFixed(2);
                if ($scope.redemptionPercent>0){
                  $('#redemptionPercent').css('color', '#aae2cd');
                }else{
                  $('#redemptionPercent').css('color', '#ce7193');
                }
            }
            $scope.totalRedemptions = results.length;
            
      },error: function(error) {
        alert("Error: " + error.code + " " + error.message);
        }
    });
}
$scope.getUserData = function() {
  $scope.user;
      var query = new Parse.Query(Parse.User);
          query.equalTo("objectId", Parse.User.current().id);  // find all the women
          query.include("locationId");
          query.find({
            success: function(result) {
                $scope.$apply(function () {
                    $scope.user = result[0];
                    $scope.live = $scope.user.get("live");
                });
            }
          });
}
$scope.goOffline = function(){
  Parse.User.current().set("live",false);
  Parse.User.current().save({
      success: function() {
        $scope.getUserData();
      },
      error: function() {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  

}
$scope.goOnline = function(){
  Parse.User.current().set("live",true);
  Parse.User.current().save({
      success: function() {
        $scope.getUserData();
      },
      error: function() {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  
}
$scope.setup = function(){
  // $('#loaded').css('width','10%');
  
  // $('#loaded').css('width','60%');
  $scope.$apply(function () {
      $scope.businessName = Parse.User.current().get("businessName");
  });
  $scope.getAnalyticData();
  $scope.getCouponData();
  $scope.getPushData();
  $scope.getUserData();

  // $('#loaded').css('width','100%');
  // $('#progressBar').hide();
  $scope.$apply(function () {
      $scope.signedIn=true;
 });
}
$scope.login = function(){
    Parse.User.logIn($('#email').val(), $('#password').val(), {
          success: function(user) {
              $scope.$apply(function () {
                    $scope.signedIn=true;
                    $('#email').text() = null;
                    $('#password').text() = null;
               });
              $scope.setup();
              $('#bs-example-navbar-collapse-1').collapse('hide');
            },
            error: function(user, error) {
              $('#errorText').text(" "+error.error + " " + error.message);
              $('#incorrectLogin').show();
              
            }
        });
      };
  $scope.logout = function(){
    Parse.User.logOut().then(
     function() {
                 $scope.$apply(function () {
                    $scope.signedIn=false;
               });
       }, function(error) {
         alert("Error: " + error.error + " " + error.message);
       }
    );
  };
$scope.resetPass = function(){
    Parse.User.requestPasswordReset($('#resetEmail').val(), {
        success: function() {
          $('#resetPassModal').modal('hide');
          $('#incorrectReset').hide();
        },
        error: function(error) {
          $('#incorrectReset').show();
          $('#resetErrorText').text(" "+error.error + " " + error.message);
        }
    });
  };
$scope.signup = function(){
        var currentUser = Parse.User.current();
                if (currentUser) {
                    // do stuff with the user
                    Parse.User.logOut();
                } 
        e.preventDefault();
        var user = new Parse.User();
        var username = $('#email').val();
        var password = $('#password').val();
        var email = $('#email').val();
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);

        user.signUp(null, {
            success: function(user) {
                //signup successfull
                alert("user created..!! User name: "+ username);
                window.location = "login.html";
            },
            error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                console.log("Error: " + error.code + " " + error.message);
                //alert("User not created..!! " + error.message);
                $("H5").html("User not created..!! " +error.message);

            }
        });
  }

	$(function() {
      $('body').click(function() {
            $('#incorrectLogin').hide();
            $('#incorrectReset').hide();
    })
	    Parse.$ = jQuery;
	    // Replace this line with the one on your Quickstart Guide Page
      Parse.initialize("0KDU1YgLuMZ2MwCtkWJd6lqpiyHwPWidcZfXQwWa", "hdpgkfgHV2yjtr0rjcwQEqwhCgtHTZk3cRyecDn9");
      Parse.serverURL = 'https://coupz.herokuapp.com/parse';

      $('#incorrectLogin').hide();

      var currentUser = Parse.User.current();
      if (currentUser) {
               $scope.setup();
      }else {
        $scope.$apply(function () {
                    $scope.signedIn=false;
               });
      }
      });
});
        
})
//end coupz dashboard controller
// alert("hi");


// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});
// Set a callback to run when the Google Visualization API is loaded.
// google.setOnLoadCallback(drawChart);

function drawChart(data) {
  var redemptionData = google.visualization.arrayToDataTable(data);
  var w = window.innerWidth;
  // alert(w);
  if (w<400){
    var options = {
      'width':270,
      'height':310,
      legend: { position: 'bottom' },
      series: {
        0: { color: '#43459d' },
        1: { color: '#e7711b' },
      },
      lineWidth: 3,
      hAxis: { textPosition: 'none' }
  };
  }else{
    var options = {
    legend: { position: 'right' },
    series: {
      0: { color: '#43459d' },
      1: { color: '#e7711b' },
    },
    lineWidth: 3,
    hAxis: { textPosition: 'none' }
  };
  }
  
  var redemptionChart = new google.visualization.LineChart(document.getElementById('redemption-chart'));
  redemptionChart.draw(redemptionData, options);
}
function drawPieChart(useData) {
  var data = google.visualization.arrayToDataTable(useData);

  var options = {
    // title: 'My Daily Activities',
    legend: { position: 'bottom' },
    slices: {
      0: { color: '#43459d' },
      1: { color: '#e7711b' },
    },
    pieHole: 0.7,

  };

  var chart = new google.visualization.PieChart(document.getElementById('use-chart'));
  chart.draw(data, options);
}   

