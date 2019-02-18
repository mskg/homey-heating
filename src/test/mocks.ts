// tslint:disable: variable-name

declare module "homey" {
    export class MockCronTask extends CronTask implements IMockEventHandler {
        public _args: any[];

        public date: Date;
        public handBack: any;

        public callEventHandler: (evt: string) => any;

        public _evt: {
            [key: string]: (...args: any[]) => any;
        };
    }

    export interface IMockEventHandler {
        _args: any[];
        callEventHandler: (evt: string) => any;

        _evt: {
            [key: string]: (...args: any[]) => any;
        };
    }

    export namespace ManagerCron {
        export let _tasks: {
            schedule: MockCronTask,
            cleanup: MockCronTask,
        };
    }
}
