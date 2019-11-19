import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = wp.editor;
import { blockProps, ContainerSave, uo } from '../commonComponents/container/container';
import { getTypography } from '../commonComponents/typography/typography';
import { linkProps } from '../commonComponents/link/link';
import { hexToRGB } from '../commonComponents/helpers/helpers';
import Edit from './edit';

/**
 * Generate inline styles for custom settings of the block
 * @param {Object} attributes - of the block
 * @returns {Node} generated styles
 */
export const getStyles = attributes => {
    const kenzapContanerStyles = {
        maxWidth: `${ attributes.containerMaxWidth === '100%' ? '100%' : attributes.containerMaxWidth + 'px' }`,
        '--maxWidth': `${ attributes.containerMaxWidth === '100%' ? '100wh' : attributes.containerMaxWidth + ' ' } `,
    };

    const vars = {
        '--paddings': `${ attributes.containerPadding }`,
        '--paddings2': `${ attributes.containerSidePadding }px`,
        '--textColor': `${ attributes.textColor }`,
        '--textColor2': `${ hexToRGB(attributes.textColor2, 1) }`,
        '--textColor23': `${ hexToRGB(attributes.textColor23, 1) }`,
        '--textColor3': `${ hexToRGB(attributes.textColor2, 0.7) }`,
        '--textColor4': `${ hexToRGB(attributes.textColor3, attributes.opacity/100) }`,
        '--textColor5': `${ hexToRGB(attributes.textColor4, attributes.opacity/100) }`,
        '--angle': `${ attributes.angle }deg`,

    };

    if ( attributes.backgroundColor ) { vars["--backgroundColor"] = attributes.backgroundColor; }
    
    return {
        vars,
        kenzapContanerStyles,
    };
};

/**
 * Define typography defaults
 */
