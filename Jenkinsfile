//"Jenkins Pipeline is a suite of plugins which supports implementing and integrating continuous delivery pipelines into Jenkins. Pipeline provides an extensible set of tools for modeling delivery pipelines "as code" via the Pipeline DSL."
//More information can be found on the Jenkins Documentation page https://jenkins.io/doc/

@Library('github.com/connexta/cx-pipeline-library@master') _
@Library('github.com/connexta/github-utils-shared-library@master') __

pipeline {
    agent {
        node {
            label 'linux-small'
            customWorkspace "/jenkins/workspace/${JOB_NAME}/${BUILD_NUMBER}"
        }
    }
    options {
        buildDiscarder(logRotator(numToKeepStr:'25'))
        disableConcurrentBuilds()
        timestamps()
    }
    stages {
        stage('Setup') {
            steps {
                slackSend color: 'good', message: "STARTED: ${JOB_NAME} ${BUILD_NUMBER} ${BUILD_URL}"
                sh 'npm i -g @antora/cli@2.2 @antora/site-generator-default@2.2'
                sh 'npm i -g antora-lunr'
                sh 'npm i -g antora-site-generator-lunr'
            }
        }

        stage('Generate Site') {
            steps {
                sh 'DOCSEARCH_ENABLED=true DOCSEARCH_ENGINE=lunr antora site-playbook.yml --generator antora-site-generator-lunr'
            }
        }
    }


    post {
        always{
            postCommentIfPR("Build ${currentBuild.currentResult} See the job results in [legacy Jenkins UI](${BUILD_URL}) or in [Blue Ocean UI](${BUILD_URL}display/redirect).", "${GITHUB_USERNAME}", "${GITHUB_REPONAME}", "${GITHUB_TOKEN}")
        }
        success {
            slackSend color: 'good', message: "SUCCESS: ${JOB_NAME} ${BUILD_NUMBER}"
            archiveArtifacts artifacts: './build/site/**/*.*'
        }
        failure {
            slackSend color: '#ea0017', message: "FAILURE: ${JOB_NAME} ${BUILD_NUMBER}. See the results here: ${BUILD_URL}"
        }
        unstable {
            slackSend color: '#ffb600', message: "UNSTABLE: ${JOB_NAME} ${BUILD_NUMBER}. See the results here: ${BUILD_URL}"
        }
        cleanup {
            echo '...Cleaning up workspace'
            cleanWs()
            wrap([$class: 'MesosSingleUseSlave']) {
                sh 'echo "...Shutting down Jenkins slave: `hostname`"'
            }
        }
    }
}
