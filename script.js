var data = {skills:[],theme:"default","showImg":true,img:""};

function setTheme(darkColour, lightColour) {
  $('.my-bg-primary').css('background-color', darkColour);
  $('.my-text-primary').css('color', lightColour);
  $('.my-border-primary').css('border-color', lightColour);
  $('.my-button').css('background-color', darkColour);
}
var colourThemes = {
  default: ['#1B4472', '#128CCD'],
  Orange: ['#d35400', '#e67e22'],
  Yellow: ['#f39c12', '#f1c40f'],
  Purple: ['#8e44ad', '#9b59b6'],
  Blue: ['#2980b9', '#3498db'],
  Green: ['#16a085', '#1abc9c'],
  Red: ['#eb3b5a', '#fc5c65'],
  Grey: ['#4b6584', '#778ca3'],
};

//State
function setState() {
  setTheme(colourThemes[data['theme']][0], colourThemes[data['theme']][1]);
  $('#top-most h1').html(starBold(data['name']));
  $('title').html(data['name'] + ' (Resume Maker by Uday)');
  $('#top-most p').html(data['attr']);

  $('#mobile span').html(data['phone']);
  $('#email span').html(data['email']);
  $('#linkedin span').html(data['linkedin']);
  $('#house span').html(data['address']);

  $('#profile-section .section-text').html(starBold(data['profile']));
  $('#education-section .section-text').html(starBold(data['education']));
  $('#experience-section .section-text').html(starBold(data['experience']));
  $('#projects-section .section-text').html(starBold(data['projects']));

  $('.skills-list ul').html('');
  for (let i = 0; i < data['skills'].length; i++) {
    $('.skills-list ul').append(`<li>${starBold(data['skills'][i])}</li>`);
  }
  if(data['showImg']){
    if (data['img'] == '') {
      $('#user-img').attr(
        'src',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa69_HGc_i3MXKCPZzCfAjBZC4bXJsn0rS0Ufe6H-ctZz5FbIVaPkd1jCPTpKwPruIT3Q&usqp=CAU'
      );
    } else {
      $('#user-img').attr('src', data['img']);
    }
  }else{
    $('#img-col').hide();
  }
}

function setInputs() {
    $('#form-name input[type=text]').val(data['name']);
    $('#form-attr input[type=text]').val(data['attr'])
    $('#form-profile textarea').val(data['profile']);
    $('#phone-input').val(data['phone'])
    $('#email-input').val(data['email']);
    $('#linkedin-input').val(data['linkedin'])
    $('#address-input').val(data['address'])
    $('#form-skills textarea').val(data['skills'].join(','))
    $('#form-education textarea').val(data['education'])
    $('#form-experience textarea').val(data['experience']);
    $('#form-projects textarea').val(data['projects']);
}

