interface PromiseFunc {
    (resolve: Function, reject: Function): void;
}

declare class Promise {
    constructor(func: PromiseFunc);

    then(resolve: (...args: any[]) => any): Promise;
    then(resolve: (...args: any[]) => any, reject: (...args: any[]) => any): Promise;
    catch(resolve: (...args: any[]) => any): Promise;

    static resolve(...args: any[]): Promise;
    static reject(...args: any[]): Promise;
}