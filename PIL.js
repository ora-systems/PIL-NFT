var width = 1400, height = 800;
var center = [];
function setup() {
    createCanvas(1400, 800, WEBGL);
    center.x = width/6;
    center.y = 0;
}

var time = 0.0, radius = 125.0;

var mousePressLoc = [];
var lastYAngle = 0.0, lastXAngle = 0.0, yAngle = 0.0, xAngle = 0.0;

var colorA = [], colorB = [];
var tilt = 0.0, rotation = 0.0, rotationSpeed = 0.01, wobble = 0.25, complexity = 0.5, colorRatio = 0.5, waveIntensity = 0.5;

var waveOffset = 0.0;
var ringCount = 75, waveCount = 3;
function draw() {
    background(15);
    noFill();
    stroke(255);
    strokeWeight(1);
    colorA.x = 255;
    colorA.y = 50;
    colorA.z = 100;
    
    colorB.x = 0;
    colorB.y = 155;
    colorB.z = 255;
    
    
    
    
    /*GUI
    */
    
    line(-width/6, -height/2, -width/6, height/2);
    
    
    translate(center.x, center.y);
    
    
  /* PIL Object
  Each curve (Peace (4 lines), Heart, Infinity) is parameterized with a single variable 0 < t < 1
  */
    rotateY(time);
    
    /*PEACE*/
    
    strokeWeight(17.5);
  
  beginShape();
  for (var t = 0; t < 1.05; t += 0.05) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          stroke(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var y = t*1.2*radius;
    
      vertex(0, y, 0);
  } 
  endShape();
  
  beginShape();
  for (var t = 0; t < 1.05; t += 0.05) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          stroke(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var y = -t*1.2*radius;
    
     vertex(0, y, 0);
  } 
  endShape();
    
  
  beginShape();
  for (var t = 0; t < 1.0; t += 0.05) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          stroke(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var x = t*1.25*radius*cos(PI/6), y = 25 + t*1.2*radius*sin(PI/6);
    
      vertex(x, y, 0);
  } 
  endShape();
    
  
  beginShape();
  for (var t = 0; t < 1.0; t += 0.05) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          stroke(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var x = -t*1.25*radius*cos(PI/6), y = 25 + t*1.2*radius*sin(PI/6);
    
      vertex(x, y, 0);
  } 
  endShape();
  
    
  strokeWeight(25);
    
  beginShape();
  for (var t = 0; t < 1.05; t += 0.005) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
          stroke(0, 155 - 100*(1+sin((t+time)*PI*6)), 255 - 55*(1+sin((t+time)*PI*6)), 255);
          beginShape();
          t -= 0.00125;
          
      }*/
          stroke(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      
      var x = radius*1.3*cos(t*PI*2), y = radius*1.3*sin(t*PI*2);
    
      vertex(x, y, 0);
  } 
  endShape();
    
  
  strokeWeight(17.5);
  
  /*HEART*/
  rotateX(-0.15);
  noFill();
  beginShape();
  for (var t = 0; t < 1.05; t += 0.005) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
          stroke(255, 64*(1+sin((t+time)*PI*6)), 64*(1+sin((t+time)*PI*6)), 255);
          beginShape();
          t -= 0.00125;
          
      }*/
          stroke(255, 64*(1+sin(time*4)), 64*(1+sin(time*4)), 255);
      
      var x = radius*0.725*pow(sin(t*2*PI),3), y = -12.5 - radius*1*(13*cos(t*2*PI) - 5*cos(4*t*PI) - 2*cos(6*t*PI) - cos(8*t*PI))/16, z = 25*cos(t*PI*6)
    
      vertex(x, y, z);
     
  }
  endShape();
  
  rotateX(0.1);
    
    /*INFINITY*/
  beginShape();
  for (var t = 0; t < 1.05; t += 0.005) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
        stroke(255, 127 + 64*(1+sin((t-time)*PI*6)), 0, 255);
          beginShape();
          t -= 0.00125;
          
      }*/
        stroke(255, 127 + 64*(1+sin(time*5)), 0, 255);
      var x = -2 + radius*0.7*sqrt(2)*cos(t*2*PI)/(pow(sin(t*2*PI),2)+1), y =  -7.5 - radius*0.6*sqrt(2)*cos(t*2*PI)*sin(t*2*PI)/(pow(sin(t*2*PI),2)+1), z = 10 + 25*cos(PI/2 + t*PI*6);
 
      vertex(x, y, z);
  }
  endShape();
    
  rotateX(-0.1);
    rotateY(-time);

    
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
    strokeWeight(1);
    
    rotateX(xAngle + tilt);
    rotateY(yAngle);
    
  for (var i = 0; i < 1.0; i += 1.0/ringCount) {
    var iSmoothStep = 3*i*i - 2*i*i*i;
    stroke(colorA.x*i + colorB.x*(1.0-i), colorA.y*i + colorB.y*(1.0-i), colorA.z*i + colorB.z*(1.0-i));
    if (floor((i-waveOffset) * ringCount) % floor(ringCount/waveCount) == 0) {
      strokeWeight(1 + 4*waveIntensity);
    stroke(colorA.x*i + colorB.x*(1.0-i) + 255*(1-i)*waveIntensity, colorA.y*i + colorB.y*(1.0-i) + 255*(1-i)*waveIntensity, colorA.z*i + colorB.z*(1.0-i) + 255*(1-i)*waveIntensity);
    }
    beginShape();
    for (var t = 0; t < 1.05; t += 0.01) {
      var xNoiseA = complexity*i*500*(noise(3 + time + 5*cos(t*PI*2), 3 + time + 5*sin(t*PI*2), i*1-time)-0.5);
      var yNoiseA = complexity*i*500*(noise(3 + time + 6*cos(t*PI*2), 3 + time + 6*sin(t*PI*2), i*1-time)-0.5);
      var zNoiseA = complexity*i*300*(noise(3 + time + 5*cos(t*PI*2), 3 + time + 5*sin(t*PI*2), i*5-time)-0.5);
      var zNoiseB = wobble*i*2000*(noise(3 + time + 0.25*cos(t*PI*2), 3 + time + 0.25*sin(t*PI*2), i*1+time/5)-0.5);
      vertex(10 + (radius*1.7 + iSmoothStep*150 + xNoiseA)*cos(t*PI*2 + rotation), (radius*1.7 + iSmoothStep*150 + yNoiseA)*sin(t*PI*2 + rotation), zNoiseA + zNoiseB);
    }
    endShape();
    strokeWeight(1);
    
  }
    
    waveOffset += 0.03;
    if (waveOffset > 1.0) waveOffset--;
    
    rotation += rotationSpeed;
    if (rotation > PI*2) rotation -= PI*2;
    
    //Draw FX
    
    
    translate(-center.x, -center.y);
    
    time += 0.01;
}

function mousePressed() {
  mousePressLoc.x = mouseX;
  mousePressLoc.y = mouseY;
}

function mouseDragged() {
     yAngle = lastYAngle + (mouseX - mousePressLoc.x)/255;
     xAngle = lastXAngle - (mouseY - mousePressLoc.y)/255;
}

function mouseReleased() {
  lastYAngle = yAngle;
  lastXAngle = xAngle;
}