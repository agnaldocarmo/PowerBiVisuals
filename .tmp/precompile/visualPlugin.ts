import { Visual } from "../../src/visual";
var powerbiKey = "powerbi";
var powerbi = window[powerbiKey];

var circleCardFC47BF1AEE504E8982FB61432192790A_DEBUG = {
    name: 'circleCardFC47BF1AEE504E8982FB61432192790A_DEBUG',
    displayName: 'WhiteCube new visual',
    class: 'Visual',
    version: '1.0.0',
    apiVersion: '2.6.0',
    create: (options) => {
        if (Visual) {
            return new Visual(options);
        }

        console.error('Visual instance not found');
    },
    custom: true
};

if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["circleCardFC47BF1AEE504E8982FB61432192790A_DEBUG"] = circleCardFC47BF1AEE504E8982FB61432192790A_DEBUG;
}

export default circleCardFC47BF1AEE504E8982FB61432192790A_DEBUG;