import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Prefab, resources, Script, Sprite, SpriteFrame } from 'cc';
import { PlayerGlobal } from '../../PlayerGlobal';
import { Player } from '../../Player/Player';
import { glock } from './glock';
const { ccclass, property } = _decorator;

@ccclass('pickupWeapon')
export class pickupWeapon extends Component {



    @property(SpriteFrame)
    weaponSprite: SpriteFrame = null;

    @property(Script)
    weapon1: any;

    private weapon: any = null;

    start() {
        
        this.weapon = this.weapon1;
        if (this.weaponSprite) this.node.getComponent(Sprite).spriteFrame = this.weaponSprite;
        this.node.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
    }

    update(deltaTime: number) {
        
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node === PlayerGlobal.playerNode) {
            console.log(this.weapon)
            PlayerGlobal.playerNode.getComponent(Player).pickupWeapon(glock)
            console.log('picked up ' + this.weapon);
            
            this.node.destroy();
            }
    }
    setWeapon(weaponSprite: SpriteFrame, weapon: any) {
        this.weaponSprite = weaponSprite;
        this.weapon = weapon;
        this.node.getComponent(Sprite).spriteFrame = this.weaponSprite;


    }
}


