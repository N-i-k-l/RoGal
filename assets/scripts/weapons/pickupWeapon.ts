import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Prefab, resources, RigidBody2D, Script, Sprite, SpriteFrame, Vec2 } from 'cc';
import { glock } from './glock/glock';
import { Player } from '../Player/Player';
import { PlayerGlobal } from '../PlayerGlobal';
import { Sas } from './Sas';
const { ccclass, property } = _decorator;

@ccclass('pickupWeapon')
export class pickupWeapon extends Component {



    @property(SpriteFrame)
    weaponSprite: SpriteFrame = null;

    @property(Script)
    weapon1: any;

    private weapon: any = null;

    start() {

        if (this.weaponSprite) this.node.getComponent(Sprite).spriteFrame = this.weaponSprite;
        setTimeout(() => {
            this.node.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT, (selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null, weapon) => {
                if (otherCollider.node === PlayerGlobal.playerNode) {
                    console.log(weapon)
                    console.log('picked up ' + weapon);
                    this.spawnWeapon();
                    this.node.destroy();
                }
            });
            this.node.getComponent(BoxCollider2D).group = 1
            this.node.getComponent(RigidBody2D).group = 1
            this.node.getComponent(BoxCollider2D).enabled = false;
            this.node.getComponent(BoxCollider2D).enabled = true;
            this.node.getComponent(RigidBody2D).enabled = false;
            this.node.getComponent(RigidBody2D).enabled = true;
        }, 1500);
        this.node.getComponent(RigidBody2D).applyForceToCenter(new Vec2(50 * (1 - Math.random()), 50 * (1-Math.random())), true);
    }

    pickupActivate() {
        
    }

    update(deltaTime: number) {
        
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null, weapon) {
        if (otherCollider.node === PlayerGlobal.playerNode) {
            console.log(weapon)
            PlayerGlobal.playerNode.getComponent(Player).pickupWeapon(weapon)
            console.log('picked up ' + weapon);
            this.node.destroy();
            }
    }

    spawnWeapon() {
        PlayerGlobal.playerNode.getComponent(Player).pickupWeapon(this.node.getComponent(Sas).weapon);
    }



    setWeapon(weaponSprite: SpriteFrame, weapon: any) {
        
        this.weaponSprite = weaponSprite;
        this.weapon = weapon;
        this.node.getComponent(Sprite).spriteFrame = this.weaponSprite;
        console.log(this.weapon);
        this.node.getComponent(Sas).weapon = weapon

    }
}


