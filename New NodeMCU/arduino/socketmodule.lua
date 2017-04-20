-- WebSocket module
local config = require 'config'
local socketmodule = {}

function socketmodule.start()

  print('socket')

  local ws = websocket.createClient()

  -- on 'Connection' handling
  ws:on('connection', function(socket, status)
    print('Connection has been made.', status)
  end)

  ws:on('close', function(socket, status)
    print('[WebSocket] Connection closed.', status)
    ws = nil
  end)

  print('[WebSocket] Connecting to ws at ws://' .. config.server .. ':' .. config.port .. '...')
  ws:connect('ws://' .. config.server .. ':' .. config.port)
  print(ws)
  return ws

end

return socketmodule
