@echo off
start node server.js
timeout /t 2
start http://localhost:1999/