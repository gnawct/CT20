let gsky, bsky, ground, angle, time, c, flick; 
// 0-255, 100-255, 50-150, 200-300

function setup() {
  createCanvas(400, 400);
  colorMode(RGB);
  angleMode(DEGREES);
  time = { // set in seconds
    h: hour() * 3600, 
    m: minute() * 60,
    s: second()
  };
  angle = 200 + ((1/72) * (time.m + time.s));
  flick = 60;
  
  //set values depending on time
  if (minute() > 0 && minute() < 15) { // morning; color and angle change
    
    gsky = 0 + ((255 / 3600) * (time.m + time.s));
    bsky = 100 + ((155 / 3600) * (time.m + time.s));
    ground = 50 + ((1 / 36) * (time.m + time.s));
    
  }else if (minute() > 15 && minute() < 30) { // evening; color and angle change
    
    gsky = 0 + ( 255 - (255 / 3600) * (time.m + time.s));
    bsky = 100 + ( 155 - (155 / 3600) * (time.m + time.s));
    ground = 50 + ( 100 - (1 / 36) * (time.m + time.s));
    
  }else { // night; only angle should change
    gsky = 0;
    bsky = 100;
    ground = 50;
  }
}

function draw() {
  print(hour(), minute(), second());
  AngleCheck();
  
  BG(gsky, bsky, ground, flick); // ground and sky
  
  Clock(); // sun and moon
  
  if (minute() > 0 && minute() < 15) { //morning or sunrise
    if (second() > time.s || time.s === 60) {
      gsky = gsky + (255 / 3600);
      bsky = bsky + (155 / 3600);
      ground = ground + (1 / 36);
    }
  } else if (minute() > 15 && minute() < 30) { //evening or sunset
    if (second() > time.s || time.s === 60) {
      gsky = gsky - (255 / 3600);
      bsky = bsky - (155 / 3600);
      ground = ground - (1 / 36);
    }
  } else {
    if (second() % 5 === 0) {
      flick = 127;
    } else {
      flick = 80;
    }
  }
  
  time.s = second();
}

function BG(gs, bs, gg, f) {
  //sky
  background(0, gs, bs);

  Lamp(f); // couldn't figure out stars so now we got light pollution
  
  //ground
  fill(1, gg, 32); // shaded green: 50~150
  ellipse(200, 400, 800, 200);
}

function Clock() {
  if (minute() >= 0 && minute() <= 30){
    c = 'yellow';
  } else {
    c = 'silver';
  }
  
  fill(c);
  translate(200, 400);
  rotate(angle);
  circle(320, 100, 100);
}

function Lamp(f){
  
  //body
  fill(20);
  quad(290, 200, 310, 200, 310, 310, 290, 310);
  
  
  if (minute() > 5 && minute() <= 25) {
    body = 80;
    light = "grey";
  } else {
    body = 28;
    light = "yellow";
    
    //light
    fill(255, 255, 0, f);
    triangle(300, 180, 350, 310, 250, 310);
  }
  noStroke();
  
  //bulb
  fill(light);
  circle(300, 200, 30);
  
  //cover
  fill(body);
  quad(280, 180, 320, 180, 330, 200, 270, 200);
}

function AngleCheck(){
  if (angle < 300){
    if (second() > time.s || time.s === 60) {
      angle = (angle + (1/72));
    }
  } else {angle = 200;}
  // print(angle);
}