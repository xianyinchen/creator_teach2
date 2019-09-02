


const { ccclass, property } = cc._decorator;

@ccclass
export default class G2Main extends cc.Component {
    @property(cc.Label)
    prompt: cc.Label = null;

    private prompDelay: number = 0

    onLoad() {
        // 多语言
        //i18n.init("zh");

        // 屏屏信息
        cc.debug.setDisplayStats(false)

        // 第一次自适应
        this.onResize();

        // 自适应大小
        cc.view.setResizeCallback(() => {
            this.onResize();
        });
    }

    onResize() {
        // 简单的适配
        let canvas = cc.find("Canvas").getComponent(cc.Canvas);

        let screen_node = cc.find("WorldUI");
        let win_size = cc.view.getFrameSize();

        let isWidthDesign = (canvas.designResolution.width > canvas.designResolution.height);
        if (isWidthDesign) {
            // 宽适配
            screen_node.setContentSize(
                screen_node.width,
                screen_node.width * (win_size.height / win_size.width)
            );
        }
        else {
            // 高适配
            screen_node.setContentSize(
                screen_node.height * (win_size.width / win_size.height),
                screen_node.height
            );
        }
    }

    start() {
        // 加载主界面
        let screen_node = cc.find("WorldUI");
        console.log(screen_node.width, screen_node.height);

        // 大小适配
        screen_node.children.forEach((node: cc.Node) => {
            node.children.forEach((sub: cc.Node) => {
                var subWidget: cc.Widget = sub.getComponent<cc.Widget>(cc.Widget);
                //if (subWidget) subWidget.updateAlignment();
            })
        })

        // 

        // cc.loader.loadRes("loading", cc.Prefab, (err,res:cc.Prefab)=>{
        //     var node = cc.instantiate(res);
        //     screen_node.addChild(node);
        //     screen_node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(()=>{
        //         node.destroy();
        //         cc.loader.releaseAsset(res);
        //     })))
        // })
    }

    update(dt) {
        if (this.prompDelay > 0)
            this.prompDelay = this.prompDelay - dt;
    }
}
