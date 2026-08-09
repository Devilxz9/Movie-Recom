pipeline {
    agent any

    stages {

        stage('Pull Latest Code') {
            steps {
                sshagent(['k8s-control-plane-ssh']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@Y18.61.119.66 "
                            cd ~/Movie-Recom &&
                            git pull origin main
                        "
                    '''
                }
            }
        }

    }
}