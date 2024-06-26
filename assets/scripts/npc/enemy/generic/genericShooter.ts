import { _decorator, Component, instantiate, Node, Prefab, resources, Vec3 } from 'cc';
import { PlayerGlobal } from '../../../PlayerGlobal';
import { BulletGeneric } from './BulletGeneric';
const { ccclass, property } = _decorator;

@ccclass('genericShooter')
export class genericShooter extends Component {

    private direction: number = 0;
    private startScale: number;
    @property(String)
    private gunPref: string = "enemies/shooter/gun";

    @property(Prefab)
    private bulletPref: Prefab;

    @property(Number)
    private ticksStart: number = 100;

    private gun: Node;


    private ticks: number;

    start() {
        this.ticks = this.ticksStart;
        this.startScale = this.node.scale.x;
        this.direction = 1;
        resources.load(this.gunPref, Prefab, (err, prefab) => {
            this.gun = instantiate(prefab);
            this.node.addChild(this.gun);
            this.gun.setScale(this.node.scale.x * -1, this.node.scale.y);
            this.gun.setPosition(-10, 5);
        })
    }

    shoot() {
        const Bullet = instantiate(this.bulletPref);
        this.node.addChild(Bullet);
        Bullet.setPosition(this.gun.position);
        Bullet.getComponent(BulletGeneric).setTarget(PlayerGlobal.playerNode.getWorldPosition());
    }

    update(deltaTime: number) {
        this.ticks -= 1;
        if (this.ticks == 0) {
            
            this.ticks = this.ticksStart;
            this.shoot();
        }
        if (this.node.worldPosition.x > PlayerGlobal.playerNode.worldPosition.x && this.direction != -1) {
            this.direction = -1;
            this.node.setScale(new Vec3(this.startScale * 1, this.node.scale.y));
        }
        if (this.node.worldPosition.x < PlayerGlobal.playerNode.worldPosition.x && this.direction != 1) {
            this.direction = 1;
            this.node.setScale(new Vec3(this.startScale * -1, this.node.scale.y));
        }
    }
}


