pipeline {
    agent any

    stages {
        stage('Test Kubernetes Connection') {
            steps {
                sshagent(['k8s-control-plane-ssh']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@16.112.118.126  "kubectl get pods -A"
                    '''
                }
            }
        }
    }
}