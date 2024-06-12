/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { Plugin, icons, Command } from '@ckeditor/ckeditor5-core/dist/index.js';
import { ButtonView, MenuBarMenuListItemButtonView, Notification } from '@ckeditor/ckeditor5-ui/dist/index.js';
import { CKEditorError } from '@ckeditor/ckeditor5-utils/dist/index.js';

class CKFinderUI extends Plugin {
    /**
     * @inheritDoc
     */ static get pluginName() {
        return 'CKFinderUI';
    }
    /**
     * @inheritDoc
     */ init() {
        const editor = this.editor;
        const componentFactory = editor.ui.componentFactory;
        const t = editor.t;
        componentFactory.add('ckfinder', (locale)=>{
            const button = this._createButton(ButtonView);
            const t = locale.t;
            button.set({
                label: t('Insert image or file'),
                tooltip: true
            });
            return button;
        });
        componentFactory.add('menuBar:ckfinder', (locale)=>{
            const button = this._createButton(MenuBarMenuListItemButtonView);
            const t = locale.t;
            button.label = t('Image or file');
            return button;
        });
        if (editor.plugins.has('ImageInsertUI')) {
            const imageInsertUI = editor.plugins.get('ImageInsertUI');
            imageInsertUI.registerIntegration({
                name: 'assetManager',
                observable: ()=>editor.commands.get('ckfinder'),
                buttonViewCreator: ()=>{
                    const button = this.editor.ui.componentFactory.create('ckfinder');
                    button.icon = icons.imageAssetManager;
                    button.bind('label').to(imageInsertUI, 'isImageSelected', (isImageSelected)=>isImageSelected ? t('Replace image with file manager') : t('Insert image with file manager'));
                    return button;
                },
                formViewCreator: ()=>{
                    const button = this.editor.ui.componentFactory.create('ckfinder');
                    button.icon = icons.imageAssetManager;
                    button.withText = true;
                    button.bind('label').to(imageInsertUI, 'isImageSelected', (isImageSelected)=>isImageSelected ? t('Replace with file manager') : t('Insert with file manager'));
                    button.on('execute', ()=>{
                        imageInsertUI.dropdownView.isOpen = false;
                    });
                    return button;
                }
            });
        }
    }
    /**
     * Creates a button for CKFinder command to use either in toolbar or in menu bar.
     */ _createButton(ButtonClass) {
        const editor = this.editor;
        const locale = editor.locale;
        const view = new ButtonClass(locale);
        const command = editor.commands.get('ckfinder');
        view.icon = icons.browseFiles;
        view.bind('isEnabled').to(command);
        view.on('execute', ()=>{
            editor.execute('ckfinder');
            editor.editing.view.focus();
        });
        return view;
    }
}

