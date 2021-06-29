var width = 1400, height = 800;
var colorWheelRadius = 92.5;
var center = [];
var mx, my, mouseDown = false;

var sizeSlider;
var colorSlider;
var rotationSlider;
var wobbleSlider;
var complexitySlider;
var centerColorSlider;
var colorRatioSlider;
var ringsSlider;
var wavesSlider;
var waveIntensitySlider;
var waveColorSlider;
var speedSlider;
var pilRotationSlider;

function preload() {
}

var centerColor = [], mainColor = [], waveColor = [];
function setup() {
    
    /*P5 JS canvas for PIL + HALO render*/
    
    createCanvas(800, 800, WEBGL);
    center.x = 0;
    center.y = 0;
    
    centerColor.hue = 0;
    mainColor.hue = 255;
    waveColor.hue = 55;
    
    centerColor.saturation = 55;
    mainColor.saturation = 255;
    waveColor.saturation = 0;
    
   
    /*Controls from HTML document*/
    
    //Range sliders
    sizeSlider = document.getElementById("size");
    colorSlider = document.getElementById("mainColor");
    rotationSlider = document.getElementById("rotation");
    wobbleSlider = document.getElementById("wobble");
    complexitySlider = document.getElementById("complexity");
    centerColorSlider = document.getElementById("centerColor");
    colorRatioSlider = document.getElementById("colorRatio");
    ringsSlider = document.getElementById("rings");
    wavesSlider = document.getElementById("waves");
    waveIntensitySlider = document.getElementById("waveIntensity");
    waveColorSlider = document.getElementById("waveColor");
    speedSlider = document.getElementById("speed");
    colorSegments = document.getElementById("colorSeg");
    
    //Canvas color block
    colorCanvas = document.getElementById("colorCanvas");
    colorCanvas.width = colorWheelRadius*2;
    colorCanvas.height = colorWheelRadius*2;
	context = colorCanvas.getContext("2d");
    
    //Mouse coords on color block
    colorCanvas.addEventListener('mousedown', e => {
        mx = e.offsetX - colorWheelRadius;
        my = colorWheelRadius - e.offsetY;
        mouseDown = true;
    });
    
}

var time = 0.0, radius = 125.0;

var mousePressLoc = [];
var lastYAngle = 0.0, lastXAngle = 0.0, yAngle = 0.0, xAngle = 0.0;

var pilAngle = 0.0;

var size = 0.85, rotation = 0.0, rotationSpeed = 0.01, wobble = 0.25, complexity = 0.5, colorRatio = 0.5, waveIntensity = 0.5, speed = 0.5;

