function setup() {
    createCanvas(800, 800, WEBGL);
}

var time = 0.0, radius = 250.0;
function draw() {
    background(0);
    noFill();
    stroke(255);
    strokeWeight(50);
    rotateY(time);
    
    
  /*
  Parameterized with a single variable 0 < t < 1 (per line) are the following basic space curves for the PIL object (Peace (4 lines), Heart, Infinity)
  */
    
    /*PEACE*/
    
    strokeWeight(35);
  
  beginShape();
  for (var t = 0; t < 1.0; t += 0.01) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          stroke(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var y = t*1.2*radius;
    
      vertex(0, y, 0);
  } 
  endShape();
  
  beginShape();
  for (var t = 0; t < 1.0; t += 0.01) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          stroke(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var y = -t*1.2*radius;
    
     vertex(0, y, 0);
  } 
  endShape();
    
  
  beginShape();
  for (var t = 0; t < 1.0; t += 0.01) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          stroke(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var x = t*1.25*radius*cos(PI/4), y = t*1.2*radius*sin(PI/4);
    
      vertex(x, y, 0);
  } 
  endShape();
    
  
  beginShape();
  for (var t = 0; t < 1.0; t += 0.01) {
      //stroke(85 - 25*t, 155 - 100*t, 255 - 127*t, 255);
          stroke(0, 155 - 100*(1+sin(time*3)), 255 - 55*(1+sin(time*3)), 255);
      var x = -t*1.25*radius*cos(PI/4), y = t*1.2*radius*sin(PI/4);
    
      vertex(x, y, 0);
  } 
  endShape();
  
    
  strokeWeight(55);
    
  beginShape();
  for (var t = 0; t < 1.0; t += 0.0025) {
      
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
    
  
  strokeWeight(35);
  
  /*HEART*/
  rotateX(-0.15);
  noFill();
  beginShape();
  for (var t = 0; t < 1.0; t += 0.001) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
          stroke(255, 64*(1+sin((t+time)*PI*6)), 64*(1+sin((t+time)*PI*6)), 255);
          beginShape();
          t -= 0.00125;
          
      }*/
          stroke(255, 64*(1+sin(time*4)), 64*(1+sin(time*4)), 255);
      
      var x = radius*0.725*pow(sin(t*2*PI),3), y = -45 - radius*1*(13*cos(t*2*PI) - 5*cos(4*t*PI) - 2*cos(6*t*PI) - cos(8*t*PI))/16, z = 45*cos(t*PI*6)
    
      vertex(x, y, z);
     
  }
  endShape();
  
  rotateX(0.15);
    
    /*INFINITY*/
  beginShape();
  for (var t = 0; t < 1.0; t += 0.001) {
      
      /*/Gradient segments
      if (floor(t*1000) % 4 == 0) {
          endShape();
        stroke(255, 127 + 64*(1+sin((t-time)*PI*6)), 0, 255);
          beginShape();
          t -= 0.00125;
          
      }*/
        stroke(255, 127 + 64*(1+sin(time*5)), 0, 255);
      var x = -4 + radius*0.7*sqrt(2)*cos(t*2*PI)/(pow(sin(t*2*PI),2)+1), y =  -45 - radius*0.6*sqrt(2)*cos(t*2*PI)*sin(t*2*PI)/(pow(sin(t*2*PI),2)+1), z = 20 + 45*cos(PI/2 + t*PI*6);
 
      vertex(x, y, z);
  }
  endShape();

    
    //Draw FX
    
    time += 0.01;
}