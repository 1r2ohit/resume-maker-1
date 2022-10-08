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

      reader.onload = function (event) {
        $("#user-img").attr('src',event.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
    setState();
});



async function setState(){
    
    $("#top-most h1").html(data["name"]);
    $("title").html(data["name"]+" (Resume Maker by Uday)");
    $("#top-most p").html(data["attr"]);
    
    $("#mobile span").html(data["phone"])
    $("#email span").html(data["email"])
    $("#linkedin span").html(data["linkedin"])
    $("#house span").html(data["address"])

    $("#profile-section .section-text").html(data["profile"])
    $("#education-section .section-text").html(data["education"])
    $("#experience-section .section-text").html(data["experience"])

    $('.skills-list ul').html("");
    for(let i=0;i<data['skills'].length;i++){
        $('.skills-list ul').append(`<li>${data['skills'][i]}</li>`);
    }
}

$('button').click(()=>{
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