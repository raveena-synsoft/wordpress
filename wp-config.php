<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'U.4@g,S:?9hL5[ML>*12T+M{9${^G@DN**_=Y4 fx$%^i{7XV!xOLlgB8cC2^tu&' );
define( 'SECURE_AUTH_KEY',  '3!LAX-6ie.6I&T]GoVjQ)nEh~[3yP1*6tG_K.At<)4uk9q]XK fZGlX+ZI`5qh0}' );
define( 'LOGGED_IN_KEY',    'pufiWZ,gF<ih/);D- z.yM/w#YpRT/*Kej>|wiVM[HDHXws]>)|2#e_X9>RNI2DR' );
define( 'NONCE_KEY',        'x37o^h41BNH{:y[`n7?~o^#`Kq==I=$Ub2HDkq:[QZZ#RDE8TTGiE9@v@{GT0K?B' );
define( 'AUTH_SALT',        'OZNNVMyZ*-~ZT7OT2[X04=U(gh{$C4_gl::wG)jwo}J6UPvAV VOnsK@&|R:cL$M' );
define( 'SECURE_AUTH_SALT', 'ikp!Fa<e.e/jRhyNecVkI~WcpcSO{{Qdo49}oS=0v,Q]ym3Y#VvasA_FjmcA<`X ' );
define( 'LOGGED_IN_SALT',   '1-nUr]Jfh5sBi6_vpsZ{>e^/p#$%*W.~n$<=([AlKQqh~3:VXXDO(:l,2#pu~.1K' );
define( 'NONCE_SALT',       't#tQUNXY#]#BD/0#V>V).@;<+7,gpd(d7r3${{fbVAAZIcPfkHQdbTKs53] u=jn' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
