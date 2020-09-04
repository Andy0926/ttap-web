pipeline{
    agent{
        label "master"
    }
    stages {

            stage('build') {
                steps {
                    node 'npm install'
                    dir('scripts'){
                        node 'watch'
                    }
                }
            }
            stage('test') {
                steps {
                    node 'CI=true npm test'
                }
            }
            
        }
} 

