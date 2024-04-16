import { _decorator, Component, EventMouse, instantiate, Node, Prefab, resources, Vec2, Collider2D, IPhysics2DContact, tween, EventKeyboard } from 'cc';
import { PlayerGlobal } from '../../../PlayerGlobal';
import { damageAura } from '../../../npc/enemy/generic/damageAura'
const { ccclass, property } = _decorator;

@ccclass('sword')
export class sword extends Component {
    private sword: Prefab;
    private swordI: Node;
    private C: Node;
    private active: boolean = false;

    swing(event: EventKeyboard) {
            const rotationAmount = 50;
            const rotationsCount = 1.3;
            const rotationDuration = 0.1;
        tween(this.node)
                .repeat(rotationsCount, tween().to(rotationDuration, { angle: rotationAmount }).to(rotationDuration, { angle: -rotationAmount }))
                .start();
        }
        
    Hit(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.group == 16) otherCollider.node.getComponent(damageAura).getDmg(20);
    }
    start() {
        this.C = this.node;
        resources.load("weapons/swordDefault/sword", Prefab, (err, prefab) => {
            this.sword = prefab;
            PlayerGlobal.touchArea.on(Node.EventType.MOUSE_DOWN, (event: EventMouse) => {
                if (event.getButton() == 0 && !this.active) {
                    this.swing();
                }
            })
        })
    }

    update(deltaTime: number) {
        
    }
}


