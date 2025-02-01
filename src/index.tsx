import * as fontSize from './fontSize';
import { registerFormatType } from '@wordpress/rich-text';

registerFormatType( fontSize.formatName, fontSize.settings );
