import os
from flask import Flask, render_template, request, redirect, url_for,session,flash,jsonify
import psycopg2
import logging
from flask import send_file
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

conn = mysql.connector.connect(
        host='172.22.81.122',
        user='audit',
        password='Audit@123',
        database='hra'
        )
conn2 = mysql.connector.connect(
        host='172.22.81.122',
        user='audit',
        password='Audit@123',
        database='hra'
        )
app.secret_key = "234"

# Define a route for the root URL
@app.route('/')
def home():
    return redirect(url_for('login'))

@app.route('/bot.css')
def send_css():
    return app.send_static_file('bot.css')

# Define a route for login
from datetime import datetime

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # # Check if the username and password are valid (you need to implement this)
        # if is_valid_login(username, password):
        #     session['username'] = username  
        #     flash('Login successful', 'success')  
        #     return redirect(url_for('index'))
        # else:
        #     flash('Login failed. Invalid credentials.', 'error') 

        cursor = conn.cursor()
        cursor.execute("SELECT username, role FROM users WHERE username = %s AND password = %s", (username, password))
        user = cursor.fetchone()

        if user:
            session['username'] = user[0]
            session['role'] = user[1]  # Store role in session
            
            # Log the login
            cursor.execute("INSERT INTO user_login_logs (username, login_time) VALUES (%s, %s)",
                           (username, datetime.now()))
            conn.commit()
            cursor.close()

            flash('Login successful', 'success')  
            
            if session['role'] == 'admin':
                return redirect(url_for('index'))  # Redirect admins to the dashboard
            else:
                # Redirect users to their assigned chatbot
                assigned_bots = get_user_chatbots(username)
                
                bot_name, user_name = assigned_bots[0]
                logging.debug(f"Bot name: {bot_name}, User name: {user_name}")               
                if assigned_bots:
                    #return redirect(url_for('bot', chatbot_name=assigned_bots[0], username=username))
                    return redirect(url_for('bot', chatbot_name=bot_name, username=user_name))
                else:
                    flash("No chatbot assigned to you.", "error")
                    return redirect(url_for('logout'))  # Logout if no bot is assigned
        else:
            flash('Login failed. Invalid credentials.', 'error')

    return render_template('login.html')

# Implement a function to check if the login is valid
def is_valid_login(username, password):
    cursor = conn.cursor()
    cursor.execute("SELECT username FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone() 
    return user is not None

# Define a route for the index page
@app.route('/index')
def index():
    if 'username' in session:
        user_name = session['username']
        role = session.get('role')

        if role == 'admin':
            chatbots = get_all_chatbots()
            return render_template('index.html', chatbots=chatbots, user_name=user_name, role=role)
        else:
            # Redirect users to their assigned chatbot
            assigned_bots = get_user_chatbots(user_name)
            bot_name, user_name = assigned_bots[0]
            if assigned_bots:
                #return redirect(url_for('bot', chatbot_name=assigned_bots[0], username=user_name))
                return redirect(url_for('bot', chatbot_name=bot_name, username=user_name))
            else:
                flash("No chatbot assigned to you.", "error")
                return redirect(url_for('logout'))  # Logout if no bot is assigned
    else:
        return redirect(url_for('login'))

def get_all_chatbots():
    cursor = conn.cursor()
    cursor.execute("SELECT bot_name FROM chatbots")
    chatbot_records = cursor.fetchall()
    cursor.close()

    return [record[0] for record in chatbot_records]

def get_user_chatbots(username):
    cursor = conn.cursor()

    # Fetch assigned bot name using bot_id
    cursor.execute("""
        SELECT c.bot_name, c.user_name 
        FROM user_bot_access u
        JOIN chatbots c ON u.bot_id = c.id
        WHERE u.username = %s
    """, (username,))

    chatbot_records = cursor.fetchall()
    cursor.close()

    #return [record[0] for record in chatbot_records]  # Extract chatbot names
    return chatbot_records

@app.route('/assign_bot', methods=['GET', 'POST'])
def assign_bot():
    if 'username' in session and session.get('role') == 'admin':
        if request.method == 'POST':
            username = request.form.get('username')
            bot_id = request.form.get('bot_id')

            print("DEBUG: Assigning bot_id:", bot_id, "to user:", username)  # Debugging

            if not bot_id or not bot_id.isdigit():  # Validate bot_id
                flash("Error: Invalid bot selection!", "error")
                return redirect(url_for('assign_bot'))

            bot_id = int(bot_id)

            try:
                cursor = conn.cursor()
                cursor.execute("INSERT INTO user_bot_access (username, bot_id) VALUES (%s, %s)", (username, bot_id))
                conn.commit()
                cursor.close()
                flash('Bot assigned successfully!', 'success')
            except Exception as e:
                flash(f"Database error: {str(e)}", "error")
                return redirect(url_for('assign_bot'))

    cursor = conn.cursor()
    cursor.execute("SELECT username FROM users WHERE role = 'user'")
    users = cursor.fetchall()

    cursor.execute("SELECT id, bot_name FROM chatbots")  # Fetch bot_id and bot_name
    bots = cursor.fetchall()
    cursor.close()

    return render_template('assign_bot.html', users=users, bots=bots)

# Define a route for logout
@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Retrieve user registration data from the form
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        # Check if the username already exists in the database
        cursor = conn.cursor()
        cursor.execute("SELECT username FROM users WHERE username = %s", (username,))
        existing_user = cursor.fetchone()
        cursor.close()

        if existing_user:
            # Username already exists
            return render_template('register.html', message='Username already exists. Please choose a different one.')
        # Use the existing connection and cursor
        cursor = conn.cursor()

        cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
                       (username, email, password))
        
        # Commit the changes and close the cursor
        conn.commit()
        cursor.close()

        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/create_chatbot', methods=['GET', 'POST'])
