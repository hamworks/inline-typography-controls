import { registerFormatType } from '@wordpress/rich-text';

import * as fontAppearance from './fontAppearance';
import * as fontSize from './fontSize';
import * as inlineBlock from './inlineBlock';

registerFormatType( fontAppearance.formatName, fontAppearance.settings );
registerFormatType( fontSize.formatName, fontSize.settings );
registerFormatType( inlineBlock.formatName, inlineBlock.settings );
