pipeline {
    agent any
    stages {
        stage('cloneRepo') {
            steps {
                echo "git clone https://github.com/Andy0926/ttap-web.git"
            }
        }

        stage('build') {
            steps {
                "npm install"
                "./scripts/watch"
            }
        }
        stage('test') {
            steps {
                "CI=true npm test"
            }
        }
        
    }
}