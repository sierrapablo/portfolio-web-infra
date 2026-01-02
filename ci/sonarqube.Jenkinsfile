pipeline {
  agent any

  parameters {
    gitParameter(
      name: 'BRANCH_NAME',
      type: 'PT_BRANCH',
      defaultValue: 'develop',
      branchFilter: 'origin/(.*)',
      description: 'Selecciona la rama para ejecutar el escaneo',
      sortMode: 'DESCENDING_SMART',
      selectedValue: 'DEFAULT'
    )
  }

  environment {
    SONAR_PROJECT_KEY = 'sierrapablo-portfolio-web-infra'
  }

  stages {
    stage('Checkout') {
      steps {
        sshagent(credentials: ['github']) {
          script {
            echo "Ejecutando escaneo en la rama: ${params.BRANCH_NAME}"
            sh """
              git config user.name "${env.GIT_USER_NAME}"
              git config user.email "${env.GIT_USER_EMAIL}"

              git fetch --all
              git checkout ${params.BRANCH_NAME}
              git pull
            """
          }
        }
      }
    }

    stage('Detect Version') {
      steps {
        script {
          def rawVersion = sh(script: 'cat VERSION', returnStdout: true).trim()
          if (!rawVersion.matches(/\d+\.\d+\.\d+/)) {
            error "Invalid version format in VERSION file: '${rawVersion}'. Expected 'major.minor.patch'."
          }
          def ver = rawVersion.tokenize('.')

          int major = ver[0].toInteger()
          int minor = ver[1].toInteger()
          int patch = ver[2].toInteger()

          env.VERSION = "${major}.${minor}.${patch}"
          echo "Detected version: ${env.VERSION}"
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('sonarqube') {
          sh """
            ${tool 'sonar-scanner'}/bin/sonar-scanner \
            -X \
            -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
            -Dsonar.projectVersion=${params.BRANCH_NAME}-${env.VERSION} \
            -Dsonar.sources=.
          """
        }
      }
    }
  }

  post {
    success {
      echo """
        ==========================================
        SONARQUBE ANALYSIS SUCCESSFUL
        ==========================================
        Version: ${env.VERSION}
        Duration: ${currentBuild.durationString}
        =========================================="""
    }
    failure {
      echo """
        ==========================================
        SONARQUBE ANALYSIS FAILED
        ==========================================
        Version: ${env.VERSION}
        Duration: ${currentBuild.durationString}
        =========================================="""
    }
    always {
      echo 'Attempting to clean up workspace...'
      cleanWs()
    }
  }
}
