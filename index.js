const core = require('@actions/core');
const github = require('@actions/github');
const { readFileSync } = require("node:fs");

try {
    core.info("Analyzing results of EvoMaster run")

    const report = JSON.parse(readFileSync('report.json', 'utf8'));

    const faults = report.faults.total_number

    if(faults == 0) {
        core.summary.addHeading('No potential fault was found', '2')
    } else {
        core.error("TODO error message")

        if(faults == 1){
            core.summary.addHeading('1 potential fault was found', '2')
        } else {
            core.summary.addHeading("" + faults + ' potential faults were found', '2')
        }

        const failOnErrors = core.getBooleanInput("failOnErrors")
        if(failOnErrors){
            core.setFailed("PROBLEMS FIXME");
        }
    }

} catch (error) {
    core.setFailed(error.message);
}