import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, math, Node, RigidBody, RigidBody2D, Sprite, SpriteFrame, UITransform } from 'cc';
import { door } from '../door';
const { ccclass, property } = _decorator;

@ccclass('roomController')
export class roomController extends Component {
    @property(Node)
    Doors: Node[] = [];

    @property(BoxCollider2D)
    Hitboxes: BoxCollider2D[] = [];

    @property(Node)
    Enemies: Node[] = [];

    @property(SpriteFrame)
    Black = null;

    roomOpen() {
        for (let i = 0; i < this.Doors.length; i++) {
            this.Doors[i].getComponent(door).doorOpen();
        }
    }
    roomClose(otherCollider: Collider2D) {
        console.log(otherCollider.name);
        for (let i = 0; i < this.Hitboxes.length; i++) {
            this.Hitboxes[i].off(Contact2DType.BEGIN_CONTACT);
            this.Hitboxes[i].getComponent(Sprite).enabled = false;
        }
        for (let i = 0; i < this.Doors.length; i++) {
            this.Doors[i].getComponent(door).doorClose();
        }
        let a = [];
        for (let i = 0; i < this.Enemies.length; i++) {

            this.Enemies[i].active = true;
            
            this.Enemies[i].getComponents(Component).forEach((component) => {
                console.log(component);
                component.enabled = false;
                component.enabled = true;
            });
            this.Enemies[i].getComponent(RigidBody2D).enabled = false;
            this.Enemies[i].getComponent(RigidBody2D).enabled = true;
        } 
    }


    start() {
        for (let i = 0; i < this.Enemies.length; i++) this.Enemies[i].active = false;
        for (let i = 0; i < this.Hitboxes.length; i++) {
            this.Hitboxes[i].on(Contact2DType.BEGIN_CONTACT, this.roomClose, this);
            let b = new math.Size(this.Hitboxes[i].getComponent(UITransform).contentSize);
            let a = this.Hitboxes[i].addComponent(Sprite);
            a.type = 2;
            a.spriteFrame = this.Black;
            this.Hitboxes[i].getComponent(UITransform).setContentSize(b);
        } 
 
    }

    update(deltaTime: number) {
        for (let i = 0; i < this.Enemies.length; i++) {
            if (this.Enemies[i].parent == null) {
                console.log("!");
                this.Enemies.splice(i, 1);
            }
        }
        if (this.Enemies.length == 0) this.roomOpen();
        
    }
}


