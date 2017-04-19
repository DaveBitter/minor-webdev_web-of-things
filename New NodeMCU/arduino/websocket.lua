-- WebSocket module
local webSocketModule = {}

webSocketModule.init = function()

  local ws = websocket.createClient()

  -- on 'Connection' handling
  ws:on('connection', function(socket)
    print('Connection has been made')
  end)

end

webSocketModule.init()

return webSocketModule
