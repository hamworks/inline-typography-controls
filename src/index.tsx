import { type RefObject, useState } from 'react';
import {
	registerFormatType,
	removeFormat,
	applyFormat,
	useAnchor,
	getActiveFormat,
} from '@wordpress/rich-text';
import type { RichTextValue } from '@wordpress/rich-text';

import {
	RichTextToolbarButton,
	// @ts-ignore
	useSettings,
} from '@wordpress/block-editor';
import { Popover, FontSizePicker, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const formatName = 'inline-typography-control/font-size';

// @ts-ignore
const Edit = ( { isActive, onChange, value, contentRef } ) => {
	const [ isPopoverVisible, setIsPopoverVisible ] = useState( false );
	const togglePopover = () => {
		setIsPopoverVisible( ( state ) => ! state );
	};
	return (
		<>
			<RichTextToolbarButton
				icon="editor-code"
				title="Sample output"
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
				<InlineUI
					isActive={ isActive }
					value={ value }
					onChange={ onChange }
					onClose={ togglePopover }
					contentRef={ contentRef }
				/>
			) }
		</>
	);
};

type InlineUIProps = {
	value: RichTextValue;
	contentRef: RefObject< HTMLElement >;
	onChange: ( value: any ) => void;
	onClose: () => void;
	isActive: boolean;
};
function InlineUI( {
	value,
	contentRef,
	onChange,
	onClose,
	isActive,
}: InlineUIProps ) {
	const [ fontSizes ] = useSettings( 'typography.fontSizes' );
	const activeInlineFontSizeFormat = getActiveFormat( value, formatName );
	// @ts-ignore
	const activeFontSize: string = activeInlineFontSizeFormat?.attributes?.data;
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
						data: `${ fontSize }`,
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
					withSlider
					size="__unstable-large"
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

const settings = {
	title: 'Sample output',
	tagName: 'span',
	className: 'has-inline-font-size',
	interactive: false,
	name: formatName,
	edit: Edit,
};

registerFormatType( formatName, settings );
