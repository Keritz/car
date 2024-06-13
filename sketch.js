let car;
let cameraOffset;
let backgroundImage;
let scaledWidth, scaledHeight;

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
  background(220);

  // Limit the car's position to within the bounds of the background image
  car.position.x = constrain(car.position.x, 0, scaledWidth);
  car.position.y = constrain(car.position.y, 0, scaledHeight);

  // Translate the canvas to follow the car, but limit it to the background boundaries
  let translateX = constrain(cameraOffset.x - car.position.x, width - scaledWidth, 0);
  let translateY = constrain(cameraOffset.y - car.position.y, height - scaledHeight, 0);
  translate(translateX, translateY);

  // Draw background image, scaled to 1.3x
  image(backgroundImage, 0, 0, scaledWidth, scaledHeight);

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