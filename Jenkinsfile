pipeline{
    agent{
        label "master"
    }
    stages {

            stage('build') {
                steps {
                    bat 'npm install'
                    bat 'cd \TTAP-Multibranch_master\scripts'
                    bat 'watch'
                }
            }
            stage('test') {
                steps {
                    cd '..'
                    bat 'CI=true npm test'
                }
            }
            
        }
} 

