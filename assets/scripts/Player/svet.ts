import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
    private player: Phaser.GameObjects.Sprite;
    private light: Phaser.GameObjects.Light;

    constructor() {
        super('main-scene');
    }

    preload() {
        this.load.image('player', 'path/to/player/sprite.png');
    }

    create() {
        this.player = this.add.sprite(400, 300, 'player'); // Устанавливаем спрайт игрока в центре экрана
        this.light = this.light.addLight(this.player.x, this.player.y, 300); // Создаем источник света вокруг игрока
        this.light.enable(); // Включаем поддержку света
        this.light.setAmbientColor(0x000000); // Устанавливаем цвет фонового света
        this.light.addLight(this.player.x, this.player.y, 200).setColor(0xffffff).setIntensity(3); // Добавляем дополнительный белый свет
    }

    update() {
        // Обновление позиции источника света вокруг игрока
        this.light.setPosition(this.player.x, this.player.y);
    }
}

