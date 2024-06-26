import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, PhysicsGroup, Label } from 'cc';
import { Player } from '../../../Player/Player';
import { PlayerGlobal } from '../../../PlayerGlobal';
const { ccclass, property } = _decorator;

@ccclass('damageAura')
export class damageAura extends Component {
    
    @property
    dmg: number = 0;
    @property
    isDamageble: number = 1;
    @property(Label)
    HPLabel: Label = null;
    @property
    HP: number = 100;
    private hitbox: BoxCollider2D;
    private player: Player;

    private isDestroyed: boolean = false;
    lateUpdate() {
        if (this.isDestroyed) this.node.destroy();
    }
    onLoad() {
        this.player = PlayerGlobal.playerNode.getComponent(Player);
        let hitbox = this.node.getComponent(BoxCollider2D);
        this.hitbox = this.node.addComponent(BoxCollider2D);
        this.hitbox.group = 16;
        this.hitbox.sensor = true;
        this.hitbox.size = hitbox.size;
        this.hitbox.offset = hitbox.offset;
        
    }

    dealDmg(selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null)
    {
        if (otherCollider.group == this.player.getComponent(BoxCollider2D).group) {
            console.log("S");
            this.player.decreaseHealth(this.dmg);
            this.updateHealthLabel();
        }
    }

    updateHealthLabel() {
        if (this.HPLabel) {
            this.HPLabel.string = `HP: ${this.HP}`;
        }
    }

    getDmg(DMG: number)
    {
        this.HP -= DMG * this.isDamageble;
        console.log(this.node.name + " HP: " + this.HP);
        if (this.HP <=0)  this.die();
    }

    die() {
        this.isDestroyed = true;
    }

    start() {
        if (this.dmg != 0) this.hitbox.on(Contact2DType.BEGIN_CONTACT, this.dealDmg, this);
    }

    update(deltaTime: number) {
        
    }
}


