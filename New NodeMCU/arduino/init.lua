local wifiModule = require 'wifimodule'
local webSocketModule = require 'websocket'

-- Application here

-- local ws = webSocketModule.init()
wifiModule.makeConnection()
print('init')
