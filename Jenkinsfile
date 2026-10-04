pipeline {
    agent any

    environment {
        CONTROL_PLANE_IP = '18.60.217.22'
    }

    stages {

        stage('Pull Latest Code') {
            steps {
                sshagent(['k8s-control-plane-ssh']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@${CONTROL_PLANE_IP} "
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
                        ssh -T -o StrictHostKeyChecking=no ec2-user@${CONTROL_PLANE_IP} "
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
                            ssh -T -o StrictHostKeyChecking=no ec2-user@${CONTROL_PLANE_IP} \
                            "echo '$DOCKER_TOKEN' | docker login --username '$DOCKER_USER' --password-stdin && \
                            docker push devilxz9/devilxz9:movie-recom-${BUILD_NUMBER}"
                        '''
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sshagent(['k8s-control-plane-ssh']) {
                    sh '''
<<<<<<< HEAD
                        ssh -T -o StrictHostKeyChecking=no ec2-user@18.61.119.66 "
=======
                        ssh -T -o StrictHostKeyChecking=no ec2-user@${CONTROL_PLANE_IP} "
>>>>>>> a369ba3 (jenkins changes)
                            kubectl set image deployment/movierecom-deployment \
                            movierecom=devilxz9/devilxz9:movie-recom-${BUILD_NUMBER}
                        "
                    '''
                }
            }
        }

    }
}
