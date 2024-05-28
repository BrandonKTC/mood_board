from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")

# Dictionnaire initial avec les éléments
data = {
    "elements": [
        {
            "id": 1,
            "name": "cat",
            "src": "https://images.unsplash.com/photo-1573865526739-10659fec78a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzUyMDV8MHwxfHNlYXJjaHwyfHxjYXR8ZW58MHx8fHwxNzE2NzI5MTgyfDA&ixlib=rb-4.0.3&q=80&w=1080",
        },
        {
            "id": 2,
            "name": "dog",
            "src": "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzUyMDV8MHwxfHNlYXJjaHw5fHxkb2d8ZW58MHx8fHwxNzE2NzMzOTc3fDA&ixlib=rb-4.0.3&q=80&w=1080",
        },
    ]
}

# Route pour obtenir les éléments
@app.route('/elements', methods=['GET'])
def get_elements():
    return jsonify(data)

# Route pour ajouter un élément
@app.route('/elements', methods=['POST'])
def add_element():
    new_element = request.json
    new_element['id'] = max(element['id'] for element in data['elements']) + 1
    data['elements'].append(new_element)
    return jsonify(new_element), 201

# Route pour supprimer un élément par id
@app.route('/elements/<int:element_id>', methods=['DELETE'])
def delete_element(element_id):
    global data
    data['elements'] = [element for element in data['elements'] if element['id'] != element_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
