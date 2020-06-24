from flask import Flask, render_template, request, json, abort, redirect, url_for, session
from werkzeug.exceptions import HTTPException
from flask_mail import Mail, Message
from .email_configs import sender, password, recipients
import os

app = Flask(__name__)

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": sender,
	"MAIL_DEFAULT_SENDER": sender,
    "MAIL_PASSWORD": password
}

app.config.update(mail_settings)
mail = Mail(app)

app.secret_key = os.urandom(16)

@app.route("/", methods=['POST', 'GET'])
def index():
    try:
        if request.method == 'POST':
            name = request.form['name']
            subject = request.form['subject']
            email = request.form['email']
            message = request.form['message']

            msg_subject = 'Portfolio-contact'
            if subject != '':
                msg_subject += ': ' + subject

            msg_body = f'From {email}\n{message}'
            if name != '':
                msg_body = f'From {name} ({email})\n{message}'

            msg = Message(body=msg_body, subject=msg_subject, recipients=recipients)
            mail.send(msg)
    except Exception as e:
        abort(401)

    if 'loc' in session:
        location = session['loc']
        session.pop('loc', None)
    else:
        location = 'hello'

    return render_template('portfolio.html', loc=location)

@app.route("/home")
def home():
    session['loc'] = 'home'
    return redirect(url_for('index'))

@app.route("/about")
def about():
    session['loc'] = 'about'
    return redirect(url_for('index'))

@app.route("/projects")
def projects():
    session['loc'] = 'projects'
    return redirect(url_for('index'))

@app.route("/contact")
def contact():
    session['loc'] = 'contact'
    return redirect(url_for('index'))

@app.route("/arsandbox")
def arsandbox():
    return render_template('arsandbox.html')

@app.errorhandler(HTTPException)
def error(e):
    error_dic = {
        "code": e.code,
        "name": e.name,
        "description": e.description,
    }
    return render_template('error.html', error=error_dic)
