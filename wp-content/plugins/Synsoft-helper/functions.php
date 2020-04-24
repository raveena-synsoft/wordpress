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



function get_post_domain_technology( $data ) {
	$pageurl 	 = get_site_url()."/wp-json/wp/v2/pages?slug=home";
	$pagecontent = file_get_contents($pageurl);
	$homecontent = json_decode($pagecontent);
	$args = 
		array(
			'post_type' => 'page', 
			'meta_query' => array(
                array(
                    'key' => 'include_in_what_we_do_at_homepage', 
                    'value' => 'yes', 
                )
         	)
		);
	$the_query = new WP_Query( $args ); 
	$technology = $the_query->posts;	
	$techpage['tech'] = [];
	foreach ($technology as $key => $value) {
		$techpage['tech'][$key]['post_id'] = $value->ID;
		$techpage['tech'][$key]['post_image'] = get_field('banner_image', $value->ID);
		$techpage['tech'][$key]['post_slug'] = $value->post_name;
		$techpage['tech'][$key]['post_title'] = $value->post_title;
		$techpage['tech'][$key]['post_content'] =$value->post_content;//
	}
	
	$domain =   get_posts(array(
					'post_type' => 'domains',
					'meta_query' => array(
				        array(
				            'key' => 'include_post_in_homepage',
				            'value' => 'yes',
				        )
					)
				));
	$domainPosts['domain'] = [];	
	foreach ($domain as $key => $value) {
		$domainPosts['domain'][$key]['post_id'] = $value->ID;
		$domainPosts['domain'][$key]['post_image'] = get_field('domain_image', $value->ID);
		$domainPosts['domain'][$key]['post_slug'] = $value->post_name;
		$domainPosts['domain'][$key]['post_title'] = $value->post_title;
		$domainPosts['domain'][$key]['post_content'] =$value->post_content;//
	}
    if ( empty( $homecontent ) ) {
        return null;
    }
    $page = array_merge( $domainPosts, $techpage, $homecontent);
    return $page;
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'wp/v2', '/homepage', array(
        'methods' => 'GET',
        'callback' => 'get_post_domain_technology'
    ) );
} );
?>