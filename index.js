const core = require('@actions/core')
const github = require('@actions/github')
const { exec } = require('child_process');


try {
  const projectVersion = core.getInput('project-version');
  const buildCommand = core.getInput('build-command');
  const pushCommand = core.getInput('push-command');

  // Собираю контеинер
  exec(`${buildCommand} PROJECT_VERSION=${projectVersion}`, (error, stdout, stderr) => {
    if (error) {
      console.log(error)
      return;
    }

    console.log(stdout)
  })

  // Пушим контейнер
  exec(`${pushCommand} PROJECT_VERSION=${projectVersion}`, (error, stdout, stderr) => {
    if (error) {
      console.log(error)
      return;
    }

    console.log(stdout)
  })

} catch (error) {
  core.setFailed(error.message)
}
