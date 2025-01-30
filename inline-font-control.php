<?php
/**
 * Plugin Name: Inline Font Control
 * Description: Add inline font control to the editor.
 * Version: 1.0
 * Author: torounit
 * License: GPL-2.0+
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'enqueue_block_editor_assets', 'inline_font_control_wp_enqueue_scripts' );

function inline_font_control_wp_enqueue_scripts() {
	$asset_file  = include __DIR__ . '/build/index.asset.php';
	wp_enqueue_script(
		'inline-font-control',
		plugin_dir_url( __FILE__ ) . '/build/index.js',
		$asset_file['dependencies'],
		filemtime( __DIR__ . '/build/index.js' )
	);
}
