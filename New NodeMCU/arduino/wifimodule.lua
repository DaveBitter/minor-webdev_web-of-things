-- Wifi Module for connecting to the internet
local wifimodule = {}

function wifimodule.makeConnection(config, callback)

  print('test')

  wifi.setmode(wifi.STATION)
  wifi.sta.config(config.ssid, config.password)
  wifi.sta.eventMonReg(wifi.STA_IDLE, function() print('No usable WiFi connection') end)
  wifi.sta.eventMonReg(wifi.STA_CONNECTING, function() print('Connecting to WiFi') end)
  wifi.sta.eventMonReg(wifi.STA_WRONGPWD, function() print('The WiFi password is wrong') end)
  wifi.sta.eventMonReg(wifi.STA_APNOTFOUND, function() print('No WiFi access point found') end)
  wifi.sta.eventMonReg(wifi.STA_FAIL, function() print('Error while connecting to WiFi') end)
  wifi.sta.eventMonReg(wifi.STA_GOTIP, function()
      print('connection made!')
      print('ip: ' .. wifi.sta.getip())

      local connection = net.createConnection(net.TCP, 1)
      ip, nm, gateway = wifi.sta.getip()
      local redirHost = gateway .. ':8002'
      print(redirHost)

      connection:connect(8002, gateway)

      callback()

  end)

  wifi.sta.eventMonStart()
  wifi.sta.connect()

end

return wifimodule
