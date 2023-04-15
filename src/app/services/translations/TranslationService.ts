// import { ICategoryLogger, LoggerFactory } from "../log";
import { App as HomeyApp } from "homey";
import { singleton } from "tsyringe";

type Homey_ = HomeyApp["homey"]["__"];

@singleton()
export class TranslationService {
    // private logger: ICategoryLogger;
    private homey!: Homey_;

    constructor(
        // @ts-ignore
        // loggerFactory: LoggerFactory
    ) {
        // this.logger = loggerFactory.createLogger("Translation");
    }

    /**
     * Shortcut to {@link ManagerI18n#__}
     *
     * @example
     * this.homey.__('errors.device_unavailable');
     * @example
     * this.homey.__({ en: 'My String', nl: 'Mijn tekst' });
     *
     * @param {string|Object} key translation string or Object
     * @param {Object=} tags values to interpolate into the translation
     * @returns {string}
     */
    public translate(key: string | object, tags?: object | undefined): string {
        return this.homey(key, tags);
    }

    public async init(homey: Homey_) {
        this.homey = homey;
    }
}
