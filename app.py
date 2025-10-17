from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='.')

# Trang chủ - trả về index.html
@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

# Cho phép truy cập các file tĩnh (CSS, JS, nhạc,...)
@app.route('/<path:path>')
def static_file(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
