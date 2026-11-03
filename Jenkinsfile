pipeline {
    agent any

    environment {
        CONTROL_PLANE_IP = '18.61.237.246'
    }

    stages {
        stage('Pull Latest Code') {
            steps {
                sh 'git pull origin main'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t devilxz9/devilxz9:movie-recom-${BUILD_NUMBER} .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_TOKEN'
                )]) {
                    sh '''
                        echo "$DOCKER_TOKEN" | docker login --username "$DOCKER_USER" --password-stdin
                        docker push devilxz9/devilxz9:movie-recom-${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sshagent(['k8s-control-plane-ssh']) {
                    sh '''
                    ssh -T -o StrictHostKeyChecking=no ec2-user@${CONTROL_PLANE_IP} "
                    kubectl set image deployment/movierecom-deployment \
                    movierecom=devilxz9/devilxz9:movie-recom-${BUILD_NUMBER}
                    "
                '''
                }
            }
        }
    }
}
