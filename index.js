const core = require('@actions/core');
const github = require('@actions/github');
const { exec } = require('child_process');

try {
  const projectVersion = core.getInput('project-version');

  new Promise((res, rej) => {
    // docker build
    exec(`make build-container PROJECT_VERSION=${projectVersion}`, (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        rej(error);
      }

      console.log(`stdout: ${stdout}`);

      res(stdout)
    });
  })
    .then(() => {
      // docker push
      exec(`make docker-push PROJECT_VERSION=${projectVersion}`, (error, stdout) => {
        if (error) {
          console.error(`exec error: ${error}`);

          throw error;
        }

        console.log(`stdout: ${stdout}`);

        return stdout;
      });
    })
    .catch(error => {
      core.setFailed(error.message);
    })

} catch (error) {
  core.setFailed(error.message);
}
