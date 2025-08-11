/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 974:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 858:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 24:
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const core = __nccwpck_require__(974);
const github = __nccwpck_require__(858);
const { readFileSync } = __nccwpck_require__(24);

try {
    core.info("Analyzing results of EvoMaster run")

    const report = JSON.parse(readFileSync('./generated_tests/report.json', 'utf8'));

    const faults = report.faults.totalNumber

    if(faults == 0) {
        core.summary.addHeading('No potential fault was found', '2')
    } else {

        let message;

        if(faults == 1){
            message = 'EvoMaster found 1 potential fault in the tested application'
        } else {
            message ="EvoMaster found " + faults + ' potential faults in the tested application'
        }

        core.summary.addHeading(message, '2')

        const failOnErrors = process.env.FAIL_ON_ERRORS
        if(failOnErrors.toLowerCase() === "true"){
            core.setFailed(message);
        } else if(failOnErrors.toLowerCase() === "false"){
            core.warning(message)
        } else {
            core.setFailed("Invalid 'failOnErrors' value: '" + failOnErrors + "'. Use either 'true' or 'false'");
        }
    }
    core.summary.write()

} catch (error) {
    core.setFailed(error.message);
}
module.exports = __webpack_exports__;
/******/ })()
;