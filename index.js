const core = require('@actions/core')
const github = require('@actions/github')
const { exec } = require('child_process');


try {
  const projectVersion = core.getInput('project-version');
  const buildCommand = core.getInput('build-command');
  const pushCommand = core.getInput('push-command');

  // Собираю контеинер
  exec('ls', (error, stdout, stderr) => {
    if (error) {
      core.setFailed(error.message);
    }

    console.log('ls:' + stdout)
  })

  // Собираю контеинер
  exec(`${buildCommand} PROJECT_VERSION=${projectVersion}`, (error, stdout, stderr) => {
    if (error) {
      core.setFailed(error.message);
    }

    console.log(stdout)
  })

  // Пушим контейнер
  exec(`${pushCommand} PROJECT_VERSION=${projectVersion}`, (error, stdout, stderr) => {
    if (error) {
      core.setFailed(error.message)
    }

    console.log(stdout)
  })


  core.setOutput('test', 'testValue')

} catch (error) {
  core.setFailed(error.message)
}
