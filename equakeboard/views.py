 
import os, inspect
from flask import render_template, jsonify
from equakeboard import app


# get project root dir
CURR_DIR = os.path.dirname(inspect.getabsfile(inspect.currentframe()))
ROOT_DIR = os.path.dirname(CURR_DIR)


# home route
@app.route('/home')
@app.route('/')
@app.route("/magnitude")
def home():
    return render_template("index.html")


@app.route("/timeline")
def timeline():
    return render_template("timeline.html")
