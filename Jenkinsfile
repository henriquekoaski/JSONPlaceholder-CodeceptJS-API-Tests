pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Faz o checkout do código do repositório GitHub
                git url: 'https://github.com/henriquekoaski/JSONPlaceholder-CodeceptJS-API-Tests.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Instala as dependências necessárias (supondo que você está usando npm)
                bat 'npm install'
            }
        }

        stage('Run API Tests') {
            steps {
                // Executa os testes de API utilizando CodeceptJS
                bat 'npx codeceptjs run --steps'
            }
        }
    }

    post {
        always {
            // Arquiva os resultados dos testes, se houver (opcional)
            archiveArtifacts artifacts: '**/output/*.xml', allowEmptyArchive: true
            // Publica relatórios de teste (se houver)
            junit '**/output/*.xml'
            // Limpa o workspace
            cleanWs()
        }
    }
}
