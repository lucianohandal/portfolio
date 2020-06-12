const hello_h1 = $("#hello_world")[0]
const hello_msg = "Hello World!"

function typeChar(i) {
    hello_h1.innerText = hello_msg.substring(0, i) + '|';
}

function typeHello() {
    const time = 100;
    for (let i = 0; i < hello_msg.length; i++) {
        setTimeout(function(){ typeChar(i); }, i * time);
    }
    setTimeout(function(){
        hello_h1.innerHTML = 'Hello World!<span id="new_line">\\n</span><span id="type_pos">|</span>';
        }, hello_msg.length * time);
}

function blinkLine() {
    const time = 50;
    let i = 0
    while (false){
        setTimeout(function(){$("#type_pos").css("color", "#32e0c4")}, i++ * time);
        setTimeout(function(){$("#type_pos").css("color", "#222831")}, i * time);
    }
}

// typeHello();
// blinkLine();
