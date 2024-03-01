import { _decorator, Component, director, DistanceJoint2D, error, instantiate, Node, Prefab, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RopeNodeScript2')
export class RopeNodeScript2 extends Component {
    @property(Prefab)
    segmentPrefab:Prefab = null;

    @property
    ropeLength: number = 10;

    start() {
        let prevSegment = this.node;
        let sc = director.getScene().getChildByName("Canvas");

        for (let i = 0; i < this.ropeLength; i++) {
            let segment = instantiate(this.segmentPrefab);
            sc.addChild(segment);
            segment.setPosition(prevSegment.position.x - 3, prevSegment.position.y - 3);

            let distanceJoint = segment.getComponent(DistanceJoint2D);
            
            if (distanceJoint) {
                distanceJoint.connectedBody = prevSegment.getComponent(RigidBody2D);
                distanceJoint.enabled = false; //Удаление этой строки ломает всю физику
                distanceJoint.enabled = true;
            } else {
                error("DistanceJoint component not found on segment prefab.");
            }

            prevSegment = segment;
        }
    }

    update(deltaTime: number) {
        
    }
}

