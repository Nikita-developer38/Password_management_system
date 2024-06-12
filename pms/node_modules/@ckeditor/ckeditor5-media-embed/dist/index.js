/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { Command, Plugin, icons } from '@ckeditor/ckeditor5-core/dist/index.js';
import { toWidget, isWidget, findOptimalInsertionRange, Widget, WidgetToolbarRepository } from '@ckeditor/ckeditor5-widget/dist/index.js';
import { toArray, logWarning, first, global, FocusTracker, KeystrokeHandler } from '@ckeditor/ckeditor5-utils/dist/index.js';
import { IconView, Template, View, submitHandler, LabeledFieldView, createLabeledInputText, ButtonView, ViewCollection, FocusCycler, createDropdown, CssTransitionDisablerMixin } from '@ckeditor/ckeditor5-ui/dist/index.js';
import { LivePosition, LiveRange } from '@ckeditor/ckeditor5-engine/dist/index.js';
import { Clipboard } from '@ckeditor/ckeditor5-clipboard/dist/index.js';
import { Delete } from '@ckeditor/ckeditor5-typing/dist/index.js';
import { Undo } from '@ckeditor/ckeditor5-undo/dist/index.js';

/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */ /**
 * Returns a function that converts the model "url" attribute to the view representation.
 *
 * Depending on the configuration, the view representation can be "semantic" (for the data pipeline):
 *
 * ```html
 * <figure class="media">
 * 	<oembed url="foo"></oembed>
 * </figure>
 * ```
 *
 * or "non-semantic" (for the editing view pipeline):
 *
 * ```html
 * <figure class="media">
 * 	<div data-oembed-url="foo">[ non-semantic media preview for "foo" ]</div>
 * </figure>
 * ```
 *
 * **Note:** Changing the model "url" attribute replaces the entire content of the
 * `<figure>` in the view.
 *
 * @param registry The registry providing
 * the media and their content.
 * @param options options object with following properties:
 * - elementName When set, overrides the default element name for semantic media embeds.
 * - renderMediaPreview When `true`, the converter will create the view in the non-semantic form.
 * - renderForEditingView When `true`, the converter will create a view specific for the
 * editing pipeline (e.g. including CSS classes, content placeholders).
 */ function modelToViewUrlAttributeConverter(registry, options) {
    const converter = (evt, data, conversionApi)=>{
        if (!conversionApi.consumable.consume(data.item, evt.name)) {
            return;
        }
        const url = data.attributeNewValue;
        const viewWriter = conversionApi.writer;
        const figure = conversionApi.mapper.toViewElement(data.item);
        const mediaContentElement = [
            ...figure.getChildren()
        ].find((child)=>child.getCustomProperty('media-content'));
        // TODO: removing the wrapper and creating it from scratch is a hack. We can do better than that.
        viewWriter.remove(mediaContentElement);
        const mediaViewElement = registry.getMediaViewElement(viewWriter, url, options);
        viewWriter.insert(viewWriter.createPositionAt(figure, 0), mediaViewElement);
    };
    return (dispatcher)=>{
        dispatcher.on('attribute:url:media', converter);
    };
}

/**
 * Converts a given {@link module:engine/view/element~Element} to a media embed widget:
 * * Adds a {@link module:engine/view/element~Element#_setCustomProperty custom property} allowing to recognize the media widget element.
 * * Calls the {@link module:widget/utils~toWidget} function with the proper element's label creator.
 *
 * @param writer An instance of the view writer.
 * @param label The element's label.
 */ function toMediaWidget(viewElement, writer, label) {
    writer.setCustomProperty('media', true, viewElement);
    return toWidget(viewElement, writer, {
        label
    });
}
/**
 * Returns a media widget editing view element if one is selected.
 */ function getSelectedMediaViewWidget(selection) {
    const viewElement = selection.getSelectedElement();
    if (viewElement && isMediaWidget(viewElement)) {
        return viewElement;
    }
    return null;
}
/**
 * Checks if a given view element is a media widget.
 */ function isMediaWidget(viewElement) {
    return !!viewElement.getCustomProperty('media') && isWidget(viewElement);
}
/**
 * Creates a view element representing the media. Either a "semantic" one for the data pipeline:
 *
 * ```html
 * <figure class="media">
 * 	<oembed url="foo"></oembed>
 * </figure>
 * ```
 *
 * or a "non-semantic" (for the editing view pipeline):
 *
 * ```html
 * <figure class="media">
 * 	<div data-oembed-url="foo">[ non-semantic media preview for "foo" ]</div>
 * </figure>
 * ```
 */ function createMediaFigureElement(writer, registry, url, options) {
    return writer.createContainerElement('figure', {
        class: 'media'
    }, [
        registry.getMediaViewElement(writer, url, options),
        writer.createSlot()
    ]);
}
/**
 * Returns a selected media element in the model, if any.
 */ function getSelectedMediaModelWidget(selection) {
    const selectedElement = selection.getSelectedElement();
    if (selectedElement && selectedElement.is('element', 'media')) {
        return selectedElement;
    }
    return null;
}
/**
 * Creates a media element and inserts it into the model.
 *
 * **Note**: This method will use {@link module:engine/model/model~Model#insertContent `model.insertContent()`} logic of inserting content
 * if no `insertPosition` is passed.
 *
 * @param url An URL of an embeddable media.
 * @param findOptimalPosition If true it will try to find optimal position to insert media without breaking content
 * in which a selection is.
 */ function insertMedia(model, url, selectable, findOptimalPosition) {
    model.change((writer)=>{
        const mediaElement = writer.createElement('media', {
            url
        });
        model.insertObject(mediaElement, selectable, null, {
            setSelection: 'on',
            findOptimalPosition: findOptimalPosition ? 'auto' : undefined
        });
    });
}

