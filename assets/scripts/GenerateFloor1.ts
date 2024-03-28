import { _decorator, Component, instantiate, Node, Prefab, resources, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

class room {
    Nd: Node;
    dirList: Vec3[];
    constructor(Nd: Node, dirList: Vec3[]) {
        this.dirList = dirList;
        this.Nd = Nd;
    }
}

@ccclass('GenerateFloor1')

export class GenerateFloor1 extends Component {
    private roomList:any[] = [];
    private reverser = [1, 0, 3, 2];
    private a;
    
    

    start() {
        let roomPref: string[] = ['rooms/room_test_start', 'rooms/room_test_cruk','rooms/room_test_platform_15'];
        this.a = roomPref.length;
        while (roomPref.length > 0){
            this.createRoom(roomPref.pop());
        }
       // setTimeout(this.asd, 2000, new Vec3(0, 0));
        
    }

    asd(point: Vec3): number {
        let status: number = 0;
        //console.log(this.roomList);
        if (this.roomList.length ==0) return 1
        let r: room = this.roomList.pop();
        console.log(r);
        
        r.Nd.setPosition(point);
        for (let i = 0/*Math.floor(Math.random() * 3)*/; i < 4; i +=  1/*Math.floor(Math.random() * 3)*/) {
            if (!r) return 1
            if (!r.dirList[i]) continue
            console.log(i);
            status = this.asd(r.Nd.getPosition().add(r.dirList[i]).subtract(this.roomList[this.roomList.length - 1].dirList[this.reverser[i]]));
            if (status == 1) break;
        }
        return 0;
    }

    createRoom(p: string) {
        resources.load(p, Prefab, (err, prefab) => {
            let dirList: Vec3[] = [null, null,null,null];
            const newNode = instantiate(prefab);
            this.node.addChild(newNode);
            let a = newNode.getChildByName('Door_left');
            let b = newNode.getChildByName('Door_right');
            if (a) {
                dirList[0] = (new Vec3(a.position.x * newNode.scale.x, a.position.y * newNode.scale.y));
                //console.log(dirList)
            }
            if (b) {
                dirList[1] = (new Vec3(b.position.x * newNode.scale.x, b.position.y * newNode.scale.y));
            }

            this.roomList.push(new room(newNode, dirList));
        })

    }

    update(deltaTime: number) {
        if (this.a == this.roomList.length) this.asd(new Vec3(0, 0));
    }
}


