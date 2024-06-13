let car;
let cameraOffset;
let backgroundImage;
let scaledWidth, scaledHeight;

let polygons = [
  [
    { x: 363.92 * 1.3 * 5, y: 920.15 * 1.3 * 5 },
    { x: 194.67 * 1.3 * 5, y: 919.67 * 1.3 * 5 },
    { x: 192.42 * 1.3 * 5, y: 893.36 * 1.3 * 5 },
    { x: 188.6 * 1.3 * 5, y: 893.36 * 1.3 * 5 },
    { x: 188.6 * 1.3 * 5, y: 870.12 * 1.3 * 5 },
    { x: 194.67 * 1.3 * 5, y: 870.12 * 1.3 * 5 },
    { x: 194.67 * 1.3 * 5, y: 858.67 * 1.3 * 5 },
    { x: 364.5 * 1.3 * 5, y: 858.98 * 1.3 * 5 },
    { x: 365.96 * 1.3 * 5, y: 870.12 * 1.3 * 5 },
    { x: 371.23 * 1.3 * 5, y: 870.12 * 1.3 * 5 },
    { x: 371.23 * 1.3 * 5, y: 892.59 * 1.3 * 5 },
    { x: 364.5 * 1.3 * 5, y: 892.79 * 1.3 * 5 },
    { x: 363.92 * 1.3 * 5, y: 920.15 * 1.3 * 5 }
  ],
  [
    { x: 393.18 * 1.3 * 5, y: 884.81 * 1.3 * 5 },
    { x: 393.71 * 1.3 * 5, y: 886.4 * 1.3 * 5 },
    { x: 376.27 * 1.3 * 5, y: 930.03 * 1.3 * 5 },
    { x: 369.88 * 1.3 * 5, y: 935.83 * 1.3 * 5 },
    { x: 334.01 * 1.3 * 5, y: 935.83 * 1.3 * 5 },
    { x: 301.15 * 1.3 * 5, y: 932.17 * 1.3 * 5 },
    { x: 206.43 * 1.3 * 5, y: 931.42 * 1.3 * 5 },
    { x: 199.53 * 1.3 * 5, y: 927.83 * 1.3 * 5 },
    { x: 220.1 * 1.3 * 5, y: 927.67 * 1.3 * 5 },
    { x: 315.96 * 1.3 * 5, y: 927.32 * 1.3 * 5 },
    { x: 352.98 * 1.3 * 5, y: 928.85 * 1.3 * 5 },
    { x: 371.61 * 1.3 * 5, y: 925.65 * 1.3 * 5 },
    { x: 393.18 * 1.3 * 5, y: 884.81 * 1.3 * 5 }
  ],
  [
    { x: 425.0 * 1.3 * 5, y: 856.45 * 1.3 * 5 },
    { x: 428.94 * 1.3 * 5, y: 860.76 * 1.3 * 5 },
    { x: 421.49 * 1.3 * 5, y: 868.68 * 1.3 * 5 },
    { x: 394.94 * 1.3 * 5, y: 869.02 * 1.3 * 5 },
    { x: 388.13 * 1.3 * 5, y: 853.99 * 1.3 * 5 },
    { x: 425.0 * 1.3 * 5, y: 856.45 * 1.3 * 5 }
  ],
  [
    { x: 444.94 * 1.3 * 5, y: 158.89 * 1.3 * 5 },
    { x: 430.09 * 1.3 * 5, y: 146.59 * 1.3 * 5 },
    { x: 388.38 * 1.3 * 5, y: 113.7 * 1.3 * 5 },
    { x: 389.55 * 1.3 * 5, y: 112.14 * 1.3 * 5 },
    { x: 435.47 * 1.3 * 5, y: 47.49 * 1.3 * 5 },
    { x: 449.74 * 1.3 * 5, y: 13.36 * 1.3 * 5 },
    { x: 459.19 * 1.3 * 5, y: 14.81 * 1.3 * 5 },
    { x: 513.83 * 1.3 * 5, y: 30.13 * 1.3 * 5 },
    { x: 524.55 * 1.3 * 5, y: 72.51 * 1.3 * 5 },
    { x: 532.96 * 1.3 * 5, y: 85.02 * 1.3 * 5 },
    { x: 520.96 * 1.3 * 5, y: 101.93 * 1.3 * 5 },
    { x: 444.94 * 1.3 * 5, y: 158.89 * 1.3 * 5 }
  ]
];

