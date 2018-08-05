var player
var enemy
var sun
var item
var isItemGet
var isItemGen
var isItemUse
var isGameOver
var isGrown
var score
var prevFrameCount

function setup() {
  createCanvas(600, 600)
  imageMode(CENTER)
  score = 0
  player = new Planet(width - 100, height - 100, 0, 0, 2, "earth")
  enemy = new Planet(100, 100, 0, 0, 1, "enemy")
  sun = new Planet(300, 300, 0, 0, 0, "sun")
  item = new Planet(-100, -100, 0, 0, 0, "item")
  isGameOver = false
  isItemGen = false
  isItemGet = false
  isGrown = false
  player.sprite(1, 7, "earth")

}

function draw() {
  if(!isGameOver){
    background(30, 30, 30)
    player.update()
    enemy.update()
    enemy.draw()
    sun.draw()
    item.draw()
    if(isItemUse) {
      var prevFrameCount2 = frameCount
      player.spriteDraw(7, 3)
      stroke(0)
      strokeWeight(5)
      rect(player.pos.x - player.rad, player.pos.y + 30, (prevFrameCount - frameCount + 240) / 24 * 6.4, 12)
    }
    else player.draw()
    enemyMove(enemy)

    edgeCheck(player)
    itemGen()
    itemGet()
    sunGet()
    gameover()
    itemEnd()
    growEnemy()
  }
}


function itemGen(){
  if(!isItemGen && frameCount % 120 == 0){
    isItemGen = true
    item.pos.x = random(100, width - 100)
    item.pos.y = random(100, height - 100)
  }
}

function itemGet(){
  if(isItemGen && collisionCheck(player, item)){
    isItemGet = true
    score++
    item.pos.x = -100
    item.pos.y = -100
  }
}
function itemEnd(){
  if(prevFrameCount + 240 < frameCount && isItemUse){
      isItemUse = false
      isItemGen = false
      player.color = color(0, 0, 255)
  }
}

function itemUse(){

  if(isItemGet){
    prevFrameCount = frameCount
    player.color = color(255)
    isItemUse = true
    isItemGet = false
  }
}

function gameover(){
  if(isItemUse) return 0
  if(collisionCheck(player, enemy)) isGameOver = true
}

function sunGet(){
  if(collisionCheck(player, sun)){
    score++
    player.speed += 1
    sun.pos.x = random(100, width - 100)
    sun.pos.y = random(100, height - 100)
  }
}

function growEnemy(){
  if(score % 4 == 2){
    isGrown = false
  }

  else if(!isGrown && score % 4 == 3){
    enemy.rad += 10
    enemy.speed *= 1.5
    isGrown = true
  }
}

function collisionCheck(a, b){
  if(dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y) < a.rad + b.rad) return true
}

function playerMove(planet){
  planet.vel.x = (mouseX - planet.pos.x) / dist(planet.pos.x, planet.pos.y, mouseX, mouseY)
  planet.vel.y = (mouseY - planet.pos.y) / dist(planet.pos.x, planet.pos.y, mouseX, mouseY)
}

function enemyMove(planet){
  planet.vel.x = (player.pos.x - planet.pos.x) / dist(planet.pos.x, planet.pos.y, player.pos.x, player.pos.y)
  planet.vel.y = (player.pos.y - planet.pos.y) / dist(planet.pos.x, planet.pos.y, player.pos.x, player.pos.y)
}

function edgeCheck(planet){
  if(planet.pos.x - planet.rad < 0) {
    planet.pos.x = planet.rad
    planet.vel.x *= -1
  } else if (planet.pos.x + planet.rad > width){
    planet.pos.x = width - planet.rad
    planet.vel.x *= -1
  } else if (planet.pos.y - planet.rad < 0){
    planet.pos.y = planet.rad
    planet.vel.y *= -1
  } else if (planet.pos.y + planet.rad > height){
    planet.pos.y = height - planet.rad
    planet.vel.y *= -1
  }
}

function mouseClicked(){
  playerMove(player)
}

function keyPressed(){
  // console.log(keyCode)
  if(keyCode == 49) itemUse()
}
