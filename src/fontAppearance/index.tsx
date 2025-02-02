import { type RefObject, useState } from 'react';
import {
	removeFormat,
	useAnchor,
} from '@wordpress/rich-text';
import type { RichTextValue } from '@wordpress/rich-text';
import { typography } from '@wordpress/icons';
import {
	RichTextToolbarButton,
	// @ts-ignore
	useSettings,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';
import { Button, Popover } from '@wordpress/components';
export const formatName = 'inline-typography-controls/font-appearance';

export const settings = {
	title: __( 'Font appearance' ),
	tagName: 'span',
	className: 'has-inline-font-appearance',
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
				onClick={ togglePopover }
				isActive={ isActive }
				role="menuitemcheckbox"
			/>
			{ isPopoverVisible && (
				<InlineAppearanceUI
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

type InlineAppearanceUIProps = {
	value: RichTextValue;
	contentRef: RefObject< HTMLElement >;
	onChange: ( value: RichTextValue ) => void;
	onClose: () => void;
	isActive: boolean;
};
function InlineAppearanceUI( {
	value,
	contentRef,
	onChange,
	onClose,
	isActive,
}: InlineAppearanceUIProps ) {
	const [ fontStyle, fontWeight ] = useSettings(
		'typography.fontStyle',
		'typography.fontWeight'
	);

	console.log({ fontStyle, fontWeight });

	const popoverAnchor = useAnchor( {
		editableContentElement: contentRef.current,
		// @ts-ignore
		settings: { ...settings, isActive },
	} );

	return (
		<Popover
			anchor={ popoverAnchor }
			onClose={ onClose }
			className="inline-typography-controls-font-size-popover"
		>
			<div style={ { marginTop: '16px', display: 'flex' } }>
				<Button
					onClick={ () => {
						onChange( removeFormat( value, formatName ) );
					} }
					variant="tertiary"
					style={ { marginLeft: 'auto' } }
				>
					{ __( 'Clear' ) }
				</Button>
			</div>
		</Popover>
	);
}
