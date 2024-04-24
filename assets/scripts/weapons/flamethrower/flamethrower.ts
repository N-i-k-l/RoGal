import { _decorator, Component, director, EventMouse, instantiate, math, Node, Prefab, resources, Sprite, UITransform, Vec2, Vec3 } from 'cc';
import { PlayerGlobal } from '../../PlayerGlobal';
import { flame } from './flame';
import { pickupWeapon } from '../pickupWeapon';
const { ccclass, property } = _decorator;

@ccclass('flamethrower')
export class flamethrower extends Component {
    private gun: Node;
    private flame: Prefab;
    private C: Node;
    private hidden: Boolean = false;
    private gunAngle: number = 0;
    private startScale: number;
    private reversed: boolean = false;
    private buttonPressed: boolean = false;
    private ML: Vec2 = new Vec2(0, 0);
    @property(Prefab)
    weaponDrop: Prefab;;

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

        console.log(this.gun)

        const numFlames: number = 1; // Количество пламен
        const spreadAngle: number = 180; // Угол разброса огнемета в градусах

        for (let i = 0; i < numFlames; i++) {
            const flameInstance = instantiate(this.flame);
            this.C.addChild(flameInstance);

            const deviationX: number = (Math.random() - 0.5) * spreadAngle;
            const deviationY: number = (Math.random() - 0.5) * spreadAngle;
            const targetWithDeviation = new Vec3(mouseLoc.x + deviationX, mouseLoc.y + deviationY);

            flameInstance.setPosition(this.gun.position);
            flameInstance.getComponent(flame).setTarget(targetWithDeviation);
        }
    }

    onDestroy() {
        const weaponItem = instantiate(this.weaponDrop)
        weaponItem.getComponent(pickupWeapon).setWeapon(this.gun.getComponent(Sprite).spriteFrame, flamethrower)
        if (this.gun) this.gun.destroy;
    }

    start() {
        this.startScale = this.node.scale.x;
        this.C = PlayerGlobal.playerNode;
        PlayerGlobal.touchArea.on(Node.EventType.MOUSE_MOVE, this.mouseMove);
        resources.load("weapons/flamethrower/flamethrower", Prefab, (_err, prefab) => {
            this.gun = instantiate(prefab);
            console.log('1', this.gun);
            console.log('2', this.flame.name);
            this.C.addChild(this.gun);
            this.gun.setPosition(0, 0);
            PlayerGlobal.weapon = this.gun
        })
        resources.load("weapons/flamethrower/flame", Prefab, (_err, prefab) => {
            this.flame = prefab;
            console.log('3', this.flame);
            PlayerGlobal.touchArea.on(Node.EventType.MOUSE_DOWN, (event: EventMouse) => {
                //console.log(event.getUILocation());
                //console.log(this.node.worldPosition);
                //console.log(this.node.position)
                if (event.getButton() == 0 && !this.hidden) {
                    this.buttonPressed = true;
                } //console.log();
            }, this);
            PlayerGlobal.touchArea.on(Node.EventType.MOUSE_UP, (event: EventMouse) => {
                if (event.getButton() == 0 && !this.hidden) {
                    this.buttonPressed = false;
                } //console.log();
            }, this);

        })
    }

    mouseMove(event: EventMouse) {
        //console.log(PlayerGlobal.weapon.angle)
        //console.log(event.getUILocationX() + ' ' + event.getUILocationY());
        //console.log(director.getScene().getChildByName("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocationX(), event.getUILocationY())))
        let ML: Vec3 = director.getScene().getChildByName("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocationX(), event.getUILocationY()));
        globalThis.ML.set(ML.x, ML.y)
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
        if (this.buttonPressed) this.shoot(this.ML);
        if (this.hidden) return;
        //PlayerGlobal.weapon.angle = this.gunAngle


    }
}