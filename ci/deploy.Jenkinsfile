pipeline {
  agent any

  parameters {
    string(name: 'TAG', defaultValue: '', description: 'Tag to deploy')
  }

  environment {
    GIT_USER_NAME = 'Jenkins CI'
    GIT_USER_EMAIL = 'jenkins[bot]@noreply.jenkins.io'
  }

  stages {
    stage('Checkout') {
      steps {
        script {
          if (!params.TAG) {
            error "The 'TAG' parameter is mandatory."
          }
        }
        sh """
          git config user.name "${env.GIT_USER_NAME}"
          git config user.email "${env.GIT_USER_EMAIL}"

          git fetch --tags
          git checkout tags/${params.TAG}
        """
      }
    }

    stage('Terraform Init') {
      steps {
        dir('terraform') {
          sh 'terraform init'
        }
      }
    }

    stage('Terraform Plan') {
      steps {
        dir('terraform') {
          sh 'terraform plan'
        }
      }
    }

    stage('Terraform Apply') {
      steps {
        input message: "Deploy tag ${params.TAG}?", ok: 'Apply'
        dir('terraform') {
          sh 'terraform apply -auto-approve'
        }
      }
    }
  }

  post {
    success {
      echo """
        ==========================================
        DEPLOY SUCCESSFUL
        ==========================================
        Tag: ${params.TAG}
        Duration: ${currentBuild.durationString}
        ==========================================
      """
    }
    failure {
      echo """
        ==========================================
        DEPLOY FAILED
        ==========================================
        Tag: ${params.TAG}
        Duration: ${currentBuild.durationString}
        ==========================================
      """
    }
    always {
      echo 'Attempting to clean up workspace...'
      cleanWs()
    }
  }
}
