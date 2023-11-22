function carregaTiny() {
    const script = document.createElement('script');
    script.src = 'https://cdn.tiny.cloud/1/hcfimgc2pfz91410ky5zdlsbpu2r0zvaftznv1glpace7qn2/tinymce/6.7.1-31/tinymce.min.js';
    script.referrerpolicy = 'origin';
    document.head.appendChild(script);

    // Quando o TinyMCE for carregado
    script.onload = () => {
        tinymce.init({
            selector: '.ckeditor',
            height: 500,
            resize: true,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount', 'codesample', 'code'
            ],
            toolbar: 'undo redo | blocks | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
            codesample_languages: [
                { text: 'HTML/XML', value: 'markup' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'CSS', value: 'css' },
                { text: 'PHP', value: 'php' },
                { text: 'Ruby', value: 'ruby' },
                { text: 'Python', value: 'python' },
                { text: 'Java', value: 'java' },
                { text: 'C', value: 'c' },
                { text: 'C#', value: 'csharp' },
                { text: 'C++', value: 'cpp' }
            ],

            setup: function (editor) {
                editor.on('change', function () {
                    that.validate();
                });
            }
        });
    };
}

carregaTiny();