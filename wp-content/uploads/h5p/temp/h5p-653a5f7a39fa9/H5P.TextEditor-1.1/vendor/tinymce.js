function carregaTiny() {
    const script = document.createElement('script');
    script.src = 'https://cdn.tiny.cloud/1/no-api-key/tinymce/6.7.1-31/tinymce.min.js';
    script.referrerpolicy = 'origin';
    document.head.appendChild(script);

    // Quando o TinyMCE for carregado
    script.onload = () => {
        console.log("Entrei aqui");
        tinymce.init({
        selector: 'textarea', // Seletor
        });
    };
}

carregaTiny();
console.log("Entrei aqui 2");
  