<?php

$runtimeStoragePath = '/tmp/laravel-storage';

$paths = [
    $runtimeStoragePath,
    $runtimeStoragePath . '/framework',
    $runtimeStoragePath . '/framework/cache',
    $runtimeStoragePath . '/framework/sessions',
    $runtimeStoragePath . '/framework/views',
    $runtimeStoragePath . '/logs',
    '/tmp/laravel-bootstrap-cache',
];

foreach ($paths as $path) {
    if (! is_dir($path)) {
        mkdir($path, 0777, true);
    }
}

putenv('VIEW_COMPILED_PATH=' . $runtimeStoragePath . '/framework/views');
putenv('CACHE_STORE=array');
putenv('SESSION_DRIVER=array');
putenv('LOG_CHANNEL=stderr');

require __DIR__ . '/../public/index.php';
