const navbar = $("#navbar")[0];
const nav_items = $('.nav-item');
const hello_h1 = $("#hello_world")[0];
const hello_msg = "Hello World!";
const url = document.URL;
const hello_arrow = $("#hello_arrow")[0];
var current_section = 'hello';
var current_color = '#222831';
var sectionOffsets;
var sectNum = {};

function getSectionsOffsets(){
  sectionOffsets = [];
  let offset;
  let color;
  let id;
  let i = 0;
  for (section of $('.section')) {
    offset = section.offsetTop + section.offsetHeight;
    color = $(section).css("background-color");
    id = section.id;
    sectionOffsets.push({"offset":offset, "bg_color":color, "id":id});
    sectNum[id] = i++;
  }
}
getSectionsOffsets();

function showPosition(i) {
  if (current_section == sectionOffsets[i+1].id) {
    return;
  }
  current_section = sectionOffsets[i+1].id;
  current_color = sectionOffsets[i+1].bg_color;
  if (i < 0) {
    $('.active').removeClass('active');
    return;
  }
  hello_arrow.innerText = ' ';
  $("#navbar").show();
  $('.active').removeClass('active');
  $(nav_items[i]).addClass('active');
}

function colorCoordinate() {
  $(navbar).css('background-color', current_color)
  $('.modal-content').css('background-color', current_color)
}

function scrollNavbar(){
  let scrollPosition = $(window).scrollTop();
  for (var i = 0; i < sectionOffsets.length; i++) {
    if (scrollPosition < sectionOffsets[i].offset) {
      showPosition(i - 1)
      colorCoordinate();
      break
    }
  }
}

function goToSection(section_id){
  if (sectNum[section_id] != null) {
    window.scrollTo(0, sectionOffsets[sectNum[section_id] - 1].offset);
  }
}



function typeChar(i) {
    hello_h1.innerText = hello_msg.substring(0, i) + '|';
}

function typeHello() {
    const time = 100;
    for (let i = 0; i < hello_msg.length; i++) {
        setTimeout(function(){ typeChar(i); }, i * time);
    }
    setTimeout(function(){
        hello_h1.innerHTML = 'Hello World!<span id="new_line">\\n</span></span>';
        }, hello_msg.length * time);
}

function directLink() {
  let query = url.split('?',2)[1];
  if (query == null || query =="") {
    return;
  }
  goToSection(query);
}

function copyToClipboard(str) {
  const tempInput = document.createElement("input");
  tempInput.value = str;
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

function share(){
  let share_link = url.split('?',2)[0];
  if (current_section != 'hello') {
    share_link += '?' + current_section;
  }
  copyToClipboard(share_link);
  $("#modal_link")[0].innerText = share_link;
  $("#modal_link")[0].href = share_link;
}

window.onscroll = function() {scrollNavbar()};
typeHello();
$( document ).ready(function() {
    directLink();
});
