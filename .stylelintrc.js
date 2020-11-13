module.exports = {
	'plugins': [
		'stylelint-order',
		'stylelint-no-unsupported-browser-features',
	],
	'extends': 'stylelint-config-standard',
	'rules': {

		// To handle <style src="" /> in Vue files
		'no-empty-source': null,

		'indentation': 'tab',

		'property-no-unknown': [true, { ignoreProperties: ['composes'] }],

		'order/order': [
			{
				type: 'at-rule',
				name: 'import',
			},
			'custom-properties',
			'declarations',
			'rules',
			'at-rules',
		],

		'order/properties-order': [
			'composes',

			'display',
			'position',
			'top',
			'right',
			'bottom',
			'left',

			'flex',
			'flex-basis',
			'flex-direction',
			'flex-flow',
			'flex-grow',
			'flex-shrink',
			'flex-wrap',
			'align-content',
			'align-items',
			'align-self',
			'justify-content',
			'order',

			'width',
			'min-width',
			'max-width',

			'height',
			'min-height',
			'max-height',

			'margin',
			'margin-top',
			'margin-right',
			'margin-bottom',
			'margin-left',

			'padding',
			'padding-top',
			'padding-right',
			'padding-bottom',
			'padding-left',

			'float',
			'clear',

			'columns',
			'column-gap',
			'column-fill',
			'column-rule',
			'column-span',
			'column-count',
			'column-width',

			'transform',
			'transform-box',
			'transform-origin',
			'transform-style',

			'transition',
			'transition-delay',
			'transition-duration',
			'transition-property',
			'transition-timing-function',

			// Border

			'border',
			'border-top',
			'border-right',
			'border-bottom',
			'border-left',
			'border-width',
			'border-top-width',
			'border-right-width',
			'border-bottom-width',
			'border-left-width',

			'border-style',
			'border-top-style',
			'border-right-style',
			'border-bottom-style',
			'border-left-style',

			'border-radius',
			'border-top-left-radius',
			'border-top-right-radius',
			'border-bottom-left-radius',
			'border-bottom-right-radius',

			'border-color',
			'border-top-color',
			'border-right-color',
			'border-bottom-color',
			'border-left-color',

			'outline',
			'outline-color',
			'outline-offset',
			'outline-style',
			'outline-width',

			// Background

			'background',
			'background-attachment',
			'background-clip',
			'background-color',
			'background-image',
			'background-repeat',
			'background-position',
			'background-size',

			// Text

			'color',

			'font',
			'font-family',
			'font-size',
			'font-smoothing',
			'font-style',
			'font-variant',
			'font-weight',

			'letter-spacing',
			'line-height',
			'list-style',

			'text-align',
			'text-decoration',
			'text-indent',
			'text-overflow',
			'text-rendering',
			'text-shadow',
			'text-transform',
			'text-wrap',

			'white-space',
			'word-spacing',

			// Other

			'border-collapse',
			'border-spacing',
			'box-shadow',
			'caption-side',
			'content',
			'cursor',
			'empty-cells',
			'opacity',
			'overflow',
			'quotes',
			'speak',
			'table-layout',
			'vertical-align',
			'visibility',
			'z-index',
		],

		// Quotes
		'font-family-name-quotes': 'always-where-recommended',
		'function-url-quotes': 'always',
		'selector-attribute-quotes': 'always',
		'string-quotes': 'double',

		// Spacing

		// We have instances where we cannot add a space after the function call.
		// For example: width: calc(1 / 12)%;
		'function-whitespace-after': null,

		// Disable vendor prefixes because we're using autoprefixer
		'at-rule-no-vendor-prefix': true,
		'media-feature-name-no-vendor-prefix': true,
		'property-no-vendor-prefix': true,
		'selector-no-vendor-prefix': true,
		'value-no-vendor-prefix': true,

		// Max specificity
		'max-nesting-depth': 3,

		// Because we adhere to BEM we can limit the amount of necessary compound selectors. Most should
		// just be 1 level selector. However, modifiers can introduce an additional compound selector.
		// Futhermore, generic qualifying selectors (e.g. `[dir="rtl"]`) can introduce yet another level.
		// https://github.com/material-components/material-components-web/blob/master/.stylelintrc.yaml
		'selector-max-compound-selectors': 4,

		// For specificity: disallow IDs (0). Allow for complex combinations of classes, pseudo-classes,
		// attribute modifiers based on selector-max-compound-selectors, plus an addition for
		// pseudo-classes (4). Allow for pseudo-elements (1).
		// https://github.com/material-components/material-components-web/blob/master/.stylelintrc.yaml
		'selector-max-specificity': '0,4,1',

		'selector-max-id': 0,
		'color-named': 'never',

		'plugin/no-unsupported-browser-features': [true, {
			'severity': 'warning',
			'ignore': [
				// 'appearance' is not part of any spec. But it is useful for removing platform-native
				// styling on elements in Webkit, Blink, and Gecko browsers. We use it on buttons.
				'css-appearance',

				// Safari produces unexpected results when 'transparent' value is used. Otherwise
				// support is good.
				'css-gradients',

				// IE11 is marked as only having partial support. Support is good, but there are a
				// large number of known bugs.
				'flexbox',

				// IE11 is missing outline-offset but we are not utilizing it.
				'outline',

				// No support in IE, Edge, or iOS Safari. But still useful enhancement where supported
				// for disabling native resizing on textaras.
				'css-resize',

				// Common uses of vw and vh are supported in IE11 and our other supported browsers.
				// The IE 11 partial support relates to unpredictable behavior when using vw units
				// with 3D transforms.
				'viewport-units'
			]
		}],

		'selector-pseudo-element-no-unknown': [true, {
			ignorePseudoElements: [

				// For postcss-input-range
				'/^range-(track|upper|lower|thumb)/',
			],
		}],
	},
};
