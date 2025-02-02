import { registerFormatType } from '@wordpress/rich-text';

import * as fontSize from './fontSize';
import * as inlineBlock from './inlineBlock';

registerFormatType( fontSize.formatName, fontSize.settings );
registerFormatType( inlineBlock.formatName, inlineBlock.settings );
