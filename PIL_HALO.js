var width = 1400, height = 800;
var colorWheelRadius = 92.5;
var center = [];
var mx, my;

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

function setup() {
    
    colorCanvas = document.getElementById("colorCanvas");
    colorCanvas.width = colorWheelRadius*2;
    colorCanvas.height = colorWheelRadius*2;
	context = colorCanvas.getContext("2d");
    
    colorCanvas.addEventListener('mousemove', e => {
        mx = e.offsetX;
        my = e.offsetY;
    draw();
});
    
    var canvas1 = createCanvas(800, 800, WEBGL);
    center.x = 0;
    center.y = 0;
    var p5Canvas = canvas1.canvas;
    
    canvas.position = "absolute";
    canvas.marginLeft = 50;
    
    
    var htmlCanvas = document.getElementById("htmlCanvas");
    htmlCanvas.style.position = "absolute";
    var htmlContext = htmlCanvas.getContext("2d");
    htmlCanvas.height = 800;
    htmlContext.drawImage(p5Canvas, 0, 0);
    htmlContext.fillStyle = "rgba(255, 255, 255, 1.0)";
    htmlContext.font = "16px Arial";
    htmlContext.textAlign = "right";
    
    sizeSlider = new LineSlider(-width/2 + 150, -height/2 + 25, width/6, 25, 0, 0.75);
    
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
}

var time = 0.0, radius = 125.0;

var mousePressLoc = [];
var lastYAngle = 0.0, lastXAngle = 0.0, yAngle = 0.0, xAngle = 0.0;

var pilAngle = 0.0;

var centerColor = [], mainColor = [], waveColor = [];
var size = 0.85, rotation = 0.0, rotationSpeed = 0.01, wobble = 0.25, complexity = 0.5, colorRatio = 0.5, waveIntensity = 0.5, speed = 0.5;

