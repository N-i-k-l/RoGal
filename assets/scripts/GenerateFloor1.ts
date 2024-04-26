import { _decorator, Component, instantiate, Node, path, Prefab, resources, Vec2, Vec3 } from 'cc';
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
    private helpRoomList: any[] = [];
    private blockers: [Vec3, number][] = [];

    @property(Number)
    roomCount = 8;
    
    @property(Prefab)
    pathBlocker: Prefab = null;


    start() {
        let helpPref: string[] = ['rooms/floor1/help/room_test_platforma_6_+', 'rooms/help/floor1/room_test_platform_13_+', 'rooms/help/floor1/room_test_platform_3_+', 'rooms/floor1/help/room_test_platform_9_+'];
        let roomPref: string[] = ['rooms/floor1/room_platforma_16_+', 'rooms/floor1/room_test_4', 'rooms/floor1/room_test_cruk-004_+', 'rooms/floor1/room_test_cruk', 'rooms/floor1/room_test_plantform_11_+', 'rooms/floor1/room_test_platform_+', 'rooms/floor1/room_test_platform_10_+', 'rooms/floor1/room_test_platform_14_+', 'rooms/floor1/room_test_platform_15', 'rooms/floor1/room_test_platform_2_+', 'rooms/floor1/room_test_platform_4_+', 'rooms/floor1/room_test_platform_5_+', 'rooms/floor1/room_test_platform_7_+', 'rooms/floor1/room_test_platform_8_+'];
        const shuffled = roomPref.slice().sort(() => 0.5 - Math.random());
        roomPref = shuffled.slice(0, this.roomCount).concat(['rooms/floor1/room_test_start']);
        const helpShuffled = helpPref.slice().sort(() => 0.5 - Math.random());
        helpPref = shuffled.slice(0, this.roomCount/2);
        console.log(roomPref.length);
        this.a = roomPref.length;

        while (helpPref.length > 0) {
            this.createRoom(helpPref.pop(), true);
        }

        while (roomPref.length > 0){
            this.createRoom(roomPref.pop(), false);
        }
        
       // setTimeout(this.placeRoom, 2000, new Vec3(0, 0));
        
    }

    /*placeRoom(point: Vec3, door: number, stop: number): number { Реликвия из более цивилизованных времён
        let status: number = 0;
        if (this.roomList.length ==0) return 1
        let r: room = this.roomList.pop();
        //if ()
        r.Nd.active = true;
        
        for (let j = 0; i < ) {
            for (let i = 0; i < 3; i += 1) {
                if (!r) return 1
                if (!r.dirList[i]) continue
                if (i == stop) continue
                console.log(i);
                let tmp = r.dirList[i];
                r.dirList[i] = null;
                status = this.placeRoom(r.Nd.getPosition().add(tmp).subtract(this.roomList[this.roomList.length - 1].dirList[this.reverser[i]]), i, this.reverser[i]);
                if (status == 1) return 1;
            }
        }
        return 0;
    }*/

    placeRoom(point: Vec3): number {
        let status: number = 0;
        if (this.roomList.length == 0) {

            return 1;
        }
        
        let r: room = this.roomList.pop();
        r.Nd.active = true;
        r.Nd.setPosition(point);
        console.log(this.roomList[this.roomList.length - 1]);
        
        if (r.dirList[1] && this.roomList.length > 0) status = this.placeRoom(r.Nd.getPosition().add(r.dirList[1]).subtract(this.roomList[this.roomList.length - 1].dirList[0]));
        else (console.log("SSSSSS"));
        if (this.helpRoomList.length > 0) {
            if (r.dirList[2]) this.placeHelpRoom(r.Nd.getPosition().add(r.dirList[2]).subtract(this.helpRoomList[this.helpRoomList.length - 1].dirList[3]), 3);
            if (this.helpRoomList.length == 0 && r.dirList[3]) this.blockers.push([r.dirList[3], 3]);
            else if (r.dirList[3]) this.placeHelpRoom(r.Nd.getPosition().add(r.dirList[3]).subtract(this.helpRoomList[this.helpRoomList.length - 1].dirList[2]), 2);
        }
        else {
            if (r.dirList[2]) this.blockers.push([r.dirList[2], 2]);
            if (r.dirList[2]) this.blockers.push([r.dirList[3], 3]);
        }
        return 0;
    }

    placeHelpRoom(point: Vec3, entrance: number) {
        let r: room = this.helpRoomList.pop();
        r.Nd.setPosition(point);
        for (let i = 0; i < 3; i++) {
            if (i != entrance) this.blockers.push([r.dirList[i],i]);
        }
    }

    cleaning() {
        for (let i in this.blockers) {
            console.log(i);
        }
    }

    createRoom(p: string, isHelp: boolean) {
        resources.load(p, Prefab, (err, prefab) => {
            let dirList: Vec3[] = [null, null,null,null];
            const newNode = instantiate(prefab);
            console.log(prefab.name);
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
            newNode.active = false;
            if (isHelp) this.helpRoomList.push(new room(newNode, dirList));
            else this.roomList.push(new room(newNode, dirList)); 
        })

    }

    update(deltaTime: number) {
        if (this.a == this.roomList.length) {
            this.placeRoom(new Vec3(0, 0));
            console.log(this.roomList);
            this.cleaning();
        };
        
    }
}


