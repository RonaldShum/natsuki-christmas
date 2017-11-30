var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var imageHeight = 0;
var imageWidth  = 0;
var image = null;
var margin = 25;
var win = $(window);
// destop BG images
var destop1 = "url('https://i.imgur.com/vuRYhna.png')";
var destop2 = "url('https://i.imgur.com/TsqwWvW.png')";
var destopBGs = [destop1,destop2];
// mobile BG imgaes
var mobile1 = "url('https://i.imgur.com/4PsEXY6.png')";
var mobile2 = "url('https://i.imgur.com/qOn4S7b.png')";
var mobileBGs = [mobile1,mobile2];
var BGindex = 0;
var fingerDist = 5;
var BGfadeTime = 1010; //1 sec
var canChangeBG = true;
var isSmolScreen = null;
var smolScreenWidth = 768; //smol screen is smalling then 768px
var bg = $(".bgimg-1");

//return true is smol screen
function checkSmolScreen(){
  if($(window).width() < smolScreenWidth){
    return true;
  }else{
    return false;
  }
}
function delay(ms){
  return new Promise(resolve=>{setTimeout(resolve,ms);});
}
function changeContentFade(selector, content){
  var target = $(selector);
  target.fadeOut('slow', function(){
    target.html(content);
    target.fadeIn('slow');
  });
};
function changeDestopBackGround(){
  if(canChangeBG){
    canChangeBG = false;
    //change background
    BGindex = (BGindex + 1)%destopBGs.length;
    console.log("BGindex: " + BGindex);
    bg.css('background-image', destopBGs[BGindex]);
    //set canChange to false
    setTimeout(function(){canChangeBG = true;},BGfadeTime);
  }
};
function changeMobileBackGround(){
  if(canChangeBG){
    canChangeBG = false;
    //change background
    BGindex = (BGindex + 1)%mobileBGs.length;
    console.log("BGindex: " + BGindex);
    bg.css('background-image', mobileBGs[BGindex]);
    //set canChange to false
    setTimeout(function(){canChangeBG = true;},BGfadeTime);
  }
};
function switchBG(){
  if(isSmolScreen){
    BGindex = BGindex % mobileBGs.length;
    bg.css('background-image', mobileBGs[BGindex]);
  }else{
    BGindex = BGindex % destopBGs.length;
    bg.css('background-image', destopBGs[BGindex]);
  }
}
function resizeListener(){
  var smolScreenNow = checkSmolScreen();
  if(isSmolScreen != smolScreenNow){
    isSmolScreen = smolScreenNow;
    switchBG();
  }
  console.log("isSmolScreen: " + isSmolScreen);
};
$( document ).ready(function() {
        
        
        image = $("#image");
        imageHeight = parseInt(image.css("height"),10);
        imageWidth  = parseInt(image.css("width"),10);

        //get isSmolScreen
        isSmolScreen = checkSmolScreen();
        console.log("isSmolScreen: " + isSmolScreen);

        //add resize listener
        $(window).resize(resizeListener);

        //set bop listener
        $("#boparea").click(function(){
          //bop change to mobile BG if the screen isSmolScreen
            if(isSmolScreen){
              changeMobileBackGround();
            }else{
              changeDestopBackGround();   
            }
            
        });
        //set delay 3s and change message
        delay(3000)
          .then(()=>{
            changeContentFade('#christmasText','Merry Christmas');
          });
        //init
        if(isMobile){
          $(document).click(function(e){
            // var image = $("#image");
            var nextX = e.pageX+fingerDist;
            var nextY = e.pageY+fingerDist;
            // var imageHeight = parseInt(image.css("height"),10);
            // var imageWidth  = parseInt(image.css("width"),10);
            if( (nextX + imageWidth + margin) > window.innerWidth){
              nextX = window.innerWidth - imageWidth-margin+fingerDist;
            }
            if( (nextY + imageHeight + margin) > window.innerHeight + win.scrollTop()){
              nextY = window.innerHeight + win.scrollTop() - imageHeight-margin+fingerDist;
            }
            image.stop().animate({left:nextX, top:nextY});
            // image.css({left:nextX, top:nextY});
          });
        }else{
          console.log("DESTOP");
          
          
          
          $(document).mousemove(function(e){
            // var image = $("#image");
            var nextX = e.pageX+fingerDist;
            var nextY = e.pageY+fingerDist;
            
            
            // var imageHeight = parseInt(image.css("height"),10);
            // var imageWidth  = parseInt(image.css("width"),10);
            if( (nextX + imageWidth + margin) > window.innerWidth){
              nextX = window.innerWidth - imageWidth-margin+fingerDist;
            }
            if( (nextY + imageHeight + margin) > window.innerHeight + win.scrollTop()){
              nextY = window.innerHeight + win.scrollTop() - imageHeight-margin+fingerDist;
            }
            image.css({left:nextX, top:nextY});
          });

          
        }
});


