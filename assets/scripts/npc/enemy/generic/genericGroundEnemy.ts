import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, director, IPhysics2DContact, Node, Quat, RigidBody2D, Scene, Label, Sprite, Vec2, Vec3 } from 'cc';
import { Player } from '../../../Player/Player';
import { PlayerGlobal } from '../../../PlayerGlobal';
const { ccclass, property } = _decorator;

@ccclass('genericGroundEnemy')
export class genericGroundEnemy extends Component {
    
    @property(Number)
    XSpeed: number = 0; 
    @property(Number)
    DMG: number = 0; 


    @property(Label)
    HPLabel: Label = null;
    public HP: number = 100;


    private direction: number = 0;
    private startScale: number;

    dealDmg(selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        //console.log(otherCollider.node.name + " " + PlayerGlobal.playerNode.name);
        if (otherCollider.node.name == PlayerGlobal.playerNode.name) {
            PlayerGlobal.playerNode.getComponent(Player).decreaseHealth(this.DMG);
        }
    }

    start() {
        /*if (this.DMG != 0)*/
        //console.log(PlayerGlobal.playerNode);
        this.startScale = this.node.scale.x;
        this.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.dealDmg, this);
        this.updateHealthLabel()
    }

    update(deltaTime: number) {
        //if (this.node.worldPosition.y < PlayerGlobal.playerNode.worldPosition.y) return
        this.node.getComponent(RigidBody2D).applyForceToCenter(new Vec2(this.XSpeed * this.direction, 0), true);
        if (!PlayerGlobal.playerNode) {
            console.log("S");
            return;
            
        }
        if (this.node.worldPosition.x > PlayerGlobal.playerNode.worldPosition.x && this.direction!=-1) {
            this.direction = -1;
            this.node.setScale(new Vec3(this.startScale*1, this.node.scale.y));
        }
        if (this.node.worldPosition.x < PlayerGlobal.playerNode.worldPosition.x && this.direction != 1) {
            this.direction = 1;
            this.node.setScale(new Vec3(this.startScale*-1, this.node.scale.y));
        }
    }

    decreaseHealth(amount: number) {
        this.HP -= amount;
        if (this.HP < 0) {
            this.HP = 0;
        }
        console.log(amount);
        this.updateHealthLabel();
    }

    increaseHealth(amount: number) {
        this.HP += amount;
        if (this.HP > 100) {
            this.HP = 100;
        }
        this.updateHealthLabel();
    }
    updateHealthLabel() {
        if (this.HPLabel) {
            this.HPLabel.string = `HP: ${this.HP}`;
        }
    }
    
}


