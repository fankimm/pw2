function Planet(x, y, vx, vy, sp, fn){
  this.pos = createVector(x, y)
  this.vel = createVector(vx, vy)
  this.speed = sp
  this.rad = 32
  this.planetImage = loadImage("assets/" + fn + ".png")
  this.spriteImage = []
  this.frameIndex = 1
  this.update = function(){
    this.pos.x += this.vel.x * this.speed
    this.pos.y += this.vel.y * this.speed
  }
  this.draw = function(){
    image(this.planetImage, this.pos.x, this.pos.y, this.rad * 2, this.rad * 2)
    // ellipse(this.pos.x, this.pos.y, this.rad * 2, this.rad * 2)
  }

  this.sprite = function(s, e, fn){
    for(var i=s; i<e; i++){
      this.spriteImage[i] = loadImage("assets/" + fn + i + ".png")
    }
  }
  this.spriteDraw = function(e, f){
    if(this.frameIndex >= e) {
      this.frameIndex = 1
    }
    image(this.spriteImage[this.frameIndex], this.pos.x, this.pos.y, this.rad * 2, this.rad * 2)
    if(frameCount % f == 0){
      // image(this.spriteImage[this.frameIndex], 100, 100)
      this.frameIndex++
      }
    }

}
