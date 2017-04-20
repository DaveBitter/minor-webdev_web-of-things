local socketmodule = require 'socketmodule'
local wifimodule = require 'wifimodule'
local config = require 'config'

function init()

  print('init')
  print(wifi.sta.getip())

  local ws = socketmodule.start()
  --
  print(ws)

end

wifimodule.makeConnection(config, init)
