pipeline{
    agent{
        label "master"
    }
    stages {

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

