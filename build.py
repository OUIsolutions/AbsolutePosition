
elements = [
    'src/algo.js',
    'src/parser.js',
    'src/main.js'   
]
output = ''
for e in elements:
    with open(e, 'r') as f:
        output += f.read() + '\n'

with open('santosDummont.js', 'w') as f:
    f.write(output)
