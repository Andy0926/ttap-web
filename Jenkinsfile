pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('cloneRepo') {
            steps {
                echo "git clone https://github.com/Andy0926/ttap-web.git"
            }
        }

        stage('build') {
            steps {
                echo "npm install"
                echo "./scripts/watch"
            }
        }
        stage('test') {
            steps {
                echo "CI=true npm test"
            }
        }
        
    }
}