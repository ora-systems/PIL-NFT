var width = 800, height = 800;
var center = [];


function setup() {
    
    createCanvas(800, 800, WEBGL);
    center.x = 0;
    center.y = 0;
}

var time = 0.0, radius = 125.0;

var pilAngle = 0.0;

function draw() {
    background(0, 0, 0, 0);
    
    
    
    translate(center.x, center.y, 200);
    
    
  /* PIL Object
  Each curve (Peace (4 lines), Heart, Infinity) is parameterized with a single variable 0 < t < 1
  */
    
    colorMode(RGB);
    
    noFill();
    stroke(255);
    strokeWeight(1);
    pilAngle = mouseX/width*PI*2;
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

    
    time += 0.03;
}


/*Old color function

    stroke(colorA.x*i*colorRatio*2 + colorB.x*(1.0-i)*(1.0-colorRatio)*2, colorA.y*i*colorRatio*2 + colorB.y*(1.0-i)*(1.0-colorRatio)*2, colorA.z*i*colorRatio*2 + colorB.z*(1.0-i)*(1.0-colorRatio)*2);*/