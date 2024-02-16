import { _decorator, Component, DistanceJoint2D, Node, Sprite, RigidBody2D, Prefab, instantiate, Joint2D } from 'cc';
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
        console.log(this.node.components);
        let prevSegment = this.node;
        let segment: any;
        let j: any;
        while (i < this.ropeLength) {
            segment = instantiate(this.segmentPrefab);
            this.node.addChild(segment);
            segment.setPosition(prevSegment.position.x-3, prevSegment.position.y-3);
            prevSegment;
            
            //(DistanceJoint2D);
            j.connectedBody = segment.getComponent(RigidBody2D);
            i++;
            prevSegment.com
            prevSegment = segment;
            
        }
        
    }

    update(deltaTime: number) {
        
    }
}

