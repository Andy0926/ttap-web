pipeline{
    agent{
        label "node"
    }
    stages {
            stage('cloneRepo') {
                steps {
                    node "git clone https://github.com/Andy0926/ttap-web.git"
                }
            }

            stage('build') {
                steps {
                    node "npm install"
                    node "./scripts/watch"
                }
            }
            stage('test') {
                steps {
                    node "CI=true npm test"
                }
            }
            
        }
} 

