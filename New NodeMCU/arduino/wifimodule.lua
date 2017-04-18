-- Wifi Module for connecting to the internet
local wifiModule = {}

wifiModule.makeConnection = function()

  wifi.setmode(wifi.STATION)
  wifi.sta.config('INTERNET', 'Power112!')
  wifi.sta.eventMonReg(wifi.STA_CONNECTING, function() print('Connecting to WiFi') end)
  wifi.sta.eventMonReg(wifi.STA_WRONGPWD, function() print('The WiFi password is wrong') end)
  wifi.sta.eventMonReg(wifi.STA_FAIL, function() print('Error while connecting to WiFi') end)
  wifi.sta.eventMonReg(wifi.STA_GOTIP, function() print('Connected') end)

  wifi.sta.eventMonStart()
  wifi.sta.connect()

end

wifiModule.makeConnection()

return wifiModule