var waveOffset = 0.0;
var ringCount = 55, waveCount = 3;
var colorToggle = -1;
function draw() {
    
    /*Set Parameters*/
    
    //vertices to be data-driven
    size = 0.5 + sizeSlider.value/100.0;
    //mainColor.saturation = colorSlider.value/100.0*255;
    rotationSpeed = (rotationSlider.value/100.0 - 0.5)*0.25;
    wobble = wobbleSlider.value/100.0;
    complexity = 0.25 + complexitySlider.value/100.0;
    //centerColor.hue = 125;//centerColorSlider.value/100.0*255;
    colorRatio = sqrt(colorRatioSlider.value/100.0);
    ringCount = ringsSlider.value;
    waveCount = floor(wavesSlider.value/20.0);
    waveIntensity = waveIntensitySlider.value/100.0;
    //waveColor.hue = waveColorSlider.value/100.0*255;
    speed = speedSlider.value/1000.0 + 0.05;
    colorToggle = colorSegments.value;
    pilAngle = yAngle;
    
    //PIL style
    var list = document.getElementById("select1");
    var option = list.value;
    
    //use mx and my to derive colors on color wheel
    console.log("Mouse (" + mx + ", " + my + ")");
    
    //get color from color block
    var mag = sqrt(mx*mx+my*my);
    
    
    console.log(colorToggle);
    
    if (mouseDown) {
    if (colorToggle == 0) {
        centerColor.hue = (my < 0) ? (acos(mx/mag))/PI/2*360 : (PI*2 - acos(mx/mag))/PI/2*360;
        centerColor.saturation = (mag/colorWheelRadius)*255;
    } else if (colorToggle == 1) {
        mainColor.hue = (my < 0) ? (acos(mx/mag))/PI/2*360 : (PI*2 - acos(mx/mag))/PI/2*360;
        mainColor.saturation = (mag/colorWheelRadius)*255;
    } else if (colorToggle == 2) {
        waveColor.hue = (my < 0) ? (acos(mx/mag))/PI/2*360 : (PI*2 - acos(mx/mag))/PI/2*360;
        waveColor.saturation = (mag/colorWheelRadius)*255;
    }
    }

    //HSV to RGB
    var colorFromHSV = hsv_to_rgb(centerColor.hue, centerColor.saturation, 1.0);

    centerColor.red = colorFromHSV.red;
    centerColor.green = colorFromHSV.green;
    centerColor.blue = colorFromHSV.blue;

    colorFromHSV = hsv_to_rgb(mainColor.hue, mainColor.saturation, 1.0);

    mainColor.red = colorFromHSV.red;
    mainColor.green = colorFromHSV.green;
    mainColor.blue = colorFromHSV.blue;

    colorFromHSV = hsv_to_rgb(waveColor.hue, waveColor.saturation, 1.0);

    waveColor.red = colorFromHSV.red;
    waveColor.green = colorFromHSV.green;
    waveColor.blue = colorFromHSV.blue;


    var centerColorDot = document.getElementById("centerColorDot");
    var mainColorDot = document.getElementById("mainColorDot");
    var waveColorDot = document.getElementById("waveColorDot");
    centerColorDot.style.fill = 'rgb(' + centerColor.red + ',' + centerColor.green + ',' + centerColor.blue + ')';
    mainColorDot.style.fill = 'rgb(' + mainColor.red + ',' + mainColor.green + ',' + mainColor.blue + ')';
    waveColorDot.style.fill = 'rgb(' + waveColor.red + ',' + waveColor.green + ',' + waveColor.blue + ')';
    
    
    
    /* sample color
         context.fillStyle = 'hsl(' + mainColor.hue + ', 100%, ' + ((1.0-mainColor.saturation/255)*50+50) + '%)';
        context.beginPath();
         context.rect(colorWheelRadius/2, colorWheelRadius/2, 25, 25);
         context.closePath();
         context.fill();
         
         */
    
    
    
    /*Increment*/
    
    time += speed;
    
    waveOffset = time;
    if (waveOffset > 1.0) waveOffset--;
    
    rotation += rotationSpeed;
    //if (rotation > PI*2) rotation -= PI*2;
    
    
    
    /*Draw PIL and HALO*/
    background(0, 0, 0);
    
    
    //PIL graphic
    
    colorMode(RGB);
    noFill();
    stroke(255);
    strokeWeight(1);
    
    translate(center.x, center.y, -200);
    

    if (option == 1) {
        drawPIL_1();
    } else if (option == 2) {
        drawPIL_2();
    } else {
        drawPIL_0();
    }
    
    /*HALO
        Rings with two scales of perlin noise (wobble and complexity), wave effects, and color gradient
        Parameters :
        RING COUNT
        COLOR GRADIENT (CENTER AND OUTER COLOR)
        COLOR RATIO (balance between colors)
        TILT (axis rotation)
        ROTATION (radial rotation)
        SPEED
        WOBBLE (large scale perlin)
        COMPLEXITY (small scale perlin)
        WAVE COUNT
        WAVE INTENSITY
        WAVE COLOR
    */
    
    colorMode(RGB);
    noFill();
    strokeWeight(2);
    
    rotateY(pilAngle);
    rotateX(0.15);
    
  for (var i = 0; i < 1.0; i += 1.0/ringCount) {
      var iSmoothStep = 3*i*i - 2*i*i*i;
      //stroke(mainColor.saturation - (mainColor.saturation - centerColor.saturation)*(1-i)*colorRatio, 255, 255);
      //stroke(mainColor.hue - (mainColor.hue - centerColor.hue)*(1-i + colorRatio/2)*colorRatio, mainColor.saturation - (mainColor.saturation - centerColor.saturation)*(1-i + colorRatio/2)*colorRatio, 255);
      stroke(
            mainColor.red*i*(1.0-colorRatio) + centerColor.red*(1-i)*colorRatio,
            mainColor.green*i*(1.0-colorRatio) + centerColor.green*(1-i)*colorRatio,
            mainColor.blue*i*(1.0-colorRatio) + centerColor.blue*(1-i)*colorRatio)
      
            //Wave ring case
      if (floor((i-waveOffset) * ringCount) % floor(ringCount/waveCount) == 0 && waveCount > 0) {
          strokeWeight(1 + 4*waveIntensity);
          stroke(waveColor.hue - (waveColor.hue - mainColor.hue)*(1.0-waveIntensity), 255*(1-waveIntensity), 126);
      }
      
      beginShape();
      for (var t = 0; t < 1.02; t += 0.01) {
          var rNoise = complexity*i*300*(noise(3 + time - 3*i + 15*complexity*cos(t*PI*2), 3 + time - 3*i + 15*complexity*sin(t*PI*2), i*5*complexity)-0.5);
          var xNoise = complexity*i*50*(noise(25 + time + 15*cos(t*PI*2), 25 + time + 15*sin(t*PI*2), i*1-time)-0.5);
          var yNoise = complexity*i*50*(noise(15 + time + 15*cos(t*PI*2), 15 + time + 15*sin(t*PI*2), i*1-time)-0.5);
          var zNoiseA = complexity*i*800*(noise(3 + time + 15*cos(t*PI*2), 3 + time + 15*sin(t*PI*2), i*1-time)-0.5);
          var xWobble = wobble*i*300*(noise(3 + time + 0.5*cos(t*PI*2), 3 + time + 0.5*sin(t*PI*2), i*1+time/5)-0.5);
          var yWobble = wobble*i*300*(noise(3 + time + 0.5*cos(t*PI*2), 3 + time + 0.5*sin(t*PI*2), i*1+time/5)-0.5);
          
          vertex(-0 + (radius*1.45 + iSmoothStep*150*size + rNoise + xWobble)*cos(t*PI*2 + rotation) + xNoise, (radius*1.45 + iSmoothStep*150*size + rNoise + xWobble)*sin(t*PI*2 + rotation) + yNoise, zNoiseA);
      }
      endShape();
      strokeWeight(1);
  }
    
    
    //Draw FX
    
    
    translate(-center.x, -center.y, 200);
    
    mouseDown = false;
}

