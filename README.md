# Readme - TextEditor

Esta é uma ferramenta H5P de edição de conteúdo de texto baseada na biblioteca TinyMCE. Com este editor de texto enriquecido, você pode criar conteúdo formatado de maneira simples e intuitiva, graças a uma interface fácil de usar.

![Untitled](README/Untitled.png)

**Como Integrar Esta Biblioteca no Seu Ambiente:**

1. Não será necessário se preocupar em instalar pré-dependências, pois essa nova ferramenta depende apenas do H5P.Text. Por padrão, esse componente já estará instalado em seu ambiente.
2. Então basta empacotar o arquivo utilizando a Inferface de linha de comando do h5p(H5Pcli), e inserir o arquivo empacotado em seu ambiente de desenvolvimento. Para mais informações acesse: [Doc cli5hp](https://h5p.org/h5p-cli-guide)

**Utilizando o componente TextEditor dentro de outro conteúdo h5p:**

1. Digamos que você queira utilizar o TextEditor dentro de um conteúdo Column, que inclusive o Livro Interativo utiliza o Column para criar seus conteúdos. Por padrão o Column nao irá mostrar como opção o nosso textEditor.
2. Então teremos que inicialmente baixar a biblioteca Column localmente, para fazer a alteração. Podemos adquiri-la por linha de comando utilizando a interface de linha de comando do H5P (h5pcli). Mais informações em: https://h5p.org/h5p-cli-guide

   1. baixando o column: Abra um terminal localmente e insira o seguinte comando: `h5p get h5p-column`
   2. Abra o column em algum editor de código(VS Code)
   3. Inserindo nosso componente: No arquivo semantics, devemos inserir `"H5P.TextEditor 1.0",`, dessa forma o nosso TextEditor será listado como uma opção.![Untitled](README/Untitled2.png)
   4. Por fim, devemos empacotar o diretório do Column utilizando a linha de comando: `h5p pack h5p-column h5p-column.h5p`.
   5. Agora basta inserir o arquivo h5p-column.h5p no seu ambiente para atualizar, e usufruir do novo componente de texto.
      
**Guia Passo a Passo para Compactar e Integrar Bibliotecas H5P no Moodle:**

Este guia oferece instruções detalhadas sobre como compactar uma biblioteca para a extensão do H5P e integrá-la ao Moodle. Certifique-se de seguir cada passo cuidadosamente para garantir uma instalação bem-sucedida.

1. **Instalação da CLI do H5P:** Utilize o comando para instalar a CLI do H5P globalmente**:** `npm install -g h5p` 
2. **Navegação até a Pasta da Biblioteca:** Acesse a pasta da biblioteca desejada utilizando o comando, ex.: `cd h5p-column` 
3. **Compactação da Biblioteca em .h5p:** Execute o seguinte comando para compactar a pasta em um arquivo .h5p: `h5p pack h5p-column`
4. **Acesso ao Moodle:** Abra o Moodle e acesse a seção de Administração do Site.
5. **Gerenciamento de Tipos de Conteúdo H5P:** Navegue até "Administração do Site" e selecione "Gerenciar Tipos de Conteúdo H5P".
6. **Upload da Biblioteca Compactada:** Na área de "Enviar Tipos de Conteúdo H5P", faça o upload do arquivo .h5p recém-criado.
7. **Mensagem de Confirmação:** Uma mensagem de sucesso será exibida, confirmando a integração bem-sucedida da biblioteca.

Obs.: Alguns conteúdos podem dar erro pois existem eles possuem pre dependencias, caso voce tente enviar esse conteudo antes de enviar sua dependencias, uma mensagem de erro será apresentada. Então faça o upload das pre dependencias primeiro.

Se tiver mais alguma dúvida ou precisar de assistência adicional, por favor, não hesite em perguntar.
