import { _decorator, Component, Node, Prefab, EventMouse, Vec2, Vec3, instantiate, director, math, resources, UITransform, Sprite } from 'cc';
import { PlayerGlobal } from '../../PlayerGlobal';
import { pickupWeapon } from '../pickupWeapon';
import { Pellet } from './Pellet';

const { ccclass, property } = _decorator;
@ccclass('shotgun')
export class shotgun extends Component {
    private gun: Node;
    private Pellet: Prefab;
    private C: Node;
    private hidden: Boolean = false;
    private gunAngle: number = 0;
    private startScale: number;
    private reversed: boolean = false;

    @property(Prefab)
    weaponDrop: Prefab;        ;

    onLoad() {
        
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
        if (this.hidden) return;

        const numPellets: number = 5; // Количество пуль
        const spreadAngle: number = 180; // Угол разброса дробовика в градусах

        for (let i = 0; i < numPellets; i++) {
            if (this.hidden) return
            const pellet = instantiate(this.Pellet);
            director.getScene().getChildByName("Canvas").addChild(pellet);
            pellet.setWorldPosition(PlayerGlobal.playerNode.getWorldPosition());
            pellet.setRotation(this.gun.rotation);
            pellet.getComponent(Pellet).setTarget(new Vec3(mouseLoc.x, mouseLoc.y));
        }
    }

    onDestroy() {
        const weaponItem = instantiate(this.weaponDrop)
        weaponItem.getComponent(pickupWeapon).setWeapon(this.gun.getComponent(Sprite).spriteFrame, shotgun)
        if (this.gun) this.gun.destroy;
    }

    start() {
        this.startScale = this.node.scale.x;
        this.C = PlayerGlobal.playerNode;
        PlayerGlobal.touchArea.on(Node.EventType.MOUSE_MOVE, this.mouseMove);
        resources.load("weapons/shotgun/shotgun", Prefab, (_err, prefab) => {
            this.gun = instantiate(prefab);
            this.C.addChild(this.gun);
            this.gun.setPosition(0, 0);
            PlayerGlobal.weapon = this.gun
        })
        resources.load("weapons/shotgun/pellet", Prefab, (_err, prefab) => {
            this.Pellet = prefab;
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
        //console.log(director.getScene().getChildByName("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocationX(), event.getUILocationY())))
        let ML: Vec3 = director.getScene().getChildByName("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocationX(), event.getUILocationY()));
        PlayerGlobal.weapon.angle = 90 - math.toDegree(Math.atan2(ML.x, ML.y))
        //console.log(PlayerGlobal.weapon.angle)
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