class MediaEmbedCommand extends Command {
    /**
     * @inheritDoc
     */ refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const selectedMedia = getSelectedMediaModelWidget(selection);
        this.value = selectedMedia ? selectedMedia.getAttribute('url') : undefined;
        this.isEnabled = isMediaSelected(selection) || isAllowedInParent(selection, model);
    }
    /**
     * Executes the command, which either:
     *
     * * updates the URL of the selected media,
     * * inserts the new media into the editor and puts the selection around it.
     *
     * @fires execute
     * @param url The URL of the media.
     */ execute(url) {
        const model = this.editor.model;
        const selection = model.document.selection;
        const selectedMedia = getSelectedMediaModelWidget(selection);
        if (selectedMedia) {
            model.change((writer)=>{
                writer.setAttribute('url', url, selectedMedia);
            });
        } else {
            insertMedia(model, url, selection, true);
        }
    }
}
/**
 * Checks if the media embed is allowed in the parent.
 */ function isAllowedInParent(selection, model) {
    const insertionRange = findOptimalInsertionRange(selection, model);
    let parent = insertionRange.start.parent;
    // The model.insertContent() will remove empty parent (unless it is a $root or a limit).
    if (parent.isEmpty && !model.schema.isLimit(parent)) {
        parent = parent.parent;
    }
    return model.schema.checkChild(parent, 'media');
}
/**
 * Checks if the media object is selected.
 */ function isMediaSelected(selection) {
    const element = selection.getSelectedElement();
    return !!element && element.name === 'media';
}

var mediaPlaceholderIcon = "<svg viewBox=\"0 0 64 42\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M47.426 17V3.713L63.102 0v19.389h-.001l.001.272c0 1.595-2.032 3.43-4.538 4.098-2.506.668-4.538-.083-4.538-1.678 0-1.594 2.032-3.43 4.538-4.098.914-.244 2.032-.565 2.888-.603V4.516L49.076 7.447v9.556A1.014 1.014 0 0 0 49 17h-1.574zM29.5 17h-8.343a7.073 7.073 0 1 0-4.657 4.06v3.781H3.3a2.803 2.803 0 0 1-2.8-2.804V8.63a2.803 2.803 0 0 1 2.8-2.805h4.082L8.58 2.768A1.994 1.994 0 0 1 10.435 1.5h8.985c.773 0 1.477.448 1.805 1.149l1.488 3.177H26.7c1.546 0 2.8 1.256 2.8 2.805V17zm-11.637 0H17.5a1 1 0 0 0-1 1v.05A4.244 4.244 0 1 1 17.863 17zm29.684 2c.97 0 .953-.048.953.889v20.743c0 .953.016.905-.953.905H19.453c-.97 0-.953.048-.953-.905V19.89c0-.937-.016-.889.97-.889h28.077zm-4.701 19.338V22.183H24.154v16.155h18.692zM20.6 21.375v1.616h1.616v-1.616H20.6zm0 3.231v1.616h1.616v-1.616H20.6zm0 3.231v1.616h1.616v-1.616H20.6zm0 3.231v1.616h1.616v-1.616H20.6zm0 3.231v1.616h1.616v-1.616H20.6zm0 3.231v1.616h1.616V37.53H20.6zm24.233-16.155v1.616h1.615v-1.616h-1.615zm0 3.231v1.616h1.615v-1.616h-1.615zm0 3.231v1.616h1.615v-1.616h-1.615zm0 3.231v1.616h1.615v-1.616h-1.615zm0 3.231v1.616h1.615v-1.616h-1.615zm0 3.231v1.616h1.615V37.53h-1.615zM29.485 25.283a.4.4 0 0 1 .593-.35l9.05 4.977a.4.4 0 0 1 0 .701l-9.05 4.978a.4.4 0 0 1-.593-.35v-9.956z\"/></svg>";

