# pass https on for Laravel isSecure/asset
map $http_x_forwarded_proto $fastcgi_param_https_variable {
    default '';
    https 'on';
}

server {

    listen 5000;

    access_log /var/log/nginx/%domain%.access.log ;
    error_log /var/log/nginx/%domain%.error.log;

    add_header X-Proxy-Cache $upstream_cache_status;
    root /var/www/html;

    set $skip_cache 0;

    #location containe api/
    location /api/ {
        try_files $uri $uri/ /backend/public/index.php?$query_string;

        # Client IP Handling for AWS ELB
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://app:3000;
        proxy_redirect      off;
        proxy_set_header    X-Real-IP $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header    X-Forwarded-Proto $scheme;
        proxy_set_header    Host $http_host;
        
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location ~ \.php$ {
        #fastcgi_cache dwchiang;
        #fastcgi_cache_valid 200 204 60;
        fastcgi_ignore_headers Cache-Control;
        fastcgi_no_cache $skip_cache $http_authorization $cookie_laravel_session;
        #fastcgi_cache_lock on;
        #fastcgi_cache_lock_timeout 10s;
        fastcgi_buffer_size 6144;

        add_header X-Proxy-Cache $upstream_cache_status;

        fastcgi_pass            127.0.0.1:9000;
        fastcgi_index           index.php;
        fastcgi_param           SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param           HTTPS $fastcgi_param_https_variable;
        fastcgi_read_timeout    900s;
        include                 fastcgi_params;
        fastcgi_keep_conn on;
        fastcgi_param HTTP_RANGE $http_range;
    }


    include /var/www/*.conf;

}