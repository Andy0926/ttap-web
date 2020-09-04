pipeline{
    agent{
        label "master"
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

