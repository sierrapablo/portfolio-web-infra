pipeline {
  agent any

  environment {
    GIT_USER_NAME = 'Jenkins CI'
    GIT_USER_EMAIL = 'jenkins[bot]@noreply.jenkins.io'
  }

  stages {
    stage('Checkout') {
      steps {
        sh """
          git config user.name "${env.GIT_USER_NAME}"
          git config user.email "${env.GIT_USER_EMAIL}"

          git checkout develop
          git pull origin develop
        """
      }
    }

    stage('Terraform Format') {
      steps {
        dir('terraform') {
          sh 'terraform fmt'
        }
      }
    }

    stage('Terraform Validate') {
      steps {
        dir('terraform') {
          sh 'terraform validate'
        }
      }
    }

    stage('Git Commit') {
      steps {
        sshagent(credentials: ['github']) {
          sh '''
            if ! git diff --quiet; then
              git add .
              git commit -m "chore: terraform format and validate"
              git push origin develop
            else
              echo "No changes detected. Skipping commit."
            fi
          '''
        }
      }
    }
  }

  post {
    success {
      echo """
        ==========================================
        TERRAFORM FORMAT AND VALIDATE SUCCESSFUL
        ==========================================
        Duration: ${currentBuild.durationString}
        ==========================================
      """
    }
    failure {
      echo """
        ==========================================
        TERRAFORM FORMAT AND VALIDATE FAILED
        ==========================================
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
