import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';

const formatName = 'inline-font-control/sample-output';

// @ts-ignore
const MyCustomButton = ( { isActive, onChange, value } ) => {
	return (
		<RichTextToolbarButton
			icon="editor-code"
			title="Sample output"
			onClick={ () => {
				onChange(
					toggleFormat( value, {
						type: formatName,
					} )
				);
			} }
			isActive={ isActive }
		/>
	);
};

registerFormatType( formatName, {
	title: 'Sample output',
	tagName: 'span',
	className: 'has-inline-font-size',
	interactive: false,
	name: formatName,
	edit: MyCustomButton,
} );
