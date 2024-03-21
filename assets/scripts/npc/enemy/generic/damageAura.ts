import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, PhysicsGroup } from 'cc';
import { Player } from '../../../Player/Player';
import { PlayerGlobal } from '../../../PlayerGlobal';
const { ccclass, property } = _decorator;

@ccclass('damageAura')
export class damageAura extends Component {
    
    @property
    dmg: number = 10;
    @property
    isDamageble: number = 1;
    @property
    HP: number = 100;
    private hitbox: BoxCollider2D;
    private player: Player;


    onLoad() {
        this.player = PlayerGlobal.playerNode.getComponent(Player);
        let hitbox = this.node.getComponent(BoxCollider2D);
        this.hitbox = this.node.addComponent(BoxCollider2D);
        this.hitbox.group = 16;
        this.hitbox.sensor = true;
        this.hitbox.size //= hitbox.size;
        this.hitbox.offset //= hitbox.offset;
        if (this.dmg != 0) this.hitbox.on(Contact2DType.BEGIN_CONTACT, this.dealDmg, this);
    }

    dealDmg(selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null)
    {
        if (otherCollider.group != 1)
        this.player.decreaseHealth(this.dmg);
    }

    getDmg(DMG: number)
    {
        this.HP -= DMG * this.isDamageble;
        console.log(this.node.name + " HP: " + this.HP);
    }

    start() {
        
    }

    update(deltaTime: number) {
        
    }
}


