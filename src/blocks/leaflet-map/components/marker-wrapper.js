/**
 * External dependencies
 */
import { v4 as uuidv4 } from 'uuid';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Button } = wp.components;

const { Fragment } = wp.element;

import { ActionType } from '../edit.js';

/**
 * Internal dependencies
 */
import Marker from './marker.js';

const MarkerWrapper = ({
	markers,
	dispatch,
	markersInteraction
}) => {
	const { openMarker, setOpenMarker } = markersInteraction;

	return (
		<Fragment>
			<div className="wp-block-themeisle-blocks-leaflet-map-marker-group">
				{ markers.map(  marker => {
					return (
						<Marker
							key={ marker.id }
							marker={ marker }
							isOpen={ openMarker === marker.id }
							openMarker={ () => setOpenMarker( markersInteraction.openMarker !== marker.id ? marker.id : null ) }
							dispatch={ dispatch }
						/>
					);
				}) }
			</div>

			<Button
				isSecondary
				isLarge
				className="wp-block-themeisle-blocks-leaflet-map-marker-add"
				onClick={ () => {
					dispatch({
						type: ActionType.ADD,
						marker: {
							id: uuidv4()
						},
						dispatch: dispatch
					});
				}}
			>
				{ __( 'Add Marker' ) }
			</Button>
		</Fragment>
	);
};

export default MarkerWrapper;
