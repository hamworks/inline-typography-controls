import { __ } from '@wordpress/i18n';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { pencil } from '@wordpress/icons';


export const formatName = 'inline-typography-controls/small';

export const settings = {
	title: __( 'Small' ),
	tagName: 'small',
	className: null,
	interactive: false,
	name: formatName,
	edit: Edit,
};

// @ts-ignore
function Edit( { isActive, onChange, value } ) {
	return (
		<>
			<RichTextToolbarButton
				icon={ pencil }
				title={ settings.title }
				onClick={ () =>
					onChange( toggleFormat( value, { type: formatName } ) )
				}
				isActive={ isActive }
				role="menuitemcheckbox"
			/>
		</>
	);
}
