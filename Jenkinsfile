pipeline{
    agent{
        label "master"
    }
    stages {

            stage('build') {
                steps {
                    sh 'npm install'
                    sh './scripts/watch'
                }
            }
            stage('test') {
                steps {
                    sh 'CI=true npm test'
                }
            }
            
        }
} 

