import Phaser from 'phaser'
import bg1 from './assets/background/bg-front.svg'
import bg2 from './assets/background/bg-middle.svg'
import bg3 from './assets/background/bg-back.svg'
import bg4 from './assets/background/bg-color.svg'
import ground from './assets/background/bg-ground.svg'
import player from './assets/items/player-regular.svg'

const width = 1776
const height = 800

const gameStart = {
  key: 'gameStart',
  preload: function () {
    this.load.image('bg1', bg1)
    this.load.image('bg2', bg2)
    this.load.image('bg3', bg3)
    this.load.image('bg4', bg4)
    this.load.image('ground', ground)
    this.load.spritesheet('player', player, { frameWidth: 120, frameHeight: 120 })
  },
  create: function () {
    this.bg4 = this.add.tileSprite(width / 2, height / 2, width, height, 'bg4')
    this.bg3 = this.add.tileSprite(width / 2, height / 2, width, height, 'bg3')
    this.bg2 = this.add.tileSprite(width / 2, height / 2, width, height, 'bg2')
    this.bg1 = this.add.tileSprite(width / 2, height / 2, width, height, 'bg1')

    this.ground = this.add.tileSprite(width / 2, (height - 200/ 2), width, 200, 'ground')
    // 把 footer 加入 physics 世界
    this.physics.add.existing(this.ground)
    // 設定物件不會動靜止不會掉下去
    this.ground.body.immovable = true
    // 物件的位置和旋轉是否受其速度，加速度，阻力和重力的影響
    this.ground.body.moves = false

    // 人物透過 physics 再加入到畫面上
    this.player = this.physics.add.sprite(400, 450, 'player')
    // 設定角色彈跳值
    this.player.setBounce(1);
    // 設定角色碰撞邊界
    this.player.setSize(100, 100);
    // 設定角色顯示大小
    this.player.setScale(1)
    // 將需要碰撞的物件綁在一起
    this.physics.add.collider(this.player, this.ground);

    //設定動畫播放
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1
    })

    //播放動畫
    this.player.anims.play('run', true)
  },
  update: function () {
    this.bg1.tilePositionX += 3
    this.bg2.tilePositionX += 2
    this.bg3.tilePositionX += 1
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1776,
  height: 800,
  parent: 'app',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 1500
      },
      // debug: true,
    },
  },
  scene: [
    gameStart
  ]
}

const game = new Phaser.Game(config)