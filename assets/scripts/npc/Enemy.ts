import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, macro, Vec2, RigidBody2D, Collider2D, BoxCollider2D, Contact2DType, IPhysics2DContact, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    @property(Label)
    HPLabel: Label = null;
    public HP: number = 100;

    private collider: any;
    private rigidbody: any;


    start() {

    }

    update(deltaTime: number) {
        
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
    onBeginContact(selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name === 'Sword') {
            console.log('aaargh');
            this.decreaseHealth(20)
            console.log(`Enemy HP: ${this.HP}`);
            if (this.HPLabel) {
                this.HPLabel.string = `HP: ${this.HP}`;
            }
        }
        if (otherCollider.node.name === 'Player') {
            console.log('ouch');
            this.decreaseHealth(20)
            console.log(`Player HP: ${this.HP}`);
            if (this.HPLabel) {
                this.HPLabel.string = `HP: ${this.HP}`;
            }
        }


    }

}


