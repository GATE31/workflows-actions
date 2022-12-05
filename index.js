const core = require('@actions/core');
const github = require('@actions/github');
const { exec } = require('child_process');

try {
  // docker-build
  // docker-push
  // update-work-version

  const projectVersion = core.getInput('project-version');

  const buildPromise = new Promise((res, rej) => {
    // docker build
    exec(`make build-container PROJECT_VERSION=${projectVersion}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        rej(error);
      }

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);

      res(stdout)
    });
  })

  buildPromise
    .then(() => {
      exec('docker ps -a', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
    })
    .then(() => {
      console.log(`projectVersion: ${projectVersion}`);
      core.setOutput("time", projectVersion);
    })


  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
