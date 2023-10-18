<?php
/**
 * As configurações básicas do WordPress
 *
 * O script de criação wp-config.php usa esse arquivo durante a instalação.
 * Você não precisa usar o site, você pode copiar este arquivo
 * para "wp-config.php" e preencher os valores.
 *
 * Este arquivo contém as seguintes configurações:
 *
 * * Configurações do banco de dados
 * * Chaves secretas
 * * Prefixo do banco de dados
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Configurações do banco de dados - Você pode pegar estas informações com o serviço de hospedagem ** //
/** O nome do banco de dados do WordPress */
define('FS_METHOD', 'direct');

define( 'DB_NAME', 'teste' );

/** Usuário do banco de dados MySQL */
define( 'DB_USER', 'root' );

/** Senha do banco de dados MySQL */
define( 'DB_PASSWORD', '' );

/** Nome do host do MySQL */
define( 'DB_HOST', 'localhost' );

/** Charset do banco de dados a ser usado na criação das tabelas. */
define( 'DB_CHARSET', 'utf8mb4' );

/** O tipo de Collate do banco de dados. Não altere isso se tiver dúvidas. */
define( 'DB_COLLATE', '' );

/**#@+
 * Chaves únicas de autenticação e salts.
 *
 * Altere cada chave para um frase única!
 * Você pode gerá-las
 * usando o {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org
 * secret-key service}
 * Você pode alterá-las a qualquer momento para invalidar quaisquer
 * cookies existentes. Isto irá forçar todos os
 * usuários a fazerem login novamente.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'NWK;K:O;t4]jTh&}[SjFo`~(2z)Z&p~=7]?.%/y/=0uNZ{>FiJ|ix^NoOE5u(P^q' );
define( 'SECURE_AUTH_KEY',  'c?nb%.]OpKlxq1}<%KF:3p4tH=g3KiuQBr-p|gr48z@?O.2MW*C&b^MlhAK!wdQx' );
define( 'LOGGED_IN_KEY',    'B$@[UKkMu-.)(>^/#[y[KH.O%((HcruwPe=.hqarL,Q`n*wG-d#rk+FJJc@aq!sc' );
define( 'NONCE_KEY',        '_)62jWG%_k;/.zF=rAcCE{HbX3n^)TPv=PEAU&P;4~S2y]uL4S~Tf/)0^bc`bTB%' );
define( 'AUTH_SALT',        '/NTXOMfa5 tq#w;XgDIa%N}Lv1Hf~}+(<TmBiN<vs`IB%R=z9-lj.>o..q~vm@G+' );
define( 'SECURE_AUTH_SALT', 'h@ZHRMiDTh@Sr<Q.%UJ 1e6wSWMl]0x_Ij1Dz41l_UgK.Em>!huVRAZ!lP6UalPF' );
define( 'LOGGED_IN_SALT',   'z(q%@hEBy/K]#F@e}DiwP;xPx1JRCBBc!]FMmy95jAq;0l>T7nn#ZtPv|bS^_e(}' );
define( 'NONCE_SALT',       '?aMTS%oL^P$3iaJC:w@2![>T2[Ev^iEHdX.T }X-KeMpnY:zS*1nQ|N2%5(:.AT^' );

/**#@-*/

/**
 * Prefixo da tabela do banco de dados do WordPress.
 *
 * Você pode ter várias instalações em um único banco de dados se você der
 * um prefixo único para cada um. Somente números, letras e sublinhados!
 */
$table_prefix = 'wp_';

/**
 * Para desenvolvedores: Modo de debug do WordPress.
 *
 * Altere isto para true para ativar a exibição de avisos
 * durante o desenvolvimento. É altamente recomendável que os
 * desenvolvedores de plugins e temas usem o WP_DEBUG
 * em seus ambientes de desenvolvimento.
 *
 * Para informações sobre outras constantes que podem ser utilizadas
 * para depuração, visite o Codex.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Adicione valores personalizados entre esta linha até "Isto é tudo". */


/* Isto é tudo, pode parar de editar! :) */

/** Caminho absoluto para o diretório WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Configura as variáveis e arquivos do WordPress. */
require_once ABSPATH . 'wp-settings.php';
