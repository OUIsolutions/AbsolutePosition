from os import listdir
elements = [
    'src/constants.js',
    'src/algo.js',
    'src/parser.js',
    'src/main.js'   
]
output = ''
for e in elements:
    with open(e, 'r') as f:
        output += f.read() + '\n'

with open('AbsolutePosition.js', 'w') as f:
    f.write(output)

exemples = listdir('exemples')
with open('internal/readme.md', 'r') as f:
    readme_code = f.read()

for e in exemples:
    with open(f'exemples/{e}', 'r') as f:
        output = f.read()
        readme_code = readme_code.replace(f"#ref:{e}", f'```html\n{output}\n```')

with open('readme.md', 'w') as f:
    f.write(readme_code)