$(document).ready(async() => {
  var url = window.location.href
  var uid = url.split('=')[1];
  console.log(uid);
  if(uid){
    data = await getResume(uid);
    setState();
    setInputs();
    $('.edit-btn').html(
      `<a class="btn my-button text-white mb-2" href="https://${window.location.host}/resume-maker/?uid=${uid}">Edit</a>`
    );
  }

  $('#form-name input[type=text]').on('input', (e) => {
    data['name'] = e.target.value;
    setState();
  });
  $('#form-attr input[type=text]').on('input', (e) => {
    data['attr'] = e.target.value;
    setState();
  });
  $('#form-profile textarea').on('input', (e) => {
    data['profile'] = e.target.value;
    setState();
  });
  $('#phone-input').on('input', (e) => {
    data['phone'] = e.target.value;
    setState();
  });
  $('#email-input').on('input', (e) => {
    data['email'] = e.target.value;
    setState();
  });
  $('#linkedin-input').on('input', (e) => {
    data['linkedin'] = e.target.value;
    setState();
  });
  $('#address-input').on('input', (e) => {
    data['address'] = e.target.value;
    setState();
  });
  $('#form-skills textarea').on('input', (e) => {
    var skills = e.target.value;
    console.log(data);
    data['skills'] = skills.split(',');
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
  $('#form-projects textarea').on('input', (e) => {
    data['projects'] = e.target.value;
    setState();
  });
  $('#form-img input[type=file]').on('change', (e) => {
    var input = e.target;
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = async function (event) {
        $('#user-img').attr('src', event.target.result);
        data['img'] = event.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
    setState();
  });

  $('#genrate').click(() => {
    CreatePDFfromHTML();
  });

  var showImg = true;
  $('#show-img').click(() => {
    if (showImg) {
      $('#img-col').hide();
    } else {
      $('#img-col').show();
    }
    showImg = !showImg;
    data['showImg'] = showImg;
  });

  $('#colors-list a').click((event) => {
    event.preventDefault();
    var colour = event.target.innerText;
    console.log(colourThemes[colour]);
    console.log();
    setTheme(colourThemes[colour][0], colourThemes[colour][1]);
    data['theme'] = colour;
  });

  $('#save-btn').click(async () => {
    $('.modal-body .msg').html('');
    $('.modal-body .msg').prepend(`<b class='text-warning'>Loading...</b>`);
    var id = await saveResume(data);
    if (id == 'E') {
      $('.modal-body .msg').html(
        `<b class='text-danger'>Linkedin Id is mandatory</b>`
      );
      return;
    } else if (id == 'WP') {
      $('.modal-body .msg').html(`<b class='text-danger'>Wrong Password</b>`);
      return;
    }
    var link =
      'https://' + window.location.host + '/resume-maker/resume.html?uid=' + id;
    $('.modal-body .msg').html(
      `<b class='text-success'>Your resume is <a href="${link}" target="_blank">${link}</a></b>`
    );
  });
});


function starBold(s) {
  if(s==undefined){
    return
  }
  s = s.replace('\n','<br>')
  var symbols = {
    '*': ['<b>', '</b>'],
    _: ['<i>', '</i>'],
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


$('#top-most h1').click(() => {
  $('#form-name input[type=text]').focus();
});
$('#top-most p').click(() => {
  $('#form-attr input[type=text]').focus();
});
$('#profile-section').click(() => {
  $('#form-profile textarea').focus();
});
$('#mobile').click(() => {
  $('#phone-input').focus();
});
$('#email').click(() => {
  $('#email-input').focus();
});
$('#linkedin').click(() => {
  $('#linkedin-input').focus();
});
$('#house').click(() => {
  $('#address-input').focus();
});
$('#skills-section').click(() => {
  $('#form-skills textarea').focus();
});
$('#education-section').click(() => {
  $('#form-education textarea').focus();
});
$('#experience-section').click(() => {
  $('#form-experience textarea').focus();
});
$('#projects-section').click(() => {
  $('#form-projects textarea').focus();
});
$('#img-col').click(() => {
  $('#form-img input[type=file]').click();
});

function CreatePDFfromHTML() {
  $(".card").css('width','40rem');
  setTimeout(function() {
    $('.card').css('width', '100%');   
  },2000)
  var HTML_Width = $('#main-resume').width();
  var HTML_Height = $('#main-resume').height();
  var top_left_margin = 15;
  var PDF_Width = HTML_Width + top_left_margin * 2;
  var PDF_Height = PDF_Width * 1.3 + top_left_margin * 2;
  var canvas_image_width = HTML_Width;
  var canvas_image_height = HTML_Height;

  var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

  html2canvas($('#main-resume')[0]).then(function (canvas) {
    var imgData = canvas.toDataURL('image/jpeg', 1.0);
    var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
    pdf.addImage(
      imgData,
      'JPG',
      top_left_margin,
      top_left_margin,
      canvas_image_width,
      canvas_image_height
    );
    for (var i = 1; i <= totalPDFPages; i++) {
      pdf.addPage(PDF_Width, PDF_Height);
      pdf.addImage(
        imgData,
        'JPG',
        top_left_margin,
        -(PDF_Height * i) + top_left_margin * 4,
        canvas_image_width,
        canvas_image_height
      );
    }
    pdf.save(data['name']+'(Resume Maker by Uday).pdf');
    // $('#main-resume').hide();
  });
}

if(screen && screen.width<900){
  $("#c2").hide();
  $("#bottom-options").show();
  $('#top-most h1').click(() => {
    var s = prompt()
    data['name'] = s;
    setState()
  });
  $('#top-most p').click(() => {
    var s = prompt();
    data['attr'] = s;
    setState();
  });
  $('#profile-section').click(() => {
    var s = prompt();
    data['profile'] = s;
    setState();
  });
  $('#mobile').click(() => {
    var s = prompt();
    data['phone'] = s;
    setState();
  });
  $('#email').click(() => {
    var s = prompt();
    data['email'] = s;
    setState();
  });
  $('#linkedin').click(() => {
    var s = prompt();
    data['linkedin'] = s;
    setState();
  });
  $('#house').click(() => {
    var s = prompt();
    data['address'] = s;
    setState();
  });
  $('#skills-section').click(() => {
    var s = prompt();
    data['skills'] = s;
    setState();
  });
  $('#education-section').click(() => {
    var s = prompt();
    data['education'] = s;
    setState();
  });
  $('#experience-section').click(() => {
    var s = prompt();
    data['experience'] = s;
    setState();
  }); 
  $('#projects-section').click(() => {
    var s = prompt();
    data['projects'] = s;
    setState();
  }); 
}

$(".final-btn").click(()=>{
  $("#color-picker").click();
})

$("#download-btn").click(()=>{
  CreatePDFfromHTML();
})