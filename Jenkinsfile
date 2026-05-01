pipeline {
    agent any

    stages {

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t myapp .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker stop myapp_container || true
                docker rm myapp_container || true
                docker run -d -p 3000:3000 --name myapp_container myapp
                '''
            }
        }
    }
}