export const typographyArr = JSON.stringify([
    {
        'title': __( '- Title', 'kenzap-cta' ),
        'type': 'title',
        'font-size': 47,
        'font-weight': 6,
        'line-height': 50,
        'margin-bottom': 20,
        'color': '#ffffff',
    },
    {
        'title': __( '- Subtitle', 'kenzap-cta' ),
        'type': 'title',
        'font-size': 36,
        'font-weight': 6,
        'line-height': 43,
        'margin-bottom': 20,
        'color': '#ffffff'
    },
    {
        'title': __( '- Location', 'kenzap-cta' ),
        'font-size': 15,
        'font-weight': 4,
        'line-height': 15,
        'margin-bottom': 0,
        'color': '#ffffff'
    },
    {
        'title': __( '- Note', 'kenzap-cta' ),
        'font-size': 22,
        'font-weight': 6,
        'line-height': 22,
        'margin-bottom': 10,
        'color': '#9376df'
    },
    {
        'title': __( '- Button', 'kenzap-cta' ),
        'type': 'button',
        'font-size': 15,
        'font-weight': 4,
        'line-height': 24,
        'margin-top': 25,
        'padding-top': 18,
        'padding-right': 48,
        'padding-bottom': 18,
        'padding-left': 48,
        'border-radius': 30,
        'border-width': 1,
        'color': '#ffffff',
        'background-color': '#9376df',
        'hover-color': '#9376df',
        'hover-background-color': '#ffffff'
    },
]);

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'kenzap/cta-18', {
    title: __( 'Kenzap Banner 1', 'kenzap-cta' ),
    icon: 'migrate',
    category: 'layout',
    keywords: [
        __( 'Banner', 'kenzap-cta' ),
        __( 'call to action cta 18', 'kenzap-cta' ),
        __( 'ticketing', 'kenzap-cta' ),
    ],
    html: true,
    supports: {
        align: [ 'full', 'wide' ],
        anchor: true,
    },
    attributes: {
        ...blockProps,
        ...linkProps,

        align: {
            type: 'string',
            default: 'full',
        },

        title: {
            type: 'string',
            default: __( 'BMW OPEN', 'kenzap-cta' ),
        },

        subtitle: {
            type: 'string',
            default: __( 'MEN’S GOLF CHAMPIONSHIP', 'kenzap-cta' ),
        },

        location: {
            type: 'string',
            default: __( '75 E. Eagle Lane Little Rock, AR 72209', 'kenzap-cta' ),
        },

        left: {
            type: 'string',
            default: __( '17 TICKETS LEFT!', 'kenzap-cta' ),
        },

        day: {
            type: 'string',
            default: __( '09', 'kenzap-cta' ),
        },

        month: {
            type: 'string',
            default: __( 'May', 'kenzap-cta' ),
        },

        angle: {
            type: 'number',
            default: 135,
        },

        openFirst: {
            type: 'boolean',
            default: true,
        },

        img1: {
            type: 'string',
            default: uo(window.kenzap_cta_path + "images/location.svg"),
        },

        img1Size: {
            type: 'number',
            default: 10,
        },
        
        alt1: {
            type: 'string',
            default: 'image',
        },

        textColor2: {
            type: 'string',
        },

        textColor23: {
            type: 'string',
        },

        textColor3: {
            type: 'string',
        },

        textColor4: {
            type: 'string',
        },

        opacity: {
            type: 'number',
            default: 89,
        },

        typography: {
            type: 'array',
            default: [],
        },

        isFirstLoad: {
            type: 'boolean',
            default: true,
        },

        blockUniqId: {
            type: 'number',
            default: 0,
        },

        isVisible: {
            type: 'boolean',
            default: false,
        },

        randomValue: {
            type: 'string'
        }
    },

    edit: ( props ) => {

        if(props.attributes.isFirstLoad){

            props.setAttributes( { backgroundColor: '#fff', containerPadding: 140, backgroundImage: uo(window.kenzap_cta_path + "images/banner-img-1.jpg"), backgroundImageId:10, isFirstLoad: false } );
            props.setAttributes( { textColor2: '#9376df', textColor23:'#ffffff', textColor3:'#115a00', textColor4: '#000000' } );
        }
 
        return ( <Edit { ...props } /> );
    },

    /**
     * The save function defines the way in which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     * @param {Object} props - attributes
     * @returns {Node} rendered component
     */
    save: function( props ) {
        const {
            className,
            attributes,
        } = props;

        const { vars, kenzapContanerStyles } = getStyles( props.attributes );

        return (
            <div id={ attributes.anchor } className={ className ? className : '' } style={ vars }>
                <ContainerSave
                    className={ `kp-bn1 block-${ attributes.blockUniqId }` }
                    attributes={ attributes }
                    style={ vars }
                    withBackground
                    withPadding
                    >

                    <div class="kenzap-container" style={ kenzapContanerStyles }>
                        { attributes.nestedBlocks == 'top' && <InnerBlocks.Content /> }
                        <div class="kp-content">
                            <div class="date">

                                { attributes.day && <RichText.Content
                                    tagName="span"
                                    className="day"
                                    value={ attributes.day } /> }

                                { attributes.month && <RichText.Content
                                    tagName="span"
                                    className="month"
                                    value={ attributes.month } /> }
                            </div>

                            { attributes.title && <RichText.Content
                                tagName="h1"
                                className="title"
                                style={ getTypography( attributes, 0 ) }
                                value={ attributes.title } /> }
                                
                            { attributes.subtitle && <RichText.Content
                                tagName="p"
                                className="caption"
                                style={ getTypography( attributes, 1 ) }
                                value={ attributes.subtitle } /> }

                            <div class="location">
                                <p>
                                    { attributes.img1 != 'none' && <img style={ { width: `${ attributes.img1Size }px` } } src={ uo(attributes.img1) } alt={ __( 'location icon', 'kenzap-cta' ) } /> }
                                    { attributes.location &&  <RichText.Content
                                        tagName="span"
                                        style={ getTypography( attributes, 2 ) }
                                        className="kp-loc"
                                        value={ attributes.location } /> } 
                                </p>
                            </div>

                            <div class="action">
                                { attributes.left && <RichText.Content
                                    tagName="div"
                                    style={ getTypography( attributes, 3 ) }
                                    className="kp-left"
                                    value={ attributes.left } /> }

                                { attributes.btnLink && <a
                                    className="kp-a" 
                                    href={ attributes.btnLink }
                                    target={ attributes.linkNew ? '_blank' : '_self' }
                                    rel="noopener noreferrer"
                                    style={ getTypography( attributes, 4 ) }
                                    >
                                    { attributes.btnText }
                                </a> }
                            </div>
                        </div>
                        { attributes.nestedBlocks == 'bottom' && <InnerBlocks.Content /> }
                    </div>
                </ContainerSave>
            </div>
        );
    },
} );