function hsv_to_hsl(h, s, v) {
    // both hsv and hsl values are in [0, 1]
    var l = (2 - s) * v / 2;

    if (l != 0) {
        if (l == 1) {
            s = 0
        } else if (l < 0.5) {
            s = s * v / (l * 2)
        } else {
            s = s * v / (2 - l * 2)
        }
    }

    return [h, s, l]
}

function hsv_to_rgb(h, s, v) {

    var color = [];

    var c = s/255;
    var x = c*(1-abs((h/60) % 2 - 1));
    var m = 1.0 - c;
    var rgb = [];
    if (h < 60) {
        rgb.r = c;
        rgb.g = x;
        rgb.b = 0;
    } else if (h < 120) {
        rgb.r = x;
        rgb.g = c;
        rgb.b = 0;
    } else if (h < 180) {
        rgb.r = 0;
        rgb.g = c;
        rgb.b = x;
    } else if (h < 240) {
        rgb.r = 0;
        rgb.g = x;
        rgb.b = c;
    } else if (h < 300) {
        rgb.r = x;
        rgb.g = 0;
        rgb.b = c;
    } else if (h < 360) {
        rgb.r = c;
        rgb.g = 0;
        rgb.b = x;
    }

    color.red = (rgb.r+m)*255;
    color.green = (rgb.g+m)*255;
    color.blue = (rgb.b+m)*255;

    return color;
}

