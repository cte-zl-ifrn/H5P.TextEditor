/* global ns CKEDITOR */
/**
 * Adds a TinyMCE text field to the form.
 *
 * @param {type} parent
 * @param {type} field
 * @param {type} params
 * @param {type} setValue
 * @returns {undefined}
 */
ns.TinyMCE = function (parent, field, params, setValue) {
  this.parent = parent;
  this.field = field;
  this.value = params;
  this.setValue = setValue;
  this.tags = ns.$.merge(['br'], (this.field.tags || this.defaultTags));

};

ns.TinyMCE.prototype.inTags = function (value) {
  return (ns.$.inArray(value.toLowerCase(), this.tags) >= 0);
};

/*

document.getElementById("tinymce").children[0].innerText

*/

/**
 * Append field to wrapper.
 *
 * @param {type} $wrapper
 * @returns {undefined}
 */
ns.TinyMCE.prototype.appendTo = function ($wrapper) {
  var that = this;
  this.$item = ns.$(this.createTinyMCE()).appendTo($wrapper);
  this.$input = this.$item.children('.ckeditor2');
  this.$errors = this.$item.children('.h5p-errors');

  ns.bindImportantDescriptionEvents(this, this.field.name, this.parent);

  tinymce.init({
    selector: '.ckeditor2', // Seletor para os elementos com editor de texto
    setup: function (editor) {
      editor.on('change', function () {
        that.validate();
      });
    }
  });
};

/**
 * Create TinyMCE for the TinyMCE field.
 */
ns.TinyMCE.prototype.createTinyMCE = function () {
  const id = ns.getNextFieldId(this.field);
  var input = '<textarea id="' + id + '" class="ckeditor2" tabindex="0">';
  if (this.value !== undefined) {
    input += this.value;
  }
  input += '</textarea>';

  return ns.createFieldMarkup(this.field, ns.createImportantDescription(this.field.important) + input, id);
};

/**
 * Validate the current text field.
 */
ns.TinyMCE.prototype.validate = function () {
  var that = this;

  if (that.$errors.children().length) {
    that.$errors.empty();
    this.$input.addClass('error');
  }

  // var value = this.$input.html();

  // Get contents from editor
  var value = this.ckeditor !== undefined ? this.ckeditor.getData() : this.$input.html();

  console.log("O texto digitado foi: " + value);

  value = value
  // Remove placeholder text if any:
  .replace(/<span class="h5peditor-ckeditor-placeholder">.*<\/span>/, '')
  // Workaround for Microsoft browsers that otherwise can produce non-emtpy fields causing trouble
  .replace(/^<br>$/, '');

  var $value = ns.$('<div>' + value + '</div>');
  var textValue = $value.text();

  // Check if we have any text at all.  !value.trim() value.indexOf('<img') !== -1
  if (!this.field.optional && !textValue.length ) {
    // We can accept empty text, if there's an image instead.
    if (!(this.inTags("img") && $value.find('img').length > 0)) {
      this.$errors.append(ns.createError(ns.t('core', 'requiredProperty', { ':property': ns.t('core', 'textField') })));
      console.log("errei aqui");
    }
  }

  // Verify HTML tags.  Removes tags not in allowed tags.  Will replace with
  // the tag's content.  So if we get an unallowed container, the contents
  // will remain, without the container.
  $value.find('*').each(function () {
    if (! that.inTags(this.tagName)) {
      ns.$(this).replaceWith(ns.$(this).contents());
    }
  });
  value = $value.html();

  // Display errors and bail if set.
   if (that.$errors.children().length) {
     console.log("erroooouu");
     return false;
   } else {
     this.$input.removeClass('error');
   }

  this.value = value;
  this.setValue(this.field, value);
  this.$input.change(); // Trigger change event.

  return value;
};



/**
 * Remove this item.
 */
ns.TinyMCE.prototype.remove = function () {
  this.$item.remove();
};

ns.TinyMCE.prototype.forceValue = function (value) {
  if (this.ckeditor === undefined) {
    this.$input.html(value);
    console.log("if");
  }
  else {
    this.ckeditor.setData(value);
    console.log("else");
  }
  this.validate();
};

// Inicializa o TinyMCE
document.addEventListener('DOMContentLoaded', function() {
  // Cria um elemento de script
  var script = document.createElement('script');

  // Define o atributo src para o URL do script do TinyMCE
  script.src = 'https://cdn.tiny.cloud/1/no-api-key/tinymce/6.7.1-31/tinymce.min.js';

  // Adiciona um evento de carregamento ao script
  // script.onload = function() {
  //   tinymce.init({
  //       selector: '.qualquercoisa',
  //   });
  // }; 

  // Adiciona o script ao corpo do documento
  document.body.appendChild(script);

  //Tinymce
  ns.widgets.tinymce = ns.TinyMCE;
});

