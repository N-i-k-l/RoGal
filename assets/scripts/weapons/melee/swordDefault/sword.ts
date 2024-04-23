import { _decorator, Component, EventMouse, instantiate, Node, Prefab, resources, Vec2, Collider2D, IPhysics2DContact, tween, EventKeyboard, director, Vec3, Sprite } from 'cc';
import { PlayerGlobal } from '../../../PlayerGlobal';
import { damageAura } from '../../../npc/enemy/generic/damageAura'
import { pickupWeapon } from '../../pickupWeapon';
const { ccclass, property } = _decorator;

@ccclass('sword')
export class sword extends Component {
    private sword: Prefab;
    private swordI: Node;
    private C: Node;
    private active: boolean = false;
    private gun: Node;
    private hidden: Boolean = false;

    @property(Prefab)
    weaponDrop: Prefab;    

    hide() {
        //this.node.removeFromParent();
        this.hidden = true;
    }
    show() {
        this.node.setParent(this.C);
        this.hidden = false;
    }

    onLoad() {
        resources.load('weapons/PickupWeapon', Prefab, (err, prefab) => {
            this.weaponDrop = prefab;
        });
    }

    onDestroy() {
        const weaponItem = instantiate(this.weaponDrop);
        weaponItem.getComponent(pickupWeapon).setWeapon(this.gun.getComponent(Sprite).spriteFrame, sword);
        director.getScene().getChildByName('Canvas').addChild(weaponItem);
        let dropLocation: Vec3 = PlayerGlobal.playerNode.getWorldPosition();
        weaponItem.setWorldPosition(dropLocation);
        if (this.gun) this.gun.destroy;
    }

    swing() {
            const rotationAmount = 50;
            const rotationsCount = 1.3;
            const rotationDuration = 0.1;
        tween(this.gun)
                .repeat(rotationsCount, tween().to(rotationDuration, { angle: rotationAmount }).to(rotationDuration, { angle: -rotationAmount }))
                .start();
        }
        
    Hit(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.group == 16) otherCollider.node.getComponent(damageAura).getDmg(20);
    }
    start() {
        resources.load("Sword", Prefab, (_err, prefab) => {
            this.gun = instantiate(prefab);
            this.C.addChild(this.gun);
            this.gun.setPosition(0, 0);
            PlayerGlobal.weapon = this.gun;

            PlayerGlobal.touchArea.on(Node.EventType.MOUSE_DOWN, (event: EventMouse) => {
                if (event.getButton() == 0 && !this.active) {
                    this.swing();
                }
            })
        })
    }

    update(deltaTime: number) {
        //if (!this.gun) return
        if (this.hidden) return;
    }
}


