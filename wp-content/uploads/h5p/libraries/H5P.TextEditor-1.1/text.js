H5P.TextEditor = (function ($, EventDispatcher) {

  /**
   * A simple library for displaying text with advanced styling.
   *
   * @class H5P.TextEditor
   * @param {Object} parameters
   * @param {Object} [parameters.text='Qualquer coisa']
   * @param {number} id
   */
  function TextEditor(parameters, id) {
    var self = this;
    EventDispatcher.call(this);

    var html = (parameters.text === undefined ? '<em>Qualquer coisa</em>' : parameters.text);

    /**
     * Wipe container and add text html.
     *
     * @alias H5P.TextEditor#attach
     * @param {H5P.jQuery} $container
     */
    self.attach = function ($container) {
      $container.addClass('h5p-advanced-text').html(html);
    };
  }

  TextEditor.prototype = Object.create(EventDispatcher.prototype);
  TextEditor.prototype.constructor = TextEditor;

  return TextEditor;

})(H5P.jQuery, H5P.EventDispatcher);
