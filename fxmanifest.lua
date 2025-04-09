fx_version 'cerulean'

game "gta5"

author "TGG"
version '1.0.0'
description 'TGG Dialog System'
repository 'https://github.com/TGG/tgg-dialog'

use_experimental_fxv2_oal 'yes'
lua54 'yes'

ui_page 'build/index.html'
-- ui_page 'http://localhost:3000/' --for dev

client_script {
    'data/config.lua',
    'client/**',
}

files {
    'build/**',
}

-- Backward compatibility with bl_dialog
provide 'bl_dialog'
