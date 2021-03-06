// 这是我们的玩家要躲避的敌人
var Enemy = function(x, y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = this.getRandomSpeed();  // 初始化一个随机速度
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';

    // 定义敌人的宽度和高度
    this.width = 50;
    this.height = 50;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed;

    // 敌人位置跑出游戏区域后
    if (this.x > 505) {
      // 移出到画布之外
      this.x = -55;

      // 更新敌人的速度，每次敌人出现的速度都不一样
      this.speed = this.getRandomSpeed();
    }

    // 执行检测碰撞方法
    this.checkCollisions(player);
};

// 返回一个随机的速度值
Enemy.prototype.getRandomSpeed = function () {
  var _speed = parseInt(Math.random() * 500, 10);
  if (_speed < 200) _speed = 200;
  return _speed;
}

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 玩家与敌人的碰撞检测函数
Enemy.prototype.checkCollisions = function (player) {

  if (this.y !== player.y) return false;
  // if (Math.abs(player.x - this.x) <= 12) {
  //   player.x = 202;
  //   player.y = 83*4+55;

  if (this.x < player.x + player.width &&
      this.x + this.width > player.x &&
      this.y < player.y + player.height &&
      this.height + this.y > player.y) {
          player.x = 202;
          player.y = 83*4+55;
      }


};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
// 玩家类
var Player = function (x, y) {
  this.x = x;
  this.y = y;

  this.sprite = 'images/char-boy.png';

  // 定义玩家的高和宽
  this.width = 50;
  this.height = 50;
};

// 玩家移动方法
Player.prototype.update = function (dt) {
  if (this.y === -28) {
    this.x = 202;
    this.y = 83*4+55;
  }
};

// 画出玩家
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 处理玩家移动方法
Player.prototype.handleInput = function (movement) {
  switch(movement) {
    case 'left': if (this.x === 0) return false; this.x -= 101; break;
    case 'right': if (this.x === 404) return false; this.x += 101; break;
    case 'up': if (this.y === -28) return false; this.y -= 83; break;
    case 'down': if (this.y === 387) return false; this.y += 83; break;
  }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [
  new Enemy(0, 83*0+55),
  new Enemy(0, 83*1+55),
  new Enemy(0, 83*2+55)
];
var player = new Player(202, 83*4+55);


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
