from flask import Flask, render_template, request
from flask_mail import Mail, Message
from .email_configs import sender, password, recipient

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

@app.route("/", methods=['POST', 'GET'])
def home_view():
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

			msg = Message(body=msg_body, subject=msg_subject, recipients=[recipient])
			mail.send(msg)
	except Exception as e:
		pass

	return render_template('portfolio.html')

@app.route("/arsandbox")
def arsandbox():
    return render_template('arsandbox.html')

# @app.errorhandler(404)
# def not_found(e):
#   return render_template("error.html", error_code=404)