class CKFinderCommand extends Command {
    /**
     * @inheritDoc
     */ refresh() {
        const imageCommand = this.editor.commands.get('insertImage');
        const linkCommand = this.editor.commands.get('link');
        // The CKFinder command is enabled when one of image or link command is enabled.
        this.isEnabled = imageCommand.isEnabled || linkCommand.isEnabled;
    }
    /**
     * @inheritDoc
     */ execute() {
        const editor = this.editor;
        const openerMethod = this.editor.config.get('ckfinder.openerMethod') || 'modal';
        if (openerMethod != 'popup' && openerMethod != 'modal') {
            /**
             * The `ckfinder.openerMethod` must be one of: "popup" or "modal".
             *
             * @error ckfinder-unknown-openermethod
             */ throw new CKEditorError('ckfinder-unknown-openermethod', editor);
        }
        const options = this.editor.config.get('ckfinder.options') || {};
        options.chooseFiles = true;
        // Cache the user-defined onInit method
        const originalOnInit = options.onInit;
        // Pass the lang code to the CKFinder if not defined by user.
        if (!options.language) {
            options.language = editor.locale.uiLanguage;
        }
        // The onInit method allows to extend CKFinder's behavior. It is used to attach event listeners to file choosing related events.
        options.onInit = (finder)=>{
            // Call original options.onInit if it was defined by user.
            if (originalOnInit) {
                originalOnInit(finder);
            }
            finder.on('files:choose', (evt)=>{
                const files = evt.data.files.toArray();
                // Insert links
                const links = files.filter((file)=>!file.isImage());
                const images = files.filter((file)=>file.isImage());
                for (const linkFile of links){
                    editor.execute('link', linkFile.getUrl());
                }
                const imagesUrls = [];
                for (const image of images){
                    const url = image.getUrl();
                    imagesUrls.push(url ? url : finder.request('file:getProxyUrl', {
                        file: image
                    }));
                }
                if (imagesUrls.length) {
                    insertImages(editor, imagesUrls);
                }
            });
            finder.on('file:choose:resizedImage', (evt)=>{
                const resizedUrl = evt.data.resizedUrl;
                if (!resizedUrl) {
                    const notification = editor.plugins.get('Notification');
                    const t = editor.locale.t;
                    notification.showWarning(t('Could not obtain resized image URL.'), {
                        title: t('Selecting resized image failed'),
                        namespace: 'ckfinder'
                    });
                    return;
                }
                insertImages(editor, [
                    resizedUrl
                ]);
            });
        };
        window.CKFinder[openerMethod](options);
    }
    /**
     * @inheritDoc
     */ constructor(editor){
        super(editor);
        // The CKFinder command does not affect data by itself.
        this.affectsData = false;
        // Remove default document listener to lower its priority.
        this.stopListening(this.editor.model.document, 'change');
        // Lower this command listener priority to be sure that refresh() will be called after link & image refresh.
        this.listenTo(this.editor.model.document, 'change', ()=>this.refresh(), {
            priority: 'low'
        });
    }
}
function insertImages(editor, urls) {
    const imageCommand = editor.commands.get('insertImage');
    // Check if inserting an image is actually possible - it might be possible to only insert a link.
    if (!imageCommand.isEnabled) {
        const notification = editor.plugins.get('Notification');
        const t = editor.locale.t;
        notification.showWarning(t('Could not insert image at the current position.'), {
            title: t('Inserting image failed'),
            namespace: 'ckfinder'
        });
        return;
    }
    editor.execute('insertImage', {
        source: urls
    });
}

class CKFinderEditing extends Plugin {
    /**
     * @inheritDoc
     */ static get pluginName() {
        return 'CKFinderEditing';
    }
    /**
     * @inheritDoc
     */ static get requires() {
        return [
            Notification,
            'LinkEditing'
        ];
    }
    /**
     * @inheritDoc
     */ init() {
        const editor = this.editor;
        if (!editor.plugins.has('ImageBlockEditing') && !editor.plugins.has('ImageInlineEditing')) {
            /**
             * CKFinder requires at least one plugin providing support for images loaded in the editor. Please
             * make sure either:
             *
             * * {@link module:image/image~Image} (which loads both types of images),
             * * or {@link module:image/imageblock~ImageBlock},
             * * or {@link module:image/imageinline~ImageInline}.
             *
             * is loaded in your editor configuration.
             *
             * @error ckfinder-missing-image-plugin
             */ throw new CKEditorError('ckfinder-missing-image-plugin', editor);
        }
        editor.commands.add('ckfinder', new CKFinderCommand(editor));
    }
}

class CKFinder extends Plugin {
    /**
     * @inheritDoc
     */ static get pluginName() {
        return 'CKFinder';
    }
    /**
     * @inheritDoc
     */ static get requires() {
        return [
            'Link',
            'CKFinderUploadAdapter',
            CKFinderEditing,
            CKFinderUI
        ];
    }
}

export { CKFinder, CKFinderEditing, CKFinderUI };
//# sourceMappingURL=index.js.map
