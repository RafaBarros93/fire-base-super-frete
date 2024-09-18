<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Firebase Functions with Firestore - SOLID Architecture</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }
        h1, h2, h3 {
            color: #333;
        }
        pre {
            background-color: #f4f4f4;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            overflow-x: auto;
        }
        code {
            color: #d63384;
        }
    </style>
</head>
<body>

    <h1>Firebase Functions with Firestore - SOLID Architecture</h1>

    <p>Este projeto é uma aplicação de exemplo utilizando <strong>Firebase Functions</strong> e <strong>Firestore</strong>, seguindo os princípios de design <strong>SOLID</strong> com <strong>TypeScript</strong>. O sistema implementa um serviço de criação de registros, onde cada registro possui um <code>increment_id</code> sequencial. O ID é gerado automaticamente após a criação de um novo registro na coleção do Firestore.</p>

    <h2>Arquitetura</h2>

    <h3>Design SOLID</h3>
    <p>A arquitetura do projeto foi projetada com base nos princípios <strong>SOLID</strong> para garantir modularidade, facilidade de manutenção e escalabilidade. Aqui estão os princípios aplicados:</p>

    <ul>
        <li><strong>Single Responsibility Principle (SRP)</strong>: Cada classe ou módulo tem uma única responsabilidade. A lógica de criação de registros, interação com o Firestore e geração de IDs está bem separada em diferentes classes e módulos.</li>
        <li><strong>Open/Closed Principle (OCP)</strong>: O sistema está aberto para extensão, mas fechado para modificação. Por exemplo, o mecanismo de geração de IDs pode ser alterado ou substituído sem precisar modificar a lógica principal de criação de registros.</li>
        <li><strong>Liskov Substitution Principle (LSP)</strong>: Implementações podem ser substituídas pelas suas interfaces sem quebrar o sistema. A interface <code>IRecordRepository</code> pode ter múltiplas implementações sem alterar o comportamento do sistema.</li>
        <li><strong>Interface Segregation Principle (ISP)</strong>: As interfaces foram segregadas de forma que os módulos e classes dependam apenas de métodos que realmente utilizam.</li>
        <li><strong>Dependency Inversion Principle (DIP)</strong>: O controlador depende de abstrações (interfaces), e não de implementações concretas. Isso facilita a injeção de dependências e a escrita de testes.</li>
    </ul>

    <h3>Estrutura do Projeto</h3>
    <pre><code>/functions

├── src
├── index.ts # Funções principais do Firebase
├── models
└── record.ts # Definição da estrutura de um registro
├── services
├── firestore-service.ts # Serviço para interagir com o Firestore
└── record-repository.ts # Repositório para criação de registros
├── utils
└── id-generator.ts # Geração do ID incremental
├── controllers
└── record-controller.ts # Controle da criação de registros
├── tests
└── test.ts # Testes automatizados
├── tsconfig.json
├── package.json
├── README.md # Mini documentação
</code></pre>

    <h3>Explicação dos Componentes</h3>
    <ul>
        <li><code>models/record.ts</code>: Define a estrutura de um registro com o campo <code>name</code> e o campo incremental <code>increment_id</code>.</li>
        <li><code>services/firestore-service.ts</code>: Responsável por gerenciar a interação com o Firestore, como o gerenciamento de transações para geração de IDs incrementais.</li>
        <li><code>services/record-repository.ts</code>: Contém a interface <code>IRecordRepository</code> e sua implementação <code>FirestoreRecordRepository</code>. Cuida da criação e atualização de registros no Firestore.</li>
        <li><code>utils/id-generator.ts</code>: Gera o próximo ID sequencial para os registros.</li>
        <li><code>controllers/record-controller.ts</code>: Contém a lógica principal para criar registros, utilizando os serviços e utilitários.</li>
        <li><code>src/index.ts</code>: Funções principais do Firebase que respondem às requisições HTTP e triggers do Firestore.</li>
    </ul>

    <h2>Instalação e Execução</h2>

    <h3>Requisitos</h3>
    <ul>
        <li>Node.js (versão 14 ou superior)</li>
        <li>Firebase CLI</li>
        <li>Conta no Firebase ou usar o Firebase Emulator para rodar localmente</li>
    </ul>

    <h3>Passos para Instalar e Rodar o Projeto</h3>

    <ol>
        <li><strong>Clone o Repositório</strong></li>
        <p>Clone este repositório para a sua máquina local:</p>
        <pre><code>git clone https://github.com/seu-usuario/seu-projeto.git

cd seu-projeto/functions
</code></pre>

        <li><strong>Instale as Dependências</strong></li>
        <p>Instale as dependências necessárias com o NPM:</p>
        <pre><code>npm install</code></pre>

        <li><strong>Configuração do TypeScript</strong></li>
        <p>Certifique-se de que o projeto está configurado corretamente para o TypeScript. O arquivo <code>tsconfig.json</code> já está incluído, mas você pode compilar o código TypeScript manualmente:</p>
        <pre><code>npm run build</code></pre>

        <li><strong>Iniciar o Firebase Emulator (Opcional)</strong></li>
        <p>Para rodar o projeto localmente com o Firebase Emulator, execute:</p>
        <pre><code>firebase emulators:start</code></pre>

        <li><strong>Deploy no Firebase (Opcional)</strong></li>
        <p>Se você quiser fazer o deploy das funções no Firebase (necessita de um projeto no Firebase):</p>
        <pre><code>firebase deploy --only functions</code></pre>

        <li><strong>Testes Automatizados</strong></li>
        <p>Para rodar os testes automatizados incluídos no projeto:</p>
        <pre><code>npm run test</code></pre>
        <p>Os testes são escritos sem frameworks adicionais e utilizam apenas as ferramentas internas do Node.js.</p>
    </ol>

    <h3>Exemplo de Requisição HTTP via Postman</h3>

    <p>Para criar um novo registro no Firestore, você pode usar o <strong>Postman</strong> ou qualquer outro cliente HTTP:</p>

    <ul>
        <li><strong>Método</strong>: <code>POST</code></li>
        <li><strong>URL</strong>: <code>http://localhost:5001/&lt;your-project-id&gt;/us-central1/createRecordFunction</code></li>
        <li><strong>Headers</strong>:
            <ul>
                <li><code>Content-Type: application/json</code></li>
            </ul>
        </li>
        <li><strong>Body</strong> (formato JSON):
            <pre><code>{

"name": "John Doe"
}
</code></pre>

</li>
</ul>

    <p>A resposta será algo como:</p>

    <pre><code>{

"Record created with ID: abc123def456"
}
</code></pre>

</body>
</html>
