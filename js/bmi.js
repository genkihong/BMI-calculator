const goBtn = document.getElementById('go-btn');
const showBtn = document.querySelector('.show-btn');
const result = document.getElementById('bmi-result');
let data = JSON.parse(localStorage.getItem('item')) || [];

//日期物件 月-日-年
let d = new Date();
let m = ['01','02','03','04','05','06','07','08','09','10','11','12'];
let month = m[d.getMonth()]; 
let day = d.getDate().toString();
// 判斷 day 是否為個位數，是:加0，否:不加
day = day.length < 2 ? '0' + day : day;
let year = d.getFullYear();

showBMI();

// 計算 BMI
function calcBMI() {  
  let height = document.querySelector('#height').value;
  let weight = document.querySelector('#weight').value;
  let bmi = (weight/Math.pow(height/100, 2)).toFixed(2);
  
  let rank = '';
  let border = '';
  let margin = '';
  let circle = '';
  let text = '';
  let spin = '';  
  
  if (bmi < 18.5) {
    rank = '過輕';
    border = 'border-lighter';
    margin = 'mr-6';
    circle = 'circle-lighter';
    text = 'text-lighter';
    spin = 'bg-lighter';    
  } else if (bmi < 24) {
    rank = '理想';
    border = 'border-ideal';
    margin = 'mr-6';
    circle = 'circle-ideal';
    text = 'text-ideal';
    spin = 'bg-ideal';    
  } else if (bmi < 27) {     
    rank = '過重';
    border = 'border-stout';
    margin = 'mr-6';
    circle = 'circle-stout';
    text = 'text-stout';
    spin = 'bg-stout';    
  } else if (bmi < 30) {    
    rank = '輕度肥胖';
    border = 'border-fat';
    margin = 'mr-0';
    circle = 'circle-fat';
    text = 'text-fat';
    spin = 'bg-fat';    
  } else if (bmi < 35) {      
    rank = '中度肥胖';
    border = 'border-fat';
    margin = 'mr-0';
    circle = 'circle-fat';
    text = 'text-fat';
    spin = 'bg-fat';    
  } else {      
    rank = '重度肥胖';
    border = 'border-obese';
    margin = 'mr-0';
    circle = 'circle-obese';
    text = 'text-obese';
    spin = 'bg-obese';
  }
  let BMI = {
    bmi,
    height,
    weight,
    rank,
    border,
    margin,
    circle,
    text,
    spin,   
  };
  addData(BMI);
}
// 新增資料
function addData(BMI) {
  // console.log('addData', BMI);
  // 新增 BMI 資料至 user 物件
  let user = {
    border: BMI.border,
    rank: BMI.rank,
    margin: BMI.margin,
    bmi: BMI.bmi,
    weight: BMI.weight, 
    height: BMI.height,
    date : [month, day, year],
  };
  // console.log('user', user);
  // 判斷輸入數值，不可為空值或 0
  if(!BMI.height || BMI.height >= 250) {
    alert('Please enter your correct height !!');
    document.querySelector('#height').value = '';
  } else if(!BMI.weight || BMI.weight === BMI.height) {
    alert('Please enter your correct weight !!');
    document.querySelector('#weight').value = '';
  } else {
    data.push(user);
    //將 data 物件轉為字串，再存到 localStorage
    localStorage.setItem('BMI',JSON.stringify(data));
    showBMI();
    //清除輸入數值
    reset();
    
    // 隱藏 go button
    goBtn.classList.toggle('d-none');
    
    // 顯示 BMI 圓形按鈕
    let BMIbtn = {
      circle: BMI.circle,
      bmi: BMI.bmi,
      spin: BMI.spin,
      text: BMI.text,
      rank: BMI.rank
    };
    showBMIBtn(BMIbtn);
    
    // 隱藏 BMI 圓形按鈕，顯示 go button
    let rotate = document.querySelector('#spin-icon');
    rotate.addEventListener('click', function() {
      showBtn.innerHTML = '';
      goBtn.classList.toggle('d-none');
    });
  }
}
// 顯示 BMI 圓形按鈕
function showBMIBtn(BMIbtn) {
  // console.log('showBMIBtn', BMIbtn);
  let str =`<div id="bmi-btn" class="ml-4 text-center ${BMIbtn.circle}">
              <p class="h2">${BMIbtn.bmi}</p>
              <span class="font-14">BMI</span>
              <img id="spin-icon" src="../images/loop.png" class="${BMIbtn.spin}">
            </div>
            <p class="h2 my-auto ml-3 ${BMIbtn.text}">${BMIbtn.rank}</p>`;
  showBtn.innerHTML = str;
}
// 更新資料
function showBMI(){
  let str = '';
  for(let i = 0; i < data.length; i++){
    str +=` <li class="d-sm-flex justify-content-around align-items-center bg-white text-dark-gray mb-3 ${data[i].border}">
              <p class="h5 mb-1 mb-sm-0 ${data[i].margin}"><strong>${data[i].rank}</strong></p>
              <div class="d-flex align-items-center mb-1 mb-sm-0"><small>BMI</small><span class="h5 mb-0 ml-2">${data[i].bmi}</span></div>
              <div class="d-flex align-items-center mb-1 mb-sm-0"><small>weight</small><span class="h5 mb-0 ml-2">${data[i].weight} kg</span></div>
              <div class="d-flex align-items-center mb-1 mb-sm-0"><small>height</small><span class="h5 mb-0 ml-2" >${data[i].height} cm</span></div>
              <small>${data[i].date[0]}-${data[i].date[1]}-${data[i].date[2]}</small>
              <a class="close material-icons" data-num ="${i}">close</a>
            </li>`;
  }
  result.innerHTML = str;
}
//刪除資料
function delData(e){
  e.preventDefault();
  if (e.target.nodeName !== 'A') {return;}
    if (confirm('Are you sure to delete this data ?')) {
      let num = e.target.dataset.num;
      data.splice(num, 1);
      localStorage.setItem('item',JSON.stringify(data));
      showBMI();
    }
}
//清除輸入數值
function reset(){
  document.getElementById('height').value = '';
  document.getElementById('weight').value = '';
}
goBtn.addEventListener('click', calcBMI);
result.addEventListener('click', delData);