def create_chatbot():
    if 'username' in session and session.get('role') == 'admin':  # Only admins can create bots
        if request.method == 'POST':
            bot_name = request.form['chatbot_name']
            bot_description = request.form['chatbot_description']
            user_name = session['username']  
            bot_table = user_name + bot_name
            
    #         cursor = conn.cursor()
    #         cursor.execute("INSERT INTO chatbots (bot_name, user_name, bot_table) VALUES (%s, %s, %s)",
    #                        (bot_name, user_name, bot_table))
    #         conn.commit()
    #         cursor.close()

    #         return redirect(url_for('index'))
        
    #     return render_template('create_chatbot.html')

    # flash("Access denied! Only admins can create chatbots.", "error")
    # return redirect(url_for('index'))

#        # Check if a bot with the same name already exists
            cursor = conn.cursor()
            cursor.execute("SELECT bot_name FROM chatbots WHERE user_name = %s AND bot_name = %s", (user_name, bot_name))
            existing_bot = cursor.fetchone()

            if existing_bot:
                cursor.close()
                return "A bot with the same name already exists. Please choose a different name."

            # Insert the new bot data into the chatbot table
            cursor.execute("INSERT INTO chatbots (bot_name, user_name, bot_table) VALUES (%s, %s, %s)",
                        (bot_name, user_name, bot_table))
            conn.commit()
            cursor.close()

            #create table for bot data
            cursor2 = conn2.cursor()

            cursor2.execute("CREATE TABLE {} (question VARCHAR(1000), answer VARCHAR(1000) , category varchar(100) , subcategory varchar(300))".format(bot_table))

            conn2.commit()
            cursor2.close()

            return redirect(url_for('index'))
        
        return render_template('create_chatbot.html')

    flash("Access denied! Only admins can create chatbots.", "error")
    return redirect(url_for('index'))

# Set up logging
logging.basicConfig(level=logging.DEBUG)

def get_chatbots(user_name):
    try:
        # Connect to the database
        cursor = conn.cursor()

        # Fetch chatbot data
        cursor.execute("SELECT bot_name FROM chatbots WHERE user_name = %s", (user_name,))
        chatbot_records = cursor.fetchall()

        # Extract chatbot names from the fetched records
        chatbots = [record[0] for record in chatbot_records]

        # Close the cursor and the database connection
        cursor.close()

        return chatbots
    except Exception as e:
        logging.error(f"Error in get_chatbots: {str(e)}")
        return []

