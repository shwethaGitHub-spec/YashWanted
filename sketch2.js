//creates the variable
var email;

function preload(){
    //loads the image 
    backImg = loadImage("design_files/images/backImg2.PNG");
}
function setup(){
    //creates the canvas
    canvas = createCanvas(windowWidth - 20, windowHeight-30);

    //creates the page for sending mail with class Mail
    email = new Mail();
    email.sendMail();

  //creates a button to logout
  var button3 = createButton('Back to List');
  button3.position(displayWidth-300,20);
  button3.style('width','100px');
  button3.style('height','30px')

  //creates the function for pressing the button2
  button3.mousePressed(()=>{
     window.location.href = "index.html";
  });

}
function draw(){
    //sets the background
    background(backImg);

    fill("yellow");
    textSize(25);
    text("Send the email to the Police regarding where and how did you find the thief",400,80);
    text("Please don't send fake news to POLICE or you will get in trouble",450,115);
    text("Also after sending the mail, check your mail as the police can contact you through the email address you enter in the box below",150,150);
}