$(document).ready(()=>{
    var data = {}

$("#form-name input[type=text]").on("input",(e)=>{
    data['name'] = e.target.value;
    setState();
})
$("#form-attr input[type=text]").on("input",(e)=>{
    data['attr'] = e.target.value;
    setState();
})
$("#form-profile textarea").on("input",(e)=>{
    data['profile'] = e.target.value;
    setState();
})
$("#phone-input").on("input",(e)=>{
    data['phone'] = e.target.value;
    setState();
})
$("#email-input").on("input",(e)=>{
    data['email'] = e.target.value;
    setState();
})
$("#linkedin-input").on("input",(e)=>{
    data['linkedin'] = e.target.value;
    setState();
})
$("#address-input").on("input",(e)=>{
    data['address'] = e.target.value;
    setState();
})
$('#form-skills textarea').on('input', (e) => {
  var skills = e.target.value;
  data["skills"] = skills.split(',')
  setState();
});
$('#form-education textarea').on('input', (e) => {
  data['education'] = e.target.value;
  setState();
});
$('#form-experience textarea').on('input', (e) => {
  data['experience'] = e.target.value;
  setState();
});
$('#form-img input[type=file]').on('change', (e) => {
    var input = e.target;
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = async function (event) {
        $("#user-img").attr('src',event.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
    setState();
});



async function setState(){
    $("#top-most h1").html(starBold(data["name"]));
    $("title").html(data["name"]+" (Resume Maker by Uday)");
    $("#top-most p").html(data["attr"]);
    
    $("#mobile span").html(data["phone"])
    $("#email span").html(data["email"])
    $("#linkedin span").html(data["linkedin"])
    $("#house span").html(data["address"])

    $("#profile-section .section-text").html(data["profile"])
    $('#education-section .section-text').html(starBold(data['education']));
    $("#experience-section .section-text").html(data["experience"])

    $('.skills-list ul').html("");
    for(let i=0;i<data['skills'].length;i++){
        $('.skills-list ul').append(`<li>${data['skills'][i]}</li>`);
    }
}

$('#genrate').click(()=>{
    $('#main-resume').printThis({
      style:true,
        importCSS: true,
      copyTagClasses: true,
      beforePrint: ()=>{
        $('#main-resume').css('font-size', '200%'); 
        $('#main-resume h1').css("font-size","250%");
      }, // function called before iframe is filled
      afterPrint: ()=>{
        $('#main-resume').css('font-size', '100%');
      },
    });
})
})


function setTheme(darkColour, lightColour) {
  $('.my-bg-primary').css('background-color', darkColour);
  $('.my-text-primary').css('color', lightColour);
  $('.my-border-primary').css('border-color', lightColour);
}

function starBold(s) {
  var symbols = {
    '*': ['<b>', '</b>'],
    '_': ['<i>', '</i>'],
    '#': ['<u>', '</u>'],
  };
  var li = [];
  var preIndex = -1;

  for (var i = 0; i < s.length; i++) {
    if (symbols[s[i]] && preIndex == -1) {
      preIndex = i;
      li.push(s[i]);
    } else if (symbols[s[i]] && preIndex != -1) {
      li[preIndex] = symbols[s[i]][0];
      li[i] = symbols[s[i]][1];
      preIndex = -1;
    } else {
      li.push(s[i]);
    }
  }
  var ans = li.join('');
  return ans;
}
var colourThemes = {
  Orange: ['#d35400', '#e67e22'],
  Yellow: ['#f39c12', '#f1c40f'],
  Purple: ['#8e44ad', '#9b59b6'],
  Blue: ['#2980b9', '#3498db'],
  Green: ['#16a085', '#1abc9c'],
  Red: ['#eb3b5a', '#fc5c65'],
  Grey: ['#4b6584', '#778ca3'],
};
$('#colors-list a').click((event)=>{
  event.preventDefault();
  var colour = event.target.innerText;
  console.log(colourThemes[colour]);
  console.log();
  setTheme(colourThemes[colour][0], colourThemes[colour][1]);
})
var showImg = true;
$("#show-img").click(()=>{
  if(showImg){
    $('#img-col').hide();
  }else{
    $('#img-col').show();
  }
  showImg = !showImg;
})