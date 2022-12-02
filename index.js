// const core = require('@actions/core');
// const github = require('@actions/github');
// const { exec } = require('child_process');
//
//
// try {
//   const projectVersion = core.getInput('project-version');
//   const buildCommand = core.getInput('build-command');
//   const pushCommand = core.getInput('push-command');
//
//   // Собираю контеинер
//   exec('ls', (error, stdout, stderr) => {
//     if (error) {
//       core.setFailed(error.message);
//     }
//
//     console.log('ls:' + stdout)
//   })
//
//   // Собираю контеинер
//   exec(`${buildCommand} PROJECT_VERSION=${projectVersion}`, (error, stdout, stderr) => {
//     if (error) {
//       core.setFailed(error.message);
//     }
//
//     console.log(stdout)
//   })
//
//   // Пушим контейнер
//   exec(`${pushCommand} PROJECT_VERSION=${projectVersion}`, (error, stdout, stderr) => {
//     if (error) {
//       core.setFailed(error.message)
//     }
//
//     console.log(stdout)
//   })
//
//
//   core.setOutput('test', 'testValue')
//
// } catch (error) {
//   core.setFailed(error.message)
// }


const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
