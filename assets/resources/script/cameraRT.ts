// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export default class GCCameraRT extends cc.Component {

    @property(cc.Camera)
    cam3D: cc.Camera = null;

    @property(cc.Node)
    world3D: cc.Node = null;    // 用于放置3D节点

    @property(cc.Sprite)
    view3D: cc.Sprite = null;   // 用于显示

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (!this.cam3D)
            return;        

        let texture = new cc.RenderTexture();
        texture.initWithSize(cc.view.getFrameSize().width, cc.view.getFrameSize().height, cc.gfx.RB_FMT_D24S8);

        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture)

        // 绑定纹理到Sprite
        this.view3D.spriteFrame = spriteFrame;

        // camera会自动渲染, 这里绑定纹理
        this.cam3D.targetTexture = texture;
    }

    start() {

    }

    update(dt) {
        if (CC_EDITOR && this.cam3D) {
            this.cam3D.render(this.world3D);
        }
    }
}