function drawPIL_0() {
    rotateY(pilAngle);
    
    /*PEACE*/
    
    
    noStroke();
  
  for (var t = 0; t < 1.05; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var y = t*1.2*radius;
    
      translate(0,y,0);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(0,-y,0);
  } 
    
  for (var t = 0; t < 1.05; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var y = -t*1.2*radius;
    
      translate(0,y,0);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(0,-y,0);
  } 
    
  for (var t = 0; t < 1.0; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var x = t*1.25*radius*cos(PI/4), y = 25 + t*1.2*radius*sin(PI/4);
    
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(-x,-y,-z);
  } 
    
  for (var t = 0; t < 1.0; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var x = -t*1.25*radius*cos(PI/4), y = 25 + t*1.2*radius*sin(PI/4);
    
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(-x,-y,-z);
  } 
    
  for (var t = 0; t < 1.05; t += 0.0025) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
          stroke(0, 155 - 100*(1+sin((t+time)*PI*6)), 255 - 55*(1+sin((t+time)*PI*6)), 255);
          beginShape();
          t -= 0.00125;
          
      }*/
          fill(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      
      var x = radius*1.3*cos(t*PI*2), y = radius*1.3*sin(t*PI*2);
    
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 25);
      rotateY(pilAngle);
      translate(-x,-y,-z);
  } 
    
  
  /*HEART*/
  rotateX(-0.15);
  noStroke();
  //beginShape();
  for (var t = 0; t < 1.05; t += 0.001) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
          stroke(255, 64*(1+sin((t+time)*PI*6)), 64*(1+sin((t+time)*PI*6)), 255);
          beginShape();
          t -= 0.00125;
          
      }*/
          fill(255, 64*(1+sin(time*4)), 64*(1+sin(time*4)), 255);
      
      var x = radius*0.725*pow(sin(t*2*PI),3), y = -5 - radius*1.1*(13*cos(t*2*PI) - 5*cos(4*t*PI) - 2*cos(6*t*PI) - cos(8*t*PI))/16, z = 25*cos(t*PI*6)
     
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(-x,-y,-z);
     
  }
  //endShape();
  
  rotateX(0.1);
    
    /*INFINITY*/
    noStroke();
  //beginShape();
  for (var t = 0; t < 1.05; t += 0.005) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
        stroke(255, 127 + 64*(1+sin((t-time)*PI*6)), 0, 255);
          beginShape();
          t -= 0.00125;
          
      }*/
        fill(255, 127 + 64*(1+sin(time*5)), 0, 255);
      var x = -2 + radius*0.7*sqrt(2)*cos(t*2*PI)/(pow(sin(t*2*PI),2)+1), y =  -7.5 - radius*0.6*sqrt(2)*cos(t*2*PI)*sin(t*2*PI)/(pow(sin(t*2*PI),2)+1), z = 10 + 25*cos(PI/2 + t*PI*6);
 
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(-x,-y,-z);
  }
  //endShape();
    
  rotateX(-0.1);
    rotateY(-pilAngle);
}

function drawPIL_1() {
    rotateY(pilAngle);
    
    directionalLight(255, 255, 255,0,1,-1);
    directionalLight(255, 255, 255,0,0,-5);
    /*PEACE*/
    
    
    noStroke();
  
  for (var t = 0; t < 1.05; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin((t-time/12)*PI*2)), 255 - 55*(1+sin((t-time/12)*PI*2)), 255);
      var y = t*1.2*radius;
    
      translate(0,y,0);
      sphere(10);
      translate(0,-y,0);
  } 
    
  for (var t = 0; t < 1.05; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin((t-time/12)*PI*2)), 255 - 55*(1+sin((t-time/12)*PI*2)), 255);
      var y = -t*1.2*radius;
    
      translate(0,y,0);
      sphere(10);
      translate(0,-y,0);
  } 
    
  for (var t = 0; t < 1.0; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin((t-time/12)*PI*2)), 255 - 55*(1+sin((t-time/12)*PI*2)), 255);
      var x = t*1.2*radius*cos(PI/4), y = 25 + t*1.2*radius*sin(PI/4);
    
      translate(x,y,z);
      sphere(10);
      translate(-x,-y,-z);
  } 
    
  for (var t = 0; t < 1.0; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin((t-time/12)*PI*2)), 255 - 55*(1+sin((t-time/12)*PI*2)), 255);
      
      var x = -t*1.2*radius*cos(PI/4), y = 25 + t*1.2*radius*sin(PI/4);
    
      translate(x,y,z);
      sphere(10);
      translate(-x,-y,-z);
  } 
    
  for (var t = 0; t < 1.05; t += 0.0025) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
          beginShape();
          t -= 0.00125;
          
      }*/
      var n = noise(3 + time/3 + cos(t*PI*2), 3 + time/3 + sin(t*PI*2));
          fill(255 - 255*(1+sin((t+time/4)*PI*6)), 255 - 55*(1+sin((t+time/4)*PI*6)), 255 - 25*(1+sin((t+time/4)*PI*6)), 255);
      
          fill(0, 155 - 200*n, 255 - 200*n, 255);
        
      
      var x = radius*1.3*cos(t*PI*2), y = radius*1.3*sin(t*PI*2);
    
      translate(x,y,z);
      sphere(15);
      translate(-x,-y,-z);
  } 
    
  
  /*HEART*/
  rotateX(-0.15);
  noStroke();
  //beginShape();
  for (var t = 0; t < 1.05; t += 0.0025) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
          stroke(255, 64*(1+sin((t+time)*PI*6)), 64*(1+sin((t+time)*PI*6)), 255);
          beginShape();
          t -= 0.00125;
          
      }*/
          fill(255, 64*(1+sin((t+time/12)*PI*6)), 64*(1+sin((t+time/12)*PI*6)), 255);
      
      var x = radius*0.725*pow(sin(t*2*PI),3), y = -5 - radius*1.1*(13*cos(t*2*PI) - 5*cos(4*t*PI) - 2*cos(6*t*PI) - cos(8*t*PI))/16, z = 25*cos(t*PI*6)
     
      translate(x,y,z);
      sphere(10);
      translate(-x,-y,-z);
     
  }
  //endShape();
  
  rotateX(0.1);
    
    /*INFINITY*/
    noStroke();
  //beginShape();
  for (var t = 0; t < 1.05; t += 0.0025) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
        stroke(255, 127 + 64*(1+sin((t-time)*PI*6)), 0, 255);
          beginShape();
          t -= 0.00125;
          
      }*/
        fill(255, 127 + 64*(1+sin((t-time/12)*PI*6)), 0, 255);
      var x = -2 + radius*0.7*sqrt(2)*cos(t*2*PI)/(pow(sin(t*2*PI),2)+1), y =  -7.5 - radius*0.6*sqrt(2)*cos(t*2*PI)*sin(t*2*PI)/(pow(sin(t*2*PI),2)+1), z = 10 + 25*cos(PI/2 + t*PI*6);
 
      translate(x,y,z);
      sphere(10);
      translate(-x,-y,-z);
  }
  //endShape();
    
  rotateX(-0.1);
    rotateY(-pilAngle);
}

