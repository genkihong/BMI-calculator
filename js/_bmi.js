
var btn = document.getElementById('bmi-btn');
var show = document.querySelector('.show-icon');
var result = document.getElementById('bmi-result');
var data = JSON.parse(localStorage.getItem('item')) || [];


//日期物件 月-日-年
var d = new Date();
var m = ['01','02','03','04','05','06','07','08','09','10','11','12'];
var month = m[d.getMonth()]; 
var day = d.getDate().toString();
// 判斷 day 是否為個位數，是:加 0，否:不加
day = day.length < 2 ? '0' + day : day;
var year = d.getFullYear();
// options = {month :'2-digit', day :'2-digit', year :'numeric'};
// var date = d.toLocaleString('zh-TW', options);

showBMI();


// 新增資料 user， 更新資料 showBMI， 儲存資料 localStorage
function newData(){
  var height = document.getElementById('height').value;
  var weight = document.getElementById('weight').value;
  var bmi = (weight/Math.pow(height/100, 2)).toFixed(2);
  var rank = '';
  var border = '';
  var margin = '';
  var circle = '';
  var text = '';
  var background = '';
  
  if (bmi < 18.5) {
    rank = '過輕';
    border = 'border-lighter';
    margin = 'mr-6';
    circle = 'circle-lighter';
    text = 'text-lighter';
    background = 'bg-lighter';
  } else if (bmi < 24) {
    rank = '理想';
    border = 'border-ideal';
    margin = 'mr-6';
    circle = 'circle-ideal';
    text = 'text-ideal';
    background = 'bg-ideal';
  } else if (bmi < 27) {
    rank = '過重';
    border = 'border-stout';
    margin = 'mr-6';
    circle = 'circle-stout';
    text = 'text-stout';
    background = 'bg-stout';
  } else if (bmi < 30) {
    rank = '輕度肥胖';
    border = 'border-fat';
    margin = 'mr-0';
    circle = 'circle-fat';
    text = 'text-fat';
    background = 'bg-fat';
  } else if (bmi < 35) {
    rank = '中度肥胖';
    border = 'border-fat';
    margin = 'mr-0';
    circle = 'circle-fat';
    text = 'text-fat';
    background = 'bg-fat';
  } else {
    rank = '重度肥胖';
    border = 'border-obese';
    margin = 'mr-0';
    circle = 'circle-obese';
    text = 'text-obese';
    background = 'bg-obese';
  }

  // 新增 BMI 資料至 user 物件
  var user = 
  {
    border : border,
    rank : rank,
    margin : margin,
    bmi : bmi,
    weight : weight,
    height : height,
    date : [month, day, year],
  };
    
  // 判斷輸入數值，不可為空值或 0
  if ( height == null || height == 0 || height > 250) {
    alert('Please enter your correct height !!');
    document.getElementById('height').value = '';
  } else if (weight == null || weight == 0 || weight == height) {
    alert('Please enter your correct weight !!');
    document.getElementById('weight').value = '';
  } else {
    //將 user 物件新增至 data 陣列
    data.push(user);
    //更新網頁畫面  
    showBMI();
    //將 data 物件轉為字串，再存到 localStorage
    localStorage.setItem('item',JSON.stringify(data)); 
    //清除輸入數值
    reset();

    // 隱藏 go button
    btn.setAttribute('class','btn ml-md-4 d-none');

    var str = '';
    str = `<div id="circle-icon"class="ml-4 text-center `+ circle +`">
              <p class="h2 mb-0">`+ bmi +`</p>
              <span class="font-14">BMI</span>
              <img id="spin-icon" src="images/loop.png" class="`+ background +`">
            </div>
            <p class="h2 my-auto ml-3 `+ text +`">`+ rank +`</p>`;

    show.innerHTML = str;

    // 隱藏 BMI 圖示，顯示 go button
    var spin = document.querySelector('#spin-icon');
    // spin.addEventListener('click',showBtn,false);
    spin.onclick = function(){
      show.innerHTML = '';
      btn.setAttribute('class','btn ml-md-4');
    }
  }
}

// 更新資料
function showBMI(){
  var str = '';
  for(var i = 0; i < data.length; i++){
    str +=`<li class="d-sm-flex justify-content-around align-items-center bg-white text-dark-gray mb-3 `+ data[i].border +`">
              <p class="h5 mb-1 mb-sm-0 `+ data[i].margin +`"><strong>`+ data[i].rank +`</strong></p>
              <div class="d-flex align-items-center mb-1 mb-sm-0"><small>BMI</small><span class="h5 mb-0 ml-2">`+ data[i].bmi +`</span></div>
              <div class="d-flex align-items-center mb-1 mb-sm-0"><small>weight</small><span class="h5 mb-0 ml-2">`+ data[i].weight +`kg</span></div>
              <div class="d-flex align-items-center mb-1 mb-sm-0"><small>height</small><span class="h5 mb-0 ml-2" >`+ data[i].height +`cm</span></div>
              <small>`+ data[i].date[0] +`-`+ data[i].date[1] +`-`+ data[i].date[2] +`</small>
              <a class="close material-icons" data-num ="`+ i +`">close</a>
            </li>`;
  }
  result.innerHTML = str;
}

//刪除資料
function delData(e){
  e.preventDefault();
  if (e.target.nodeName !== 'A') {return;}
    if (confirm('Are you sure to delete this data ?')) {
      var num = e.target.dataset.num;
      data.splice(num, 1);
      localStorage.setItem('item',JSON.stringify(data));
      showBMI();
    } else {return;}
}

//清除輸入數值
function reset(){
  document.getElementById('height').value = '';
  document.getElementById('weight').value = '';
}

btn.addEventListener('click',newData,false);
result.addEventListener('click',delData,false);
// 顯示 BMI 圓圈圖示
// function showIcon(){
//   var BMI = colorBMI();
//   console.log(BMI);
  
//   for(var i = 0; i < data.length; i++){
//     text = `<div id="circle-icon"class="ml-4 text-center `+data[i].circle+`">
//               <p class="h2 mb-0">`+data[i].bmi+`</p>
//               <span class="font-14">BMI</span>
//               <img id="spin-icon" src="images/loop.png" width="30" height="30" class="`+data[i].background+`">
//             </div>
//             <p class="h2 my-auto ml-3 `+data[i].text+`">`+data[i].rank+`</p>`;
//   }
  
//   show.innerHTML = text;

//   // 隱藏 BMI 圖示，顯示看結果按鈕
//   var spin = document.querySelector('#spin-icon');
//   // spin.addEventListener('click',showBtn,false);
//   spin.onclick = function(){
//     btn.setAttribute('class','btn ml-4');
//     show.innerHTML = '';
//   }
// }
// 隱藏 BMI 圖示，顯示看結果按鈕
// function showBtn(e){
//   e.preventDefault;
//   btn.setAttribute('class','btn ml-4');
//   show.innerHTML = '';
// }