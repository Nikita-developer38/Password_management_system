/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { Plugin } from '@ckeditor/ckeditor5-core/dist/index.js';
import { Template, View } from '@ckeditor/ckeditor5-ui/dist/index.js';
import { env } from '@ckeditor/ckeditor5-utils/dist/index.js';
import { throttle, isElement } from 'lodash-es';

/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */ /**
 * Returns a plain text representation of an element and its children.
 *
 * @returns Plain text representing the model's data.
 */ function modelElementToPlainText(item) {
    if (item.is('$text') || item.is('$textProxy')) {
        return item.data;
    }
    const element = item;
    let text = '';
    let prev = null;
    for (const child of element.getChildren()){
        const childText = modelElementToPlainText(child);
        // If last block was finish, start from new line.
        if (prev && prev.is('element')) {
            text += '\n';
        }
        text += childText;
        prev = child;
    }
    return text;
}

class WordCount extends Plugin {
    /**
     * @inheritDoc
     */ static get pluginName() {
        return 'WordCount';
    }
    /**
     * @inheritDoc
     */ init() {
        const editor = this.editor;
        editor.model.document.on('change:data', throttle(this._refreshStats.bind(this), 250));
        if (typeof this._config.onUpdate == 'function') {
            this.on('update', (evt, data)=>{
                this._config.onUpdate(data);
            });
        }
        if (isElement(this._config.container)) {
            this._config.container.appendChild(this.wordCountContainer);
        }
    }
    /**
     * @inheritDoc
     */ destroy() {
        if (this._outputView) {
            this._outputView.element.remove();
            this._outputView.destroy();
        }
        super.destroy();
    }
    /**
     * Creates a self-updating HTML element. Repeated executions return the same element.
     * The returned element has the following HTML structure:
     *
     * ```html
     * <div class="ck ck-word-count">
     * 	<div class="ck-word-count__words">Words: 4</div>
     * 	<div class="ck-word-count__characters">Characters: 28</div>
     * </div>
     * ```
     */ get wordCountContainer() {
        const editor = this.editor;
        const t = editor.t;
        const displayWords = editor.config.get('wordCount.displayWords');
        const displayCharacters = editor.config.get('wordCount.displayCharacters');
        const bind = Template.bind(this, this);
        const children = [];
        if (!this._outputView) {
            this._outputView = new View();
            if (displayWords || displayWords === undefined) {
                this.bind('_wordsLabel').to(this, 'words', (words)=>{
                    return t('Words: %0', words);
                });
                children.push({
                    tag: 'div',
                    children: [
                        {
                            text: [
                                bind.to('_wordsLabel')
                            ]
                        }
                    ],
                    attributes: {
                        class: 'ck-word-count__words'
                    }
                });
            }
            if (displayCharacters || displayCharacters === undefined) {
                this.bind('_charactersLabel').to(this, 'characters', (words)=>{
                    return t('Characters: %0', words);
                });
                children.push({
                    tag: 'div',
                    children: [
                        {
                            text: [
                                bind.to('_charactersLabel')
                            ]
                        }
                    ],
                    attributes: {
                        class: 'ck-word-count__characters'
                    }
                });
            }
            this._outputView.setTemplate({
                tag: 'div',
                attributes: {
                    class: [
                        'ck',
                        'ck-word-count'
                    ]
                },
                children
            });
            this._outputView.render();
        }
        return this._outputView.element;
    }
    _getText() {
        let txt = '';
        for (const root of this.editor.model.document.getRoots()){
            if (txt !== '') {
                // Add a delimiter, so words from each root are treated independently.
                txt += '\n';
            }
            txt += modelElementToPlainText(root);
        }
        return txt;
    }
    /**
     * Determines the number of characters in the current editor's model.
     */ _getCharacters(txt) {
        return txt.replace(/\n/g, '').length;
    }
    /**
     * Determines the number of words in the current editor's model.
     */ _getWords(txt) {
        const detectedWords = txt.match(this._wordsMatchRegExp) || [];
        return detectedWords.length;
    }
    /**
     * Determines the number of words and characters in the current editor's model and assigns it to {@link #characters} and {@link #words}.
     * It also fires the {@link #event:update}.
     *
     * @fires update
     */ _refreshStats() {
        const txt = this._getText();
        const words = this.words = this._getWords(txt);
        const characters = this.characters = this._getCharacters(txt);
        this.fire('update', {
            words,
            characters
        });
    }
    /**
     * @inheritDoc
     */ constructor(editor){
        super(editor);
        this.set('characters', 0);
        this.set('words', 0);
        // Don't wait for the #update event to set the value of the properties but obtain it right away.
        // This way, accessing the properties directly returns precise numbers, e.g. for validation, etc.
        // If not accessed directly, the properties will be refreshed upon #update anyway.
        Object.defineProperties(this, {
            characters: {
                get () {
                    return this.characters = this._getCharacters(this._getText());
                }
            },
            words: {
                get () {
                    return this.words = this._getWords(this._getText());
                }
            }
        });
        this.set('_wordsLabel', undefined);
        this.set('_charactersLabel', undefined);
        this._config = editor.config.get('wordCount') || {};
        this._outputView = undefined;
        this._wordsMatchRegExp = env.features.isRegExpUnicodePropertySupported ? // Usage of regular expression literal cause error during build (ckeditor/ckeditor5-dev#534).
        // Groups:
        // {L} - Any kind of letter from any language.
        // {N} - Any kind of numeric character in any script.
        new RegExp('([\\p{L}\\p{N}]+\\S?)+', 'gu') : /([a-zA-Z0-9À-ž]+\S?)+/gu;
    }
}

export { WordCount };
//# sourceMappingURL=index.js.map
