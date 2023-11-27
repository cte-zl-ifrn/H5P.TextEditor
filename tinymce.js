function carregaTiny() {
    const script = document.createElement('script');
    script.src = 'https://cdn.tiny.cloud/1/hcfimgc2pfz91410ky5zdlsbpu2r0zvaftznv1glpace7qn2/tinymce/6.7.1-31/tinymce.min.js';
    script.referrerpolicy = 'origin';
    document.head.appendChild(script);
}

carregaTiny();