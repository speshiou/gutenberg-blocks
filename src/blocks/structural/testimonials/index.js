/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const { InnerBlocks } = wp.blockEditor;

/**
 * Internal dependencies
 */
import { testimonialsIcon } from '../../../helpers/icons.js';
import edit from './edit.js';
import save from './save.js';

registerBlockType( 'themeisle-blocks/testimonials', {
	title: __( 'Testimonials' ),
	description: __( 'Display kudos from customers and clients and display them on your website.' ),
	icon: testimonialsIcon,
	category: 'themeisle-blocks',
	keywords: [
		'testimonials',
		'quotes',
		'business'
	],
	edit,
	save
});
