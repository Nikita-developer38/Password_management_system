/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ckfinder/ckfinderui
 */
import { icons, Plugin } from 'ckeditor5/src/core.js';
import { ButtonView, MenuBarMenuListItemButtonView } from 'ckeditor5/src/ui.js';
/**
 * The CKFinder UI plugin. It introduces the `'ckfinder'` toolbar button.
 */
export default class CKFinderUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'CKFinderUI';
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const componentFactory = editor.ui.componentFactory;
        const t = editor.t;
        componentFactory.add('ckfinder', locale => {
            const button = this._createButton(ButtonView);
            const t = locale.t;
            button.set({
                label: t('Insert image or file'),
                tooltip: true
            });
            return button;
        });
        componentFactory.add('menuBar:ckfinder', locale => {
            const button = this._createButton(MenuBarMenuListItemButtonView);
            const t = locale.t;
            button.label = t('Image or file');
            return button;
        });
        if (editor.plugins.has('ImageInsertUI')) {
            const imageInsertUI = editor.plugins.get('ImageInsertUI');
            imageInsertUI.registerIntegration({
                name: 'assetManager',
                observable: () => editor.commands.get('ckfinder'),
                buttonViewCreator: () => {
                    const button = this.editor.ui.componentFactory.create('ckfinder');
                    button.icon = icons.imageAssetManager;
                    button.bind('label').to(imageInsertUI, 'isImageSelected', isImageSelected => isImageSelected ?
                        t('Replace image with file manager') :
                        t('Insert image with file manager'));
                    return button;
                },
                formViewCreator: () => {
                    const button = this.editor.ui.componentFactory.create('ckfinder');
                    button.icon = icons.imageAssetManager;
                    button.withText = true;
                    button.bind('label').to(imageInsertUI, 'isImageSelected', isImageSelected => isImageSelected ?
                        t('Replace with file manager') :
                        t('Insert with file manager'));
                    button.on('execute', () => {
                        imageInsertUI.dropdownView.isOpen = false;
                    });
                    return button;
                }
            });
        }
    }
    /**
     * Creates a button for CKFinder command to use either in toolbar or in menu bar.
     */
    _createButton(ButtonClass) {
        const editor = this.editor;
        const locale = editor.locale;
        const view = new ButtonClass(locale);
        const command = editor.commands.get('ckfinder');
        view.icon = icons.browseFiles;
        view.bind('isEnabled').to(command);
        view.on('execute', () => {
            editor.execute('ckfinder');
            editor.editing.view.focus();
        });
        return view;
    }
}
