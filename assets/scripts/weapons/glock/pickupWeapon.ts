import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Prefab, resources, Script, Sprite, SpriteFrame } from 'cc';
import { PlayerGlobal } from '../../PlayerGlobal';
import { Player } from '../../Player/Player';
const { ccclass, property } = _decorator;

@ccclass('pickupWeapon')
export class pickupWeapon extends Component {

    @property(SpriteFrame)
    weaponSprite: SpriteFrame = null;

    @property(Script)
    weapon: Script = null;

    start() {
        if (this.weaponSprite) this.node.getComponent(Sprite).spriteFrame = this.weaponSprite;
        if (this.weapon) this.node.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
    }

    update(deltaTime: number) {
        
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.group == PlayerGlobal.playerNode.getComponent(BoxCollider2D).group) {
            PlayerGlobal.playerNode.getComponent(Player).pickupWeapon(this.weapon)
            console.log('picked up ' + this.weapon);
            }
        }
}