const mediaPlaceholderIconViewBox = '0 0 64 42';
class MediaRegistry {
    /**
     * Checks whether the passed URL is representing a certain media type allowed in the editor.
     *
     * @param url The URL to be checked
     */ hasMedia(url) {
        return !!this._getMedia(url);
    }
    /**
     * For the given media URL string and options, it returns the {@link module:engine/view/element~Element view element}
     * representing that media.
     *
     * **Note:** If no URL is specified, an empty view element is returned.
     *
     * @param writer The view writer used to produce a view element.
     * @param url The URL to be translated into a view element.
     */ getMediaViewElement(writer, url, options) {
        return this._getMedia(url).getViewElement(writer, options);
    }
    /**
     * Returns a `Media` instance for the given URL.
     *
     * @param url The URL of the media.
     * @returns The `Media` instance or `null` when there is none.
     */ _getMedia(url) {
        if (!url) {
            return new Media(this.locale);
        }
        url = url.trim();
        for (const definition of this.providerDefinitions){
            const previewRenderer = definition.html;
            const pattern = toArray(definition.url);
            for (const subPattern of pattern){
                const match = this._getUrlMatches(url, subPattern);
                if (match) {
                    return new Media(this.locale, url, match, previewRenderer);
                }
            }
        }
        return null;
    }
    /**
     * Tries to match `url` to `pattern`.
     *
     * @param url The URL of the media.
     * @param pattern The pattern that should accept the media URL.
     */ _getUrlMatches(url, pattern) {
        // 1. Try to match without stripping the protocol and "www" subdomain.
        let match = url.match(pattern);
        if (match) {
            return match;
        }
        // 2. Try to match after stripping the protocol.
        let rawUrl = url.replace(/^https?:\/\//, '');
        match = rawUrl.match(pattern);
        if (match) {
            return match;
        }
        // 3. Try to match after stripping the "www" subdomain.
        rawUrl = rawUrl.replace(/^www\./, '');
        match = rawUrl.match(pattern);
        if (match) {
            return match;
        }
        return null;
    }
    /**
     * Creates an instance of the {@link module:media-embed/mediaregistry~MediaRegistry} class.
     *
     * @param locale The localization services instance.
     * @param config The configuration of the media embed feature.
     */ constructor(locale, config){
        const providers = config.providers;
        const extraProviders = config.extraProviders || [];
        const removedProviders = new Set(config.removeProviders);
        const providerDefinitions = providers.concat(extraProviders).filter((provider)=>{
            const name = provider.name;
            if (!name) {
                /**
                 * One of the providers (or extra providers) specified in the media embed configuration
                 * has no name and will not be used by the editor. In order to get this media
                 * provider working, double check your editor configuration.
                 *
                 * @error media-embed-no-provider-name
                 */ logWarning('media-embed-no-provider-name', {
                    provider
                });
                return false;
            }
            return !removedProviders.has(name);
        });
        this.locale = locale;
        this.providerDefinitions = providerDefinitions;
    }
}
/**
 * Represents media defined by the provider configuration.
 *
 * It can be rendered to the {@link module:engine/view/element~Element view element} and used in the editing or data pipeline.
 */ class Media {
    /**
     * Returns the view element representation of the media.
     *
     * @param writer The view writer used to produce a view element.
     */ getViewElement(writer, options) {
        const attributes = {};
        let viewElement;
        if (options.renderForEditingView || options.renderMediaPreview && this.url && this._previewRenderer) {
            if (this.url) {
                attributes['data-oembed-url'] = this.url;
            }
            if (options.renderForEditingView) {
                attributes.class = 'ck-media__wrapper';
            }
            const mediaHtml = this._getPreviewHtml(options);
            viewElement = writer.createRawElement('div', attributes, (domElement, domConverter)=>{
                domConverter.setContentOf(domElement, mediaHtml);
            });
        } else {
            if (this.url) {
                attributes.url = this.url;
            }
            viewElement = writer.createEmptyElement(options.elementName, attributes);
        }
        writer.setCustomProperty('media-content', true, viewElement);
        return viewElement;
    }
    /**
     * Returns the HTML string of the media content preview.
     */ _getPreviewHtml(options) {
        if (this._previewRenderer) {
            return this._previewRenderer(this._match);
        } else {
            // The placeholder only makes sense for editing view and media which have URLs.
            // Placeholder is never displayed in data and URL-less media have no content.
            if (this.url && options.renderForEditingView) {
                return this._getPlaceholderHtml();
            }
            return '';
        }
    }
    /**
     * Returns the placeholder HTML when the media has no content preview.
     */ _getPlaceholderHtml() {
        const icon = new IconView();
        const t = this._locale.t;
        icon.content = mediaPlaceholderIcon;
        icon.viewBox = mediaPlaceholderIconViewBox;
        const placeholder = new Template({
            tag: 'div',
            attributes: {
                class: 'ck ck-reset_all ck-media__placeholder'
            },
            children: [
                {
                    tag: 'div',
                    attributes: {
                        class: 'ck-media__placeholder__icon'
                    },
                    children: [
                        icon
                    ]
                },
                {
                    tag: 'a',
                    attributes: {
                        class: 'ck-media__placeholder__url',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        href: this.url,
                        'data-cke-tooltip-text': t('Open media in new tab')
                    },
                    children: [
                        {
                            tag: 'span',
                            attributes: {
                                class: 'ck-media__placeholder__url__text'
                            },
                            children: [
                                this.url
                            ]
                        }
                    ]
                }
            ]
        }).render();
        return placeholder.outerHTML;
    }
    /**
     * Returns the full URL to the specified media.
     *
     * @param url The URL of the media.
     */ _getValidUrl(url) {
        if (!url) {
            return null;
        }
        if (url.match(/^https?/)) {
            return url;
        }
        return 'https://' + url;
    }
    constructor(locale, url, match, previewRenderer){
        this.url = this._getValidUrl(url);
        this._locale = locale;
        this._match = match;
        this._previewRenderer = previewRenderer;
    }
}

class MediaEmbedEditing extends Plugin {
    /**
     * @inheritDoc
     */ static get pluginName() {
        return 'MediaEmbedEditing';
    }
    /**
     * @inheritDoc
     */ init() {
        const editor = this.editor;
        const schema = editor.model.schema;
        const t = editor.t;
        const conversion = editor.conversion;
        const renderMediaPreview = editor.config.get('mediaEmbed.previewsInData');
        const elementName = editor.config.get('mediaEmbed.elementName');
        const registry = this.registry;
        editor.commands.add('mediaEmbed', new MediaEmbedCommand(editor));
        // Configure the schema.
        schema.register('media', {
            inheritAllFrom: '$blockObject',
            allowAttributes: [
                'url'
            ]
        });
        // Model -> Data
        conversion.for('dataDowncast').elementToStructure({
            model: 'media',
            view: (modelElement, { writer })=>{
                const url = modelElement.getAttribute('url');
                return createMediaFigureElement(writer, registry, url, {
                    elementName,
                    renderMediaPreview: !!url && renderMediaPreview
                });
            }
        });
        // Model -> Data (url -> data-oembed-url)
        conversion.for('dataDowncast').add(modelToViewUrlAttributeConverter(registry, {
            elementName,
            renderMediaPreview
        }));
        // Model -> View (element)
        conversion.for('editingDowncast').elementToStructure({
            model: 'media',
            view: (modelElement, { writer })=>{
                const url = modelElement.getAttribute('url');
                const figure = createMediaFigureElement(writer, registry, url, {
                    elementName,
                    renderForEditingView: true
                });
                return toMediaWidget(figure, writer, t('media widget'));
            }
        });
        // Model -> View (url -> data-oembed-url)
        conversion.for('editingDowncast').add(modelToViewUrlAttributeConverter(registry, {
            elementName,
            renderForEditingView: true
        }));
        // View -> Model (data-oembed-url -> url)
        conversion.for('upcast')// Upcast semantic media.
        .elementToElement({
            view: (element)=>[
                    'oembed',
                    elementName
                ].includes(element.name) && element.getAttribute('url') ? {
                    name: true
                } : null,
            model: (viewMedia, { writer })=>{
                const url = viewMedia.getAttribute('url');
                if (registry.hasMedia(url)) {
                    return writer.createElement('media', {
                        url
                    });
                }
                return null;
            }
        })// Upcast non-semantic media.
        .elementToElement({
            view: {
                name: 'div',
                attributes: {
                    'data-oembed-url': true
                }
            },
            model: (viewMedia, { writer })=>{
                const url = viewMedia.getAttribute('data-oembed-url');
                if (registry.hasMedia(url)) {
                    return writer.createElement('media', {
                        url
                    });
                }
                return null;
            }
        })// Consume `<figure class="media">` elements, that were left after upcast.
        .add((dispatcher)=>{
            const converter = (evt, data, conversionApi)=>{
                if (!conversionApi.consumable.consume(data.viewItem, {
                    name: true,
                    classes: 'media'
                })) {
                    return;
                }
                const { modelRange, modelCursor } = conversionApi.convertChildren(data.viewItem, data.modelCursor);
                data.modelRange = modelRange;
                data.modelCursor = modelCursor;
                const modelElement = first(modelRange.getItems());
                if (!modelElement) {
                    // Revert consumed figure so other features can convert it.
                    conversionApi.consumable.revert(data.viewItem, {
                        name: true,
                        classes: 'media'
                    });
                }
            };
            dispatcher.on('element:figure', converter);
        });
    }
    /**
     * @inheritDoc
     */ constructor(editor){
        super(editor);
        editor.config.define('mediaEmbed', {
            elementName: 'oembed',
            providers: [
                {
                    name: 'dailymotion',
                    url: [
                        /^dailymotion\.com\/video\/(\w+)/,
                        /^dai.ly\/(\w+)/
                    ],
                    html: (match)=>{
                        const id = match[1];
                        return '<div style="position: relative; padding-bottom: 100%; height: 0; ">' + `<iframe src="https://www.dailymotion.com/embed/video/${id}" ` + 'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' + 'frameborder="0" width="480" height="270" allowfullscreen allow="autoplay">' + '</iframe>' + '</div>';
                    }
                },
                {
                    name: 'spotify',
                    url: [
                        /^open\.spotify\.com\/(artist\/\w+)/,
                        /^open\.spotify\.com\/(album\/\w+)/,
                        /^open\.spotify\.com\/(track\/\w+)/
                    ],
                    html: (match)=>{
                        const id = match[1];
                        return '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 126%;">' + `<iframe src="https://open.spotify.com/embed/${id}" ` + 'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' + 'frameborder="0" allowtransparency="true" allow="encrypted-media">' + '</iframe>' + '</div>';
                    }
                },
                {
                    name: 'youtube',
                    url: [
                        /^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)(?:&t=(\d+))?/,
                        /^(?:m\.)?youtube\.com\/v\/([\w-]+)(?:\?t=(\d+))?/,
                        /^youtube\.com\/embed\/([\w-]+)(?:\?start=(\d+))?/,
                        /^youtu\.be\/([\w-]+)(?:\?t=(\d+))?/
                    ],
                    html: (match)=>{
                        const id = match[1];
                        const time = match[2];
                        return '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' + `<iframe src="https://www.youtube.com/embed/${id}${time ? `?start=${time}` : ''}" ` + 'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' + 'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' + '</iframe>' + '</div>';
                    }
                },
                {
                    name: 'vimeo',
                    url: [
                        /^vimeo\.com\/(\d+)/,
                        /^vimeo\.com\/[^/]+\/[^/]+\/video\/(\d+)/,
                        /^vimeo\.com\/album\/[^/]+\/video\/(\d+)/,
                        /^vimeo\.com\/channels\/[^/]+\/(\d+)/,
                        /^vimeo\.com\/groups\/[^/]+\/videos\/(\d+)/,
                        /^vimeo\.com\/ondemand\/[^/]+\/(\d+)/,
                        /^player\.vimeo\.com\/video\/(\d+)/
                    ],
                    html: (match)=>{
                        const id = match[1];
                        return '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' + `<iframe src="https://player.vimeo.com/video/${id}" ` + 'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' + 'frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>' + '</iframe>' + '</div>';
                    }
                },
                {
                    name: 'instagram',
                    url: /^instagram\.com\/p\/(\w+)/
                },
                {
                    name: 'twitter',
                    url: /^twitter\.com/
                },
                {
                    name: 'googleMaps',
                    url: [
                        /^google\.com\/maps/,
                        /^goo\.gl\/maps/,
                        /^maps\.google\.com/,
                        /^maps\.app\.goo\.gl/
                    ]
                },
                {
                    name: 'flickr',
                    url: /^flickr\.com/
                },
                {
                    name: 'facebook',
                    url: /^facebook\.com/
                }
            ]
        });
        this.registry = new MediaRegistry(editor.locale, editor.config.get('mediaEmbed'));
    }
}

