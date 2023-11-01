var H5P = H5P || {};

/**
 * Constructor.
 *
 * @param {object} params Options for this library.
 */
H5P.Text = function (params) {
  this.text = params.text === undefined ? '<em>New text</em>' : params.text;
};

/**
 * Wipe out the content of the wrapper and put our HTML in it.
 *
 * @param {jQuery} $wrapper
 */
H5P.Text.prototype.attach = function ($wrapper) {
  $wrapper.addClass('h5p-text').html(this.text);
};

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
