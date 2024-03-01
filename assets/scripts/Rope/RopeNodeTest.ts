import { _decorator, Component, DistanceJoint2D, Node, Sprite, RigidBody2D, Prefab, instantiate, Joint2D, director } from 'cc';
import { RigidBody } from '../../../extensions/plugin-import-2x/creator/components/RigidBody';
import { getComponentByType } from '../../../extensions/plugin-import-2x/creator/common/utlis';
const { ccclass, property } = _decorator;

@ccclass('RopeNodeTest')
export class RopeNodeTest extends Component {

    @property(Prefab)
    segmentPrefab: Prefab = null;

    @property
    ropeLength: number = 10;

    start() {
        let i: number = 0;
        let s = director.getScene().getChildByName('Canvas');
        console.log(this.node.components);
        let prevSegment = this.node;//instantiate(this.segmentPrefab);
        //s.addChild(prevSegment);
        //this.node;
        let segment: any;
        let segment1: any;
        //let j: any;
        while (i < this.ropeLength) {
            segment = instantiate(this.segmentPrefab);
            s.addChild(segment);
            segment1 = segment.getChildByName("ropePart");
            segment.setPosition(prevSegment.position.x-3, prevSegment.position.y-3);
            prevSegment.getComponent(DistanceJoint2D).connectedBody = segment.getComponent(RigidBody2D);
            i++;
            prevSegment = segment;
        }
        
    }

    update(deltaTime: number) {
        
    }
}

