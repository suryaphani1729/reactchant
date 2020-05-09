pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building stage'
        sh 'npm install'
      }
    }

    stage('Testing') {
      steps {
        echo 'Testing stage'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploy stage'
        sh 'npm run build'
      }
    }

  }
}