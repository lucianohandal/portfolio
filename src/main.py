from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home_view():
		return render_template('portfolio.html')

# @app.errorhandler(404)
# def not_found(e):
#   return render_template("error.html", error_code=404)