var waveOffset = 0.0;
var ringCount = 55, waveCount = 3;
function draw() {
    
    /*use mx and my to derive colors on color wheel*/
    
    
    
    background(0);
    
    
    colorMode(HSB);
    
    stroke(255);
    
    
    translate(center.x, center.y, -200);
    
    
  /* PIL Object
  Each curve (Peace (4 lines), Heart, Infinity) is parameterized with a single variable 0 < t < 1
  */
    
    //pilAngle = pilRotationSlider.v*PI - PI/2;
    
    pilAngle = yAngle;
    colorMode(RGB);
    
    noFill();
    stroke(255);
    strokeWeight(1);
    //rotateY(-0.26);
    
    var list = document.getElementById("select1");
    var option = list.value;
    

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
    
    colorMode(HSB);
    noFill();
    
    strokeWeight(2);

    /*
    mainColor.saturation = colorSlider.v*255;
    centerColor.saturation = centerColorSlider.v*255;
    waveColor.saturation = waveColorSlider.v*255;
    ringCount = floor(ringsSlider.v*100);
    waveCount = floor(wavesSlider.v*10);
    waveIntensity = waveIntensitySlider.v;
    size = 0.5 + sizeSlider.v;
    rotationSpeed = (rotationSlider.v - 0.5)*0.25;
    wobble = wobbleSlider.v;
    complexity = 0.25 + complexitySlider.v;
    colorRatio = colorRatioSlider.v;
    */
    
    size = 0.5 + sizeSlider.value/100.0;
    mainColor.saturation = colorSlider.value/100.0*255;
    rotationSpeed = (rotationSlider.value/100.0 - 0.5)*0.25;
    wobble = wobbleSlider.value/100.0;
    complexity = 0.25 + complexitySlider.value/100.0;
    centerColor.saturation = 125;//centerColorSlider.value/100.0*255;
    colorRatio = colorRatioSlider.value/100.0;
    ringCount = ringsSlider.value;
    waves = wavesSlider.value/10.0;
    waveIntensity = waveIntensitySlider.value/100.0;
    waveColor.saturation = waveColorSlider.value/100.0*255;
    speed = speedSlider.value/1000.0 + 0.05;
    
    rotateY(pilAngle);
    //rotateX(xAngle);
    rotateX(0.15);
    
  for (var i = 0; i < 1.0; i += 1.0/ringCount) {
    var iSmoothStep = 3*i*i - 2*i*i*i;
    //stroke(mainColor.saturation - (mainColor.saturation - centerColor.saturation)*(1-i)*colorRatio, 255, 255);
    stroke(mainColor.saturation - (mainColor.saturation - centerColor.saturation)*(1-i + colorRatio/2)*colorRatio, 255, 255);
    if (floor((i-waveOffset) * ringCount) % floor(ringCount/waveCount) == 0 && waveCount > 0) {
      strokeWeight(1 + 4*waveIntensity);
    stroke(waveColor.saturation - (waveColor.saturation - mainColor.saturation)*(1.0-waveIntensity), 255*(1-waveIntensity), 126);
    }
    beginShape();
    for (var t = 0; t < 1.05; t += 0.005) {
      var rNoise = complexity*i*200*(noise(3 + time + 5*complexity*cos(t*PI*2), 3 + time + 5*complexity*sin(t*PI*2), i*2-time)-0.5);
      var xNoise = complexity*i*300*(noise(25 + time + 15*cos(t*PI*2), 25 + time + 15*sin(t*PI*2), i*1-time)-0.5);
      var yNoise = complexity*i*300*(noise(15 + time + 15*cos(t*PI*2), 15 + time + 15*sin(t*PI*2), i*1-time)-0.5);
      var zNoiseA = complexity*i*800*(noise(3 + time + 15*cos(t*PI*2), 3 + time + 15*sin(t*PI*2), i*1-time)-0.5);
      var xWobble = wobble*i*300*(noise(3 + time + 0.5*cos(t*PI*2), 3 + time + 0.5*sin(t*PI*2), i*1+time/5)-0.5);
      var yWobble = wobble*i*300*(noise(3 + time + 0.5*cos(t*PI*2), 3 + time + 0.5*sin(t*PI*2), i*1+time/5)-0.5);
      vertex(-0 + (radius*1.45 + iSmoothStep*150*size + rNoise + xWobble)*cos(t*PI*2 + rotation) + xNoise, (radius*1.45 + iSmoothStep*150*size + rNoise + xWobble)*sin(t*PI*2 + rotation) + yNoise, zNoiseA);
    }
    endShape();
    strokeWeight(1);
    
  }
    
    waveOffset += 0.03;
    if (waveOffset > 1.0) waveOffset--;
    
    rotation += rotationSpeed;
    if (rotation > PI*2) rotation -= PI*2;
    
    //Draw FX
    
    
    translate(-center.x, -center.y, 200);
    
    time += speed;
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
    
    /*PEACE*/
    
    
    noStroke();
  
  for (var t = 0; t < 1.05; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin((t-time/4)*PI*2)), 255 - 55*(1+sin((t-time/4)*PI*2)), 255);
      var y = t*1.2*radius;
    
      translate(0,y,0);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(0,-y,0);
  } 
    
  for (var t = 0; t < 1.05; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin((t-time/4)*PI*2)), 255 - 55*(1+sin((t-time/4)*PI*2)), 255);
      var y = -t*1.2*radius;
    
      translate(0,y,0);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(0,-y,0);
  } 
    
  for (var t = 0; t < 1.0; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin((t-time/4)*PI*2)), 255 - 55*(1+sin((t-time/4)*PI*2)), 255);
      var x = t*1.2*radius*cos(PI/4), y = 25 + t*1.2*radius*sin(PI/4);
    
      translate(x,y,z);
      rotateY(-pilAngle);
      circle(0, 0, 15);
      rotateY(pilAngle);
      translate(-x,-y,-z);
  } 
    
  for (var t = 0; t < 1.0; t += 0.025) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          fill(0, 155 - 100*(1+sin((t-time/4)*PI*2)), 255 - 55*(1+sin((t-time/4)*PI*2)), 255);
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
          fill(0, 155 - 100*(1+sin((t+time/4)*PI*6)), 255 - 55*(1+sin((t+time/4)*PI*6)), 255);
      
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
        fill(255, 127 + 64*(1+sin((t-time/4)*PI*6)), 0, 255);
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