@app.route('/delete_chatbot/<chatbot_name>')
def delete_chatbot(chatbot_name):
    user_name = session['username']

    try:
        delete_bot(chatbot_name,user_name)
        bot_table = user_name + chatbot_name
        delete_bot_table(bot_table)    
            
    except Exception as e:
        logging.error(f"Error in get_chatbots: {str(e)}")
        return redirect(url_for('index'))

    return redirect(url_for('index'))

def delete_bot(bot_name,username):
        # Connect to the database
    cursor = conn.cursor()

        # delete chatbot data
    cursor.execute("DELETE FROM chatbots WHERE bot_name=%s AND user_name=%s", (bot_name,username))
    conn.commit()
    cursor.close()

def delete_bot_table(table_name):
    # Connect to the database
    cursor2 = conn2.cursor()

    # DROP TABLE table_name;
    cursor2.execute("DROP TABLE {}".format(table_name))
    conn2.commit()
    cursor2.close()

@app.route('/edit_chatbot/<chatbot_name>/<username>', methods=['GET', 'POST'])
def edit_chatbot(chatbot_name,username):

    return render_template('edit_chatbot.html', chatbot=chatbot_name,username=username)

@app.route("/train/<chatbot_name>", methods=["POST"])
def train_bot(chatbot_name):
    user_name=session['username']
    table_name=user_name + chatbot_name
    try:
        cursor2 = conn2.cursor()
        # Get training data from the request
        training_data = request.json.get("trainingData")

        # Insert the training data into the database
        insert_query1 = """
        INSERT INTO {} (question, answer,category)
        VALUES (%s, %s,%s);
        """.format(table_name)

        insert_query2 = """
        INSERT INTO {} (question, answer,category,subcategory)
        VALUES (%s, %s,%s,%s);
        """.format(table_name)

        for training_item in training_data:
            question = training_item.get("question")
            response = training_item.get("response")
            category=training_item.get("category")
            subcategory=training_item.get("selectedSubCategory")
            if subcategory=='Select Subcategory':
                cursor2.execute(insert_query1, (question, response,category))    
            else:
                cursor2.execute(insert_query2, (question,response,category,subcategory))        
        conn2.commit()
        cursor2.close()

        return jsonify({"message": "Training data stored successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})

#  handle fetching previous data for a chatbot
@app.route('/fetch_previous_data/<chatbot_name>/<user_name>')
def fetch_previous_data(chatbot_name,user_name):
    try:
        # Construct the table name
        # cursor = conn.cursor()
        # cursor.execute("SELECT c.bot_table FROM user_bot_access u JOIN chatbots c ON u.bot_id = c.id WHERE u.username = %s", (user_name,))
        # bot_table = cursor.fetchone()
        # conn.commit()
        # cursor.close()
         
        table_name = user_name + chatbot_name
        cursor2 = conn2.cursor()

        cursor2.execute("SELECT * FROM {} ".format(table_name))

        # Fetch all rows as a list of dictionaries
        data = cursor2.fetchall()

        conn2.commit()
        cursor2.close()

        # Convert the data to a list of dictionaries
        training_data = [{'question': row[0], 'response': row[1]} for row in data]

        return jsonify(training_data)
    except Exception as e:
        logging.error("Error fetching previous data:", str(e))
        return jsonify([])  # Return an empty list if an error occurs
        
#fetching data for given  category given
@app.route('/fetch_data_with_category/<chatbot_name>/<user_name>/<category>')
def fetch_data_with_category(chatbot_name,user_name,category):
    try:
        table_name=user_name+chatbot_name
        cursor2 = conn2.cursor()

        query = f"SELECT * FROM {table_name} WHERE category = %s;"
        cursor2.execute(query, (category,))
        data=cursor2.fetchall()

        conn2.commit()
        cursor2.close()

         # Convert the data to a list of dictionaries
        training_data = [{'question': row[0], 'response': row[1]} for row in data]

        return jsonify(training_data)
    except Exception as e:
        return jsonify([]) 

@app.route('/bot/<chatbot_name>/<username>', methods=['GET'])
def bot(chatbot_name,username): 

    return render_template('bot.html',chatbot={'name': chatbot_name},username=username)

@app.route('/1/<chatbot_name>/<username>', methods=['GET'])
def bt1(chatbot_name,username): 

    return render_template('1.html',chatbot={'name': chatbot_name},username=username)

@app.route('/bot.js/<chatbot_name>/<username>', methods=['GET'])
def send_js(chatbot_name, username):
    # Path to the bot.js file
    js_file_path = 'static/bot.js'

    # Open the bot.js file
    with open(js_file_path, 'r') as file:
        js_content = file.read()

    # Replace placeholders with actual values
    js_content = js_content.replace('{{chatbotName}}', chatbot_name).replace('{{user}}', username)

    # Create a temporary file and write the modified JavaScript content
    with open('temp_bot.js', 'w') as temp_file:
        temp_file.write(js_content)

    # Send the temporary file as a response
    return send_file('temp_bot.js', mimetype='text/javascript')

@app.route('/add_categories/<chatbot_name>', methods=['POST'])
def add_categories(chatbot_name):
    user_name=session['username']
    table_name=user_name + chatbot_name
    try:
        cursor = conn.cursor()

        # Get the categories from the request       
        categories = request.json.get('categories')       


        for category in categories:        
            insert_query="""INSERT INTO category (bot_table,type_name) VALUES (%s ,%s);"""
            cursor.execute(insert_query,(table_name,category))

        conn.commit()
        cursor.close()

        return jsonify({"message": "Training data stored successfully"})

    except Exception as e:
        return jsonify({"error": str(e)})
    return render_template('edit_chatbot.html',chatbot={'name': chatbot_name})

@app.route('/get_categories/<chatbot_name>/<user_name>')
def get_categories(chatbot_name,user_name):

    table_name = user_name + chatbot_name

    cursor = conn.cursor()

    cursor.execute("SELECT type_name FROM category WHERE bot_table=%s",(table_name,))
    categories = cursor.fetchall()

    conn.commit()
    cursor.close()

    return jsonify(categories)

@app.route('/fetch_subcategory/<table_name>/<category>')
def fetch_subcategory(table_name,category):

    cursor = conn.cursor()
    column_names = [f'subcategory{i}' for i in range(1, 11)]
    SubCategories = []

    for column in column_names:
        select_query=f"SELECT {column} FROM category WHERE bot_table=%s AND type_name=%s"
        cursor.execute(select_query, (table_name, category))
        subcategory = cursor.fetchall()
        conn.commit()
        if subcategory!=None:
            SubCategories.append(subcategory) 
    cursor.close()
    return jsonify(SubCategories)

@app.route('/store_subcategories/<table_name>', methods=['POST'])
def store_subcategories(table_name):
    data = request.get_json()
    category = data['category']
    subcategories = data['subcategories']
    cursor = conn.cursor()

    # Create column names with a fixed range
    column_names = [f'subcategory{i}' for i in range(1, 10)]

    # Iterate over pairs of column_names and subcategories
    for column, subcategory in zip(column_names, subcategories):
        update_query = f"UPDATE category SET {column}=%s WHERE bot_table=%s AND type_name=%s"
        cursor.execute(update_query, (subcategory, table_name, category))
        conn.commit()

    cursor.close()

    return jsonify({'success': True})

@app.route('/fetch_questionsWithSubcategory/<table_name>/<category>/<subcategory>')
def fetch_questionsWithSubcategory(table_name,category,subcategory):

    cursor2 = conn2.cursor()
    query=f"SELECT question,answer FROM {table_name} WHERE category=%s and subcategory=%s"
    cursor2.execute(query,(category,subcategory))
    data=cursor2.fetchall()
    data = [{'question': row[0], 'response': row[1]} for row in data]

    cursor2.close()
    return jsonify(data)

#@app.route('/get_emplid')
#def get_emplid():

#    # table_name = user_name + chatbot_name
#    cursor = conn.cursor()

#    cursor.execute("SELECT empid FROM employeemaster")
#    allid = cursor.fetchall()

#    # logging.info(f"categories{allid}")

#    conn.commit()
#    cursor.close()

#    return jsonify(allid)

if __name__ == "__main__":
    app.run(debug=True)
    app.run(host='172.22.5.34',port=8080)
    
