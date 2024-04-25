import { _decorator, Component, Node, Prefab, EventMouse, Vec2, Vec3, instantiate, director, math, resources, UITransform, Sprite, Canvas } from 'cc';
import { PlayerGlobal } from '../../PlayerGlobal';
import { bullet } from '../glock/Bullet';
import { pickupWeapon } from '../pickupWeapon';
import { tool } from './tool';
const { ccclass, property } = _decorator;

@ccclass('toolgun')
export class toolgun extends Component {
    private gun: Node;
    private Bullet: Prefab;
    private hidden: Boolean = false;
    private gunAngle: number = 0;
    private startScale: number;
    private reversed: boolean = false;
    private delay = 25;

    @property(Number)
    private startDelay = 25;

    @property(Prefab)
    weaponDrop: Prefab;

    onLoad() {
        this.delay = this.startDelay;
        resources.load('weapons/PickupWeapon', Prefab, (err, prefab) => {
            this.weaponDrop = prefab;
        });
    }
    hide() {
        //this.node.removeFromParent();
        this.hidden = true;
    }
    show() {
        this.node.setParent(PlayerGlobal.playerNode);
        this.hidden = false;
    }
    shoot(mouseLoc: Vec2) {
        if (this.hidden) return
        const Bullet = instantiate(this.Bullet);
        director.getScene().getChildByName("Canvas").addChild(Bullet);
        Bullet.setWorldPosition(PlayerGlobal.playerNode.getWorldPosition());
        //Bullet.setRotation(this.gun.rotation);
        Bullet.getComponent(tool).setTarget(new Vec3(mouseLoc.x, mouseLoc.y));
    }

    onDestroy() {
        console.log("?");
        const weaponItem = instantiate(this.weaponDrop);
        weaponItem.getComponent(pickupWeapon).setWeapon(this.gun.getComponent(Sprite).spriteFrame, toolgun);
        director.getScene().getChildByName('Canvas').addChild(weaponItem);
        let dropLocation: Vec3 = PlayerGlobal.playerNode.getWorldPosition();
        weaponItem.setWorldPosition(dropLocation);
        if (this.gun) this.gun.destroy();

        //PlayerGlobal.playerNode
        console.log("!");
    }

    start() {
        this.startScale = this.node.scale.x;
        PlayerGlobal.touchArea.on(Node.EventType.MOUSE_MOVE, this.mouseMove);
        resources.load("weapons/toolgun/toolgun", Prefab, (err, prefab) => {
            this.gun = instantiate(prefab);
            PlayerGlobal.playerNode.addChild(this.gun);
            this.gun.setPosition(0, 0);
            PlayerGlobal.weapon = this.gun
        })
        resources.load("weapons/toolgun/tool", Prefab, (_err, prefab) => {
            this.Bullet = prefab;
            PlayerGlobal.touchArea.on(Node.EventType.MOUSE_DOWN, (event: EventMouse) => {
                //console.log(event.getUILocation());
                //console.log(this.node.worldPosition);
                //console.log(this.node.position)
                if (this.delay < this.startDelay) return;
                if (event.getButton() == 0 && !this.hidden) {
                    this.delay = 0;
                    this.shoot(event.getUILocation());
                } //console.log();
            }, this);
        })
    }

    mouseMove(event: EventMouse) {
        //console.log(PlayerGlobal.weapon.angle)
        //console.log(event.getUILocationX() + ' ' + event.getUILocationY());
        //console.log(director.getScene().getChildByName("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocationX(), event.getUILocationY())))
        let ML: Vec3 = director.getScene().getChildByName("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocationX(), event.getUILocationY()));
        let an = 90 - math.toDegree(Math.atan2(ML.x, ML.y));
        let reversed: boolean = PlayerGlobal.weapon.scale.y < 0;
        PlayerGlobal.weapon.angle = an;
        if ((an > 90 && !reversed) || (an < 90 && reversed)) {
            PlayerGlobal.weapon.setScale(new Vec3(PlayerGlobal.weapon.scale.x, PlayerGlobal.weapon.scale.y * -1));
            console.log(reversed);
            reversed = !reversed;
        }
        //console.log(PlayerGlobal.weapon.angle)
        //const angleRadians = Math.atan2(this.node.worldPosition.y, this..x);
        //const angleDegrees = math.toDegree(angleRadians);
        //this.gunAngle = angleDegrees;

    }

    update(deltaTime: number) {
        this.delay += 1;
        if (this.hidden) return;
        //PlayerGlobal.weapon.angle = this.gunAngle


    }
}