function preload() {
  backgroundImage = loadImage('map-01.png'); // Load your background image
}

function setup() {
  createCanvas(1000, 700);
  cameraOffset = createVector(width / 2, height / 2); // Camera offset to center the car

  // Calculate the scaled width and height of the background image
  scaledWidth = backgroundImage.width * 1.3;
  scaledHeight = backgroundImage.height * 1.3;

  // Initialize the car at a specified position on the background image
  let startPosition = createVector(380 * 1.3, 3550 * 1.3); // Set the initial position to x=380, y=3550, scaled by 1.3
  car = new Car(startPosition);
}


function draw() {
  background(100);

  // Limit the car's position to within the bounds of the background image
  car.position.x = constrain(car.position.x, 0, scaledWidth);
  car.position.y = constrain(car.position.y, 0, scaledHeight);

  // Translate the canvas to follow the car, but limit it to the background boundaries
  let translateX = constrain(cameraOffset.x - car.position.x, width - scaledWidth, 0);
  let translateY = constrain(cameraOffset.y - car.position.y, height - scaledHeight, 0);
  translate(translateX, translateY);

  // Draw background image, scaled to 1.3x
  image(backgroundImage, 0, 0, scaledWidth, scaledHeight);

  // Draw polygons
  for (let i = 0; i < polygons.length; i++) {
    let polygon = polygons[i];
    beginShape();
    fill(255, 0, 0, 100); // Light red with transparency
    for (let j = 0; j < polygon.length; j++) {
      vertex(polygon[j].x, polygon[j].y);
    }
    endShape(CLOSE);
  }
  


  car.update();
  car.display();
}

class Car {
  constructor(position) {
    this.position = position;
    this.velocity = createVector(0, 0);
    this.acceleration = 0.5;
    this.friction = 0.05;
    this.maxSpeed = 3;
    this.angle = 0;
    this.steeringAngle = 0;
    this.maxSteeringAngle = PI / 6; // 30 degrees
    this.wheelBase = 70;
    this.size = createVector(13, 7); // Size of the car
  }

  update() {
    // Handle acceleration and braking
    if (keyIsDown(UP_ARROW)) {
      this.velocity.add(p5.Vector.fromAngle(this.angle).mult(this.acceleration));
    } else if (keyIsDown(DOWN_ARROW)) {
      this.velocity.sub(p5.Vector.fromAngle(this.angle).mult(this.acceleration));
    }

    // Apply friction only if spacebar is not pressed
    if (!keyIsDown(32)) { // 32 is the keycode for the spacebar
      this.velocity.mult(1 - this.friction);
    }

    // Limit the speed
    if (this.velocity.mag() > this.maxSpeed) {
      this.velocity.setMag(this.maxSpeed);
    }

    // Handle steering
    if (keyIsDown(LEFT_ARROW)) {
      this.steeringAngle = -this.maxSteeringAngle;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.steeringAngle = this.maxSteeringAngle;
    } else {
      this.steeringAngle = 0;
    }

    // Calculate turning radius and angular velocity
    if (this.velocity.mag() > 0) {
      let turningRadius = this.wheelBase / tan(this.steeringAngle);
      let angularVelocity = this.velocity.mag() / turningRadius;
      this.angle += angularVelocity;
    }

    // Update position
    this.position.add(this.velocity);
  }
  
  

  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    rectMode(CENTER);
    fill(150);
    rect(0, 0, this.size.x, this.size.y);
    pop();
  }
}