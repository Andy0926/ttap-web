pipeline{
    agent{
        label "master"
    }
    stages {

            stage('build') {
                steps {
                    bat 'npm install'
                    bat 'start cmd.exe /c C:\\Users\\tanan\\.jenkins\\workspace\\TTAP-Multibranch_master\\scripts\\watch'
                    dir('scripts'){
                        node 'watch'
                    }
                }
            }
            stage('test') {
                steps {
                    bat 'CI=true npm test'
                }
            }
            
        }
} 

