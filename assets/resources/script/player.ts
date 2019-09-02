// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class NewClass extends cc.Component {
    @property(cc.Node)
    touch: cc.Node = null;

    @property(cc.Camera)
    camera: cc.Camera = null;

    keymask: boolean[] = [];

    degreeX: number = 0;
    degreeY: number = 0;
    srollZ: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);      

        this.touch.on(cc.Node.EventType.TOUCH_MOVE, function (event:any) {
            var v2 = event.getDelta();
            this.degreeX += v2.y;
            this.degreeY -= v2.x;
            //this.srollZ += event.getScrollY();
            //console.log(this.srollZ)
        }, this);          
    }

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown (event:any) {
        this.keymask[event.keyCode] = true;
    }

    onKeyUp (event) {
        delete this.keymask[event.keyCode];
    }

    onMove () {
        var nowDegree = this.degreeY;
        var find = false;
        this.keymask.forEach(()=>{
            find = true;
        })

        if (!find)
            return;

        if (this.keymask[cc.macro.KEY.w]) {
            nowDegree += 180;
            this.node.eulerAngles = new cc.Vec3(0, this.degreeY, 0);
        }
        else if (this.keymask[cc.macro.KEY.s]) {
            nowDegree += 0;
            this.node.eulerAngles = new cc.Vec3(0, this.degreeY - 180, 0);
        }
        else if (this.keymask[cc.macro.KEY.a]) {
            nowDegree += 270;
            this.node.eulerAngles = new cc.Vec3(0, nowDegree + 180, 0);
        }    
        else if (this.keymask[cc.macro.KEY.d]) {
            nowDegree += 90;
            this.node.eulerAngles = new cc.Vec3(0, nowDegree - 180, 0);
        }    
        
        var mat = new cc.Mat4(
            1, 0, 0 ,0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );

        var quaOut =  new cc.Quat;
        quaOut.fromEuler(new cc.Vec3(0, nowDegree, 0))
        mat.fromQuat(quaOut);   

        var newLocal = new cc.Vec3(); 
        var local = new cc.Vec3(0, 0, 1);
        local.transformMat4(mat, newLocal);
        this.node.z += newLocal.z;
        this.node.x += newLocal.x;        
    }

    update (dt) {
        if (!CC_EDITOR) {
            this.onMove();
        }

        // 角度
        this.camera.node.eulerAngles = new cc.Vec3(this.degreeX, this.degreeY, 0);

        // 节点位置作为原点
        var local = new cc.Vec3(0, 0, 100);
        var newLocal = new cc.Vec3(0, 0, 0);  

        // 镜头远近
        local.mul(1, newLocal)
        local = newLocal.clone();

        var outMat = new cc.Mat4(
            1, 0, 0 ,0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );

        var mat1 = new cc.Mat4(
            1, 0, 0 ,0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
        var quaOut =  new cc.Quat;
        quaOut.fromEuler(new cc.Vec3(this.degreeX, this.degreeY, 0))
        mat1.fromQuat(quaOut);

        // 对方向做旋转变化
        local.transformMat4(mat1, newLocal);
        local = newLocal.clone();

        // 加上节点位置 (50 模型的高度)
        var nodeLocal = new cc.Vec3(this.node.x, this.node.y + 10, this.node.z);
        local.add(nodeLocal, newLocal)
        local = newLocal.clone();

        this.camera.node.setPosition(local);
    }
}
