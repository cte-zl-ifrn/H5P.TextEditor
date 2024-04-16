# Readme - TextEditor

This is an H5P tool for text content editing based on the TinyMCE library. With this rich text editor, you can create formatted content in a simple and intuitive way, thanks to an easy-to-use interface.

![Untitled](README/Untitled.png)

**How to Integrate This Library into Your Environment:**

1. ou won't need to worry about installing pre-dependencies, as this new tool relies solely on H5P.Text. By default, this component will already be installed in your environment. If it isn't, please access: [H5P.Text](https://github.com/cte-zl-ifrn/H5P.PreDependencias/releases/download/1.0.0/text.h5p)
2. So just download the textEditor file from the release, and insert the packaged file into your development environment. For more information, visit: [Text Editor](https://h5p.org/h5p-cli-guide)

**Using the TextEditor component within another h5p content:**

1. Let's say you want to use the TextEditor within a Column content, which the Interactive Book also uses the Column to create its contents. By default, Column will not show our TextEditor as an option.
2. Para isto, basta baixar o arquivo h5p do column em: [COLUMN](https://github.com/cte-zl-ifrn/H5P.PreDependencias/releases/download/1.0.0/column.h5p) e inserir o arquivo compactado no seu ambiente.
      
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
