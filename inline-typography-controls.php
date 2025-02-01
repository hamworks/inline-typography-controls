<?php
/**
 * Plugin Name: Inline Typography Controls
 * Description: Add inline typography controls to the editor.
 * Version: 0.1.3
 * Author: HAMWORKS
 * License: GPL-2.0+
 *
 * @package inline-typography-controls
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'enqueue_block_editor_assets', 'inline_typography_controls_wp_enqueue_scripts' );

/**
 * Enqueue block editor assets
 */
function inline_typography_controls_wp_enqueue_scripts(): void {

	wp_enqueue_style(
		'inline-typography-controls',
		plugin_dir_url( __FILE__ ) . '/build/style-index.css',
		array(),
		filemtime( __DIR__ . '/build/style-index.css' )
	);

	$asset_file = include __DIR__ . '/build/index.asset.php';
	wp_enqueue_script(
		'inline-typography-controls',
		plugin_dir_url( __FILE__ ) . '/build/index.js',
		$asset_file['dependencies'],
		filemtime( __DIR__ . '/build/index.js' ),
		true
	);
}