function drawPIL_2() {
    lights();
    rotateY(pilAngle);
    
    /*PEACE*/
    
    
    noStroke();
  
  for (var t = 0; t < 1.05; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var y = t*1.2*radius;
    
      translate(0,y,0);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(0,-y,0);
  } 
    
  for (var t = 0; t < 1.05; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var y = -t*1.2*radius;
    
      translate(0,y,0);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(0,-y,0);
  } 
    
  for (var t = 0; t < 1.0; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var x = t*1.2*radius*cos(PI/4), y = 25 + t*1.2*radius*sin(PI/4);
    
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(-x,-y,-z);
  } 
    
  for (var t = 0; t < 1.0; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var x = -t*1.2*radius*cos(PI/4), y = 25 + t*1.2*radius*sin(PI/4);
    
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(-x,-y,-z);
  } 
    
  for (var t = 0; t < 1.05; t += 0.0025) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
          beginShape();
          t -= 0.00125;
          
      }*/
          fill(0, 155 - 100*(1+sin((t+time/4)*PI*8)), 255 - 55*(1+sin((t+time/4)*PI*8)), 255);
      
      var x = radius*1.3*cos(t*PI*2), y = radius*1.3*sin(t*PI*2);
    
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 25);
      rotateY(pilAngle);
      translate(-x,-y,-z);
  } 
    
  
  /*HEART*/
  rotateX(-0.15);
  noStroke();
  //beginShape();
  for (var t = 0; t < 1.05; t += 0.001) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
          stroke(255, 64*(1+sin((t+time)*PI*6)), 64*(1+sin((t+time)*PI*6)), 255);
          beginShape();
          t -= 0.00125;
          
      }*/
          fill(255, 64*(1+sin((t+time/4)*PI*6)), 64*(1+sin((t+time/4)*PI*6)), 255);
      
      var x = radius*0.725*pow(sin(t*2*PI),3), y = -5 - radius*1.1*(13*cos(t*2*PI) - 5*cos(4*t*PI) - 2*cos(6*t*PI) - cos(8*t*PI))/16, z = 25*cos(t*PI*6)
     
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 15 + 5*sin((t+time)*PI*2));
      rotateY(pilAngle);
      translate(-x,-y,-z);
     
  }
  //endShape();
  
  rotateX(0.1);
    
    /*INFINITY*/
    noStroke();
  //beginShape();
  for (var t = 0; t < 1.05; t += 0.005) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
        stroke(255, 127 + 64*(1+sin((t-time)*PI*6)), 0, 255);
          beginShape();
          t -= 0.00125;
          
      }*/
        fill(255, 127 + 64*(1+sin((t-time/4)*PI*6)), 0, 255);
      var x = -2 + radius*0.7*sqrt(2)*cos(t*2*PI)/(pow(sin(t*2*PI),2)+1), y =  -7.5 - radius*0.6*sqrt(2)*cos(t*2*PI)*sin(t*2*PI)/(pow(sin(t*2*PI),2)+1), z = 10 + 25*cos(PI/2 + t*PI*6);
 
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 15 + 5*sin((t+time)*PI*2));
      rotateY(pilAngle);
      translate(-x,-y,-z);
  }
  //endShape();
    
  rotateX(-0.1);
    rotateY(-pilAngle);
}

