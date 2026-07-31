pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Show Project Structure') {
            steps {
                sh 'echo "Current Directory:"'
                sh 'pwd'
                sh 'echo "Project Files:"'
                sh 'ls -la'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Successful') {
            steps {
                echo '🎉 Quadra Home Tuitions Pipeline Executed Successfully!'
            }
        }
    }
}