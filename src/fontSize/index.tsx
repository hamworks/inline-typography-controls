import { type RefObject, useState } from 'react';
import {
	removeFormat,
	applyFormat,
	useAnchor,
	getActiveFormat,
} from '@wordpress/rich-text';
import type { RichTextValue } from '@wordpress/rich-text';
import { typography } from '@wordpress/icons';

import {
	RichTextToolbarButton,
	// @ts-ignore
	useSettings,
} from '@wordpress/block-editor';
import { Popover, FontSizePicker, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const formatName = 'inline-typography-controls/font-size';

export const settings = {
	title: __( 'Font size' ),
	tagName: 'span',
	className: 'has-inline-font-size',
	interactive: false,
	name: formatName,
	edit: Edit,
};

// @ts-ignore
function Edit( { isActive, onChange, value, contentRef } ) {
	const [ isPopoverVisible, setIsPopoverVisible ] = useState( false );
	const togglePopover = () => {
		setIsPopoverVisible( ( state ) => ! state );
	};
	return (
		<>
			<RichTextToolbarButton
				icon={ typography }
				title={ settings.title }
				onClick={ () => {
					if ( isActive ) {
						onChange( removeFormat( value, formatName ) );
					} else {
						togglePopover();
					}
				} }
				isActive={ isActive }
				role="menuitemcheckbox"
			/>
			{ isPopoverVisible && (
				<InlineFontSizeUI
					isActive={ isActive }
					value={ value }
					onChange={ onChange }
					onClose={ togglePopover }
					contentRef={ contentRef }
				/>
			) }
		</>
	);
}

type InlineFontSizeUIProps = {
	value: RichTextValue;
	contentRef: RefObject< HTMLElement >;
	onChange: ( value: RichTextValue ) => void;
	onClose: () => void;
	isActive: boolean;
};
function InlineFontSizeUI( {
	value,
	contentRef,
	onChange,
	onClose,
	isActive,
}: InlineFontSizeUIProps ) {
	const [ fontSizes ] = useSettings( 'typography.fontSizes' );

	const activeInlineFontSizeFormat = getActiveFormat( value, formatName );
	const activeFontSize: string =
		// @ts-ignore
		activeInlineFontSizeFormat?.attributes?.[ 'data-inline-font-size' ] ??
		'';

	const popoverAnchor = useAnchor( {
		editableContentElement: contentRef.current,
		// @ts-ignore
		settings: { ...settings, isActive },
	} );

	const onChangeFontSize = ( fontSize: string | number | undefined ) => {
		if ( ! fontSize ) {
			onChange( removeFormat( value, formatName ) );
		} else {
			// @ts-ignore
			onChange(
				applyFormat( value, {
					type: formatName,
					// @ts-ignore
					attributes: {
						'data-inline-font-size': `${ fontSize }`,
						style: `font-size: ${ fontSize };`,
					},
				} )
			);
		}
	};

	return (
		<Popover anchor={ popoverAnchor } onClose={ onClose }>
			<div style={ { padding: '1em', width: '300px' } }>
				<FontSizePicker
					fontSizes={ fontSizes }
					onChange={ onChangeFontSize }
					value={ activeFontSize }
				/>
				<div style={ { marginTop: '1em' } }>
					<Button onClick={ onClose } variant="secondary">
						{ __( 'Apply' ) }
					</Button>
				</div>
			</div>
		</Popover>
	);
}