const URL_REGEXP = /^(?:http(s)?:\/\/)?[\w-]+\.[\w-.~:/?#[\]@!$&'()*+,;=%]+$/;
class AutoMediaEmbed extends Plugin {
    /**
     * @inheritDoc
     */ static get requires() {
        return [
            Clipboard,
            Delete,
            Undo
        ];
    }
    /**
     * @inheritDoc
     */ static get pluginName() {
        return 'AutoMediaEmbed';
    }
    /**
     * @inheritDoc
     */ init() {
        const editor = this.editor;
        const modelDocument = editor.model.document;
        // We need to listen on `Clipboard#inputTransformation` because we need to save positions of selection.
        // After pasting, the content between those positions will be checked for a URL that could be transformed
        // into media.
        const clipboardPipeline = editor.plugins.get('ClipboardPipeline');
        this.listenTo(clipboardPipeline, 'inputTransformation', ()=>{
            const firstRange = modelDocument.selection.getFirstRange();
            const leftLivePosition = LivePosition.fromPosition(firstRange.start);
            leftLivePosition.stickiness = 'toPrevious';
            const rightLivePosition = LivePosition.fromPosition(firstRange.end);
            rightLivePosition.stickiness = 'toNext';
            modelDocument.once('change:data', ()=>{
                this._embedMediaBetweenPositions(leftLivePosition, rightLivePosition);
                leftLivePosition.detach();
                rightLivePosition.detach();
            }, {
                priority: 'high'
            });
        });
        const undoCommand = editor.commands.get('undo');
        undoCommand.on('execute', ()=>{
            if (this._timeoutId) {
                global.window.clearTimeout(this._timeoutId);
                this._positionToInsert.detach();
                this._timeoutId = null;
                this._positionToInsert = null;
            }
        }, {
            priority: 'high'
        });
    }
    /**
     * Analyzes the part of the document between provided positions in search for a URL representing media.
     * When the URL is found, it is automatically converted into media.
     *
     * @param leftPosition Left position of the selection.
     * @param rightPosition Right position of the selection.
     */ _embedMediaBetweenPositions(leftPosition, rightPosition) {
        const editor = this.editor;
        const mediaRegistry = editor.plugins.get(MediaEmbedEditing).registry;
        // TODO: Use marker instead of LiveRange & LivePositions.
        const urlRange = new LiveRange(leftPosition, rightPosition);
        const walker = urlRange.getWalker({
            ignoreElementEnd: true
        });
        let url = '';
        for (const node of walker){
            if (node.item.is('$textProxy')) {
                url += node.item.data;
            }
        }
        url = url.trim();
        // If the URL does not match to universal URL regexp, let's skip that.
        if (!url.match(URL_REGEXP)) {
            urlRange.detach();
            return;
        }
        // If the URL represents a media, let's use it.
        if (!mediaRegistry.hasMedia(url)) {
            urlRange.detach();
            return;
        }
        const mediaEmbedCommand = editor.commands.get('mediaEmbed');
        // Do not anything if media element cannot be inserted at the current position (#47).
        if (!mediaEmbedCommand.isEnabled) {
            urlRange.detach();
            return;
        }
        // Position won't be available in the `setTimeout` function so let's clone it.
        this._positionToInsert = LivePosition.fromPosition(leftPosition);
        // This action mustn't be executed if undo was called between pasting and auto-embedding.
        this._timeoutId = global.window.setTimeout(()=>{
            editor.model.change((writer)=>{
                this._timeoutId = null;
                writer.remove(urlRange);
                urlRange.detach();
                let insertionPosition = null;
                // Check if position where the media element should be inserted is still valid.
                // Otherwise leave it as undefined to use document.selection - default behavior of model.insertContent().
                if (this._positionToInsert.root.rootName !== '$graveyard') {
                    insertionPosition = this._positionToInsert;
                }
                insertMedia(editor.model, url, insertionPosition, false);
                this._positionToInsert.detach();
                this._positionToInsert = null;
            });
            editor.plugins.get(Delete).requestUndoOnBackspace();
        }, 100);
    }
    /**
     * @inheritDoc
     */ constructor(editor){
        super(editor);
        this._timeoutId = null;
        this._positionToInsert = null;
    }
}

class MediaFormView extends View {
    /**
     * @inheritDoc
     */ render() {
        super.render();
        submitHandler({
            view: this
        });
        const childViews = [
            this.urlInputView,
            this.saveButtonView,
            this.cancelButtonView
        ];
        childViews.forEach((v)=>{
            // Register the view as focusable.
            this._focusables.add(v);
            // Register the view in the focus tracker.
            this.focusTracker.add(v.element);
        });
        // Start listening for the keystrokes coming from #element.
        this.keystrokes.listenTo(this.element);
        const stopPropagation = (data)=>data.stopPropagation();
        // Since the form is in the dropdown panel which is a child of the toolbar, the toolbar's
        // keystroke handler would take over the key management in the URL input. We need to prevent
        // this ASAP. Otherwise, the basic caret movement using the arrow keys will be impossible.
        this.keystrokes.set('arrowright', stopPropagation);
        this.keystrokes.set('arrowleft', stopPropagation);
        this.keystrokes.set('arrowup', stopPropagation);
        this.keystrokes.set('arrowdown', stopPropagation);
    }
    /**
     * @inheritDoc
     */ destroy() {
        super.destroy();
        this.focusTracker.destroy();
        this.keystrokes.destroy();
    }
    /**
     * Focuses the fist {@link #_focusables} in the form.
     */ focus() {
        this._focusCycler.focusFirst();
    }
    /**
     * The native DOM `value` of the {@link #urlInputView} element.
     *
     * **Note**: Do not confuse it with the {@link module:ui/inputtext/inputtextview~InputTextView#value}
     * which works one way only and may not represent the actual state of the component in the DOM.
     */ get url() {
        return this.urlInputView.fieldView.element.value.trim();
    }
    set url(url) {
        this.urlInputView.fieldView.element.value = url.trim();
    }
    /**
     * Validates the form and returns `false` when some fields are invalid.
     */ isValid() {
        this.resetFormStatus();
        for (const validator of this._validators){
            const errorText = validator(this);
            // One error per field is enough.
            if (errorText) {
                // Apply updated error.
                this.urlInputView.errorText = errorText;
                return false;
            }
        }
        return true;
    }
    /**
     * Cleans up the supplementary error and information text of the {@link #urlInputView}
     * bringing them back to the state when the form has been displayed for the first time.
     *
     * See {@link #isValid}.
     */ resetFormStatus() {
        this.urlInputView.errorText = null;
        this.urlInputView.infoText = this._urlInputViewInfoDefault;
    }
    /**
     * Creates a labeled input view.
     *
     * @returns Labeled input view instance.
     */ _createUrlInput() {
        const t = this.locale.t;
        const labeledInput = new LabeledFieldView(this.locale, createLabeledInputText);
        const inputField = labeledInput.fieldView;
        this._urlInputViewInfoDefault = t('Paste the media URL in the input.');
        this._urlInputViewInfoTip = t('Tip: Paste the URL into the content to embed faster.');
        labeledInput.label = t('Media URL');
        labeledInput.infoText = this._urlInputViewInfoDefault;
        inputField.on('input', ()=>{
            // Display the tip text only when there is some value. Otherwise fall back to the default info text.
            labeledInput.infoText = inputField.element.value ? this._urlInputViewInfoTip : this._urlInputViewInfoDefault;
            this.mediaURLInputValue = inputField.element.value.trim();
        });
        return labeledInput;
    }
    /**
     * Creates a button view.
     *
     * @param label The button label.
     * @param icon The button icon.
     * @param className The additional button CSS class name.
     * @param eventName An event name that the `ButtonView#execute` event will be delegated to.
     * @returns The button view instance.
     */ _createButton(label, icon, className, eventName) {
        const button = new ButtonView(this.locale);
        button.set({
            label,
            icon,
            tooltip: true
        });
        button.extendTemplate({
            attributes: {
                class: className
            }
        });
        if (eventName) {
            button.delegate('execute').to(this, eventName);
        }
        return button;
    }
    /**
     * @param validators Form validators used by {@link #isValid}.
     * @param locale The localization services instance.
     */ constructor(validators, locale){
        super(locale);
        const t = locale.t;
        this.focusTracker = new FocusTracker();
        this.keystrokes = new KeystrokeHandler();
        this.set('mediaURLInputValue', '');
        this.urlInputView = this._createUrlInput();
        this.saveButtonView = this._createButton(t('Save'), icons.check, 'ck-button-save');
        this.saveButtonView.type = 'submit';
        this.cancelButtonView = this._createButton(t('Cancel'), icons.cancel, 'ck-button-cancel', 'cancel');
        this._focusables = new ViewCollection();
        this._focusCycler = new FocusCycler({
            focusables: this._focusables,
            focusTracker: this.focusTracker,
            keystrokeHandler: this.keystrokes,
            actions: {
                // Navigate form fields backwards using the <kbd>Shift</kbd> + <kbd>Tab</kbd> keystroke.
                focusPrevious: 'shift + tab',
                // Navigate form fields forwards using the <kbd>Tab</kbd> key.
                focusNext: 'tab'
            }
        });
        this._validators = validators;
        this.setTemplate({
            tag: 'form',
            attributes: {
                class: [
                    'ck',
                    'ck-media-form',
                    'ck-responsive-form'
                ],
                tabindex: '-1'
            },
            children: [
                this.urlInputView,
                this.saveButtonView,
                this.cancelButtonView
            ]
        });
    }
}

var mediaIcon = "<svg viewBox=\"0 0 22 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1.587 1.5c-.612 0-.601-.029-.601.551v14.84c0 .59-.01.559.591.559h18.846c.602 0 .591.03.591-.56V2.052c0-.58.01-.55-.591-.55H1.587Zm.701.971h1.003v1H2.288v-1Zm16.448 0h1.003v1h-1.003v-1Zm-14.24 1h13.008v12H4.467l.029-12Zm-2.208 1h1.003v1H2.288v-1Zm16.448 0h1.003v1h-1.003v-1Zm-16.448 2h1.003v1H2.288v-1Zm16.448 0h1.003v1h-1.003v-1Zm-16.448 2h1.003v1H2.288v-1Zm16.448 0h1.003v1h-1.003v-1Zm-16.448 2h1.003v1H2.288v-1Zm16.448 0h1.003v1h-1.003v-1Zm-16.448 2h1.003l-.029 1h-.974v-1Zm16.448 0h1.003v1h-1.003v-1Zm-16.448 2h.974v1h-.974v-1Zm16.448 0h1.003v1h-1.003v-1Z\"/><path d=\"M8.374 6.648a.399.399 0 0 1 .395-.4.402.402 0 0 1 .2.049l5.148 2.824a.4.4 0 0 1 0 .7l-5.148 2.824a.403.403 0 0 1-.595-.35V6.648Z\"/></svg>";

class MediaEmbedUI extends Plugin {
    /**
     * @inheritDoc
     */ static get requires() {
        return [
            MediaEmbedEditing
        ];
    }
    /**
     * @inheritDoc
     */ static get pluginName() {
        return 'MediaEmbedUI';
    }
    /**
     * @inheritDoc
     */ init() {
        const editor = this.editor;
        const command = editor.commands.get('mediaEmbed');
        editor.ui.componentFactory.add('mediaEmbed', (locale)=>{
            const dropdown = createDropdown(locale);
            this._setUpDropdown(dropdown, command);
            return dropdown;
        });
    }
    _setUpDropdown(dropdown, command) {
        const editor = this.editor;
        const t = editor.t;
        const button = dropdown.buttonView;
        const registry = editor.plugins.get(MediaEmbedEditing).registry;
        dropdown.once('change:isOpen', ()=>{
            const form = new (CssTransitionDisablerMixin(MediaFormView))(getFormValidators(editor.t, registry), editor.locale);
            dropdown.panelView.children.add(form);
            // Note: Use the low priority to make sure the following listener starts working after the
            // default action of the drop-down is executed (i.e. the panel showed up). Otherwise, the
            // invisible form/input cannot be focused/selected.
            button.on('open', ()=>{
                form.disableCssTransitions();
                // Make sure that each time the panel shows up, the URL field remains in sync with the value of
                // the command. If the user typed in the input, then canceled (`urlInputView#fieldView#value` stays
                // unaltered) and re-opened it without changing the value of the media command (e.g. because they
                // didn't change the selection), they would see the old value instead of the actual value of the
                // command.
                form.url = command.value || '';
                form.urlInputView.fieldView.select();
                form.enableCssTransitions();
            }, {
                priority: 'low'
            });
            dropdown.on('submit', ()=>{
                if (form.isValid()) {
                    editor.execute('mediaEmbed', form.url);
                    editor.editing.view.focus();
                }
            });
            dropdown.on('change:isOpen', ()=>form.resetFormStatus());
            dropdown.on('cancel', ()=>{
                editor.editing.view.focus();
            });
            form.delegate('submit', 'cancel').to(dropdown);
            form.urlInputView.fieldView.bind('value').to(command, 'value');
            // Update balloon position when form error changes.
            form.urlInputView.on('change:errorText', ()=>{
                editor.ui.update();
            });
            // Form elements should be read-only when corresponding commands are disabled.
            form.urlInputView.bind('isEnabled').to(command, 'isEnabled');
        });
        dropdown.bind('isEnabled').to(command);
        button.set({
            label: t('Insert media'),
            icon: mediaIcon,
            tooltip: true
        });
    }
}
function getFormValidators(t, registry) {
    return [
        (form)=>{
            if (!form.url.length) {
                return t('The URL must not be empty.');
            }
        },
        (form)=>{
            if (!registry.hasMedia(form.url)) {
                return t('This media URL is not supported.');
            }
        }
    ];
}

class MediaEmbed extends Plugin {
    /**
     * @inheritDoc
     */ static get requires() {
        return [
            MediaEmbedEditing,
            MediaEmbedUI,
            AutoMediaEmbed,
            Widget
        ];
    }
    /**
     * @inheritDoc
     */ static get pluginName() {
        return 'MediaEmbed';
    }
}

class MediaEmbedToolbar extends Plugin {
    /**
     * @inheritDoc
     */ static get requires() {
        return [
            WidgetToolbarRepository
        ];
    }
    /**
     * @inheritDoc
     */ static get pluginName() {
        return 'MediaEmbedToolbar';
    }
    /**
     * @inheritDoc
     */ afterInit() {
        const editor = this.editor;
        const t = editor.t;
        const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);
        widgetToolbarRepository.register('mediaEmbed', {
            ariaLabel: t('Media toolbar'),
            items: editor.config.get('mediaEmbed.toolbar') || [],
            getRelatedElement: getSelectedMediaViewWidget
        });
    }
}

export { AutoMediaEmbed, MediaEmbed, MediaEmbedEditing, MediaEmbedToolbar, MediaEmbedUI };
//# sourceMappingURL=index.js.map