function drawPIL_3() {
    rotateY(pilAngle);
    
    /*PEACE*/
    
    noStroke();
  
  for (var t = 0; t < 1.05; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var y = t*1.2*radius;
    
      translate(0,y,0);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(0,-y,0);
  } 
    
  for (var t = 0; t < 1.05; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var y = -t*1.2*radius;
    
      translate(0,y,0);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(0,-y,0);
  } 
    
  for (var t = 0; t < 1.0; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var x = t*1.25*radius*cos(PI/4), y = 25 + t*1.2*radius*sin(PI/4);
    
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(-x,-y,-z);
  } 
    
  for (var t = 0; t < 1.0; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var x = -t*1.25*radius*cos(PI/4), y = 25 + t*1.2*radius*sin(PI/4);
    
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(-x,-y,-z);
  } 
    
    
    
    fill(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
    
  for (var t = 0; t < 1.05; t += 0.0025) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
          stroke(0, 155 - 100*(1+sin((t+time)*PI*6)), 255 - 55*(1+sin((t+time)*PI*6)), 255);
          beginShape();
          t -= 0.00125;
          
      }*/
      
      var x = radius*1.3*cos(t*PI*2), y = radius*1.3*sin(t*PI*2);
    
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 25);
      rotateY(pilAngle);
      translate(-x,-y,-z);
  } 
    
  
  /*HEART*/
  rotateX(-0.15);
  noStroke();
  //beginShape();
  for (var t = 0; t < 1.05; t += 0.001) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
          stroke(255, 64*(1+sin((t+time)*PI*6)), 64*(1+sin((t+time)*PI*6)), 255);
          beginShape();
          t -= 0.00125;
          
      }*/
          fill(255, 64*(1+sin(time*4)), 64*(1+sin(time*4)), 255);
      
      var x = radius*0.725*pow(sin(t*2*PI),3), y = -5 - radius*1.1*(13*cos(t*2*PI) - 5*cos(4*t*PI) - 2*cos(6*t*PI) - cos(8*t*PI))/16, z = 25*cos(t*PI*6)
     
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(-x,-y,-z);
     
  }
  //endShape();
  
  rotateX(0.1);
    
    /*INFINITY*/
    noStroke();
  //beginShape();
  for (var t = 0; t < 1.05; t += 0.005) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
        stroke(255, 127 + 64*(1+sin((t-time)*PI*6)), 0, 255);
          beginShape();
          t -= 0.00125;
          
      }*/
        fill(255, 127 + 64*(1+sin(time*5)), 0, 255);
      var x = -2 + radius*0.7*sqrt(2)*cos(t*2*PI)/(pow(sin(t*2*PI),2)+1), y =  -7.5 - radius*0.6*sqrt(2)*cos(t*2*PI)*sin(t*2*PI)/(pow(sin(t*2*PI),2)+1), z = 10 + 25*cos(PI/2 + t*PI*6);
 
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(-x,-y,-z);
  }
  //endShape();
    
  rotateX(-0.1);
    rotateY(-pilAngle);
}



function mousePressed() {
    if (mouseX > width/3) {
  mousePressLoc.x = mouseX;
  mousePressLoc.y = mouseY;
    }
}

function mouseDragged() {
    if (mouseX > width/3) {
     yAngle = lastYAngle + (mouseX - mousePressLoc.x)/255;
     xAngle = lastXAngle - (mouseY - mousePressLoc.y)/255;
    }
}

function mouseReleased() {
    if (mouseX > width/3) {
  lastYAngle = yAngle;
  lastXAngle = xAngle;
    }
}


/*Old color function

    stroke(colorA.x*i*colorRatio*2 + colorB.x*(1.0-i)*(1.0-colorRatio)*2, colorA.y*i*colorRatio*2 + colorB.y*(1.0-i)*(1.0-colorRatio)*2, colorA.z*i*colorRatio*2 + colorB.z*(1.0-i)*(1.0-colorRatio)*2);*/