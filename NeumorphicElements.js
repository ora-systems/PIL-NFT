/*Class for storing neumorphic sliders*/

var valuePos = [];

class LineSlider {
    constructor(x, y, w, h, s, v) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.s = s;
        this.v = v;
    }
    
    update() {
        noStroke();
        fill(this.s + 45);
        rect(this.x, this.y, this.w, this.h);
        circle(this.x, this.y + this.h/2, this.h);
        circle(this.x + this.w, this.y + this.h/2, this.h);
        
        fill(this.s);
        valuePos.x = this.x + this.w*this.v;
        valuePos.y = this.y + this.h/2;
        circle(valuePos.x, valuePos.y, this.h-4);
        
        
        console.log("mouse " + mouseX);
        console.log("value " + (valuePos.x + 700));
        
        if (mouseIsPressed && abs(valuePos.y + 400 - mouseY) < this.h) {
            this.v = (mouseX - this.x - 700)/this.w;
            if (this.v < 0) this.v = 0;
            if (this.v > 1) this.v = 1;
        }
    }
}