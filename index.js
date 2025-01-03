const core = require('@actions/core');
const github = require('@actions/github');
const { readFileSync } = require("node:fs");

try {
    core.info("Analyzing results of EvoMaster run")

    const report = JSON.parse(readFileSync('./generated_tests/report.json', 'utf8'));

    const faults = report.faults.total_number

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