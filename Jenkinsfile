pipeline {
    agent any

    stages {

        stage('Pull Latest Code') {
            steps {
                sshagent(['k8s-control-plane-ssh']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@18.61.119.66 "
                            cd ~/Movie-Recom &&
                            git pull origin main
                        "
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sshagent(['k8s-control-plane-ssh']) {
                    sh '''
                        ssh -T -o StrictHostKeyChecking=no ec2-user@18.61.119.66 "
                            cd ~/Movie-Recom &&
                            docker build -t devilxz9/devilxz9:movie-recom-${BUILD_NUMBER} .
                        "
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sshagent(['k8s-control-plane-ssh']) {
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )]) {
                        sh '''
                            ssh -T -o StrictHostKeyChecking=no ec2-user@18.61.119.66 "
                                echo \\$DOCKER_TOKEN | docker login -u \\$DOCKER_USER --password-stdin &&
                                docker push devilxz9/devilxz9:movie-recom-${BUILD_NUMBER}
                            "
                        '''
                    }
                }
            }
        }

    }
}