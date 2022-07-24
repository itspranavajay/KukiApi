from fastapi import FastAPI, Request, Response
from fastapi.responses import HTMLResponse, FileResponse
import requests
import json
import random
from pyrogram import *
import secrets
from dateutil import parser
import requests
import os
from pymongo import MongoClient

MONGO_URL = "mongo db url" # https://www.mongodb.com/ 

API_ID = "1267i" # telegram api I'd my.telegram.org
API_HASH = "jsksko12i0" # telegram api hash my.telegram.org
TOKEN = "bot token" # telegram bot token 
hosturl = "site url"
CHAT_ID = -1001787468565 # telegram channel id

async def clientbot():
    bot = Client(
        ':memory:',
        api_id=API_ID,
        api_hash=API_HASH,
        bot_token=TOKEN
    )
    await bot.start()
    return bot

app = FastAPI()

@app.get('/api/apikey={api}/{botname}/{owner}/message={msg}')
async def chatbot(api, botname, owner, msg):
    leveldb = MongoClient(MONGO_URL)    
    toggle = leveldb["myFirstDatabase"]["jsons"]
    is_token = toggle.find_one({"ID": api})     
    result = f"https://{hosturl}/chatbot/{botname}/{owner}/message={msg}"
    result = requests.get(result)
    result = result.json() 
    if not is_token:
        url = f"https://{hosturl}/api/apikey={api}/{botname}/{owner}/message={msg}"
        bot = await clientbot()
        await bot.send_message(CHAT_ID, f"Invalid Token\n - {url}")
        ret = {
            "reply": "Invalid Token Please Ask @metavoidsupport"        
        }    
        return ret
    if is_token:        
        ret = {
            "reply": result["reply"]           
        }
        return ret      


@app.get('/api/apikey={api}/message={msg}')
async def simplechatbot(api, msg):
    leveldb = MongoClient(MONGO_URL)    
    toggle = leveldb["myFirstDatabase"]["jsons"]
    is_token = toggle.find_one({"ID": api})     
    result = f"https://{hosturl}/chatbot/kuki/moezilla/message={msg}"
    result = requests.get(result)
    result = result.json()
    if not is_token:
        url = f"https://{hosturl}/api/apikey={api}/message={msg}"
        bot = await clientbot()
        await bot.send_message(CHAT_ID, f"Invalid Token\n - {url}")
        ret = {
            "reply": "Invalid Token Please Ask @metavoidsupport"        
        }    
        return ret
    if is_token:        
        ret = {
            "reply": result["reply"]           
        }
        return ret      
