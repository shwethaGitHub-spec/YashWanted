//creates the variables for the code
var canvas;
var thiefCount = 0;
var allThieves;
var database;
var thief;
var tab,tab2;
var i = 0;
var x = 30;
var y = 60;
var email;
var backImg2;
var imageName;
var upload;

function preload(){
   //loads the image 
   backImg2 = loadImage("design_files/images/rr.jpg");
}

function setup(){
  //creates the canvas
  canvas = createCanvas(windowWidth,windowHeight+1100);
  //sets the background
  background(backImg2);

  //initialises the firebase database and storage
  database = firebase.database();
  var storageRef = firebase.storage().ref();

  //creates the thief from the thief class
  thief = new Thief();

  //creates the inputs to upload the image from the upload class
  upload = new Upload();
  upload.uploadIt();

  //lists the images and displays it with a proper gap between them 
  storageRef.child('/').listAll().then(function(result){
     result.items.forEach(function(imageRef){
        //console.log(imageRef.toString());
        i+=150;
        displayImage(i,imageRef); 
    });
  });

  //creates the button for uploading the image of the thief
  var button2 = createButton('Upload Image of Thief');
  button2.position(8,230);

  //creates the function for pressing the button2
  button2.mousePressed(()=>{
      uploadImage();
  });

  //creates a button to logout
  var button3 = createButton('Logout');
  button3.position(displayWidth-300,30);
  button3.style('width','100px');
  button3.style('height','30px')

  //creates the function for pressing the button2
  button3.mousePressed(()=>{
     window.location.href = "signin.html";
  });
   
  
}

//makes an infinite background on scrolling with the mouse's wheel
//I have commented it because now i have made the windowheight more
/*function mouseWheel(event) {
  //console.log(event.delta);
  var scrollPos = event.delta;
  if(scrollPos > 0){
     resizeCanvas(windowWidth - 20, windowHeight + scrollPos);
  }
  background(backImg2);
}*/


//creates the function for displaying the image of the thief from firebase
function displayImage(row,image){
      image.getDownloadURL().then(function(url){
      console.log(url.toString());
      var thiefName = image.name.split(".")[0];
      var modURL = "https://cors-anywhere.herokuapp.com/"+url;
      tab = createImg(modURL,"test");
      tab.position(780,row-100);
      tab.style("width","100px");
      tab.style("height","100px");
      readCriminals(thiefName,row);
  });  
}

function draw(){
  //fills the text with the colour orange
  fill("orange");

  //sets the text size
  textSize(20);

  //displays the text
  text("Click both the buttons after you select the image and enter the details.", 8,260);
}

//displays the name, age, gender and Adress of last crime of the thief from the firebase database
function readCriminals(thiefName,yPos){
  Thief.getThiefInfo().then(()=>{
    if(allThieves !== undefined){
      var display_position = 50;
      var index = 0;
      var posX = 200;
      // var posY = 60;
   
  
      for(var thief in allThieves){
        index = index + 1 ;
        textSize(15);
        if(thief !== undefined){
          if(thiefName.toLowerCase() === allThieves[thief].Name.toLowerCase()){
            createControls(allThieves[thief].Name,
            allThieves[thief].Age,allThieves[thief].Gender,
            allThieves[thief].addressOfLastCrime,posX,yPos);
          }
        }
      }
    }
  });
}

//displays the name,age,gender and address of last crime by createElement and with proper space between them
function createControls(Name,age,gender,address,posX,posY){
         nameElement = createElement ('h4', "Name:   "+ Name); 
         nameElement.position(950, posY-110);
         nameElement.style('color','white');
         //text("Name: " + Name, posX, posY-80);
         ageElement = createElement('h4', "Age:   "+ age);
         ageElement.position(950, posY-90);
         ageElement.style('color','white');
         //text("Age: + age, posX, posY-60); 
         genderElement = createElement('h4', "Gender:   "+ gender);
         genderElement.position(950, posY-70);
         genderElement.style('color','white'); 
         //text("Gender: + gender, posX, posY-40); 
         addrElement = createElement('h4', "Address Of Last Crime:     " + address);
         addrElement.position(950, posY-50);
         addrElement.style('color','white');
         //text("Address Of Last Crime: + address, posX, posY-20);
}

