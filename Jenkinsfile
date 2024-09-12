pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout do repositório
                git 'https://github.com/henriquekoaski/JSONPlaceholder-CodeceptJS-API-Tests.git'
            }
        }
        
        stage('Run API Tests') {
            steps {
                // Execução dos testes
                bat 'npx codeceptjs run --steps'
            }
        }
        
        stage('Archive Test Results') {
            steps {
                // Arquivamento de artefatos (ajuste conforme o formato dos relatórios)
                archiveArtifacts artifacts: '**/output/results.xml', allowEmptyArchive: true
            }
        }
        
        stage('Publish Test Results') {
            steps {
                // Publicação dos resultados dos testes JUnit
                junit '**/output/results.xml'
            }
        }
    }
    
    post {
        always {
            // Ações pós-execução
            cleanWs()
        }
    }
}
