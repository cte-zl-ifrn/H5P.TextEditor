function carregaTiny() {
    const script = document.createElement('script');
    script.src = 'https://cdn.tiny.cloud/1/no-api-key/tinymce/6.7.1-31/tinymce.min.js';
    script.referrerpolicy = 'origin';
    document.head.appendChild(script);

    // Quando o TinyMCE for carregado, você pode iniciar sua configuração
    script.onload = () => {
        console.log("Entrei aqui");
        // Configuração do TinyMCE
        tinymce.init({
        selector: 'textarea', // Seletor para os elementos onde você deseja ativar o TinyMCE
        });
    };
}

carregaTiny();
console.log("Carregou");
  