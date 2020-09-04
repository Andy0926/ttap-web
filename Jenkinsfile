pipeline{
    agent{
        label "master"
    }
    stages {
            stage('cloneRepo') {
                steps {
                    bat 'git clone https://github.com/Andy0926/ttap-web.git'
                }
            }

            stage('build') {
                steps {
                    bat 'npm install'
                    bat './scripts/watch'
                }
            }
            stage('test') {
                steps {
                    bat 'CI=true npm test'
                }
            }
            
        }
} 

