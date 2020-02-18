#!/usr/bin/python3
""" flask app that integrates with airbnb stati html temp"""
from flask import Flask, render_template, url_for
from models import storage
from uuid import uuid4

#flask setup
app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'

#begin flask page render
@app.teardown_appcontext
def teardown_db(exception):
    """after request, this method calls close to remove
    urrent sqlalchemy session
    """
    storage.close()

@app.route('/4-hbnb')
def hbnb_filters(the_id=None):
    """ handles request to custom templates with states, cities &
    amenities
    """
    state_objs = storage.all('State').values()
    states = dict([state.name, state] for state in state_objs)
    amens = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    cache_id = str(uuid4())
    return render_template('4-hbnb.html',
                           states=states,
                           amens=amens,
                           places=places,
                           users=users,
                           cache_id=cache_id)

if __name__ == "__main__":
    """ main flask app """
    app.run(host=host, port=port)
