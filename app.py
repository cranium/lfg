import re
from flask import Flask, render_template, request, redirect, url_for, session
from redis import StrictRedis
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange
from flask_openid import OpenID
from functools import wraps

app = Flask("lfg")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///development.sqlite3'
app.secret_key = 'changing this later'

redis = StrictRedis(decode_responses=True)

oid = OpenID(app)


def require_login(f):
    @wraps(f)
    def dec(*args, **kwargs):
        if "steam_id" in session:
            return f(*args, **kwargs)
        else:
            return redirect(url_for('login'))
    return dec


class LfgForm(FlaskForm):
    name = StringField(validators=[
        DataRequired(message="Required"),
        Length(1, 50, message="Must be between 1 and 50 characters")
    ])
    have = IntegerField(validators=[
        NumberRange(max=20, message="Max 20")
    ])
    need = IntegerField(validators=[
        DataRequired(message="Required"),
        NumberRange(min=1, max=20, message="Min 1, max 20")
    ])


@app.route('/lfg', methods=['GET', 'POST'])
@require_login
def lfg():
    form = LfgForm(request.form)

    if form.validate_on_submit():
        id = redis.incr("Counter")

        pipeline = redis.pipeline()
        with pipeline:
            pipeline.multi()
            save_lfg_hash(pipeline, id, form)
            pipeline.execute()

        return redirect(url_for('index'))

    return render_template('lfg.jinja2', form=form)


@app.route('/')
def index():
    lfg_ids = redis.lrange('List', 0, 4)

    pipeline = redis.pipeline()
    with pipeline:
        pipeline.multi()
        for lfg_id in lfg_ids:
            pipeline.hgetall('LFG:' + lfg_id)
        lfgs = pipeline.execute()

    avatar_url = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/63/63eeef78bdec22e51e43064a47ab0eb7764629be_medium.jpg"

    return render_template('list.jinja2', lfgs=lfgs, avatar_url=avatar_url)


@app.route('/group/<int:group_id>', methods=['GET', 'POST'])
def group(group_id):
    return "Group ID: {group_id}".format(group_id=group_id)


def save_lfg_hash(pipeline: "redis.client.Pipeline", id: int, form: LfgForm):
    key = "LFG:{id}".format(id=id)  # save my LFG as LFG:num
    data = {
        "name": form.name.data,
        "have": form.have.data,
        "need": form.need.data
    }
    pipeline.hmset(key, data)
    pipeline.lpush("List", id)  # add to list of active keys


_steam_id_re = re.compile('steamcommunity.com/openid/id/(.*?)$')


@app.route('/login')
@oid.loginhandler
def login():
    if "steam_id" in session:
        return redirect(url_for('index'))

    return oid.try_login('https://steamcommunity.com/openid')


@oid.after_login
def create_or_login(resp):
    steam_id = _steam_id_re.search(resp.identity_url)
    session["steam_id"] = steam_id.groups()
    return redirect(url_for('index'))


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))
