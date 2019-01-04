import {
    registerBridgeListener,
    unRegisterBridgeListener,
    initBridgeConnection,
    destroyBridgeConnection,
    isBridgeActive
} from "../bridgeService";
import { parseEcoEntities } from "./adapter";
import { sourceDateStringToTime } from "./utils";

const handlers = {};

function ecoMessageHandler(message) {
    try {
        console.log('message', message)
        const key = Object.keys(handlers)[0];
        const fn = handlers[key];
        if (typeof fn === "function") {
            const map = ecoMessageToInsertMap(message);
            const array = ecoMessageToDeleteArray(message);
            fn(map, array);
        }
    } catch (err) {}
}

// TODO finish process
let hasHandler = !!0;

function registerSourceHandler() {
    if (hasHandler) return;
    if (!isBridgeActive('ed-channel')) {
        initBridgeConnection('ed-channel');
    }

    registerBridgeListener({
        ns: "ed-channel",
        key: "ed-channel",
        handler: ecoMessageHandler
    });

    hasHandler = !!1;
}

export function registerEcoMessageHandler(handler) {
    const key = "" + Math.random() + Math.random() + Math.random();
    handlers[key] = handler;
    registerSourceHandler();
    return function unRegisterEcoMessageHandler() {
        delete handlers[key];
    };
}

function ecoMessageToInsertMap(message) {
    try {
        const obj = JSON.parse(message);
        const oldList = obj.old || [];
        const newList = obj.new || [];
        const data = [...oldList, ...newList].map(entity => {
            const key = Object.keys(entity)[0];
            const ecoObj = entity[key];
            return {
                ...ecoObj,
                startTimeInUTCMS: sourceDateStringToTime(ecoObj.StartDateTime),
                EventId: key
            };
        });
        const { economicCalendar } = parseEcoEntities(data);
        return economicCalendar;
    } catch (err) {}
}

function ecoMessageToDeleteArray(message) {
    try {
        const obj = JSON.parse(message);
        const delMap = obj.del;
        const result = [];

        if (delMap) {
            Object.keys(delMap).forEach(key => result.push(delMap[key]));
        }
        return result;
    } catch (err) {}
}
