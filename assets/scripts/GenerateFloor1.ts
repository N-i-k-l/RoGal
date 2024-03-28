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
        let roomPref: string[] = ['rooms/room_test_start', 'rooms/room_test_cruk-001', 'rooms/room_test_cruk-002', 'rooms/room_test_cruk',];
        this.a = roomPref.length;
        while (roomPref.length > 0){
            this.createRoom(roomPref.pop());
        }
       // setTimeout(this.asd, 2000, new Vec3(0, 0));
        
    }

    asd(point: Vec3): number {
        let status: number = 0;
        //console.log(this.roomList);
        let r: room = this.roomList.pop();
        if (!r) return 1
        r.Nd.setPosition(point);
        for (let i = 0/*Math.floor(Math.random() * 3)*/; i < 4; i +=  1/*Math.floor(Math.random() * 3)*/) {
            if (!r) return 1
            if (!r.dirList[i]) continue
            console.log(i);
            status = this.asd(r.Nd.getPosition().add(r.dirList[i]).subtract(this.roomList[this.roomList.length - 1].dirList[this.reverser[i]]));
        }
        return 0;
    }

    createRoom(p: string) {
        let a: any;
        let b: any;
        resources.load(p, Prefab, (err, prefab) => {
            let dirList: Vec3[] = [null, null,null,null];
            const newNode = instantiate(prefab);
            this.node.addChild(newNode);
            a = newNode.getChildByName('Door_left');
            b = newNode.getChildByName('Door_right');
            if (a) {
                dirList[0] = (new Vec3(a.position.x + a.width * newNode.scale.x / 2, a.position.y + a.height * newNode.scale.y / 2));
                //console.log(dirList)
            }
            if (b) {
                dirList[1] = (new Vec3(b.position.x + b.width * newNode.scale.x / 2, b.position.y + b.height * newNode.scale.y / 2));
            }

            this.roomList.push(new room(newNode, dirList));
        })

    }

    update(deltaTime: number) {
        if (this.a == this.roomList.length) this.asd(new Vec3(0, 0));
    }
}


