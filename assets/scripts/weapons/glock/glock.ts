import { _decorator, Component, Node, Prefab, EventMouse, Vec2, Vec3, instantiate, director, math, resources, UITransform, Sprite, Canvas } from 'cc';
import { bullet } from './Bullet';
import { PlayerGlobal } from '../../PlayerGlobal';
import { pickupWeapon } from '../pickupWeapon';
const { ccclass, property } = _decorator;
@ccclass('glock')
export class glock extends Component {
    private gun: Node;
    private Bullet: Prefab;
    private C: Node;
    private hidden: Boolean = false;
    private gunAngle: number = 0;
    private startScale: number;
    private reversed: boolean = false;

    @property(Prefab)
    weaponDrop: Prefab;        ;

    onLoad() {
        resources.load('weapons/PickupWeapon', Prefab, (err, prefab) => {
            this.weaponDrop = prefab;
        });
    }
    hide() {
        //this.node.removeFromParent();
        this.hidden = true;
    }
    show() {
        this.node.setParent(this.C);
        this.hidden = false;
    }
    shoot(mouseLoc: Vec2) {
        if (this.hidden) return
        const Bullet = instantiate(this.Bullet);
        director.getScene().getChildByName("Canvas").addChild(Bullet);
        Bullet.setWorldPosition(this.C.worldPosition);
        Bullet.getComponent(bullet).setTarget(new Vec3(mouseLoc.x, mouseLoc.y));
    }

    onDestroy() {
        const weaponItem = instantiate(this.weaponDrop);
        weaponItem.getComponent(pickupWeapon).setWeapon(this.gun.getComponent(Sprite).spriteFrame, glock);
        director.getScene().getChildByName('Canvas').addChild(weaponItem);
        let dropLocation: Vec3 = PlayerGlobal.playerNode.getWorldPosition();
        weaponItem.setWorldPosition(dropLocation);
        if (this.gun) this.gun.destroy;
    }

    start() {
        this.startScale = this.node.scale.x;
        this.C = PlayerGlobal.playerNode;
        PlayerGlobal.touchArea.on(Node.EventType.MOUSE_MOVE, this.mouseMove);
        resources.load("weapons/glock/glock", Prefab, (err, prefab) => {
            this.gun = instantiate(prefab);
            this.C.addChild(this.gun);
            this.gun.setPosition(0, 0);
            PlayerGlobal.weapon = this.gun
        })
        resources.load("weapons/glock/bullet", Prefab, (err, prefab) => {
            this.Bullet = prefab;
            PlayerGlobal.touchArea.on(Node.EventType.MOUSE_DOWN, (event: EventMouse) => {
                //console.log(event.getUILocation());
                //console.log(this.node.worldPosition);
                //console.log(this.node.position)
                if (event.getButton() == 0 && !this.hidden) {
                    this.shoot(event.getUILocation());
                } //console.log();
            }, this);
        })
    }

    mouseMove(event: EventMouse) {
        //console.log(PlayerGlobal.weapon.angle)
        //console.log(event.getUILocationX() + ' ' + event.getUILocationY());
        console.log(director.getScene().getChildByName("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocationX(), event.getUILocationY())))
        let ML: Vec3 = director.getScene().getChildByName("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocationX(), event.getUILocationY()));
        PlayerGlobal.weapon.angle = 90 - math.toDegree(Math.atan2(ML.x, ML.y))
        console.log(PlayerGlobal.weapon.angle)
        //const angleRadians = Math.atan2(this.node.worldPosition.y, this..x);
        //const angleDegrees = math.toDegree(angleRadians);
        //this.gunAngle = angleDegrees;
        
    } 

    update(deltaTime: number) {
        //if (PlayerGlobal.weapon.angle > 90 || PlayerGlobal.weapon.angle < -90 && (this.reversed = false)) PlayerGlobal.weapon.setScale(new Vec3(PlayerGlobal.weapon.scale.x, PlayerGlobal.weapon.scale.y * -1)), console.log(this.reversed), this.reversed = true
        //else this.reversed = false
        //if (!this.gun) return
        if (this.hidden) return;
        //PlayerGlobal.weapon.angle = this.gunAngle
       

    }
}

