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
    private badRoomList: any[] = [];

    @property(Number)
    roomCount = 5;
    
    
    

    start() {
        let roomPref: string[] = ['rooms/floor1/room_test_cruk', 'rooms/floor1/room_test_platform_15', 'rooms/floor1/room_test_papka-001' /*'rooms/floor1/room_test_4'*/];
        const shuffled = roomPref.slice().sort(() => 0.5 - Math.random());
        roomPref = ['rooms/floor1/room_test_start'].concat(shuffled.slice(0, this.roomCount));
        console.log(roomPref);
        this.a = roomPref.length;
        while (roomPref.length > 0){
            this.createRoom(roomPref.pop());
        }
       // setTimeout(this.placeRoom, 2000, new Vec3(0, 0));
        
    }

    placeRoom(point: Vec3): number {
        let status: number = 0;
        if (this.roomList.length ==0) return 1
        let r: room = this.roomList.pop();
        
        
        r.Nd.setPosition(point);
        for (let i = 0; i < 2; i += 1) {
            if (!r) return 1
            if (!r.dirList[i]) continue
            console.log(i);
            let tmp = r.dirList[i];
            r.dirList[i] = null;
            status = this.placeRoom(r.Nd.getPosition().add(tmp).subtract(this.roomList[this.roomList.length - 1].dirList[this.reverser[i]]));
            if (status == 1) return 1;
        }
        return 0;
    }

    createRoom(p: string) {
        resources.load(p, Prefab, (err, prefab) => {
            let dirList: Vec3[] = [null, null,null,null];
            const newNode = instantiate(prefab);
            this.node.addChild(newNode);
            //newNode.setPosition(0, 0);
            let a = newNode.getChildByName('Door_left');
            let b = newNode.getChildByName('Door_right');
            let c = newNode.getChildByName('Door_up');
            let d = newNode.getChildByName('Door_down');
            if (a) {
                dirList[0] = (new Vec3(a.position.x * newNode.scale.x, a.position.y * newNode.scale.y));
                //console.log(dirList)
            }
            if (b) {
                dirList[1] = (new Vec3(b.position.x * newNode.scale.x, b.position.y * newNode.scale.y));
            }
            if (c) { 
                dirList[2] = (new Vec3(c.position.x * newNode.scale.x, c.position.y * newNode.scale.y));
            }
            if (d) {
                dirList[3] = (new Vec3(c.position.x * newNode.scale.x, c.position.y * newNode.scale.y));
            }
            
            this.roomList.push(new room(newNode, dirList));
        })

    }

    update(deltaTime: number) {
        if (this.a == this.roomList.length) this.placeRoom(new Vec3(0, 0));
        
    }
}


