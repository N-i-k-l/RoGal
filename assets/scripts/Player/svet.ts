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
        this.player = this.add.sprite(400, 300, 'player'); // ������������� ������ ������ � ������ ������
        this.light = this.light.addLight(this.player.x, this.player.y, 300); // ������� �������� ����� ������ ������
        this.light.enable(); // �������� ��������� �����
        this.light.setAmbientColor(0x000000); // ������������� ���� �������� �����
        this.light.addLight(this.player.x, this.player.y, 200).setColor(0xffffff).setIntensity(3); // ��������� �������������� ����� ����
    }

    update() {
        // ���������� ������� ��������� ����� ������ ������
        this.light.setPosition(this.player.x, this.player.y);
    }
}

