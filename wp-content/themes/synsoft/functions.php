<?php 
//change base permalinks to match react router
add_action('init','synsoft_change_base_permalinks');
function synsoft_change_base_permalinks() {    
    global $wp_rewrite;
    $wp_rewrite->permalink_structure = 'post/%pagename%/';
    $wp_rewrite->page_structure = 'page/%pagename%/';    
    $wp_rewrite->flush_rules();    

    register_nav_menus( array(
        'top_menu' => __( 'Top Menu', 'synsoft' ),
        'main_menu'  => __( 'Main Menu', 'synsoft' ),
    ) );

} 

if ( ! function_exists( 'synsoft_setup' ) ) :
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */
    function synsoft_setup() {
        add_theme_support( 'post-thumbnails' );
        
    }
endif;
add_action( 'after_setup_theme', 'synsoft_setup' );


//adds a custom route for search
//https://benrobertson.io/wordpress/wordpress-custom-search-endpoint

function synsoft_register_search_route() {
   
    register_rest_route('wp/v2', '/search', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'synsoft_ajax_search',
        'args' => synsoft_get_search_args()
    ]);
}

add_action( 'rest_api_init', 'synsoft_register_search_route');

function synsoft_ajax_search( $request ) {
    $posts = [];
    $results = [];
    // check for a search term
 
    if( isset($request['s'])) :
        // get posts 

        $args = [
            'post_type' => array( 'post', 'page'), 
            's' => $request['s'], 
            'posts_per_page' => 10, 
            'paged' => $request['page']
        ];
        $query = new WP_Query( $args );
        $posts = $query->posts;

        $total = $query->found_posts;
        $totalPages = $query->max_num_pages;

        foreach($posts as $post):  
           
            $item = [
                'id' => $post->ID,
                'author_name' => get_the_author_meta('display_name', $post->post_author),                
                'slug' => $post->post_name,
                'type' => $post->post_type,
                'title' => array(
                    'rendered' => $post->post_title
                ),
                'content' => array(
                    'rendered' => $post->post_content
                ),
                'excerpt' => array(
                    'rendered' => $post->post_excerpt
                ),
            ];

            $categories = get_the_category($post->ID);
                     
            if(!empty($categories[0])){  
                $catArr = array();
                $catArr[] = $categories[0]->term_id;
                $item['category_name'] = $categories[0]->name; 
                $item['categories'] = $catArr;              
            }           

            $results[] = $item;
        endforeach; 

    endif;

    // if( empty($results) ) :
    //     return new WP_Error( 'front_end_ajax_search', 'No results');
    // endif;

    $response = new WP_REST_Response( $results );
    $response->header( 'X-WP-Total', $total);
    $response->header( 'X-WP-TotalPages', $totalPages );

    return $response;     
}

function synsoft_get_search_args() {

    $args = [];
    $args['s'] = [
       'description' => esc_html__( 'The search term.', 'synsoft_' ),
       'type'        => 'string',
   ]; 

   return $args;
}

function synsoft_allow_anonymous_comments() {
    return true;
}
add_filter('rest_allow_anonymous_comments','synsoft_allow_anonymous_comments');

function synsoft_add_to_post_api (){
    register_rest_field( 'post', 'author_name', array(
        'get_callback' => function( $post ) {
            return get_the_author_meta('display_name', $post['author']);
        }
    ));
    register_rest_field( 'post', 'category_name', array(
        'get_callback' => function( $post ) {
            $categories = get_the_category($post['id']);
            return $categories[0]->name; 
        }
    ));
}
add_action( 'rest_api_init', 'synsoft_add_to_post_api');
   