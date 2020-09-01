/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { ResizableBox } = wp.components;

const {
	Fragment,
	useEffect,
	useRef,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import Inspector from './inspector.js';

const ProgressBar = ({
	attributes,
	setAttributes,
	className,
	isSelected,
	toggleSelection
}) => {
	const [ showPercentage, setShowPercentage ] = useState( false );

	const [ heightMode, setHeightMode ] = useState({
		isAutomatic: false,
		titleStyle: attributes.titleStyle,
		percentagePosition: attributes.percentagePosition
	});

	const barRef = useRef( null );

	useEffect( () => {
		if ( ! barRef.current ) {
			return;
		}

		setShowPercentage( false );

		setTimeout( () => setShowPercentage( true ),  attributes.duration * 1000 );

		barRef.current.animate(
			{
				width: `${ attributes.percentage }%`
			},
			{
				duration: attributes.duration * 1000,
				easing: 'linear',
				fill: 'forwards'
			}
		);
	}, [ attributes.percentage, attributes.duration ]);

	const fontRatio = 0.342;

	const onHeightChange = value => {
		if ( 35 > value ) {
			if ( ! heightMode.isAutomatic ) {
				setHeightMode({
					isAutomatic: true,
					titleStyle: attributes.titleStyle,
					percentagePosition: attributes.percentagePosition
				});

			}

			setAttributes({
				height: value,
				titleStyle: 'outer',
				percentagePosition: 'inline' === attributes.percentagePosition ? 'outer' : attributes.percentagePosition
			});
		} else {
			if ( heightMode.isAutomatic ) {
				setHeightMode({
					isAutomatic: false
				});
			}

			setAttributes({
				titleStyle: heightMode.isAutomatic ? heightMode.titleStyle : attributes.titleStyle,
				percentagePosition: heightMode.isAutomatic ? heightMode.percentagePosition : attributes.percentagePosition,
				height: value
			});
		}
	};

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				onHeightChange={ onHeightChange }
				heightMode={ heightMode }
				setHeightMode={ setHeightMode }
			/>

			<div className={ className }>
				{ ( 'outer' === attributes.titleStyle || 'outer' === attributes.percentagePosition ) && (
					<div className="wp-block-themeisle-blocks-progress-bar__outer">
						{ 'outer' === attributes.titleStyle && (
							<span className="wp-block-themeisle-blocks-progress-bar__outer__title">
								{ attributes.title }
							</span>
						) }

						{ 'outer' === attributes.percentagePosition && showPercentage && (
							<div className="wp-block-themeisle-blocks-progress-bar__progress wp-block-themeisle-blocks-progress-bar__outer__value">
								{ `${ attributes.percentage }%` }
							</div>
						)}
					</div>
				) }

				<ResizableBox
					size={ {
						height: attributes.height
					} }
					minHeight={ 10 }
					maxHeight={ 100 }
					enable={ {
						top: false,
						right: false,
						bottom: true,
						left: false
					} }
					showHandle={ isSelected }
					onResizeStop={ ( event, direction, elt, delta ) => {
						onHeightChange( parseInt( attributes.height + delta.height, 10 ) );
						toggleSelection( true );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
					} }
				>

					<div
						className="wp-block-themeisle-blocks-progress-bar__area"
						style={ {
							background: attributes.backgroundColor,
							borderRadius: `${ attributes.borderRadius }px`,
							height: `${ attributes.height }px`
						} }
					>
						{ ( 'default' === attributes.titleStyle || 'simple' === attributes.titleStyle ) && (
							<div
								className={ classnames(
									'wp-block-themeisle-blocks-progress-bar__area__title',
									{ 'transparent': 'simple' === attributes.titleStyle }
								) }
								style={ {
									fontSize: `${ attributes.height * fontRatio }px`,
									background: attributes.barBackgroundColor,
									borderRadius: `${ attributes.borderRadius }px`,
									height: `${ attributes.height }px`
								} }
							>
								<span
									style={ {
										height: `${ attributes.height }px`,
										borderRadius: `${ attributes.borderRadius }px 0px 0px ${ attributes.borderRadius }px`
									} }
								>
									{ attributes.title }
								</span>
							</div>
						) }

						<div
							className="wp-block-themeisle-blocks-progress-bar__area__bar"
							ref={ barRef }
							style={ {
								background: attributes.barBackgroundColor,
								borderRadius: `${ attributes.borderRadius }px`,
								height: `${ attributes.height }px`
							} }
						>
							{ 'tooltip' === attributes.percentagePosition && showPercentage && (
								<span className="wp-block-themeisle-blocks-progress-bar__area__tooltip">
									{ `${ attributes.percentage }%` }
									<span className="wp-block-themeisle-blocks-progress-bar__area__arrow"></span>
								</span>
							)}
						</div>

						{ 'inline' === attributes.percentagePosition && showPercentage && (
							<div
								className="wp-block-themeisle-blocks-progress-bar__progress"
								style={ {
									fontSize: `${ attributes.height * fontRatio }px`,
									height: `${ attributes.height }px`
								} }
							>
								{ `${ attributes.percentage }%` }
							</div>
						)}
					</div>
				</ResizableBox>
			</div>
		</Fragment>
	);
};

export default ProgressBar;
