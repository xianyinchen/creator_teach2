
/**
 * EventTarget 不能完全解耦，如需解耦自己实现异步
 */

let EventMain = null;

function Inst() {
    if (EventMain == null) {
        EventMain = new cc.EventTarget;
    }
    return EventMain;
}

export function hasEventListener(type: string): boolean {
    return Inst().hasEventListener(type);
}

export function on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T {
    return Inst().on(type, callback, target, useCapture);
}

export function off(type: string, callback?: Function, target?: any): void {
    return Inst().off(type, callback, target);
}

export function targetOff(target: any) {
    return Inst().targetOff(target);
}

export function once(type: string, callback: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void, target?: any): void {
    return Inst().once(type, callback);
}

export function emit(type: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): void {
    return Inst().emit(type, arg1, arg2, arg3, arg4, arg5);
}
