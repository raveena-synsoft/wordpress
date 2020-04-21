<?php
/**
 * Synsoft-helper
 *
 * For all your custom post type.
 *
 * @package 
 * @subpackage Loader
 * @author WebDevStudios
 * @since 0.1.0.0
 * @license GPL-2.0+
 */

/**
 * Plugin Name: Synsoft helper
 * Plugin URI: https://github.com/WebDevStudios/custom-post-type-ui/
 * Description: Admin panel for getting custom post types in REST API in WordPress
 * Author: WebDevStudios
 * Version: 1.7.4
 * Author URI: https://webdevstudios.com/
 * Text Domain: Synsoft-helper
 * Domain Path: /languages
 * License: GPL-2.0+
 */


add_theme_support( 'menus' );
/*function cw_post_type_domain() {
	$supports = array(
		'title', // post title
		'editor', // post content 
		'author', // post author
		'thumbnail', // featured images
		'excerpt', // post excerpt
		'custom-fields', // custom fields
		'comments', // post comments
		'revisions', // post revisions
		'post-formats', // post formats
	);

	$labels = array(
		'name' => _x('Domains', 'plural'),
		'singular_name' => _x('Domain', 'singular'),
		'menu_name' => _x('Domain', 'admin menu'),
		'name_admin_bar' => _x('View Domain', 'admin bar'),
		'add_new' => _x('Add New Domain', 'add new'),
		'not_found' => __('No results found.'),
	);

	$args = array(
		'supports' => $supports,
		'labels' => $labels,
		'public' => true,
		'publicly_queryable' => true,
		'capability_type'    => 'post',
		'query_var' => true,
		'rewrite' => array('slug' => 'domain'),
		'has_archive' => true,
		'hierarchical' => false,
		'show_in_rest' => true,
		'rest_controller_class' => 'WP_REST_Posts_Controller',
		'rest_base'             => 'domain',
	);

	register_post_type('domains', $args);
}
add_action('init', 'cw_post_type_domain');

function cw_post_type_testimonial() {
	$supports = array(
		'title', // post title
		'editor', // post content 
		'author', // post author
		'thumbnail', // featured images
		'excerpt', // post excerpt
		//'custom-fields', // custom fields
		'comments', // post comments
		'revisions', // post revisions
		'post-formats', // post formats
	);

	$labels = array(
		'name' => _x('Testimonials', 'plural'),
		'singular_name' => _x('Testimonial', 'singular'),
		'menu_name' => _x('Testimonial', 'admin menu'),
		'name_admin_bar' => _x('View Testimonial', 'admin bar'),
		'add_new' => _x('Add New Testimonial', 'add new'),
		'not_found' => __('No results found.'),
	);

	$args = array(
		'supports' => $supports,
		'labels' => $labels,
		'public' => true,
		'publicly_queryable' => true,
		'capability_type'    => 'post',
		'query_var' => true,
		'rewrite' => array('slug' => 'testimonial'),
		'has_archive' => true,
		'hierarchical' => false,
		'show_in_rest' => true,
		'rest_controller_class' => 'WP_REST_Posts_Controller',
		'rest_base'             => 'testimonial',
	);

	register_post_type('testimonials', $args);
}
add_action('init', 'cw_post_type_testimonial');*/
?>