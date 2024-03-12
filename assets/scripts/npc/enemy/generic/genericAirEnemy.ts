import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, director, IPhysics2DContact, Node, Quat, RigidBody2D, Scene, Sprite, Vec2, Vec3 } from 'cc';
import { Player } from '../../../Player/Player';
const { ccclass, property } = _decorator;

@ccclass('genericAirEnemy')
export class genericAirEnemy extends Component {
    @property(Node)
    player: Node; //= this.node; //= director.getScene().getChildByName("Player");
    @property(Number)
    Speed: number = 0;
    @property(Number)
    DMG: number = 0;

    private direction: number = 0;

    dealDmg(selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        console.log(otherCollider.node.name + " " + this.player.name);
        if (otherCollider.node.name == this.player.name) {
            this.player.getComponent(Player).decreaseHealth(this.DMG);
        }
    }

    start() {
        /*if (this.DMG != 0)*/
        //console.log(this.player);
        //this.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.dealDmg, this);
    }

    update(deltaTime: number) {
        let PWP = new Vec3(this.player.worldPosition);
        let tar: Vec3 = new Vec3(PWP.subtract(this.node.worldPosition));
        let mult: number = this.Speed/ tar.length();
        //console.log(tar+ " " +tar.length()+" "+ mult);
        this.node.getComponent(RigidBody2D).applyForceToCenter(new Vec2(tar.x * mult, tar.y * mult), true);
    }


}